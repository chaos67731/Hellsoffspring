# React Starter Kit

<a href="https://github.com/kriasoft/react-starter-kit?sponsor=1"><img src="https://img.shields.io/badge/-GitHub-%23555.svg?logo=github-sponsors" height="20"></a>
<a href="http://patreon.com/koistya"><img src="https://img.shields.io/badge/dynamic/json?color=%23ff424d&label=Patreon&&query=data.attributes.patron_count&suffix=%20patrons&url=https%3A%2F%2Fwww.patreon.com%2Fapi%2Fcampaigns%2F233228" height="20"></a>
<a href="https://discord.gg/2nKEnKq"><img src="https://img.shields.io/discord/643523529131950086?label=Chat" height="20"></a>
<a href="https://github.com/kriasoft/react-starter-kit/stargazers"><img src="https://img.shields.io/github/stars/kriasoft/react-starter-kit.svg?style=social&label=Star&maxAge=3600" height="20"></a>
<a href="https://twitter.com/koistya"><img src="https://img.shields.io/twitter/follow/koistya.svg?style=social&label=Follow&maxAge=3600" height="20"></a>

The web's most popular Jamstack front-end template for building web applications with
[React](https://react.dev/).

## Features

- Optimized for serverless deployment to CDN edge locations (Cloudflare Workers)
- HTML page rendering (SSR) at CDN edge locations, all ~100 points on Lighthouse
- Hot module replacement during local development using React Refetch
- Pre-configured with CSS-in-JS styling using Emotion.js
- Pre-configured with code quality tools: ESLint, Prettier, TypeScript, Vitest, etc.
- Pre-configured with VSCode code snippets and other VSCode settings
- The ongoing design and development is supported by these wonderful companies:

<a href="https://reactstarter.com/s/1"><img src="https://reactstarter.com/s/1.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/s/2"><img src="https://reactstarter.com/s/2.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/s/3"><img src="https://reactstarter.com/s/3.png" height="60" /></a>

---

This project was bootstrapped with [React Starter Kit](https://github.com/kriasoft/react-starter-kit).
Be sure to join our [Discord channel](https://discord.com/invite/2nKEnKq) for assistance.

## Directory Structure

`├──`[`.github`](.github) — GitHub configuration including CI/CD workflows<br>
`├──`[`.vscode`](.vscode) — VSCode settings including code snippets, recommended extensions etc.<br>
`├──`[`app`](./app) — Web application front-end built with [React](https://react.dev/) and [Joy UI](https://mui.com/joy-ui/getting-started/)<br>
`├──`[`db`](./db) — Firestore database schema, seed data, and admin tools<br>
`├──`[`edge`](./edge) — Cloudflare Workers (CDN) edge endpoint<br>
`├──`[`env`](./env) — Application settings, API keys, etc.<br>
`├──`[`scripts`](./scripts) — Automation scripts such as `yarn deploy`<br>
`├──`[`server`](./server) — Node.js application server built with [tRPC](https://trpc.io/)<br>
`├──`[`tsconfig.base.json`](./tsconfig.base.json) — The common/shared TypeScript configuration<br>
`└──`[`tsconfig.json`](./tsconfig.json) — The root TypeScript configuration<br>

## Tech Stack

- [React](https://react.dev/), [React Router](https://reactrouter.com/), [Jotai](https://jotai.org/), [Emotion](https://emotion.sh/), [Joy UI](https://mui.com/joy-ui/getting-started/), [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Cloudflare Workers](https://workers.cloudflare.com/), [Vite](https://vitejs.dev/), [Vitest](https://vitejs.dev/),
  [TypeScript](https://www.typescriptlang.org/), [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [Yarn](https://yarnpkg.com/) with PnP

## Requirements

- [Node.js](https://nodejs.org/) v18+ with [Corepack](https://nodejs.org/api/corepack.html) (`$ corepack enable`)
- [VS Code](https://code.visualstudio.com/) editor with [recommended extensions](.vscode/extensions.json)
- Optionally [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
  and [Reactime](https://chrome.google.com/webstore/detail/reactime/cgibknllccemdnfhfpmjhffpjfeidjga?hl=en) browser extensions

## Getting Started

[Generate](https://github.com/kriasoft/react-starter-kit/generate) a new project
from this template, clone it, install project dependencies, update the
environment variables found in [`env/*.env`](./env/), and start hacking:

```
$ git clone https://github.com/kriasoft/react-starter-kit.git hellsoffspring
$ cd ./hellsoffspring
$ corepack enable
$ yarn install
$ yarn workspace app start
```

The app will become available at [http://localhost:5173/](http://localhost:5173/) (press `q` + `Enter` to exit).

**IMPORTANT**: Ensure that VSCode is using the workspace [version of TypeScript](https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-newer-typescript-versions)
and ESLint.

![](https://files.tarkus.me/typescript-workspace.png)

## Scripts

- `yarn start` — Launches the app in development mode on [`http://localhost:5173/`](http://localhost:5173/)
- `yarn build` — Compiles and bundles the app for deployment
- `yarn lint` — Validate the code using ESLint
- `yarn tsc` — Validate the code using TypeScript compiler
- `yarn test` — Run unit tests with Vitest, Supertest
- `yarn edge deploy` — Deploys the app to Cloudflare

## How to Deploy

Ensure that all the environment variables for the target deployment environment
(`test`, `prod`) found in [`/env/*.env`](./env/) files are up-to-date.

If you haven't done it already, push any secret values you may need to CF Workers
environment by running `yarn workspace edge wrangler secret put <NAME> [--env #0]`.

Finally build and deploy the app by running:

```
$ yarn build
$ yarn deploy [--env #0] [--version #0]
```

Where `--env` argument is the target deployment area, e.g. `yarn deploy --env=prod`.

## How to Update

- `yarn set version latest` — Bump Yarn to the latest version
- `yarn upgrade-interactive` — Update Node.js modules (dependencies)
- `yarn dlx @yarnpkg/sdks vscode` — Update TypeScript, ESLint, and Prettier settings in VSCode

## Contributors 👨‍💻

<a href="https://reactstarter.com/c/1"><img src="https://reactstarter.com/c/1.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/c/2"><img src="https://reactstarter.com/c/2.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/c/3"><img src="https://reactstarter.com/c/3.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/c/4"><img src="https://reactstarter.com/c/4.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/c/5"><img src="https://reactstarter.com/c/5.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/c/6"><img src="https://reactstarter.com/c/6.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/c/7"><img src="https://reactstarter.com/c/7.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/c/8"><img src="https://reactstarter.com/c/8.png" height="60" /></a>

## Backers 💰

<a href="https://reactstarter.com/b/1"><img src="https://reactstarter.com/b/1.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/2"><img src="https://reactstarter.com/b/2.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/3"><img src="https://reactstarter.com/b/3.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/4"><img src="https://reactstarter.com/b/4.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/5"><img src="https://reactstarter.com/b/5.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/6"><img src="https://reactstarter.com/b/6.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/7"><img src="https://reactstarter.com/b/7.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/8"><img src="https://reactstarter.com/b/8.png" height="60" /></a>

## Related Projects

- [GraphQL API and Relay Starter Kit](https://github.com/kriasoft/graphql-starter) — monorepo template, pre-configured with GraphQL API, React, and Relay
- [Cloudflare Workers Starter Kit](https://github.com/kriasoft/cloudflare-starter-kit) — TypeScript project template for Cloudflare Workers
- [Node.js API Starter Kit](https://github.com/kriasoft/node-starter-kit) — project template, pre-configured with Node.js, GraphQL, and PostgreSQL

## How to Contribute

Anyone and everyone is welcome to [contribute](.github/CONTRIBUTING.md). Start
by checking out the list of [open issues](https://github.com/kriasoft/react-starter-kit/issues)
marked [help wanted](https://github.com/kriasoft/react-starter-kit/issues?q=label:"help+wanted").
However, if you decide to get involved, please take a moment to review the
[guidelines](.github/CONTRIBUTING.md).

## License

Copyright © 2014-present Kriasoft. This source code is licensed under the MIT license found in the
[LICENSE](https://github.com/kriasoft/react-starter-kit/blob/main/LICENSE) file.

---

<sup>Made with ♥ by Konstantin Tarkus ([@koistya](https://twitter.com/koistya), [blog](https://medium.com/@koistya))
and [contributors](https://github.com/kriasoft/react-starter-kit/graphs/contributors).</sup>
