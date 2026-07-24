# Security

## Session cookie

Your `connect.sid` cookie is equivalent to your Substack password. Protect it accordingly.

## Browser storage (playground)

The dashboard at `/playground` stores in `localStorage`:

- `connect.sid` and publication URL (`substack_settings`)
- AI API keys per provider (`substack_apikey_*`)
- Theme, sidebar, and prompt preferences

Anyone with access to your browser profile can read these values.

## API authentication model

| Route prefix | Auth | Purpose |
|--------------|------|---------|
| `/api/tools/*` | Bearer `API_SECRET` (required in production) | External agents, n8n, GPTs |
| `/api/mcp` | Bearer `API_SECRET` (required in production) | Remote MCP over HTTP |
| `/api/*` (dashboard) | **None** | Local playground only |

The playground is a **local dashboard** — it calls unauthenticated `/api/*` routes for connect, publish, and scheduler UI. When you deploy publicly, treat the dashboard as trusted-local-only; point production automations at **`/api/tools/*`** or **`/api/mcp`** with Bearer auth instead.

## Reporting vulnerabilities

Do **not** file public GitHub issues for security vulnerabilities. Email the repository owner with description, reproduction steps, and impact assessment.

## Contributor practices

- Never commit `.env`, cookies, or API keys
- Set `API_SECRET` on all production deployments
- Rotate `connect.sid` if exposed
- Do not commit `src/data/comments_history.json`

## Related

- [Session cookie guide](/docs/getting-started/session-cookie)
- [Deploy the Tools API](/docs/deployment/deploy)
- [Vercel-specific notes](/docs/deployment/vercel)
