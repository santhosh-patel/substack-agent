# Deployment Modes

Substack Agent ships as **four complementary surfaces**. Most teams use one primary mode and optionally add others.

## At a glance

| Mode | Entry point | Auth | Works on Vercel | Best for |
|------|-------------|------|-----------------|----------|
| **Local Dashboard** | `/playground` | None (localhost) | Partial UI | AI compose, scheduler, history |
| **Tools API** | `/api/tools/*` | Bearer `API_SECRET` | Yes | n8n, GPTs, webhooks |
| **Local MCP** | `npm run mcp` | Env in client | No (stdio) | Claude Desktop, Cursor local |
| **Remote MCP** | `/api/mcp` | Bearer `API_SECRET` | Yes* | Cursor remote, cloud MCP clients |

\* Stateless Streamable HTTP — suitable for serverless; session lives in server env vars.

## Decision guide

**Use the Local Dashboard when:**

- You want a visual editor, live Markdown preview, and onboarding checklist
- You need the **scheduler** with local JSON storage and background polling
- You are developing or testing on `localhost:3456`

**Use the Tools API when:**

- An external system (n8n, Zapier, Custom GPT) calls HTTP endpoints
- You need **Bearer auth** and a stable OpenAPI contract
- You deploy to **any Node host** at your domain

**Use Local MCP when:**

- Claude Desktop or Cursor runs on your machine
- You want native tool-calling in chat (stdio transport)
- You prefer not to expose an HTTP MCP endpoint

**Use Remote MCP when:**

- Your Substack Agent instance is **already deployed**
- Your MCP client supports HTTP (`https://your-domain/api/mcp`)
- You want the same 9 tools without running stdio locally

## Local Dashboard

```
Browser → /api/* (no Bearer) → Express → Substack
```

- Full playground: Newsletters, Notes, Comments, Scheduler, History
- Scheduler uses `src/data/schedules.json` + 60s worker when running `npm run dev`
- **Not for public production** — `/api/*` has no auth layer

See [Dashboard overview](/docs/dashboard/overview) and [Security](/docs/security).

## Tools API

```
Agent → Authorization: Bearer → /api/tools/* → Substack
```

- Auto-connects via server `SUBSTACK_SID` — no `/connect` step
- Consistent JSON: `{ success, data?, error?, code? }`
- Health: `GET /api/tools/health`

See [Tools API overview](/docs/api/overview) and [Deploy](/docs/deployment/deploy).

## MCP (local stdio)

```
Claude/Cursor → stdio → npm run mcp → Substack
```

- 9 tools — [full reference](/docs/mcp/tools)
- Configure in `claude_desktop_config.json` or Cursor MCP settings
- Reads `SUBSTACK_SID` from the MCP env block

See [MCP setup](/docs/mcp/setup).

## Remote MCP (HTTP)

```
MCP client → Bearer → /api/mcp → same tools as stdio
```

- Same tool handlers as local MCP (`src/mcp/tools.ts`)
- Requires `API_SECRET` + `SUBSTACK_SID` on the host

See [Remote MCP](/docs/mcp/remote).

## Vercel and serverless notes

| Feature | Local `npm run dev` | Vercel / serverless |
|---------|---------------------|---------------------|
| Tools API | Yes | Yes |
| Remote MCP | Yes | Yes |
| Playground UI | Yes | Yes (with warnings) |
| Scheduler storage | Persistent JSON | Ephemeral `/tmp` |
| Background worker | 60s polling | Manual / external cron |

Details: [Vercel (optional)](/docs/deployment/vercel), [Scheduler & Cron](/docs/deployment/scheduler-cron).

## Next steps

- [Deploy the Tools API](/docs/deployment/deploy)
- [Install locally](/docs/getting-started/install)
- [MCP setup](/docs/mcp/setup)
