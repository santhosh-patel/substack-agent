# MCP Limitations

## Transport

- **Stdio only** — MCP server communicates over stdin/stdout
- Cannot be hosted on Vercel as a remote MCP endpoint in this repo

## Local execution

- Must run on a machine with Node.js 18+
- Requires valid `SUBSTACK_SID` in env or MCP config

## Scheduling

- `schedule_post` writes to the same storage layer as the dashboard scheduler
- On Vercel deployments, schedule data is ephemeral — use local `npm run dev` for reliable scheduling

## list_comments scope

Returns the **automation log** (`comments_history.json`), not all comments on your Substack account.

## AI in automate_comments

Requires AI provider keys in environment (`GROQ_API_KEY`, etc.) when calling from MCP without inline keys.

## Next steps

- [Tools API](/docs/api/overview) for hosted integrations
- [Deployment modes](/docs/deployment/modes)
