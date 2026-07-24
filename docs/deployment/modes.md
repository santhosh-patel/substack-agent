# Deployment Modes

Substack Agent is three products in one. Pick the mode that matches your workflow.

| Mode | Command | Works on Vercel | Best for |
|------|---------|-----------------|----------|
| **Local Dashboard** | `npm run dev` | Partial | Full UI, scheduler, AI compose, history |
| **Tools API** | `vercel` + `API_SECRET` | Yes | n8n, GPTs, webhooks, stateless automation |
| **MCP Server** | `npm run mcp` | No (stdio/local) | Claude Desktop, Cursor |

## Local Dashboard

- URL: `http://localhost:3456/playground`
- All playground tabs work fully
- Scheduler uses local JSON storage + 60s polling
- Dashboard `/api/*` has **no auth** — intended for localhost only

## Tools API

- Routes: `/api/tools/*`
- Auth: `Authorization: Bearer <API_SECRET>`
- OpenAPI: [/openapi.json](/openapi.json)
- Stateless tool calls — no playground UI required

## MCP Server

- Stdio transport only
- Configure in Claude Desktop or Cursor
- 9 native tools — see [MCP Tools](/docs/mcp/tools)

## Next steps

- [Deploy to Vercel](/docs/deployment/vercel)
- [Scheduler & Cron](/docs/deployment/scheduler-cron)
