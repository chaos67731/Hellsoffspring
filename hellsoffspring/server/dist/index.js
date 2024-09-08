var _a;
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { WebSocketServer } from "ws";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { GoogleAuth } from "google-auth-library";
import { got } from "got";
import { cleanEnv, str } from "envalid";
import { pino } from "pino";
import { pinoHttp } from "pino-http";
import { initTRPC, TRPCError } from "@trpc/server";
import { ZodError, z } from "zod";
import { Firestore, Timestamp } from "@google-cloud/firestore";
const env = cleanEnv(process.env, {
  VERSION: str({ default: "latest" }),
  APP_STORAGE_BUCKET: str(),
  GOOGLE_CLOUD_PROJECT: str(),
  GOOGLE_CLOUD_DATABASE: str(),
  OPENAI_ORGANIZATION: str(),
  OPENAI_API_KEY: str()
});
const auth = new GoogleAuth({
  scopes: ["https://www.googleapis.com/auth/cloud-platform"]
});
const certificatesURL = "https://www.googleapis.com/service_accounts/v1/metadata/x509/securetoken@system.gserviceaccount.com";
const certificatesCache = /* @__PURE__ */ new Map();
function fetchCertificates(options) {
  return got.get(certificatesURL, {
    cache: certificatesCache,
    resolveBodyOnly: true,
    responseType: "json",
    signal: options == null ? void 0 : options.signal
  });
}
const cleanup = (() => {
  const ac = new AbortController();
  const int = setInterval(() => fetchCertificates(), 216e5);
  fetchCertificates({ signal: ac.signal });
  return () => {
    clearInterval(int);
    ac.abort();
  };
})();
process.on("SIGTERM", cleanup);
process.on("SIGINT", cleanup);
const idTokenClients = /* @__PURE__ */ new Map();
async function sessionMiddleware(req, res, next) {
  var _a2, _b;
  try {
    req.token = null;
    const idToken = (_a2 = req.headers.authorization) == null ? void 0 : _a2.replace(/^Bearer /i, "");
    if (idToken) {
      const certificatesPromise = fetchCertificates();
      const audience = env.GOOGLE_CLOUD_PROJECT;
      let idTokenClient = idTokenClients.get(audience);
      if (!idTokenClient) {
        idTokenClient = await auth.getIdTokenClient(audience);
        idTokenClients.set(audience, idTokenClient);
      }
      const ticket = await idTokenClient.verifySignedJwtWithCertsAsync(
        idToken,
        await certificatesPromise,
        audience,
        [`https://securetoken.google.com/${env.GOOGLE_CLOUD_PROJECT}`]
      );
      const token = ticket.getPayload();
      if (token) {
        if ("user_id" in token)
          delete token.user_id;
        Object.assign(token, { uid: token.sub });
        req.token = token;
      }
    }
    next();
  } catch (err) {
    (_b = req.log) == null ? void 0 : _b.warn(err);
    next();
  }
}
const logger = pino({
  // Custom formatter to set the "severity" property in the JSON payload
  // to the log level to be automatically parsed.
  // https://cloud.google.com/run/docs/logging#special-fields
  formatters: {
    level(label) {
      return { severity: label };
    }
  },
  transport: {
    // Enable pretty printing in development.
    // https://github.com/pinojs/pino-pretty#readme
    target: env.isProduction ? "pino/file" : "pino-pretty",
    options: {
      ...!env.isProduction && { colorize: true },
      ignore: env.isProduction ? "pid,hostname" : "pid,hostname,req.headers,req.remoteAddress,req.remotePort,res.headers"
    }
  }
});
const loggerMiddleware = pinoHttp({
  logger,
  customProps(req) {
    const traceHeader = req.header("X-Cloud-Trace-Context");
    let trace;
    if (traceHeader) {
      const [traceId] = traceHeader.split("/");
      trace = `projects/${env.GOOGLE_CLOUD_PROJECT}/traces/${traceId}`;
    }
    return {
      "logging.googleapis.com/trace": trace
    };
  },
  redact: {
    paths: ["req.headers.authorization", "req.headers.cookie"]
  }
});
let db;
function getFirestore() {
  if (!db) {
    db = new Firestore({
      projectId: env.GOOGLE_CLOUD_PROJECT,
      databaseId: env.GOOGLE_CLOUD_DATABASE
    });
  }
  return db;
}
const t = initTRPC.context().create({
  isDev: env.isDev,
  // https://trpc.io/docs/server/error-formatting
  errorFormatter(opts) {
    const { shape, error } = opts;
    return {
      ...shape,
      data: {
        ...shape.data,
        ...error.code === "BAD_REQUEST" && error.cause instanceof ZodError && {
          zodError: error.cause.flatten()
        }
      }
    };
  }
});
async function createContext(ctx) {
  return new HttpContext(getFirestore(), ctx.req.log, ctx.req.token);
}
async function createWsContext() {
  return new WsContext(getFirestore(), logger);
}
class HttpContext {
  constructor(db2, log, token) {
    this.db = db2;
    this.log = log;
    this.token = token;
  }
}
class WsContext {
  constructor(db2, log) {
    this.db = db2;
    this.log = log;
  }
  get token() {
    throw new Error("ID token is not available in WebSocket context.");
  }
}
const authorize = t.middleware((opts) => {
  if (!opts.ctx.token) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return opts.next({
    ...opts,
    ctx: opts.ctx
  });
});
authorize.unstable_pipe((opts) => {
  if (!opts.ctx.token.admin) {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
  return opts.next(opts);
});
const workspace = t.router({
  /**
   * Updates the workspace.
   */
  update: t.procedure.use(authorize).input(
    z.object({
      id: z.string(),
      name: z.string().max(100)
    })
  ).query(async ({ input, ctx }) => {
    var _a2;
    const { db: db2 } = ctx;
    const doc = await db2.doc(`workspace/${input.id}`).get();
    if (!doc.exists || ((_a2 = doc.data()) == null ? void 0 : _a2.ownerId) !== ctx.token.uid) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }
    await doc.ref.update({
      name: input.name,
      updated: Timestamp.now()
    });
  })
});
const router = t.router({
  workspace
});
const app = express();
app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(loggerMiddleware);
app.use(sessionMiddleware);
app.use("/trpc", createExpressMiddleware({ router, createContext }));
app.use(
  createProxyMiddleware("/__", {
    target: `https://${env.GOOGLE_CLOUD_PROJECT}.firebaseapp.com`,
    changeOrigin: true,
    logLevel: "warn"
  })
);
app.use(
  createProxyMiddleware("/", {
    target: "https://c.storage.googleapis.com",
    changeOrigin: true,
    logLevel: "warn",
    onProxyReq(proxyReq) {
      proxyReq.setHeader("host", env.APP_STORAGE_BUCKET);
    }
  })
);
const isCloudRun = !!process.env.K_SERVICE;
function listen(port) {
  const server = app.listen(port, () => {
    logger.info(`API listening on ${port}`);
  });
  const wss = new WebSocketServer({ server, path: "/trpc" });
  const handler = applyWSSHandler({ wss, router, createContext: createWsContext });
  wss.on("connection", (ws) => {
    logger.info({ clients: wss.clients.size }, "wss:connection");
    ws.once("close", () => {
      logger.info({ clients: wss.clients.size }, "wss:close");
    });
  });
  return function dispose(cb) {
    handler.broadcastReconnectNotification();
    wss.close((err) => {
      if (err)
        logger.error(err);
      if (isCloudRun)
        logger.info("WebSocket server closed");
      server.close((err2) => {
        if (err2)
          logger.error(err2);
        if (isCloudRun)
          logger.info("HTTP server closed");
        logger.flush((err3) => {
          if (err3)
            console.error(err3);
          if (isCloudRun) {
            process.exit(0);
          } else {
            cb == null ? void 0 : cb();
          }
        });
      });
    });
  };
}
if (process.env.PORT && ((_a = process.env.K_SERVICE) == null ? void 0 : _a.startsWith("server"))) {
  let handleClose = function(code) {
    logger.info(`${code} signal received`);
    dispose();
  };
  const port = parseInt(process.env.PORT);
  const dispose = listen(port);
  process.on("SIGINT", handleClose);
  process.on("SIGTERM", handleClose);
}
export {
  listen
};
//# sourceMappingURL=index.js.map
