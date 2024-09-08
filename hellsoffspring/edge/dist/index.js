import Gt from "__STATIC_CONTENT_MANIFEST";
var Jt = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
}, Kt = (t, e) => {
  const r = new String(t);
  return r.isEscaped = !0, r.callbacks = e, r;
}, bt = async (t, e, r, s, n) => {
  const a = t.callbacks;
  if (!(a != null && a.length))
    return Promise.resolve(t);
  n ? n[0] += t : n = [t];
  const i = Promise.all(a.map((o) => o({ phase: e, buffer: n, context: s }))).then(
    (o) => Promise.all(
      o.filter(Boolean).map((c) => bt(c, e, !1, s, n))
    ).then(() => n[0])
  );
  return r ? Kt(await i, a) : i;
}, kt = (t, e, r) => {
  if (!e.has(t))
    throw TypeError("Cannot " + r);
}, v = (t, e, r) => (kt(t, e, "read from private field"), r ? r.call(t) : e.get(t)), ie = (t, e, r) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, r);
}, C = (t, e, r, s) => (kt(t, e, "write to private field"), s ? s.call(t, r) : e.set(t, r), r), Yt = "text/plain; charset=UTF-8", tt = (t, e = {}) => (Object.entries(e).forEach(([r, s]) => t.set(r, s)), t), me, G, R, k, j, J, De = class {
  constructor(t, e) {
    this.env = {}, this._var = {}, this.finalized = !1, this.error = void 0, ie(this, me, 200), ie(this, G, void 0), ie(this, R, void 0), ie(this, k, void 0), ie(this, j, void 0), ie(this, J, !0), this.layout = void 0, this.renderer = (r) => this.html(r), this.notFoundHandler = () => new Response(), this.render = (...r) => this.renderer(...r), this.setLayout = (r) => this.layout = r, this.getLayout = () => this.layout, this.setRenderer = (r) => {
      this.renderer = r;
    }, this.header = (r, s, n) => {
      if (s === void 0) {
        v(this, R) ? v(this, R).delete(r) : v(this, k) && delete v(this, k)[r.toLocaleLowerCase()], this.finalized && this.res.headers.delete(r);
        return;
      }
      n != null && n.append ? (v(this, R) || (C(this, J, !1), C(this, R, new Headers(v(this, k))), C(this, k, {})), v(this, R).append(r, s)) : v(this, R) ? v(this, R).set(r, s) : (v(this, k) ?? C(this, k, {}), v(this, k)[r.toLowerCase()] = s), this.finalized && (n != null && n.append ? this.res.headers.append(r, s) : this.res.headers.set(r, s));
    }, this.status = (r) => {
      C(this, J, !1), C(this, me, r);
    }, this.set = (r, s) => {
      this._var ?? (this._var = {}), this._var[r] = s;
    }, this.get = (r) => this._var ? this._var[r] : void 0, this.newResponse = (r, s, n) => {
      if (v(this, J) && !n && !s && v(this, me) === 200)
        return new Response(r, {
          headers: v(this, k)
        });
      if (s && typeof s != "number") {
        const i = tt(new Headers(s.headers), v(this, k));
        return new Response(r, {
          headers: i,
          status: s.status
        });
      }
      const a = typeof s == "number" ? s : v(this, me);
      v(this, k) ?? C(this, k, {}), v(this, R) ?? C(this, R, new Headers()), tt(v(this, R), v(this, k)), v(this, j) && (v(this, j).headers.forEach((i, o) => {
        var c;
        (c = v(this, R)) == null || c.set(o, i);
      }), tt(v(this, R), v(this, k))), n ?? (n = {});
      for (const [i, o] of Object.entries(n))
        if (typeof o == "string")
          v(this, R).set(i, o);
        else {
          v(this, R).delete(i);
          for (const c of o)
            v(this, R).append(i, c);
        }
      return new Response(r, {
        status: a,
        headers: v(this, R)
      });
    }, this.body = (r, s, n) => typeof s == "number" ? this.newResponse(r, s, n) : this.newResponse(r, s), this.text = (r, s, n) => {
      if (!v(this, k)) {
        if (v(this, J) && !n && !s)
          return new Response(r);
        C(this, k, {});
      }
      return v(this, k)["content-type"] = Yt, typeof s == "number" ? this.newResponse(r, s, n) : this.newResponse(r, s);
    }, this.json = (r, s, n) => {
      const a = JSON.stringify(r);
      return v(this, k) ?? C(this, k, {}), v(this, k)["content-type"] = "application/json; charset=UTF-8", typeof s == "number" ? this.newResponse(a, s, n) : this.newResponse(a, s);
    }, this.html = (r, s, n) => (v(this, k) ?? C(this, k, {}), v(this, k)["content-type"] = "text/html; charset=UTF-8", typeof r == "object" && (r instanceof Promise || (r = r.toString()), r instanceof Promise) ? r.then((a) => bt(a, Jt.Stringify, !1, {})).then((a) => typeof s == "number" ? this.newResponse(a, s, n) : this.newResponse(a, s)) : typeof s == "number" ? this.newResponse(r, s, n) : this.newResponse(r, s)), this.redirect = (r, s = 302) => (v(this, R) ?? C(this, R, new Headers()), v(this, R).set("Location", r), this.newResponse(null, s)), this.notFound = () => this.notFoundHandler(this), this.req = t, e && (C(this, G, e.executionCtx), this.env = e.env, e.notFoundHandler && (this.notFoundHandler = e.notFoundHandler));
  }
  get event() {
    if (v(this, G) && "respondWith" in v(this, G))
      return v(this, G);
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (v(this, G))
      return v(this, G);
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return C(this, J, !1), v(this, j) || C(this, j, new Response("404 Not Found", { status: 404 }));
  }
  set res(t) {
    if (C(this, J, !1), v(this, j) && t) {
      v(this, j).headers.delete("content-type");
      for (const [e, r] of v(this, j).headers.entries())
        if (e === "set-cookie") {
          const s = v(this, j).headers.getSetCookie();
          t.headers.delete("set-cookie");
          for (const n of s)
            t.headers.append("set-cookie", n);
        } else
          t.headers.set(e, r);
    }
    C(this, j, t), this.finalized = !0;
  }
  get var() {
    return { ...this._var };
  }
};
me = /* @__PURE__ */ new WeakMap();
G = /* @__PURE__ */ new WeakMap();
R = /* @__PURE__ */ new WeakMap();
k = /* @__PURE__ */ new WeakMap();
j = /* @__PURE__ */ new WeakMap();
J = /* @__PURE__ */ new WeakMap();
var ft = (t, e, r) => (s, n) => {
  let a = -1;
  return i(0);
  async function i(o) {
    if (o <= a)
      throw new Error("next() called multiple times");
    a = o;
    let c, d = !1, u;
    if (t[o] ? (u = t[o][0][0], s instanceof De && (s.req.routeIndex = o)) : u = o === t.length && n || void 0, !u)
      s instanceof De && s.finalized === !1 && r && (c = await r(s));
    else
      try {
        c = await u(s, () => i(o + 1));
      } catch (p) {
        if (p instanceof Error && s instanceof De && e)
          s.error = p, c = await e(p, s), d = !0;
        else
          throw p;
      }
    return c && (s.finalized === !1 || d) && (s.res = c), s;
  }
}, Le = class extends Error {
  constructor(t = 500, e) {
    super(e == null ? void 0 : e.message), this.res = e == null ? void 0 : e.res, this.status = t;
  }
  getResponse() {
    return this.res ? this.res : new Response(this.message, {
      status: this.status
    });
  }
}, Xt = async (t, e = { all: !1 }) => {
  const s = (t instanceof Ot ? t.raw.headers : t.headers).get("Content-Type");
  return Qt(s) ? er(t, e) : {};
};
function Qt(t) {
  return t === null ? !1 : t.startsWith("multipart/form-data") || t.startsWith("application/x-www-form-urlencoded");
}
async function er(t, e) {
  const r = await t.formData();
  return r ? tr(r, e) : {};
}
function tr(t, e) {
  const r = {};
  return t.forEach((s, n) => {
    e.all || n.endsWith("[]") ? rr(r, n, s) : r[n] = s;
  }), r;
}
var rr = (t, e, r) => {
  t[e] && sr(t[e]) ? nr(t[e], r) : t[e] ? ar(t, e, r) : t[e] = r;
};
function sr(t) {
  return Array.isArray(t);
}
var nr = (t, e) => {
  t.push(e);
}, ar = (t, e, r) => {
  t[e] = [t[e], r];
}, Tt = (t) => {
  const e = t.split("/");
  return e[0] === "" && e.shift(), e;
}, ir = (t) => {
  const { groups: e, path: r } = or(t), s = Tt(r);
  return cr(s, e);
}, or = (t) => {
  const e = [];
  return t = t.replace(/\{[^}]+\}/g, (r, s) => {
    const n = `@${s}`;
    return e.push([n, r]), n;
  }), { groups: e, path: t };
}, cr = (t, e) => {
  for (let r = e.length - 1; r >= 0; r--) {
    const [s] = e[r];
    for (let n = t.length - 1; n >= 0; n--)
      if (t[n].includes(s)) {
        t[n] = t[n].replace(s, e[r][1]);
        break;
      }
  }
  return t;
}, Pe = {}, pt = (t) => {
  if (t === "*")
    return "*";
  const e = t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  return e ? (Pe[t] || (e[2] ? Pe[t] = [t, e[1], new RegExp("^" + e[2] + "$")] : Pe[t] = [t, e[1], !0]), Pe[t]) : null;
}, Et = (t) => {
  const e = t.url.match(/^https?:\/\/[^/]+(\/[^?]*)/);
  return e ? e[1] : "";
}, dr = (t) => {
  const e = t.indexOf("?", 8);
  return e === -1 ? "" : "?" + t.slice(e + 1);
}, ur = (t) => {
  const e = Et(t);
  return e.length > 1 && e[e.length - 1] === "/" ? e.slice(0, -1) : e;
}, pe = (...t) => {
  let e = "", r = !1;
  for (let s of t)
    e[e.length - 1] === "/" && (e = e.slice(0, -1), r = !0), s[0] !== "/" && (s = `/${s}`), s === "/" && r ? e = `${e}/` : s !== "/" && (e = `${e}${s}`), s === "/" && e === "" && (e = "/");
  return e;
}, Rt = (t) => {
  if (!t.match(/\:.+\?$/))
    return null;
  const e = t.split("/"), r = [];
  let s = "";
  return e.forEach((n) => {
    if (n !== "" && !/\:/.test(n))
      s += "/" + n;
    else if (/\:/.test(n))
      if (/\?/.test(n)) {
        r.length === 0 && s === "" ? r.push("/") : r.push(s);
        const a = n.replace("?", "");
        s += "/" + a, r.push(s);
      } else
        s += "/" + n;
  }), r.filter((n, a, i) => i.indexOf(n) === a);
}, rt = (t) => /[%+]/.test(t) ? (t.indexOf("+") !== -1 && (t = t.replace(/\+/g, " ")), /%/.test(t) ? ze(t) : t) : t, St = (t, e, r) => {
  let s;
  if (!r && e && !/[%+]/.test(e)) {
    let i = t.indexOf(`?${e}`, 8);
    for (i === -1 && (i = t.indexOf(`&${e}`, 8)); i !== -1; ) {
      const o = t.charCodeAt(i + e.length + 1);
      if (o === 61) {
        const c = i + e.length + 2, d = t.indexOf("&", c);
        return rt(t.slice(c, d === -1 ? void 0 : d));
      } else if (o == 38 || isNaN(o))
        return "";
      i = t.indexOf(`&${e}`, i + 1);
    }
    if (s = /[%+]/.test(t), !s)
      return;
  }
  const n = {};
  s ?? (s = /[%+]/.test(t));
  let a = t.indexOf("?", 8);
  for (; a !== -1; ) {
    const i = t.indexOf("&", a + 1);
    let o = t.indexOf("=", a);
    o > i && i !== -1 && (o = -1);
    let c = t.slice(
      a + 1,
      o === -1 ? i === -1 ? void 0 : i : o
    );
    if (s && (c = rt(c)), a = i, c === "")
      continue;
    let d;
    o === -1 ? d = "" : (d = t.slice(o + 1, i === -1 ? void 0 : i), s && (d = rt(d))), r ? (n[c] && Array.isArray(n[c]) || (n[c] = []), n[c].push(d)) : n[c] ?? (n[c] = d);
  }
  return e ? n[e] : n;
}, lr = St, hr = (t, e) => St(t, e, !0), ze = decodeURIComponent, Ct = (t, e, r) => {
  if (!e.has(t))
    throw TypeError("Cannot " + r);
}, q = (t, e, r) => (Ct(t, e, "read from private field"), r ? r.call(t) : e.get(t)), mt = (t, e, r) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, r);
}, yt = (t, e, r, s) => (Ct(t, e, "write to private field"), s ? s.call(t, r) : e.set(t, r), r), ye, V, Ot = class {
  constructor(t, e = "/", r = [[]]) {
    mt(this, ye, void 0), mt(this, V, void 0), this.routeIndex = 0, this.bodyCache = {}, this.cachedBody = (s) => {
      const { bodyCache: n, raw: a } = this, i = n[s];
      return i || (n.arrayBuffer ? (async () => await new Response(n.arrayBuffer)[s]())() : n[s] = a[s]());
    }, this.raw = t, this.path = e, yt(this, V, r), yt(this, ye, {});
  }
  param(t) {
    return t ? this.getDecodedParam(t) : this.getAllDecodedParams();
  }
  getDecodedParam(t) {
    const e = q(this, V)[0][this.routeIndex][1][t], r = this.getParamValue(e);
    return r ? /\%/.test(r) ? ze(r) : r : void 0;
  }
  getAllDecodedParams() {
    const t = {}, e = Object.keys(q(this, V)[0][this.routeIndex][1]);
    for (const r of e) {
      const s = this.getParamValue(q(this, V)[0][this.routeIndex][1][r]);
      s && typeof s == "string" && (t[r] = /\%/.test(s) ? ze(s) : s);
    }
    return t;
  }
  getParamValue(t) {
    return q(this, V)[1] ? q(this, V)[1][t] : t;
  }
  query(t) {
    return lr(this.url, t);
  }
  queries(t) {
    return hr(this.url, t);
  }
  header(t) {
    if (t)
      return this.raw.headers.get(t.toLowerCase()) ?? void 0;
    const e = {};
    return this.raw.headers.forEach((r, s) => {
      e[s] = r;
    }), e;
  }
  async parseBody(t) {
    if (this.bodyCache.parsedBody)
      return this.bodyCache.parsedBody;
    const e = await Xt(this, t);
    return this.bodyCache.parsedBody = e, e;
  }
  json() {
    return this.cachedBody("json");
  }
  text() {
    return this.cachedBody("text");
  }
  arrayBuffer() {
    return this.cachedBody("arrayBuffer");
  }
  blob() {
    return this.cachedBody("blob");
  }
  formData() {
    return this.cachedBody("formData");
  }
  addValidatedData(t, e) {
    q(this, ye)[t] = e;
  }
  valid(t) {
    return q(this, ye)[t];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get matchedRoutes() {
    return q(this, V)[0].map(([[, t]]) => t);
  }
  get routePath() {
    return q(this, V)[0].map(([[, t]]) => t)[this.routeIndex].path;
  }
};
ye = /* @__PURE__ */ new WeakMap();
V = /* @__PURE__ */ new WeakMap();
var S = "ALL", fr = "all", Nt = ["get", "post", "put", "delete", "options", "patch"], Zt = "Can not add a route since the matcher is already built.", At = class extends Error {
}, It = (t, e, r) => {
  if (!e.has(t))
    throw TypeError("Cannot " + r);
}, $e = (t, e, r) => (It(t, e, "read from private field"), r ? r.call(t) : e.get(t)), pr = (t, e, r) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, r);
}, Me = (t, e, r, s) => (It(t, e, "write to private field"), s ? s.call(t, r) : e.set(t, r), r), mr = Symbol("composedHandler");
function yr() {
  return class {
  };
}
var vr = (t) => t.text("404 Not Found", 404), vt = (t, e) => t instanceof Le ? t.getResponse() : (console.error(t), e.text("Internal Server Error", 500)), B, jt = class extends yr() {
  constructor(t = {}) {
    super(), this._basePath = "/", pr(this, B, "/"), this.routes = [], this.notFoundHandler = vr, this.errorHandler = vt, this.onError = (s) => (this.errorHandler = s, this), this.notFound = (s) => (this.notFoundHandler = s, this), this.fetch = (s, n, a) => this.dispatch(s, a, n, s.method), this.request = (s, n, a, i) => {
      if (s instanceof Request)
        return n !== void 0 && (s = new Request(s, n)), this.fetch(s, a, i);
      s = s.toString();
      const o = /^https?:\/\//.test(s) ? s : `http://localhost${pe("/", s)}`, c = new Request(o, n);
      return this.fetch(c, a, i);
    }, this.fire = () => {
      addEventListener("fetch", (s) => {
        s.respondWith(this.dispatch(s.request, s, void 0, s.request.method));
      });
    }, [...Nt, fr].map((s) => {
      this[s] = (n, ...a) => (typeof n == "string" ? Me(this, B, n) : this.addRoute(s, $e(this, B), n), a.map((i) => {
        typeof i != "string" && this.addRoute(s, $e(this, B), i);
      }), this);
    }), this.on = (s, n, ...a) => {
      if (!s)
        return this;
      for (const i of [n].flat()) {
        Me(this, B, i);
        for (const o of [s].flat())
          a.map((c) => {
            this.addRoute(o.toUpperCase(), $e(this, B), c);
          });
      }
      return this;
    }, this.use = (s, ...n) => (typeof s == "string" ? Me(this, B, s) : (Me(this, B, "*"), n.unshift(s)), n.map((a) => {
      this.addRoute(S, $e(this, B), a);
    }), this);
    const r = t.strict ?? !0;
    delete t.strict, Object.assign(this, t), this.getPath = r ? t.getPath ?? Et : ur;
  }
  clone() {
    const t = new jt({
      router: this.router,
      getPath: this.getPath
    });
    return t.routes = this.routes, t;
  }
  route(t, e) {
    const r = this.basePath(t);
    return e ? (e.routes.map((s) => {
      let n;
      e.errorHandler === vt ? n = s.handler : (n = async (a, i) => (await ft([], e.errorHandler)(a, () => s.handler(a, i))).res, n[mr] = s.handler), r.addRoute(s.method, s.path, n);
    }), this) : r;
  }
  basePath(t) {
    const e = this.clone();
    return e._basePath = pe(this._basePath, t), e;
  }
  mount(t, e, r) {
    const s = pe(this._basePath, t), n = s === "/" ? 0 : s.length, a = async (i, o) => {
      let c;
      try {
        c = i.executionCtx;
      } catch {
      }
      const d = r ? r(i) : [i.env, c], u = Array.isArray(d) ? d : [d], p = dr(i.req.url), b = await e(
        new Request(
          new URL((i.req.path.slice(n) || "/") + p, i.req.url),
          i.req.raw
        ),
        ...u
      );
      if (b)
        return b;
      await o();
    };
    return this.addRoute(S, pe(t, "*"), a), this;
  }
  addRoute(t, e, r) {
    t = t.toUpperCase(), e = pe(this._basePath, e);
    const s = { path: e, method: t, handler: r };
    this.router.add(t, e, [r, s]), this.routes.push(s);
  }
  matchRoute(t, e) {
    return this.router.match(t, e);
  }
  handleError(t, e) {
    if (t instanceof Error)
      return this.errorHandler(t, e);
    throw t;
  }
  dispatch(t, e, r, s) {
    if (s === "HEAD")
      return (async () => new Response(null, await this.dispatch(t, e, r, "GET")))();
    const n = this.getPath(t, { env: r }), a = this.matchRoute(s, n), i = new De(new Ot(t, n, a), {
      env: r,
      executionCtx: e,
      notFoundHandler: this.notFoundHandler
    });
    if (a[0].length === 1) {
      let c;
      try {
        if (c = a[0][0][0][0](i, async () => {
        }), !c)
          return this.notFoundHandler(i);
      } catch (d) {
        return this.handleError(d, i);
      }
      return c instanceof Promise ? c.then(
        (d) => d || (i.finalized ? i.res : this.notFoundHandler(i))
      ).catch((d) => this.handleError(d, i)) : c;
    }
    const o = ft(a[0], this.errorHandler, this.notFoundHandler);
    return (async () => {
      try {
        const c = await o(i);
        if (!c.finalized)
          throw new Error(
            "Context is not finalized. You may forget returning Response object or `await next()`"
          );
        return c.res;
      } catch (c) {
        return this.handleError(c, i);
      }
    })();
  }
}, gr = jt;
B = /* @__PURE__ */ new WeakMap();
var Ue = "[^/]+", ge = ".*", _e = "(?:|/.*)", ve = Symbol();
function _r(t, e) {
  return t.length === 1 ? e.length === 1 ? t < e ? -1 : 1 : -1 : e.length === 1 || t === ge || t === _e ? 1 : e === ge || e === _e ? -1 : t === Ue ? 1 : e === Ue ? -1 : t.length === e.length ? t < e ? -1 : 1 : e.length - t.length;
}
var it = class {
  constructor() {
    this.children = {};
  }
  insert(e, r, s, n, a) {
    if (e.length === 0) {
      if (this.index !== void 0)
        throw ve;
      if (a)
        return;
      this.index = r;
      return;
    }
    const [i, ...o] = e, c = i === "*" ? o.length === 0 ? ["", "", ge] : ["", "", Ue] : i === "/*" ? ["", "", _e] : i.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let d;
    if (c) {
      const u = c[1];
      let p = c[2] || Ue;
      if (u && c[2] && (p = p.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(p)))
        throw ve;
      if (d = this.children[p], !d) {
        if (Object.keys(this.children).some(
          (b) => b !== ge && b !== _e
        ))
          throw ve;
        if (a)
          return;
        d = this.children[p] = new it(), u !== "" && (d.varIndex = n.varIndex++);
      }
      !a && u !== "" && s.push([u, d.varIndex]);
    } else if (d = this.children[i], !d) {
      if (Object.keys(this.children).some(
        (u) => u.length > 1 && u !== ge && u !== _e
      ))
        throw ve;
      if (a)
        return;
      d = this.children[i] = new it();
    }
    d.insert(o, r, s, n, a);
  }
  buildRegExpStr() {
    const r = Object.keys(this.children).sort(_r).map((s) => {
      const n = this.children[s];
      return (typeof n.varIndex == "number" ? `(${s})@${n.varIndex}` : s) + n.buildRegExpStr();
    });
    return typeof this.index == "number" && r.unshift(`#${this.index}`), r.length === 0 ? "" : r.length === 1 ? r[0] : "(?:" + r.join("|") + ")";
  }
}, xr = class {
  constructor() {
    this.context = { varIndex: 0 }, this.root = new it();
  }
  insert(t, e, r) {
    const s = [], n = [];
    for (let i = 0; ; ) {
      let o = !1;
      if (t = t.replace(/\{[^}]+\}/g, (c) => {
        const d = `@\\${i}`;
        return n[i] = [d, c], i++, o = !0, d;
      }), !o)
        break;
    }
    const a = t.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = n.length - 1; i >= 0; i--) {
      const [o] = n[i];
      for (let c = a.length - 1; c >= 0; c--)
        if (a[c].indexOf(o) !== -1) {
          a[c] = a[c].replace(o, n[i][1]);
          break;
        }
    }
    return this.root.insert(a, e, s, this.context, r), s;
  }
  buildRegExp() {
    let t = this.root.buildRegExpStr();
    if (t === "")
      return [/^$/, [], []];
    let e = 0;
    const r = [], s = [];
    return t = t.replace(/#(\d+)|@(\d+)|\.\*\$/g, (n, a, i) => typeof a < "u" ? (r[++e] = Number(a), "$()") : (typeof i < "u" && (s[Number(i)] = ++e), "")), [new RegExp(`^${t}`), r, s];
  }
}, st = [S, ...Nt].map((t) => t.toUpperCase()), Pt = [], wr = [/^$/, [], {}], ot = {};
function $t(t) {
  return ot[t] ?? (ot[t] = new RegExp(
    t === "*" ? "" : `^${t.replace(/\/\*/, "(?:|/.*)")}$`
  ));
}
function br() {
  ot = {};
}
function kr(t) {
  var d;
  const e = new xr(), r = [];
  if (t.length === 0)
    return wr;
  const s = t.map(
    (u) => [!/\*|\/:/.test(u[0]), ...u]
  ).sort(
    ([u, p], [b, O]) => u ? 1 : b ? -1 : p.length - O.length
  ), n = {};
  for (let u = 0, p = -1, b = s.length; u < b; u++) {
    const [O, E, A] = s[u];
    O ? n[E] = [A.map(([L]) => [L, {}]), Pt] : p++;
    let I;
    try {
      I = e.insert(E, p, O);
    } catch (L) {
      throw L === ve ? new At(E) : L;
    }
    O || (r[p] = A.map(([L, ee]) => {
      const H = {};
      for (ee -= 1; ee >= 0; ee--) {
        const [Ie, je] = I[ee];
        H[Ie] = je;
      }
      return [L, H];
    }));
  }
  const [a, i, o] = e.buildRegExp();
  for (let u = 0, p = r.length; u < p; u++)
    for (let b = 0, O = r[u].length; b < O; b++) {
      const E = (d = r[u][b]) == null ? void 0 : d[1];
      if (!E)
        continue;
      const A = Object.keys(E);
      for (let I = 0, L = A.length; I < L; I++)
        E[A[I]] = o[E[A[I]]];
    }
  const c = [];
  for (const u in i)
    c[u] = r[i[u]];
  return [a, c, n];
}
function oe(t, e) {
  if (t) {
    for (const r of Object.keys(t).sort((s, n) => n.length - s.length))
      if ($t(r).test(e))
        return [...t[r]];
  }
}
var Tr = class {
  constructor() {
    this.name = "RegExpRouter", this.middleware = { [S]: {} }, this.routes = { [S]: {} };
  }
  add(t, e, r) {
    var s;
    const { middleware: n, routes: a } = this;
    if (!n || !a)
      throw new Error(Zt);
    st.indexOf(t) === -1 && st.push(t), n[t] || [n, a].forEach((c) => {
      c[t] = {}, Object.keys(c[S]).forEach((d) => {
        c[t][d] = [...c[S][d]];
      });
    }), e === "/*" && (e = "*");
    const i = (e.match(/\/:/g) || []).length;
    if (/\*$/.test(e)) {
      const c = $t(e);
      t === S ? Object.keys(n).forEach((d) => {
        var u;
        (u = n[d])[e] || (u[e] = oe(n[d], e) || oe(n[S], e) || []);
      }) : (s = n[t])[e] || (s[e] = oe(n[t], e) || oe(n[S], e) || []), Object.keys(n).forEach((d) => {
        (t === S || t === d) && Object.keys(n[d]).forEach((u) => {
          c.test(u) && n[d][u].push([r, i]);
        });
      }), Object.keys(a).forEach((d) => {
        (t === S || t === d) && Object.keys(a[d]).forEach(
          (u) => c.test(u) && a[d][u].push([r, i])
        );
      });
      return;
    }
    const o = Rt(e) || [e];
    for (let c = 0, d = o.length; c < d; c++) {
      const u = o[c];
      Object.keys(a).forEach((p) => {
        var b;
        (t === S || t === p) && ((b = a[p])[u] || (b[u] = [
          ...oe(n[p], u) || oe(n[S], u) || []
        ]), a[p][u].push([r, i - d + c + 1]));
      });
    }
  }
  match(t, e) {
    br();
    const r = this.buildAllMatchers();
    return this.match = (s, n) => {
      const a = r[s], i = a[2][n];
      if (i)
        return i;
      const o = n.match(a[0]);
      if (!o)
        return [[], Pt];
      const c = o.indexOf("", 1);
      return [a[1][c], o];
    }, this.match(t, e);
  }
  buildAllMatchers() {
    const t = {};
    return st.forEach((e) => {
      t[e] = this.buildMatcher(e) || t[S];
    }), this.middleware = this.routes = void 0, t;
  }
  buildMatcher(t) {
    const e = [];
    let r = t === S;
    return [this.middleware, this.routes].forEach((s) => {
      const n = s[t] ? Object.keys(s[t]).map((a) => [a, s[t][a]]) : [];
      n.length !== 0 ? (r || (r = !0), e.push(...n)) : t !== S && e.push(
        ...Object.keys(s[S]).map((a) => [a, s[S][a]])
      );
    }), r ? kr(e) : null;
  }
}, Er = class {
  constructor(t) {
    this.name = "SmartRouter", this.routers = [], this.routes = [], Object.assign(this, t);
  }
  add(t, e, r) {
    if (!this.routes)
      throw new Error(Zt);
    this.routes.push([t, e, r]);
  }
  match(t, e) {
    if (!this.routes)
      throw new Error("Fatal error");
    const { routers: r, routes: s } = this, n = r.length;
    let a = 0, i;
    for (; a < n; a++) {
      const o = r[a];
      try {
        s.forEach((c) => {
          o.add(...c);
        }), i = o.match(t, e);
      } catch (c) {
        if (c instanceof At)
          continue;
        throw c;
      }
      this.match = o.match.bind(o), this.routers = [o], this.routes = void 0;
      break;
    }
    if (a === n)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, i;
  }
  get activeRouter() {
    if (this.routes || this.routers.length !== 1)
      throw new Error("No active router has been determined yet.");
    return this.routers[0];
  }
}, Mt = class {
  constructor(t, e, r) {
    if (this.order = 0, this.params = {}, this.children = r || {}, this.methods = [], this.name = "", t && e) {
      const s = {};
      s[t] = { handler: e, possibleKeys: [], score: 0, name: this.name }, this.methods = [s];
    }
    this.patterns = [];
  }
  insert(t, e, r) {
    this.name = `${t} ${e}`, this.order = ++this.order;
    let s = this;
    const n = ir(e), a = [], i = [];
    for (let d = 0, u = n.length; d < u; d++) {
      const p = n[d];
      if (Object.keys(s.children).includes(p)) {
        i.push(...s.patterns), s = s.children[p];
        const O = pt(p);
        O && a.push(O[1]);
        continue;
      }
      s.children[p] = new Mt();
      const b = pt(p);
      b && (s.patterns.push(b), i.push(...s.patterns), a.push(b[1])), i.push(...s.patterns), s = s.children[p];
    }
    s.methods.length || (s.methods = []);
    const o = {}, c = {
      handler: r,
      possibleKeys: a.filter((d, u, p) => p.indexOf(d) === u),
      name: this.name,
      score: this.order
    };
    return o[t] = c, s.methods.push(o), s;
  }
  gHSets(t, e, r, s) {
    const n = [];
    for (let a = 0, i = t.methods.length; a < i; a++) {
      const o = t.methods[a], c = o[e] || o[S], d = {};
      c !== void 0 && (c.params = {}, c.possibleKeys.forEach((u) => {
        const p = d[c.name];
        c.params[u] = s[u] && !p ? s[u] : r[u] ?? s[u], d[c.name] = !0;
      }), n.push(c));
    }
    return n;
  }
  search(t, e) {
    const r = [];
    this.params = {};
    let n = [this];
    const a = Tt(e);
    for (let o = 0, c = a.length; o < c; o++) {
      const d = a[o], u = o === c - 1, p = [];
      for (let b = 0, O = n.length; b < O; b++) {
        const E = n[b], A = E.children[d];
        A && (A.params = E.params, u === !0 ? (A.children["*"] && r.push(...this.gHSets(A.children["*"], t, E.params, {})), r.push(...this.gHSets(A, t, E.params, {}))) : p.push(A));
        for (let I = 0, L = E.patterns.length; I < L; I++) {
          const ee = E.patterns[I], H = { ...E.params };
          if (ee === "*") {
            const et = E.children["*"];
            et && (r.push(...this.gHSets(et, t, E.params, {})), p.push(et));
            continue;
          }
          if (d === "")
            continue;
          const [Ie, je, fe] = ee, ae = E.children[Ie], ht = a.slice(o).join("/");
          if (fe instanceof RegExp && fe.test(ht)) {
            H[je] = ht, r.push(...this.gHSets(ae, t, E.params, H));
            continue;
          }
          (fe === !0 || fe instanceof RegExp && fe.test(d)) && typeof Ie == "string" && (H[je] = d, u === !0 ? (r.push(...this.gHSets(ae, t, H, E.params)), ae.children["*"] && r.push(...this.gHSets(ae.children["*"], t, H, E.params))) : (ae.params = H, p.push(ae)));
        }
      }
      n = p;
    }
    return [r.sort((o, c) => o.score - c.score).map(({ handler: o, params: c }) => [o, c])];
  }
}, Rr = class {
  constructor() {
    this.name = "TrieRouter", this.node = new Mt();
  }
  add(t, e, r) {
    const s = Rt(e);
    if (s) {
      for (const n of s)
        this.node.insert(t, n, r);
      return;
    }
    this.node.insert(t, e, r);
  }
  match(t, e) {
    return this.node.search(t, e);
  }
}, Sr = class extends gr {
  constructor(t = {}) {
    super(t), this.router = t.router ?? new Er({
      routers: [new Tr(), new Rr()]
    });
  }
};
const he = new Sr();
he.onError((t, e) => (console.error(t.stack), e.text(t.stack ?? "Application error", 500, {
  "Content-Type": "text/plain"
})));
he.use("/__/*", async ({ req: t, env: e }) => {
  const r = new URL(t.url), s = `https://${e.GOOGLE_CLOUD_PROJECT}.web.app`;
  return await fetch(`${s}${r.pathname}${r.search}`, t.raw);
});
var Cr = /^[\w!#$%&'*.^`|~+-]+$/, Or = /^[ !#-:<-[\]-~]*$/, gt = (t, e) => t.trim().split(";").reduce((s, n) => {
  n = n.trim();
  const a = n.indexOf("=");
  if (a === -1)
    return s;
  const i = n.substring(0, a).trim();
  if (e && e !== i || !Cr.test(i))
    return s;
  let o = n.substring(a + 1).trim();
  return o.startsWith('"') && o.endsWith('"') && (o = o.slice(1, -1)), Or.test(o) && (s[i] = ze(o)), s;
}, {}), Nr = (t, e) => {
  const r = t.req.raw.headers.get("Cookie");
  return typeof e == "string" ? r ? gt(r, e)[e] : void 0 : r ? gt(r) : {};
}, Zr = (t, e) => new Response(t, {
  headers: {
    "Content-Type": e
  }
}).formData(), Ar = (t, e) => async (r, s) => {
  let n = {};
  const a = r.req.header("Content-Type");
  switch (t) {
    case "json":
      if (!a || !a.startsWith("application/json")) {
        const o = `Invalid HTTP header: Content-Type=${a}`;
        throw new Le(400, { message: o });
      }
      try {
        const o = r.req.bodyCache.arrayBuffer ?? await r.req.raw.arrayBuffer();
        n = await new Response(o).json(), r.req.bodyCache.json = n, r.req.bodyCache.arrayBuffer = o;
      } catch {
        const o = "Malformed JSON in request body";
        throw new Le(400, { message: o });
      }
      break;
    case "form": {
      try {
        const o = r.req.header("Content-Type");
        if (o) {
          const c = r.req.bodyCache.arrayBuffer ?? await r.req.raw.arrayBuffer(), d = await Zr(c, o), u = {};
          d.forEach((p, b) => {
            u[b] = p;
          }), n = u, r.req.bodyCache.formData = d, r.req.bodyCache.arrayBuffer = c;
        }
      } catch (o) {
        let c = "Malformed FormData request.";
        throw c += o instanceof Error ? ` ${o.message}` : ` ${String(o)}`, new Le(400, { message: c });
      }
      break;
    }
    case "query":
      n = Object.fromEntries(
        Object.entries(r.req.queries()).map(([o, c]) => c.length === 1 ? [o, c[0]] : [o, c])
      );
      break;
    case "param":
      n = r.req.param();
      break;
    case "header":
      n = r.req.header();
      break;
    case "cookie":
      n = Nr(r);
      break;
  }
  const i = await e(n, r);
  if (i instanceof Response)
    return i;
  r.req.addValidatedData(t, i), await s();
};
const Ir = (t, e, r) => Ar(t, async (s, n) => {
  const a = await e.safeParseAsync(s);
  if (r) {
    const o = r({ data: s, ...a }, n);
    if (o) {
      if (o instanceof Response || o instanceof Promise)
        return o;
      if ("response" in o)
        return o.response;
    }
  }
  return a.success ? a.data : n.json(a, 400);
});
var w;
(function(t) {
  t.assertEqual = (n) => n;
  function e(n) {
  }
  t.assertIs = e;
  function r(n) {
    throw new Error();
  }
  t.assertNever = r, t.arrayToEnum = (n) => {
    const a = {};
    for (const i of n)
      a[i] = i;
    return a;
  }, t.getValidEnumValues = (n) => {
    const a = t.objectKeys(n).filter((o) => typeof n[n[o]] != "number"), i = {};
    for (const o of a)
      i[o] = n[o];
    return t.objectValues(i);
  }, t.objectValues = (n) => t.objectKeys(n).map(function(a) {
    return n[a];
  }), t.objectKeys = typeof Object.keys == "function" ? (n) => Object.keys(n) : (n) => {
    const a = [];
    for (const i in n)
      Object.prototype.hasOwnProperty.call(n, i) && a.push(i);
    return a;
  }, t.find = (n, a) => {
    for (const i of n)
      if (a(i))
        return i;
  }, t.isInteger = typeof Number.isInteger == "function" ? (n) => Number.isInteger(n) : (n) => typeof n == "number" && isFinite(n) && Math.floor(n) === n;
  function s(n, a = " | ") {
    return n.map((i) => typeof i == "string" ? `'${i}'` : i).join(a);
  }
  t.joinValues = s, t.jsonStringifyReplacer = (n, a) => typeof a == "bigint" ? a.toString() : a;
})(w || (w = {}));
var ct;
(function(t) {
  t.mergeShapes = (e, r) => ({
    ...e,
    ...r
    // second overwrites first
  });
})(ct || (ct = {}));
const h = w.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]), K = (t) => {
  switch (typeof t) {
    case "undefined":
      return h.undefined;
    case "string":
      return h.string;
    case "number":
      return isNaN(t) ? h.nan : h.number;
    case "boolean":
      return h.boolean;
    case "function":
      return h.function;
    case "bigint":
      return h.bigint;
    case "symbol":
      return h.symbol;
    case "object":
      return Array.isArray(t) ? h.array : t === null ? h.null : t.then && typeof t.then == "function" && t.catch && typeof t.catch == "function" ? h.promise : typeof Map < "u" && t instanceof Map ? h.map : typeof Set < "u" && t instanceof Set ? h.set : typeof Date < "u" && t instanceof Date ? h.date : h.object;
    default:
      return h.unknown;
  }
}, l = w.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]), jr = (t) => JSON.stringify(t, null, 2).replace(/"([^"]+)":/g, "$1:");
class $ extends Error {
  constructor(e) {
    super(), this.issues = [], this.addIssue = (s) => {
      this.issues = [...this.issues, s];
    }, this.addIssues = (s = []) => {
      this.issues = [...this.issues, ...s];
    };
    const r = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, r) : this.__proto__ = r, this.name = "ZodError", this.issues = e;
  }
  get errors() {
    return this.issues;
  }
  format(e) {
    const r = e || function(a) {
      return a.message;
    }, s = { _errors: [] }, n = (a) => {
      for (const i of a.issues)
        if (i.code === "invalid_union")
          i.unionErrors.map(n);
        else if (i.code === "invalid_return_type")
          n(i.returnTypeError);
        else if (i.code === "invalid_arguments")
          n(i.argumentsError);
        else if (i.path.length === 0)
          s._errors.push(r(i));
        else {
          let o = s, c = 0;
          for (; c < i.path.length; ) {
            const d = i.path[c];
            c === i.path.length - 1 ? (o[d] = o[d] || { _errors: [] }, o[d]._errors.push(r(i))) : o[d] = o[d] || { _errors: [] }, o = o[d], c++;
          }
        }
    };
    return n(this), s;
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, w.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (r) => r.message) {
    const r = {}, s = [];
    for (const n of this.issues)
      n.path.length > 0 ? (r[n.path[0]] = r[n.path[0]] || [], r[n.path[0]].push(e(n))) : s.push(e(n));
    return { formErrors: s, fieldErrors: r };
  }
  get formErrors() {
    return this.flatten();
  }
}
$.create = (t) => new $(t);
const xe = (t, e) => {
  let r;
  switch (t.code) {
    case l.invalid_type:
      t.received === h.undefined ? r = "Required" : r = `Expected ${t.expected}, received ${t.received}`;
      break;
    case l.invalid_literal:
      r = `Invalid literal value, expected ${JSON.stringify(t.expected, w.jsonStringifyReplacer)}`;
      break;
    case l.unrecognized_keys:
      r = `Unrecognized key(s) in object: ${w.joinValues(t.keys, ", ")}`;
      break;
    case l.invalid_union:
      r = "Invalid input";
      break;
    case l.invalid_union_discriminator:
      r = `Invalid discriminator value. Expected ${w.joinValues(t.options)}`;
      break;
    case l.invalid_enum_value:
      r = `Invalid enum value. Expected ${w.joinValues(t.options)}, received '${t.received}'`;
      break;
    case l.invalid_arguments:
      r = "Invalid function arguments";
      break;
    case l.invalid_return_type:
      r = "Invalid function return type";
      break;
    case l.invalid_date:
      r = "Invalid date";
      break;
    case l.invalid_string:
      typeof t.validation == "object" ? "includes" in t.validation ? (r = `Invalid input: must include "${t.validation.includes}"`, typeof t.validation.position == "number" && (r = `${r} at one or more positions greater than or equal to ${t.validation.position}`)) : "startsWith" in t.validation ? r = `Invalid input: must start with "${t.validation.startsWith}"` : "endsWith" in t.validation ? r = `Invalid input: must end with "${t.validation.endsWith}"` : w.assertNever(t.validation) : t.validation !== "regex" ? r = `Invalid ${t.validation}` : r = "Invalid";
      break;
    case l.too_small:
      t.type === "array" ? r = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "more than"} ${t.minimum} element(s)` : t.type === "string" ? r = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "over"} ${t.minimum} character(s)` : t.type === "number" ? r = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "date" ? r = `Date must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(t.minimum))}` : r = "Invalid input";
      break;
    case l.too_big:
      t.type === "array" ? r = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "less than"} ${t.maximum} element(s)` : t.type === "string" ? r = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "under"} ${t.maximum} character(s)` : t.type === "number" ? r = `Number must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "bigint" ? r = `BigInt must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "date" ? r = `Date must be ${t.exact ? "exactly" : t.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(t.maximum))}` : r = "Invalid input";
      break;
    case l.custom:
      r = "Invalid input";
      break;
    case l.invalid_intersection_types:
      r = "Intersection results could not be merged";
      break;
    case l.not_multiple_of:
      r = `Number must be a multiple of ${t.multipleOf}`;
      break;
    case l.not_finite:
      r = "Number must be finite";
      break;
    default:
      r = e.defaultError, w.assertNever(t);
  }
  return { message: r };
};
let Dt = xe;
function Pr(t) {
  Dt = t;
}
function He() {
  return Dt;
}
const qe = (t) => {
  const { data: e, path: r, errorMaps: s, issueData: n } = t, a = [...r, ...n.path || []], i = {
    ...n,
    path: a
  };
  let o = "";
  const c = s.filter((d) => !!d).slice().reverse();
  for (const d of c)
    o = d(i, { data: e, defaultError: o }).message;
  return {
    ...n,
    path: a,
    message: n.message || o
  };
}, $r = [];
function f(t, e) {
  const r = qe({
    issueData: e,
    data: t.data,
    path: t.path,
    errorMaps: [
      t.common.contextualErrorMap,
      t.schemaErrorMap,
      He(),
      xe
      // then global default map
    ].filter((s) => !!s)
  });
  t.common.issues.push(r);
}
class N {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(e, r) {
    const s = [];
    for (const n of r) {
      if (n.status === "aborted")
        return g;
      n.status === "dirty" && e.dirty(), s.push(n.value);
    }
    return { status: e.value, value: s };
  }
  static async mergeObjectAsync(e, r) {
    const s = [];
    for (const n of r)
      s.push({
        key: await n.key,
        value: await n.value
      });
    return N.mergeObjectSync(e, s);
  }
  static mergeObjectSync(e, r) {
    const s = {};
    for (const n of r) {
      const { key: a, value: i } = n;
      if (a.status === "aborted" || i.status === "aborted")
        return g;
      a.status === "dirty" && e.dirty(), i.status === "dirty" && e.dirty(), a.value !== "__proto__" && (typeof i.value < "u" || n.alwaysSet) && (s[a.value] = i.value);
    }
    return { status: e.value, value: s };
  }
}
const g = Object.freeze({
  status: "aborted"
}), Lt = (t) => ({ status: "dirty", value: t }), Z = (t) => ({ status: "valid", value: t }), dt = (t) => t.status === "aborted", ut = (t) => t.status === "dirty", we = (t) => t.status === "valid", We = (t) => typeof Promise < "u" && t instanceof Promise;
var m;
(function(t) {
  t.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, t.toString = (e) => typeof e == "string" ? e : e == null ? void 0 : e.message;
})(m || (m = {}));
class z {
  constructor(e, r, s, n) {
    this._cachedPath = [], this.parent = e, this.data = r, this._path = s, this._key = n;
  }
  get path() {
    return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const _t = (t, e) => {
  if (we(e))
    return { success: !0, data: e.value };
  if (!t.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const r = new $(t.common.issues);
      return this._error = r, this._error;
    }
  };
};
function _(t) {
  if (!t)
    return {};
  const { errorMap: e, invalid_type_error: r, required_error: s, description: n } = t;
  if (e && (r || s))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: n } : { errorMap: (i, o) => i.code !== "invalid_type" ? { message: o.defaultError } : typeof o.data > "u" ? { message: s ?? o.defaultError } : { message: r ?? o.defaultError }, description: n };
}
class x {
  constructor(e) {
    this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this);
  }
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return K(e.data);
  }
  _getOrReturnCtx(e, r) {
    return r || {
      common: e.parent.common,
      data: e.data,
      parsedType: K(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new N(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: K(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const r = this._parse(e);
    if (We(r))
      throw new Error("Synchronous parse encountered promise.");
    return r;
  }
  _parseAsync(e) {
    const r = this._parse(e);
    return Promise.resolve(r);
  }
  parse(e, r) {
    const s = this.safeParse(e, r);
    if (s.success)
      return s.data;
    throw s.error;
  }
  safeParse(e, r) {
    var s;
    const n = {
      common: {
        issues: [],
        async: (s = r == null ? void 0 : r.async) !== null && s !== void 0 ? s : !1,
        contextualErrorMap: r == null ? void 0 : r.errorMap
      },
      path: (r == null ? void 0 : r.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: K(e)
    }, a = this._parseSync({ data: e, path: n.path, parent: n });
    return _t(n, a);
  }
  async parseAsync(e, r) {
    const s = await this.safeParseAsync(e, r);
    if (s.success)
      return s.data;
    throw s.error;
  }
  async safeParseAsync(e, r) {
    const s = {
      common: {
        issues: [],
        contextualErrorMap: r == null ? void 0 : r.errorMap,
        async: !0
      },
      path: (r == null ? void 0 : r.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: K(e)
    }, n = this._parse({ data: e, path: s.path, parent: s }), a = await (We(n) ? n : Promise.resolve(n));
    return _t(s, a);
  }
  refine(e, r) {
    const s = (n) => typeof r == "string" || typeof r > "u" ? { message: r } : typeof r == "function" ? r(n) : r;
    return this._refinement((n, a) => {
      const i = e(n), o = () => a.addIssue({
        code: l.custom,
        ...s(n)
      });
      return typeof Promise < "u" && i instanceof Promise ? i.then((c) => c ? !0 : (o(), !1)) : i ? !0 : (o(), !1);
    });
  }
  refinement(e, r) {
    return this._refinement((s, n) => e(s) ? !0 : (n.addIssue(typeof r == "function" ? r(s, n) : r), !1));
  }
  _refinement(e) {
    return new D({
      schema: this,
      typeName: y.ZodEffects,
      effect: { type: "refinement", refinement: e }
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  optional() {
    return W.create(this, this._def);
  }
  nullable() {
    return ne.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return M.create(this, this._def);
  }
  promise() {
    return le.create(this, this._def);
  }
  or(e) {
    return Ee.create([this, e], this._def);
  }
  and(e) {
    return Re.create(this, e, this._def);
  }
  transform(e) {
    return new D({
      ..._(this._def),
      schema: this,
      typeName: y.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const r = typeof e == "function" ? e : () => e;
    return new Ze({
      ..._(this._def),
      innerType: this,
      defaultValue: r,
      typeName: y.ZodDefault
    });
  }
  brand() {
    return new Bt({
      typeName: y.ZodBranded,
      type: this,
      ..._(this._def)
    });
  }
  catch(e) {
    const r = typeof e == "function" ? e : () => e;
    return new Ke({
      ..._(this._def),
      innerType: this,
      catchValue: r,
      typeName: y.ZodCatch
    });
  }
  describe(e) {
    const r = this.constructor;
    return new r({
      ...this._def,
      description: e
    });
  }
  pipe(e) {
    return Ae.create(this, e);
  }
  readonly() {
    return Xe.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const Mr = /^c[^\s-]{8,}$/i, Dr = /^[a-z][a-z0-9]*$/, Lr = /^[0-9A-HJKMNP-TV-Z]{26}$/, Vr = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, Br = /^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, zr = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let nt;
const Ur = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/, Hr = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/, qr = (t) => t.precision ? t.offset ? new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${t.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`) : new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${t.precision}}Z$`) : t.precision === 0 ? t.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$") : t.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$");
function Wr(t, e) {
  return !!((e === "v4" || !e) && Ur.test(t) || (e === "v6" || !e) && Hr.test(t));
}
class P extends x {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== h.string) {
      const a = this._getOrReturnCtx(e);
      return f(
        a,
        {
          code: l.invalid_type,
          expected: h.string,
          received: a.parsedType
        }
        //
      ), g;
    }
    const s = new N();
    let n;
    for (const a of this._def.checks)
      if (a.kind === "min")
        e.data.length < a.value && (n = this._getOrReturnCtx(e, n), f(n, {
          code: l.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), s.dirty());
      else if (a.kind === "max")
        e.data.length > a.value && (n = this._getOrReturnCtx(e, n), f(n, {
          code: l.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), s.dirty());
      else if (a.kind === "length") {
        const i = e.data.length > a.value, o = e.data.length < a.value;
        (i || o) && (n = this._getOrReturnCtx(e, n), i ? f(n, {
          code: l.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }) : o && f(n, {
          code: l.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }), s.dirty());
      } else if (a.kind === "email")
        Br.test(e.data) || (n = this._getOrReturnCtx(e, n), f(n, {
          validation: "email",
          code: l.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "emoji")
        nt || (nt = new RegExp(zr, "u")), nt.test(e.data) || (n = this._getOrReturnCtx(e, n), f(n, {
          validation: "emoji",
          code: l.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "uuid")
        Vr.test(e.data) || (n = this._getOrReturnCtx(e, n), f(n, {
          validation: "uuid",
          code: l.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "cuid")
        Mr.test(e.data) || (n = this._getOrReturnCtx(e, n), f(n, {
          validation: "cuid",
          code: l.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "cuid2")
        Dr.test(e.data) || (n = this._getOrReturnCtx(e, n), f(n, {
          validation: "cuid2",
          code: l.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "ulid")
        Lr.test(e.data) || (n = this._getOrReturnCtx(e, n), f(n, {
          validation: "ulid",
          code: l.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "url")
        try {
          new URL(e.data);
        } catch {
          n = this._getOrReturnCtx(e, n), f(n, {
            validation: "url",
            code: l.invalid_string,
            message: a.message
          }), s.dirty();
        }
      else
        a.kind === "regex" ? (a.regex.lastIndex = 0, a.regex.test(e.data) || (n = this._getOrReturnCtx(e, n), f(n, {
          validation: "regex",
          code: l.invalid_string,
          message: a.message
        }), s.dirty())) : a.kind === "trim" ? e.data = e.data.trim() : a.kind === "includes" ? e.data.includes(a.value, a.position) || (n = this._getOrReturnCtx(e, n), f(n, {
          code: l.invalid_string,
          validation: { includes: a.value, position: a.position },
          message: a.message
        }), s.dirty()) : a.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : a.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : a.kind === "startsWith" ? e.data.startsWith(a.value) || (n = this._getOrReturnCtx(e, n), f(n, {
          code: l.invalid_string,
          validation: { startsWith: a.value },
          message: a.message
        }), s.dirty()) : a.kind === "endsWith" ? e.data.endsWith(a.value) || (n = this._getOrReturnCtx(e, n), f(n, {
          code: l.invalid_string,
          validation: { endsWith: a.value },
          message: a.message
        }), s.dirty()) : a.kind === "datetime" ? qr(a).test(e.data) || (n = this._getOrReturnCtx(e, n), f(n, {
          code: l.invalid_string,
          validation: "datetime",
          message: a.message
        }), s.dirty()) : a.kind === "ip" ? Wr(e.data, a.version) || (n = this._getOrReturnCtx(e, n), f(n, {
          validation: "ip",
          code: l.invalid_string,
          message: a.message
        }), s.dirty()) : w.assertNever(a);
    return { status: s.value, value: e.data };
  }
  _regex(e, r, s) {
    return this.refinement((n) => e.test(n), {
      validation: r,
      code: l.invalid_string,
      ...m.errToObj(s)
    });
  }
  _addCheck(e) {
    return new P({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...m.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...m.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...m.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...m.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...m.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...m.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...m.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...m.errToObj(e) });
  }
  datetime(e) {
    var r;
    return typeof e == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      message: e
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
      offset: (r = e == null ? void 0 : e.offset) !== null && r !== void 0 ? r : !1,
      ...m.errToObj(e == null ? void 0 : e.message)
    });
  }
  regex(e, r) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...m.errToObj(r)
    });
  }
  includes(e, r) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: r == null ? void 0 : r.position,
      ...m.errToObj(r == null ? void 0 : r.message)
    });
  }
  startsWith(e, r) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...m.errToObj(r)
    });
  }
  endsWith(e, r) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...m.errToObj(r)
    });
  }
  min(e, r) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...m.errToObj(r)
    });
  }
  max(e, r) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...m.errToObj(r)
    });
  }
  length(e, r) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...m.errToObj(r)
    });
  }
  /**
   * @deprecated Use z.string().min(1) instead.
   * @see {@link ZodString.min}
   */
  nonempty(e) {
    return this.min(1, m.errToObj(e));
  }
  trim() {
    return new P({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new P({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new P({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((e) => e.kind === "datetime");
  }
  get isEmail() {
    return !!this._def.checks.find((e) => e.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((e) => e.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((e) => e.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((e) => e.kind === "uuid");
  }
  get isCUID() {
    return !!this._def.checks.find((e) => e.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((e) => e.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((e) => e.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((e) => e.kind === "ip");
  }
  get minLength() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "min" && (e === null || r.value > e) && (e = r.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    return e;
  }
}
P.create = (t) => {
  var e;
  return new P({
    checks: [],
    typeName: y.ZodString,
    coerce: (e = t == null ? void 0 : t.coerce) !== null && e !== void 0 ? e : !1,
    ..._(t)
  });
};
function Fr(t, e) {
  const r = (t.toString().split(".")[1] || "").length, s = (e.toString().split(".")[1] || "").length, n = r > s ? r : s, a = parseInt(t.toFixed(n).replace(".", "")), i = parseInt(e.toFixed(n).replace(".", ""));
  return a % i / Math.pow(10, n);
}
class Y extends x {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== h.number) {
      const a = this._getOrReturnCtx(e);
      return f(a, {
        code: l.invalid_type,
        expected: h.number,
        received: a.parsedType
      }), g;
    }
    let s;
    const n = new N();
    for (const a of this._def.checks)
      a.kind === "int" ? w.isInteger(e.data) || (s = this._getOrReturnCtx(e, s), f(s, {
        code: l.invalid_type,
        expected: "integer",
        received: "float",
        message: a.message
      }), n.dirty()) : a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (s = this._getOrReturnCtx(e, s), f(s, {
        code: l.too_small,
        minimum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), n.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (s = this._getOrReturnCtx(e, s), f(s, {
        code: l.too_big,
        maximum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), n.dirty()) : a.kind === "multipleOf" ? Fr(e.data, a.value) !== 0 && (s = this._getOrReturnCtx(e, s), f(s, {
        code: l.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), n.dirty()) : a.kind === "finite" ? Number.isFinite(e.data) || (s = this._getOrReturnCtx(e, s), f(s, {
        code: l.not_finite,
        message: a.message
      }), n.dirty()) : w.assertNever(a);
    return { status: n.value, value: e.data };
  }
  gte(e, r) {
    return this.setLimit("min", e, !0, m.toString(r));
  }
  gt(e, r) {
    return this.setLimit("min", e, !1, m.toString(r));
  }
  lte(e, r) {
    return this.setLimit("max", e, !0, m.toString(r));
  }
  lt(e, r) {
    return this.setLimit("max", e, !1, m.toString(r));
  }
  setLimit(e, r, s, n) {
    return new Y({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: r,
          inclusive: s,
          message: m.toString(n)
        }
      ]
    });
  }
  _addCheck(e) {
    return new Y({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: m.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: m.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: m.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: m.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: m.toString(e)
    });
  }
  multipleOf(e, r) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: m.toString(r)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: m.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: m.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: m.toString(e)
    });
  }
  get minValue() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "min" && (e === null || r.value > e) && (e = r.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && w.isInteger(e.value));
  }
  get isFinite() {
    let e = null, r = null;
    for (const s of this._def.checks) {
      if (s.kind === "finite" || s.kind === "int" || s.kind === "multipleOf")
        return !0;
      s.kind === "min" ? (r === null || s.value > r) && (r = s.value) : s.kind === "max" && (e === null || s.value < e) && (e = s.value);
    }
    return Number.isFinite(r) && Number.isFinite(e);
  }
}
Y.create = (t) => new Y({
  checks: [],
  typeName: y.ZodNumber,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ..._(t)
});
class X extends x {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = BigInt(e.data)), this._getType(e) !== h.bigint) {
      const a = this._getOrReturnCtx(e);
      return f(a, {
        code: l.invalid_type,
        expected: h.bigint,
        received: a.parsedType
      }), g;
    }
    let s;
    const n = new N();
    for (const a of this._def.checks)
      a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (s = this._getOrReturnCtx(e, s), f(s, {
        code: l.too_small,
        type: "bigint",
        minimum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), n.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (s = this._getOrReturnCtx(e, s), f(s, {
        code: l.too_big,
        type: "bigint",
        maximum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), n.dirty()) : a.kind === "multipleOf" ? e.data % a.value !== BigInt(0) && (s = this._getOrReturnCtx(e, s), f(s, {
        code: l.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), n.dirty()) : w.assertNever(a);
    return { status: n.value, value: e.data };
  }
  gte(e, r) {
    return this.setLimit("min", e, !0, m.toString(r));
  }
  gt(e, r) {
    return this.setLimit("min", e, !1, m.toString(r));
  }
  lte(e, r) {
    return this.setLimit("max", e, !0, m.toString(r));
  }
  lt(e, r) {
    return this.setLimit("max", e, !1, m.toString(r));
  }
  setLimit(e, r, s, n) {
    return new X({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: r,
          inclusive: s,
          message: m.toString(n)
        }
      ]
    });
  }
  _addCheck(e) {
    return new X({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: m.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: m.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: m.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: m.toString(e)
    });
  }
  multipleOf(e, r) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: m.toString(r)
    });
  }
  get minValue() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "min" && (e === null || r.value > e) && (e = r.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    return e;
  }
}
X.create = (t) => {
  var e;
  return new X({
    checks: [],
    typeName: y.ZodBigInt,
    coerce: (e = t == null ? void 0 : t.coerce) !== null && e !== void 0 ? e : !1,
    ..._(t)
  });
};
class be extends x {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== h.boolean) {
      const s = this._getOrReturnCtx(e);
      return f(s, {
        code: l.invalid_type,
        expected: h.boolean,
        received: s.parsedType
      }), g;
    }
    return Z(e.data);
  }
}
be.create = (t) => new be({
  typeName: y.ZodBoolean,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ..._(t)
});
class re extends x {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== h.date) {
      const a = this._getOrReturnCtx(e);
      return f(a, {
        code: l.invalid_type,
        expected: h.date,
        received: a.parsedType
      }), g;
    }
    if (isNaN(e.data.getTime())) {
      const a = this._getOrReturnCtx(e);
      return f(a, {
        code: l.invalid_date
      }), g;
    }
    const s = new N();
    let n;
    for (const a of this._def.checks)
      a.kind === "min" ? e.data.getTime() < a.value && (n = this._getOrReturnCtx(e, n), f(n, {
        code: l.too_small,
        message: a.message,
        inclusive: !0,
        exact: !1,
        minimum: a.value,
        type: "date"
      }), s.dirty()) : a.kind === "max" ? e.data.getTime() > a.value && (n = this._getOrReturnCtx(e, n), f(n, {
        code: l.too_big,
        message: a.message,
        inclusive: !0,
        exact: !1,
        maximum: a.value,
        type: "date"
      }), s.dirty()) : w.assertNever(a);
    return {
      status: s.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new re({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, r) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: m.toString(r)
    });
  }
  max(e, r) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: m.toString(r)
    });
  }
  get minDate() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "min" && (e === null || r.value > e) && (e = r.value);
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    return e != null ? new Date(e) : null;
  }
}
re.create = (t) => new re({
  checks: [],
  coerce: (t == null ? void 0 : t.coerce) || !1,
  typeName: y.ZodDate,
  ..._(t)
});
class Fe extends x {
  _parse(e) {
    if (this._getType(e) !== h.symbol) {
      const s = this._getOrReturnCtx(e);
      return f(s, {
        code: l.invalid_type,
        expected: h.symbol,
        received: s.parsedType
      }), g;
    }
    return Z(e.data);
  }
}
Fe.create = (t) => new Fe({
  typeName: y.ZodSymbol,
  ..._(t)
});
class ke extends x {
  _parse(e) {
    if (this._getType(e) !== h.undefined) {
      const s = this._getOrReturnCtx(e);
      return f(s, {
        code: l.invalid_type,
        expected: h.undefined,
        received: s.parsedType
      }), g;
    }
    return Z(e.data);
  }
}
ke.create = (t) => new ke({
  typeName: y.ZodUndefined,
  ..._(t)
});
class Te extends x {
  _parse(e) {
    if (this._getType(e) !== h.null) {
      const s = this._getOrReturnCtx(e);
      return f(s, {
        code: l.invalid_type,
        expected: h.null,
        received: s.parsedType
      }), g;
    }
    return Z(e.data);
  }
}
Te.create = (t) => new Te({
  typeName: y.ZodNull,
  ..._(t)
});
class ue extends x {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return Z(e.data);
  }
}
ue.create = (t) => new ue({
  typeName: y.ZodAny,
  ..._(t)
});
class te extends x {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return Z(e.data);
  }
}
te.create = (t) => new te({
  typeName: y.ZodUnknown,
  ..._(t)
});
class F extends x {
  _parse(e) {
    const r = this._getOrReturnCtx(e);
    return f(r, {
      code: l.invalid_type,
      expected: h.never,
      received: r.parsedType
    }), g;
  }
}
F.create = (t) => new F({
  typeName: y.ZodNever,
  ..._(t)
});
class Ge extends x {
  _parse(e) {
    if (this._getType(e) !== h.undefined) {
      const s = this._getOrReturnCtx(e);
      return f(s, {
        code: l.invalid_type,
        expected: h.void,
        received: s.parsedType
      }), g;
    }
    return Z(e.data);
  }
}
Ge.create = (t) => new Ge({
  typeName: y.ZodVoid,
  ..._(t)
});
class M extends x {
  _parse(e) {
    const { ctx: r, status: s } = this._processInputParams(e), n = this._def;
    if (r.parsedType !== h.array)
      return f(r, {
        code: l.invalid_type,
        expected: h.array,
        received: r.parsedType
      }), g;
    if (n.exactLength !== null) {
      const i = r.data.length > n.exactLength.value, o = r.data.length < n.exactLength.value;
      (i || o) && (f(r, {
        code: i ? l.too_big : l.too_small,
        minimum: o ? n.exactLength.value : void 0,
        maximum: i ? n.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: n.exactLength.message
      }), s.dirty());
    }
    if (n.minLength !== null && r.data.length < n.minLength.value && (f(r, {
      code: l.too_small,
      minimum: n.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: n.minLength.message
    }), s.dirty()), n.maxLength !== null && r.data.length > n.maxLength.value && (f(r, {
      code: l.too_big,
      maximum: n.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: n.maxLength.message
    }), s.dirty()), r.common.async)
      return Promise.all([...r.data].map((i, o) => n.type._parseAsync(new z(r, i, r.path, o)))).then((i) => N.mergeArray(s, i));
    const a = [...r.data].map((i, o) => n.type._parseSync(new z(r, i, r.path, o)));
    return N.mergeArray(s, a);
  }
  get element() {
    return this._def.type;
  }
  min(e, r) {
    return new M({
      ...this._def,
      minLength: { value: e, message: m.toString(r) }
    });
  }
  max(e, r) {
    return new M({
      ...this._def,
      maxLength: { value: e, message: m.toString(r) }
    });
  }
  length(e, r) {
    return new M({
      ...this._def,
      exactLength: { value: e, message: m.toString(r) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
M.create = (t, e) => new M({
  type: t,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: y.ZodArray,
  ..._(e)
});
function ce(t) {
  if (t instanceof T) {
    const e = {};
    for (const r in t.shape) {
      const s = t.shape[r];
      e[r] = W.create(ce(s));
    }
    return new T({
      ...t._def,
      shape: () => e
    });
  } else
    return t instanceof M ? new M({
      ...t._def,
      type: ce(t.element)
    }) : t instanceof W ? W.create(ce(t.unwrap())) : t instanceof ne ? ne.create(ce(t.unwrap())) : t instanceof U ? U.create(t.items.map((e) => ce(e))) : t;
}
class T extends x {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), r = w.objectKeys(e);
    return this._cached = { shape: e, keys: r };
  }
  _parse(e) {
    if (this._getType(e) !== h.object) {
      const d = this._getOrReturnCtx(e);
      return f(d, {
        code: l.invalid_type,
        expected: h.object,
        received: d.parsedType
      }), g;
    }
    const { status: s, ctx: n } = this._processInputParams(e), { shape: a, keys: i } = this._getCached(), o = [];
    if (!(this._def.catchall instanceof F && this._def.unknownKeys === "strip"))
      for (const d in n.data)
        i.includes(d) || o.push(d);
    const c = [];
    for (const d of i) {
      const u = a[d], p = n.data[d];
      c.push({
        key: { status: "valid", value: d },
        value: u._parse(new z(n, p, n.path, d)),
        alwaysSet: d in n.data
      });
    }
    if (this._def.catchall instanceof F) {
      const d = this._def.unknownKeys;
      if (d === "passthrough")
        for (const u of o)
          c.push({
            key: { status: "valid", value: u },
            value: { status: "valid", value: n.data[u] }
          });
      else if (d === "strict")
        o.length > 0 && (f(n, {
          code: l.unrecognized_keys,
          keys: o
        }), s.dirty());
      else if (d !== "strip")
        throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const d = this._def.catchall;
      for (const u of o) {
        const p = n.data[u];
        c.push({
          key: { status: "valid", value: u },
          value: d._parse(
            new z(n, p, n.path, u)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: u in n.data
        });
      }
    }
    return n.common.async ? Promise.resolve().then(async () => {
      const d = [];
      for (const u of c) {
        const p = await u.key;
        d.push({
          key: p,
          value: await u.value,
          alwaysSet: u.alwaysSet
        });
      }
      return d;
    }).then((d) => N.mergeObjectSync(s, d)) : N.mergeObjectSync(s, c);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return m.errToObj, new T({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (r, s) => {
          var n, a, i, o;
          const c = (i = (a = (n = this._def).errorMap) === null || a === void 0 ? void 0 : a.call(n, r, s).message) !== null && i !== void 0 ? i : s.defaultError;
          return r.code === "unrecognized_keys" ? {
            message: (o = m.errToObj(e).message) !== null && o !== void 0 ? o : c
          } : {
            message: c
          };
        }
      } : {}
    });
  }
  strip() {
    return new T({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new T({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(e) {
    return new T({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...e
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(e) {
    return new T({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...e._def.shape()
      }),
      typeName: y.ZodObject
    });
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(e, r) {
    return this.augment({ [e]: r });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(e) {
    return new T({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const r = {};
    return w.objectKeys(e).forEach((s) => {
      e[s] && this.shape[s] && (r[s] = this.shape[s]);
    }), new T({
      ...this._def,
      shape: () => r
    });
  }
  omit(e) {
    const r = {};
    return w.objectKeys(this.shape).forEach((s) => {
      e[s] || (r[s] = this.shape[s]);
    }), new T({
      ...this._def,
      shape: () => r
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return ce(this);
  }
  partial(e) {
    const r = {};
    return w.objectKeys(this.shape).forEach((s) => {
      const n = this.shape[s];
      e && !e[s] ? r[s] = n : r[s] = n.optional();
    }), new T({
      ...this._def,
      shape: () => r
    });
  }
  required(e) {
    const r = {};
    return w.objectKeys(this.shape).forEach((s) => {
      if (e && !e[s])
        r[s] = this.shape[s];
      else {
        let a = this.shape[s];
        for (; a instanceof W; )
          a = a._def.innerType;
        r[s] = a;
      }
    }), new T({
      ...this._def,
      shape: () => r
    });
  }
  keyof() {
    return Vt(w.objectKeys(this.shape));
  }
}
T.create = (t, e) => new T({
  shape: () => t,
  unknownKeys: "strip",
  catchall: F.create(),
  typeName: y.ZodObject,
  ..._(e)
});
T.strictCreate = (t, e) => new T({
  shape: () => t,
  unknownKeys: "strict",
  catchall: F.create(),
  typeName: y.ZodObject,
  ..._(e)
});
T.lazycreate = (t, e) => new T({
  shape: t,
  unknownKeys: "strip",
  catchall: F.create(),
  typeName: y.ZodObject,
  ..._(e)
});
class Ee extends x {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e), s = this._def.options;
    function n(a) {
      for (const o of a)
        if (o.result.status === "valid")
          return o.result;
      for (const o of a)
        if (o.result.status === "dirty")
          return r.common.issues.push(...o.ctx.common.issues), o.result;
      const i = a.map((o) => new $(o.ctx.common.issues));
      return f(r, {
        code: l.invalid_union,
        unionErrors: i
      }), g;
    }
    if (r.common.async)
      return Promise.all(s.map(async (a) => {
        const i = {
          ...r,
          common: {
            ...r.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await a._parseAsync({
            data: r.data,
            path: r.path,
            parent: i
          }),
          ctx: i
        };
      })).then(n);
    {
      let a;
      const i = [];
      for (const c of s) {
        const d = {
          ...r,
          common: {
            ...r.common,
            issues: []
          },
          parent: null
        }, u = c._parseSync({
          data: r.data,
          path: r.path,
          parent: d
        });
        if (u.status === "valid")
          return u;
        u.status === "dirty" && !a && (a = { result: u, ctx: d }), d.common.issues.length && i.push(d.common.issues);
      }
      if (a)
        return r.common.issues.push(...a.ctx.common.issues), a.result;
      const o = i.map((c) => new $(c));
      return f(r, {
        code: l.invalid_union,
        unionErrors: o
      }), g;
    }
  }
  get options() {
    return this._def.options;
  }
}
Ee.create = (t, e) => new Ee({
  options: t,
  typeName: y.ZodUnion,
  ..._(e)
});
const Ve = (t) => t instanceof Ce ? Ve(t.schema) : t instanceof D ? Ve(t.innerType()) : t instanceof Oe ? [t.value] : t instanceof Q ? t.options : t instanceof Ne ? Object.keys(t.enum) : t instanceof Ze ? Ve(t._def.innerType) : t instanceof ke ? [void 0] : t instanceof Te ? [null] : null;
class Qe extends x {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    if (r.parsedType !== h.object)
      return f(r, {
        code: l.invalid_type,
        expected: h.object,
        received: r.parsedType
      }), g;
    const s = this.discriminator, n = r.data[s], a = this.optionsMap.get(n);
    return a ? r.common.async ? a._parseAsync({
      data: r.data,
      path: r.path,
      parent: r
    }) : a._parseSync({
      data: r.data,
      path: r.path,
      parent: r
    }) : (f(r, {
      code: l.invalid_union_discriminator,
      options: Array.from(this.optionsMap.keys()),
      path: [s]
    }), g);
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(e, r, s) {
    const n = /* @__PURE__ */ new Map();
    for (const a of r) {
      const i = Ve(a.shape[e]);
      if (!i)
        throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);
      for (const o of i) {
        if (n.has(o))
          throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(o)}`);
        n.set(o, a);
      }
    }
    return new Qe({
      typeName: y.ZodDiscriminatedUnion,
      discriminator: e,
      options: r,
      optionsMap: n,
      ..._(s)
    });
  }
}
function lt(t, e) {
  const r = K(t), s = K(e);
  if (t === e)
    return { valid: !0, data: t };
  if (r === h.object && s === h.object) {
    const n = w.objectKeys(e), a = w.objectKeys(t).filter((o) => n.indexOf(o) !== -1), i = { ...t, ...e };
    for (const o of a) {
      const c = lt(t[o], e[o]);
      if (!c.valid)
        return { valid: !1 };
      i[o] = c.data;
    }
    return { valid: !0, data: i };
  } else if (r === h.array && s === h.array) {
    if (t.length !== e.length)
      return { valid: !1 };
    const n = [];
    for (let a = 0; a < t.length; a++) {
      const i = t[a], o = e[a], c = lt(i, o);
      if (!c.valid)
        return { valid: !1 };
      n.push(c.data);
    }
    return { valid: !0, data: n };
  } else
    return r === h.date && s === h.date && +t == +e ? { valid: !0, data: t } : { valid: !1 };
}
class Re extends x {
  _parse(e) {
    const { status: r, ctx: s } = this._processInputParams(e), n = (a, i) => {
      if (dt(a) || dt(i))
        return g;
      const o = lt(a.value, i.value);
      return o.valid ? ((ut(a) || ut(i)) && r.dirty(), { status: r.value, value: o.data }) : (f(s, {
        code: l.invalid_intersection_types
      }), g);
    };
    return s.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: s.data,
        path: s.path,
        parent: s
      }),
      this._def.right._parseAsync({
        data: s.data,
        path: s.path,
        parent: s
      })
    ]).then(([a, i]) => n(a, i)) : n(this._def.left._parseSync({
      data: s.data,
      path: s.path,
      parent: s
    }), this._def.right._parseSync({
      data: s.data,
      path: s.path,
      parent: s
    }));
  }
}
Re.create = (t, e, r) => new Re({
  left: t,
  right: e,
  typeName: y.ZodIntersection,
  ..._(r)
});
class U extends x {
  _parse(e) {
    const { status: r, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== h.array)
      return f(s, {
        code: l.invalid_type,
        expected: h.array,
        received: s.parsedType
      }), g;
    if (s.data.length < this._def.items.length)
      return f(s, {
        code: l.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), g;
    !this._def.rest && s.data.length > this._def.items.length && (f(s, {
      code: l.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), r.dirty());
    const a = [...s.data].map((i, o) => {
      const c = this._def.items[o] || this._def.rest;
      return c ? c._parse(new z(s, i, s.path, o)) : null;
    }).filter((i) => !!i);
    return s.common.async ? Promise.all(a).then((i) => N.mergeArray(r, i)) : N.mergeArray(r, a);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new U({
      ...this._def,
      rest: e
    });
  }
}
U.create = (t, e) => {
  if (!Array.isArray(t))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new U({
    items: t,
    typeName: y.ZodTuple,
    rest: null,
    ..._(e)
  });
};
class Se extends x {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: r, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== h.object)
      return f(s, {
        code: l.invalid_type,
        expected: h.object,
        received: s.parsedType
      }), g;
    const n = [], a = this._def.keyType, i = this._def.valueType;
    for (const o in s.data)
      n.push({
        key: a._parse(new z(s, o, s.path, o)),
        value: i._parse(new z(s, s.data[o], s.path, o))
      });
    return s.common.async ? N.mergeObjectAsync(r, n) : N.mergeObjectSync(r, n);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, r, s) {
    return r instanceof x ? new Se({
      keyType: e,
      valueType: r,
      typeName: y.ZodRecord,
      ..._(s)
    }) : new Se({
      keyType: P.create(),
      valueType: e,
      typeName: y.ZodRecord,
      ..._(r)
    });
  }
}
class Je extends x {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: r, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== h.map)
      return f(s, {
        code: l.invalid_type,
        expected: h.map,
        received: s.parsedType
      }), g;
    const n = this._def.keyType, a = this._def.valueType, i = [...s.data.entries()].map(([o, c], d) => ({
      key: n._parse(new z(s, o, s.path, [d, "key"])),
      value: a._parse(new z(s, c, s.path, [d, "value"]))
    }));
    if (s.common.async) {
      const o = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const c of i) {
          const d = await c.key, u = await c.value;
          if (d.status === "aborted" || u.status === "aborted")
            return g;
          (d.status === "dirty" || u.status === "dirty") && r.dirty(), o.set(d.value, u.value);
        }
        return { status: r.value, value: o };
      });
    } else {
      const o = /* @__PURE__ */ new Map();
      for (const c of i) {
        const d = c.key, u = c.value;
        if (d.status === "aborted" || u.status === "aborted")
          return g;
        (d.status === "dirty" || u.status === "dirty") && r.dirty(), o.set(d.value, u.value);
      }
      return { status: r.value, value: o };
    }
  }
}
Je.create = (t, e, r) => new Je({
  valueType: e,
  keyType: t,
  typeName: y.ZodMap,
  ..._(r)
});
class se extends x {
  _parse(e) {
    const { status: r, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== h.set)
      return f(s, {
        code: l.invalid_type,
        expected: h.set,
        received: s.parsedType
      }), g;
    const n = this._def;
    n.minSize !== null && s.data.size < n.minSize.value && (f(s, {
      code: l.too_small,
      minimum: n.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: n.minSize.message
    }), r.dirty()), n.maxSize !== null && s.data.size > n.maxSize.value && (f(s, {
      code: l.too_big,
      maximum: n.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: n.maxSize.message
    }), r.dirty());
    const a = this._def.valueType;
    function i(c) {
      const d = /* @__PURE__ */ new Set();
      for (const u of c) {
        if (u.status === "aborted")
          return g;
        u.status === "dirty" && r.dirty(), d.add(u.value);
      }
      return { status: r.value, value: d };
    }
    const o = [...s.data.values()].map((c, d) => a._parse(new z(s, c, s.path, d)));
    return s.common.async ? Promise.all(o).then((c) => i(c)) : i(o);
  }
  min(e, r) {
    return new se({
      ...this._def,
      minSize: { value: e, message: m.toString(r) }
    });
  }
  max(e, r) {
    return new se({
      ...this._def,
      maxSize: { value: e, message: m.toString(r) }
    });
  }
  size(e, r) {
    return this.min(e, r).max(e, r);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
se.create = (t, e) => new se({
  valueType: t,
  minSize: null,
  maxSize: null,
  typeName: y.ZodSet,
  ..._(e)
});
class de extends x {
  constructor() {
    super(...arguments), this.validate = this.implement;
  }
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    if (r.parsedType !== h.function)
      return f(r, {
        code: l.invalid_type,
        expected: h.function,
        received: r.parsedType
      }), g;
    function s(o, c) {
      return qe({
        data: o,
        path: r.path,
        errorMaps: [
          r.common.contextualErrorMap,
          r.schemaErrorMap,
          He(),
          xe
        ].filter((d) => !!d),
        issueData: {
          code: l.invalid_arguments,
          argumentsError: c
        }
      });
    }
    function n(o, c) {
      return qe({
        data: o,
        path: r.path,
        errorMaps: [
          r.common.contextualErrorMap,
          r.schemaErrorMap,
          He(),
          xe
        ].filter((d) => !!d),
        issueData: {
          code: l.invalid_return_type,
          returnTypeError: c
        }
      });
    }
    const a = { errorMap: r.common.contextualErrorMap }, i = r.data;
    if (this._def.returns instanceof le) {
      const o = this;
      return Z(async function(...c) {
        const d = new $([]), u = await o._def.args.parseAsync(c, a).catch((O) => {
          throw d.addIssue(s(c, O)), d;
        }), p = await Reflect.apply(i, this, u);
        return await o._def.returns._def.type.parseAsync(p, a).catch((O) => {
          throw d.addIssue(n(p, O)), d;
        });
      });
    } else {
      const o = this;
      return Z(function(...c) {
        const d = o._def.args.safeParse(c, a);
        if (!d.success)
          throw new $([s(c, d.error)]);
        const u = Reflect.apply(i, this, d.data), p = o._def.returns.safeParse(u, a);
        if (!p.success)
          throw new $([n(u, p.error)]);
        return p.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...e) {
    return new de({
      ...this._def,
      args: U.create(e).rest(te.create())
    });
  }
  returns(e) {
    return new de({
      ...this._def,
      returns: e
    });
  }
  implement(e) {
    return this.parse(e);
  }
  strictImplement(e) {
    return this.parse(e);
  }
  static create(e, r, s) {
    return new de({
      args: e || U.create([]).rest(te.create()),
      returns: r || te.create(),
      typeName: y.ZodFunction,
      ..._(s)
    });
  }
}
class Ce extends x {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    return this._def.getter()._parse({ data: r.data, path: r.path, parent: r });
  }
}
Ce.create = (t, e) => new Ce({
  getter: t,
  typeName: y.ZodLazy,
  ..._(e)
});
class Oe extends x {
  _parse(e) {
    if (e.data !== this._def.value) {
      const r = this._getOrReturnCtx(e);
      return f(r, {
        received: r.data,
        code: l.invalid_literal,
        expected: this._def.value
      }), g;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
Oe.create = (t, e) => new Oe({
  value: t,
  typeName: y.ZodLiteral,
  ..._(e)
});
function Vt(t, e) {
  return new Q({
    values: t,
    typeName: y.ZodEnum,
    ..._(e)
  });
}
class Q extends x {
  _parse(e) {
    if (typeof e.data != "string") {
      const r = this._getOrReturnCtx(e), s = this._def.values;
      return f(r, {
        expected: w.joinValues(s),
        received: r.parsedType,
        code: l.invalid_type
      }), g;
    }
    if (this._def.values.indexOf(e.data) === -1) {
      const r = this._getOrReturnCtx(e), s = this._def.values;
      return f(r, {
        received: r.data,
        code: l.invalid_enum_value,
        options: s
      }), g;
    }
    return Z(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const r of this._def.values)
      e[r] = r;
    return e;
  }
  get Values() {
    const e = {};
    for (const r of this._def.values)
      e[r] = r;
    return e;
  }
  get Enum() {
    const e = {};
    for (const r of this._def.values)
      e[r] = r;
    return e;
  }
  extract(e) {
    return Q.create(e);
  }
  exclude(e) {
    return Q.create(this.options.filter((r) => !e.includes(r)));
  }
}
Q.create = Vt;
class Ne extends x {
  _parse(e) {
    const r = w.getValidEnumValues(this._def.values), s = this._getOrReturnCtx(e);
    if (s.parsedType !== h.string && s.parsedType !== h.number) {
      const n = w.objectValues(r);
      return f(s, {
        expected: w.joinValues(n),
        received: s.parsedType,
        code: l.invalid_type
      }), g;
    }
    if (r.indexOf(e.data) === -1) {
      const n = w.objectValues(r);
      return f(s, {
        received: s.data,
        code: l.invalid_enum_value,
        options: n
      }), g;
    }
    return Z(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
Ne.create = (t, e) => new Ne({
  values: t,
  typeName: y.ZodNativeEnum,
  ..._(e)
});
class le extends x {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    if (r.parsedType !== h.promise && r.common.async === !1)
      return f(r, {
        code: l.invalid_type,
        expected: h.promise,
        received: r.parsedType
      }), g;
    const s = r.parsedType === h.promise ? r.data : Promise.resolve(r.data);
    return Z(s.then((n) => this._def.type.parseAsync(n, {
      path: r.path,
      errorMap: r.common.contextualErrorMap
    })));
  }
}
le.create = (t, e) => new le({
  type: t,
  typeName: y.ZodPromise,
  ..._(e)
});
class D extends x {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === y.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: r, ctx: s } = this._processInputParams(e), n = this._def.effect || null, a = {
      addIssue: (i) => {
        f(s, i), i.fatal ? r.abort() : r.dirty();
      },
      get path() {
        return s.path;
      }
    };
    if (a.addIssue = a.addIssue.bind(a), n.type === "preprocess") {
      const i = n.transform(s.data, a);
      return s.common.issues.length ? {
        status: "dirty",
        value: s.data
      } : s.common.async ? Promise.resolve(i).then((o) => this._def.schema._parseAsync({
        data: o,
        path: s.path,
        parent: s
      })) : this._def.schema._parseSync({
        data: i,
        path: s.path,
        parent: s
      });
    }
    if (n.type === "refinement") {
      const i = (o) => {
        const c = n.refinement(o, a);
        if (s.common.async)
          return Promise.resolve(c);
        if (c instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return o;
      };
      if (s.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s
        });
        return o.status === "aborted" ? g : (o.status === "dirty" && r.dirty(), i(o.value), { status: r.value, value: o.value });
      } else
        return this._def.schema._parseAsync({ data: s.data, path: s.path, parent: s }).then((o) => o.status === "aborted" ? g : (o.status === "dirty" && r.dirty(), i(o.value).then(() => ({ status: r.value, value: o.value }))));
    }
    if (n.type === "transform")
      if (s.common.async === !1) {
        const i = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s
        });
        if (!we(i))
          return i;
        const o = n.transform(i.value, a);
        if (o instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: r.value, value: o };
      } else
        return this._def.schema._parseAsync({ data: s.data, path: s.path, parent: s }).then((i) => we(i) ? Promise.resolve(n.transform(i.value, a)).then((o) => ({ status: r.value, value: o })) : i);
    w.assertNever(n);
  }
}
D.create = (t, e, r) => new D({
  schema: t,
  typeName: y.ZodEffects,
  effect: e,
  ..._(r)
});
D.createWithPreprocess = (t, e, r) => new D({
  schema: e,
  effect: { type: "preprocess", transform: t },
  typeName: y.ZodEffects,
  ..._(r)
});
class W extends x {
  _parse(e) {
    return this._getType(e) === h.undefined ? Z(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
W.create = (t, e) => new W({
  innerType: t,
  typeName: y.ZodOptional,
  ..._(e)
});
class ne extends x {
  _parse(e) {
    return this._getType(e) === h.null ? Z(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ne.create = (t, e) => new ne({
  innerType: t,
  typeName: y.ZodNullable,
  ..._(e)
});
class Ze extends x {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    let s = r.data;
    return r.parsedType === h.undefined && (s = this._def.defaultValue()), this._def.innerType._parse({
      data: s,
      path: r.path,
      parent: r
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
Ze.create = (t, e) => new Ze({
  innerType: t,
  typeName: y.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ..._(e)
});
class Ke extends x {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e), s = {
      ...r,
      common: {
        ...r.common,
        issues: []
      }
    }, n = this._def.innerType._parse({
      data: s.data,
      path: s.path,
      parent: {
        ...s
      }
    });
    return We(n) ? n.then((a) => ({
      status: "valid",
      value: a.status === "valid" ? a.value : this._def.catchValue({
        get error() {
          return new $(s.common.issues);
        },
        input: s.data
      })
    })) : {
      status: "valid",
      value: n.status === "valid" ? n.value : this._def.catchValue({
        get error() {
          return new $(s.common.issues);
        },
        input: s.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
Ke.create = (t, e) => new Ke({
  innerType: t,
  typeName: y.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ..._(e)
});
class Ye extends x {
  _parse(e) {
    if (this._getType(e) !== h.nan) {
      const s = this._getOrReturnCtx(e);
      return f(s, {
        code: l.invalid_type,
        expected: h.nan,
        received: s.parsedType
      }), g;
    }
    return { status: "valid", value: e.data };
  }
}
Ye.create = (t) => new Ye({
  typeName: y.ZodNaN,
  ..._(t)
});
const Gr = Symbol("zod_brand");
class Bt extends x {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e), s = r.data;
    return this._def.type._parse({
      data: s,
      path: r.path,
      parent: r
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class Ae extends x {
  _parse(e) {
    const { status: r, ctx: s } = this._processInputParams(e);
    if (s.common.async)
      return (async () => {
        const a = await this._def.in._parseAsync({
          data: s.data,
          path: s.path,
          parent: s
        });
        return a.status === "aborted" ? g : a.status === "dirty" ? (r.dirty(), Lt(a.value)) : this._def.out._parseAsync({
          data: a.value,
          path: s.path,
          parent: s
        });
      })();
    {
      const n = this._def.in._parseSync({
        data: s.data,
        path: s.path,
        parent: s
      });
      return n.status === "aborted" ? g : n.status === "dirty" ? (r.dirty(), {
        status: "dirty",
        value: n.value
      }) : this._def.out._parseSync({
        data: n.value,
        path: s.path,
        parent: s
      });
    }
  }
  static create(e, r) {
    return new Ae({
      in: e,
      out: r,
      typeName: y.ZodPipeline
    });
  }
}
class Xe extends x {
  _parse(e) {
    const r = this._def.innerType._parse(e);
    return we(r) && (r.value = Object.freeze(r.value)), r;
  }
}
Xe.create = (t, e) => new Xe({
  innerType: t,
  typeName: y.ZodReadonly,
  ..._(e)
});
const zt = (t, e = {}, r) => t ? ue.create().superRefine((s, n) => {
  var a, i;
  if (!t(s)) {
    const o = typeof e == "function" ? e(s) : typeof e == "string" ? { message: e } : e, c = (i = (a = o.fatal) !== null && a !== void 0 ? a : r) !== null && i !== void 0 ? i : !0, d = typeof o == "string" ? { message: o } : o;
    n.addIssue({ code: "custom", ...d, fatal: c });
  }
}) : ue.create(), Jr = {
  object: T.lazycreate
};
var y;
(function(t) {
  t.ZodString = "ZodString", t.ZodNumber = "ZodNumber", t.ZodNaN = "ZodNaN", t.ZodBigInt = "ZodBigInt", t.ZodBoolean = "ZodBoolean", t.ZodDate = "ZodDate", t.ZodSymbol = "ZodSymbol", t.ZodUndefined = "ZodUndefined", t.ZodNull = "ZodNull", t.ZodAny = "ZodAny", t.ZodUnknown = "ZodUnknown", t.ZodNever = "ZodNever", t.ZodVoid = "ZodVoid", t.ZodArray = "ZodArray", t.ZodObject = "ZodObject", t.ZodUnion = "ZodUnion", t.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", t.ZodIntersection = "ZodIntersection", t.ZodTuple = "ZodTuple", t.ZodRecord = "ZodRecord", t.ZodMap = "ZodMap", t.ZodSet = "ZodSet", t.ZodFunction = "ZodFunction", t.ZodLazy = "ZodLazy", t.ZodLiteral = "ZodLiteral", t.ZodEnum = "ZodEnum", t.ZodEffects = "ZodEffects", t.ZodNativeEnum = "ZodNativeEnum", t.ZodOptional = "ZodOptional", t.ZodNullable = "ZodNullable", t.ZodDefault = "ZodDefault", t.ZodCatch = "ZodCatch", t.ZodPromise = "ZodPromise", t.ZodBranded = "ZodBranded", t.ZodPipeline = "ZodPipeline", t.ZodReadonly = "ZodReadonly";
})(y || (y = {}));
const Kr = (t, e = {
  message: `Input not instance of ${t.name}`
}) => zt((r) => r instanceof t, e), Ut = P.create, Ht = Y.create, Yr = Ye.create, Xr = X.create, qt = be.create, Qr = re.create, es = Fe.create, ts = ke.create, rs = Te.create, ss = ue.create, ns = te.create, as = F.create, is = Ge.create, os = M.create, cs = T.create, ds = T.strictCreate, us = Ee.create, ls = Qe.create, hs = Re.create, fs = U.create, ps = Se.create, ms = Je.create, ys = se.create, vs = de.create, gs = Ce.create, _s = Oe.create, xs = Q.create, ws = Ne.create, bs = le.create, xt = D.create, ks = W.create, Ts = ne.create, Es = D.createWithPreprocess, Rs = Ae.create, Ss = () => Ut().optional(), Cs = () => Ht().optional(), Os = () => qt().optional(), Ns = {
  string: (t) => P.create({ ...t, coerce: !0 }),
  number: (t) => Y.create({ ...t, coerce: !0 }),
  boolean: (t) => be.create({
    ...t,
    coerce: !0
  }),
  bigint: (t) => X.create({ ...t, coerce: !0 }),
  date: (t) => re.create({ ...t, coerce: !0 })
}, Zs = g;
var at = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: xe,
  setErrorMap: Pr,
  getErrorMap: He,
  makeIssue: qe,
  EMPTY_PATH: $r,
  addIssueToContext: f,
  ParseStatus: N,
  INVALID: g,
  DIRTY: Lt,
  OK: Z,
  isAborted: dt,
  isDirty: ut,
  isValid: we,
  isAsync: We,
  get util() {
    return w;
  },
  get objectUtil() {
    return ct;
  },
  ZodParsedType: h,
  getParsedType: K,
  ZodType: x,
  ZodString: P,
  ZodNumber: Y,
  ZodBigInt: X,
  ZodBoolean: be,
  ZodDate: re,
  ZodSymbol: Fe,
  ZodUndefined: ke,
  ZodNull: Te,
  ZodAny: ue,
  ZodUnknown: te,
  ZodNever: F,
  ZodVoid: Ge,
  ZodArray: M,
  ZodObject: T,
  ZodUnion: Ee,
  ZodDiscriminatedUnion: Qe,
  ZodIntersection: Re,
  ZodTuple: U,
  ZodRecord: Se,
  ZodMap: Je,
  ZodSet: se,
  ZodFunction: de,
  ZodLazy: Ce,
  ZodLiteral: Oe,
  ZodEnum: Q,
  ZodNativeEnum: Ne,
  ZodPromise: le,
  ZodEffects: D,
  ZodTransformer: D,
  ZodOptional: W,
  ZodNullable: ne,
  ZodDefault: Ze,
  ZodCatch: Ke,
  ZodNaN: Ye,
  BRAND: Gr,
  ZodBranded: Bt,
  ZodPipeline: Ae,
  ZodReadonly: Xe,
  custom: zt,
  Schema: x,
  ZodSchema: x,
  late: Jr,
  get ZodFirstPartyTypeKind() {
    return y;
  },
  coerce: Ns,
  any: ss,
  array: os,
  bigint: Xr,
  boolean: qt,
  date: Qr,
  discriminatedUnion: ls,
  effect: xt,
  enum: xs,
  function: vs,
  instanceof: Kr,
  intersection: hs,
  lazy: gs,
  literal: _s,
  map: ms,
  nan: Yr,
  nativeEnum: ws,
  never: as,
  null: rs,
  nullable: Ts,
  number: Ht,
  object: cs,
  oboolean: Os,
  onumber: Cs,
  optional: ks,
  ostring: Ss,
  pipeline: Rs,
  preprocess: Es,
  promise: bs,
  record: ps,
  set: ys,
  strictObject: ds,
  string: Ut,
  symbol: es,
  transformer: xt,
  tuple: fs,
  undefined: ts,
  union: us,
  unknown: ns,
  void: is,
  NEVER: Zs,
  ZodIssueCode: l,
  quotelessJson: jr,
  ZodError: $
});
he.post(
  "/api/login",
  // Validate the request body using Zod
  Ir(
    "json",
    at.object({
      email: at.string({
        required_error: "Email is required"
      }),
      code: at.string().optional()
    })
  ),
  // Handle the request
  ({ req: t, json: e }) => {
    const r = t.valid("json");
    return e({ email: r.email });
  }
);
he.use("/api/*", async ({ req: t }) => {
  const { pathname: e, search: r } = new URL(t.url);
  return await fetch(
    `https://swapi.dev${e}${r}`,
    t.raw
  );
});
he.get("/echo", ({ json: t, req: e }) => t({
  headers: Object.fromEntries(e.raw.headers.entries()),
  cf: e.raw.cf
}));
var As = (t) => {
  let e = t.filename;
  if (/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(e))
    return;
  let r = t.root || "";
  const s = t.defaultDocument || "index.html";
  e.endsWith("/") ? e = e.concat(s) : e.match(/\.[a-zA-Z0-9]+$/) || (e = e.concat("/" + s)), e = e.replace(/^\.?[\/\\]/, ""), e = e.replace(/\\/, "/"), r = r.replace(/\/$/, "");
  let n = r ? r + "/" + e : e;
  return n = n.replace(/^\.?\//, ""), n;
}, Be = (t, e = Is) => {
  const r = /\.([a-zA-Z0-9]+?)$/, s = t.match(r);
  if (!s)
    return;
  let n = e[s[1]];
  return (n && n.startsWith("text") || n === "application/json") && (n += "; charset=utf-8"), n;
}, Is = {
  aac: "audio/aac",
  avi: "video/x-msvideo",
  avif: "image/avif",
  av1: "video/av1",
  bin: "application/octet-stream",
  bmp: "image/bmp",
  css: "text/css",
  csv: "text/csv",
  eot: "application/vnd.ms-fontobject",
  epub: "application/epub+zip",
  gif: "image/gif",
  gz: "application/gzip",
  htm: "text/html",
  html: "text/html",
  ico: "image/x-icon",
  ics: "text/calendar",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  js: "text/javascript",
  json: "application/json",
  jsonld: "application/ld+json",
  map: "application/json",
  mid: "audio/x-midi",
  midi: "audio/x-midi",
  mjs: "text/javascript",
  mp3: "audio/mpeg",
  mp4: "video/mp4",
  mpeg: "video/mpeg",
  oga: "audio/ogg",
  ogv: "video/ogg",
  ogx: "application/ogg",
  opus: "audio/opus",
  otf: "font/otf",
  pdf: "application/pdf",
  png: "image/png",
  rtf: "application/rtf",
  svg: "image/svg+xml",
  tif: "image/tiff",
  tiff: "image/tiff",
  ts: "video/mp2t",
  ttf: "font/ttf",
  txt: "text/plain",
  wasm: "application/wasm",
  webm: "video/webm",
  weba: "audio/webm",
  webp: "image/webp",
  woff: "font/woff",
  woff2: "font/woff2",
  xhtml: "application/xhtml+xml",
  xml: "application/xml",
  zip: "application/zip",
  "3gp": "video/3gpp",
  "3g2": "video/3gpp2",
  gltf: "model/gltf+json",
  glb: "model/gltf-binary"
}, js = async (t, e) => {
  let r = {};
  e && e.manifest ? typeof e.manifest == "string" ? r = JSON.parse(e.manifest) : r = e.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? r = JSON.parse(__STATIC_CONTENT_MANIFEST) : r = __STATIC_CONTENT_MANIFEST;
  let s;
  e && e.namespace ? s = e.namespace : s = __STATIC_CONTENT;
  const n = r[t] || t;
  if (!n)
    return null;
  const a = await s.get(n, { type: "arrayBuffer" });
  return a || null;
}, Ps = "index.html", $s = (t) => async (e, r) => {
  var o;
  if (e.finalized) {
    await r();
    return;
  }
  const s = new URL(e.req.url), n = t.path ?? decodeURI(s.pathname), a = As({
    filename: t.rewriteRequestPath ? t.rewriteRequestPath(n) : n,
    root: t.root,
    defaultDocument: Ps
  });
  if (!a)
    return await r();
  const i = await js(a, {
    manifest: t.manifest,
    namespace: t.namespace ? t.namespace : e.env ? e.env.__STATIC_CONTENT : void 0
  });
  if (i) {
    let c;
    return t.mimes ? c = Be(a, t.mimes) ?? Be(a) : c = Be(a), c && e.header("Content-Type", c), e.body(i);
  }
  await ((o = t.onNotFound) == null ? void 0 : o.call(t, a, e)), await r();
}, Wt = (t) => $s(t);
const Ft = JSON.parse(Gt), Ms = Wt({ manifest: Ft }), wt = Wt({ path: "/index.html", manifest: Ft });
he.use("*", async (t, e) => {
  const r = new URL(t.req.url);
  if ([
    "",
    "/",
    "/dashboard",
    "/settings",
    "/settings/account",
    "/login",
    "/signup",
    "/privacy",
    "/terms"
  ].includes(r.pathname))
    return await wt(t, e);
  const n = await Ms(t, e);
  if (!n && !Be(r.pathname)) {
    const a = await wt(t, e);
    if (a)
      return new Response(a.body, { ...a, status: 404 });
  }
  return n;
});
export {
  he as default
};
