# MCP Limitations

Understand what MCP can and cannot do before building on it.

## Transport options

| Transport | Where | Notes |
|-----------|-------|-------|
| **Stdio** | Local machine | Claude Desktop, Cursor — `npm run mcp` |
| **HTTP** | Deployed domain | `/api/mcp` — [Remote MCP](/docs/mcp/remote) |

Stdio and HTTP expose the **same 9 tools** from `src/mcp/tools.ts`.

## Session & auth

- All tools require a valid **`SUBSTACK_SID`** on the server (stdio env block or host env for HTTP)
- Remote MCP also requires **`API_SECRET`** (Bearer header)
- Cookies expire — refresh periodically; Tools API returns `SESSION_EXPIRED` when stale

## Scheduling

- `schedule_post` uses the same queue as the dashboard scheduler
- **Local dev:** persistent `src/data/schedules.json` + background worker
- **Vercel / serverless:** ephemeral storage — schedules may disappear on cold start
- Prefer local `npm run dev` or external cron for reliable scheduling

## `list_comments` scope

Returns the **automation log** (`comments_history.json`) — comments posted through Substack Agent — not every comment on your Substack account.

## `automate_comments` and AI keys

When calling from MCP, provide `provider`, `model`, and `apiKey` in tool arguments, **or** set provider keys in server environment (`GROQ_API_KEY`, etc.).

## Remote MCP on serverless

- Uses **stateless** Streamable HTTP (new connection per request batch)
- Suitable for Vercel; no long-lived stdio process
- Long-running automations may hit platform timeouts — prefer Tools API or local MCP for heavy workloads

## When to use Tools API instead

| Prefer Tools API | Prefer MCP |
|------------------|------------|
| n8n, Custom GPT, simple webhooks | Native chat tool-calling |
| OpenAPI import | Claude Desktop / Cursor UX |
| Stateless HTTP only | Already using MCP clients |

## Related

- [Tools API overview](/docs/api/overview)
- [Deployment modes](/docs/deployment/modes)
- [Troubleshooting](/docs/troubleshooting)
