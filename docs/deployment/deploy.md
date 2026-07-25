# Deploy the Tools API

Host the **Tools API** on any Node platform — Vercel, Railway, a VPS, or your own server. Then use **your domain** with agents, automations, and MCP-style tool clients (n8n, custom GPTs, webhooks).

For Claude Desktop and Cursor locally, use stdio MCP (`npm run mcp`). For deployed instances, connect remote MCP clients to **`https://your-domain/api/mcp`** with Bearer auth — see [Remote MCP](../mcp/remote.md).

## Required environment variables

| Variable | Required | Notes |
|----------|----------|-------|
| `SUBSTACK_SID` | Yes | Session cookie — see [Session cookie](/docs/getting-started/session-cookie) |
| `SUBSTACK_PUB_URL` | Yes | e.g. `yourname.substack.com` |
| `API_SECRET` | Yes | Bearer token for `/api/tools/*` in production |

Optional: `GROQ_API_KEY`, `GEMINI_API_KEY`, `OPENAI_API_KEY`, `OPENROUTER_API_KEY`, `CRON_SECRET`

## Run on any Node host

1. Clone the repo and install dependencies (see [Install](/docs/getting-started/install)).
2. Set the environment variables on your host.
3. Build and start with Node 18+:

```bash
npm install
npm run build
NODE_ENV=production npm start
```

For local development with hot reload, use `npm run dev` instead.

## Verify deployment

Replace `your-domain` with your deployment URL:

```bash
curl -s "https://your-domain/api/tools/health" \
  -H "Authorization: Bearer $API_SECRET"
```

Expected response:

```json
{
  "success": true,
  "data": {
    "version": "1.1.0",
    "connected": true,
    "publication": "yourname.substack.com"
  }
}
```

If `connected` is `false`, check `SUBSTACK_SID` and `SUBSTACK_PUB_URL` in your host environment.

## Call your Tools API

```bash
curl -X POST "https://your-domain/api/tools/publish-newsletter" \
  -H "Authorization: Bearer $API_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"title":"Hello","body":"Markdown body","isDraft":true}'
```

- **OpenAPI spec:** `https://your-domain/openapi.json`
- **Auth:** `Authorization: Bearer <API_SECRET>`
- **Base path:** `/api/tools/*`

Use your domain with n8n, Custom GPT Actions, Zapier HTTP nodes, or any OpenAPI-aware agent.

## Docker

```bash
docker build -t substack-agent .
docker run -p 3456:3456 \
  -e NODE_ENV=production \
  -e SUBSTACK_SID=... \
  -e SUBSTACK_PUB_URL=yourname.substack.com \
  -e API_SECRET=... \
  substack-agent
```

## Railway / Render / Fly

General steps (no one-click buttons):

1. Connect this GitHub repo to your platform.
2. Set build command: `npm run build`
3. Set start command: `npm start`
4. Add env vars: `SUBSTACK_SID`, `SUBSTACK_PUB_URL`, `API_SECRET`, `NODE_ENV=production`
5. Run the health check curl above against your assigned domain.

## Public dashboard risk

If `SUBSTACK_SID` is in server env and your deployment is public, unauthenticated `/api/*` dashboard routes can control your Substack account. For production integrations, use **Tools API** routes with Bearer auth only. See [Security](/docs/security).

## Optional: Vercel

Vercel is one supported host. Scheduler and history are limited on serverless — see [Deploy to Vercel](/docs/deployment/vercel) and [Scheduler & Cron](/docs/deployment/scheduler-cron).

## Next steps

- [Tools API overview](/docs/api/overview)
- [OpenAPI](/docs/api/openapi)
- [n8n integration](/docs/integrations/n8n)
- [Custom GPT](/docs/integrations/custom-gpt)
