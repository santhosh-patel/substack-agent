# Deploy the Tools API

Host the **Tools API** on any Node platform — Vercel, Railway, a VPS, or your own server. Then use **your domain** with agents, automations, and MCP-style tool clients (n8n, custom GPTs, webhooks).

For Claude Desktop and Cursor, continue using the local MCP server (`npm run mcp`) — MCP in this repo uses stdio transport, not a remote HTTP endpoint.

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
3. Start the server with Node 18+:

```bash
npm run dev
```

On most platforms, point the process manager or platform config at the same entry (`src/server.ts` via `npm run dev` or your host’s Node start command).

## Call your Tools API

Replace `your-domain` with your deployment URL:

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

## Public dashboard risk

If `SUBSTACK_SID` is in server env and your deployment is public, unauthenticated `/api/*` dashboard routes can control your Substack account. For production integrations, use **Tools API** routes with Bearer auth only. See [Security](/docs/security).

## Optional: Vercel

Vercel is one supported host. Scheduler and history are limited on serverless — see [Deploy to Vercel](/docs/deployment/vercel) and [Scheduler & Cron](/docs/deployment/scheduler-cron).

## Next steps

- [Tools API overview](/docs/api/overview)
- [OpenAPI](/docs/api/openapi)
- [n8n integration](/docs/integrations/n8n)
- [Custom GPT](/docs/integrations/custom-gpt)
