# Remote MCP over HTTP

Connect MCP clients to your deployed Substack Agent instance at **`https://your-domain/api/mcp`** using Bearer authentication (same `API_SECRET` as the Tools API).

## When to use remote MCP

| Setup | Transport | Best for |
|-------|-----------|----------|
| Claude Desktop / Cursor (local) | stdio (`npm run mcp`) | Development on your machine |
| Cursor / Claude remote / cloud agents | HTTP at `/api/mcp` | Production deploy on your domain |

Local stdio MCP and remote HTTP MCP expose the **same tools** (`publish_newsletter`, `list_notes`, etc.).

## Prerequisites

1. Deploy the app to any Node host (see [Deploy Tools API](../deployment/deploy.md)).
2. Set environment variables:
   - `API_SECRET` — Bearer token for `/api/mcp` and `/api/tools/*`
   - `SUBSTACK_SID` — your `connect.sid` session cookie
   - `SUBSTACK_PUB_URL` — e.g. `yourname.substack.com`
3. Verify health: `curl -H "Authorization: Bearer $API_SECRET" https://your-domain/api/tools/health`

## Cursor configuration

Add to `.cursor/mcp.json` (or Cursor MCP settings):

```json
{
  "mcpServers": {
    "substack-remote": {
      "url": "https://your-domain/api/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_SECRET"
      }
    }
  }
}
```

Replace `your-domain` and `YOUR_API_SECRET` with your values.

## Claude Desktop (remote)

Claude Desktop primarily supports stdio MCP locally. For a deployed instance, use:

- **Cursor** or another client with Streamable HTTP MCP support, or
- **Tools API** / OpenAPI integrations for GPTs and n8n

## Authentication

All requests to `/api/mcp` require:

```
Authorization: Bearer <API_SECRET>
```

Without a valid Bearer token, the server returns `401 Unauthorized`.

## Transport

This endpoint implements the MCP **Streamable HTTP** transport (GET + POST). It runs in **stateless** mode — suitable for serverless (Vercel) and long-running Node hosts.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `401 Unauthorized` | Check `API_SECRET` matches your deploy env |
| `503` / connection errors | Refresh `SUBSTACK_SID` — Substack sessions expire |
| Tool call fails | Test `/api/tools/health` first; verify `connected: true` |

## Related

- [MCP setup (local stdio)](setup.md)
- [Tools API overview](../api/overview.md)
- [Deploy anywhere](../deployment/deploy.md)
