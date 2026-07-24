# Install

Get Substack Agent running locally in a few minutes.

## Prerequisites

- **Node.js 18+** and npm
- A **Substack account** you can log into in a browser
- (Optional) AI provider API key for generation features

## 1. Clone and install

```bash
git clone https://github.com/santhosh-patel/substack-agent.git
cd substack-agent
npm install
cp .env.example .env
```

## 2. Configure environment

Edit `.env` — minimum required:

```env
SUBSTACK_SID=your-connect-sid-cookie
SUBSTACK_PUB_URL=yourname.substack.com
```

How to get `SUBSTACK_SID`: [Session cookie guide](/docs/getting-started/session-cookie).

Full reference: [Environment variables](/docs/getting-started/environment-variables).

## 3. Start the server

**Development (hot reload):**

```bash
npm run dev
```

**Production-style local run:**

```bash
npm run build
API_SECRET=your-secret NODE_ENV=production npm start
```

## 4. Open the app

| URL | Purpose |
|-----|---------|
| [http://localhost:3456/playground](http://localhost:3456/playground) | Web dashboard |
| [http://localhost:3456/](http://localhost:3456/) | Landing page |
| [http://localhost:3456/docs](http://localhost:3456/docs) | Documentation |
| [http://localhost:3456/openapi.json](http://localhost:3456/openapi.json) | OpenAPI spec |

> Landing page assets come from `npm run build:landing`. After doc or marketing changes, run that command to refresh `public/`.

## Commands reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local server with scheduler worker (port 3456) |
| `npm start` | Production server (`tsx src/server.ts`) |
| `npm run mcp` | MCP stdio server for Claude / Cursor |
| `npm run build` | Build landing + docs bundle into `public/` |
| `npm run test:api` | Smoke-test dashboard API (server must be running) |
| `npm run test:auth` | Test Bearer auth on tools routes |

## Docker (optional)

```bash
docker build -t substack-agent .
docker run -p 3456:3456 \
  -e NODE_ENV=production \
  -e SUBSTACK_SID=... \
  -e SUBSTACK_PUB_URL=yourname.substack.com \
  -e API_SECRET=... \
  substack-agent
```

See [Deploy the Tools API](/docs/deployment/deploy) for hosted deployment.

## Next steps

1. [Session cookie](/docs/getting-started/session-cookie)
2. [First publish](/docs/getting-started/first-publish)
3. [Deployment modes](/docs/deployment/modes) — if you plan to host the Tools API
