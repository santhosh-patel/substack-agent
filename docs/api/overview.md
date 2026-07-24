# Tools API Overview

The **Tools API** is a Bearer-protected REST surface at `/api/tools/*` for external agents — n8n, Custom GPT Actions, Zapier, cron jobs, and custom backends. Deploy it on **any Node host** and point clients at **your domain**.

## When to use it

| Use Tools API | Use Dashboard `/api/*` instead |
|---------------|-------------------------------|
| Production automations | Local playground UI only |
| n8n / GPT / webhooks | Manual testing in browser |
| Bearer auth required | Trusted localhost dev |

## Base URL

| Environment | Base URL |
|-------------|----------|
| Local | `http://localhost:3456` |
| Production | `https://your-domain` |

All routes are under `/api/tools/`.

## Authentication

```http
Authorization: Bearer <API_SECRET>
```

| Environment | Behavior |
|-------------|----------|
| **Production** (`NODE_ENV=production`) | `API_SECRET` **required** — missing/invalid token → 401/403 |
| **Local dev** | If `API_SECRET` is unset, auth is skipped for easier testing |

Set `API_SECRET` in production even on private networks.

## Health check

Verify deploy and Substack session **before** wiring automations:

```bash
curl -s "https://your-domain/api/tools/health" \
  -H "Authorization: Bearer $API_SECRET"
```

```json
{
  "success": true,
  "data": {
    "version": "1.0.1",
    "connected": true,
    "publication": "yourname.substack.com"
  }
}
```

| Field | Meaning |
|-------|---------|
| `connected` | Server can reach Substack with current `SUBSTACK_SID` |
| `publication` | Resolved hostname when connected |

If `connected` is `false`, refresh [session cookie](/docs/getting-started/session-cookie) in host env vars.

## Response format

**Success:**

```json
{
  "success": true,
  "data": { }
}
```

**Error:**

```json
{
  "success": false,
  "error": "Human-readable message",
  "code": "SESSION_EXPIRED"
}
```

| Code | Meaning | Action |
|------|---------|--------|
| `SESSION_EXPIRED` | Substack cookie invalid | Update `SUBSTACK_SID` |
| `NOT_CONNECTED` | No session configured | Set env vars and redeploy |

## Auto-connect

Unlike the playground, Tools API routes **do not** require `POST /api/connect`. The server uses `SUBSTACK_SID` and `SUBSTACK_PUB_URL` from environment on each request.

## Remote MCP (alternative)

Need MCP tool-calling instead of REST? Use **`/api/mcp`** with the same Bearer token — see [Remote MCP](/docs/mcp/remote).

## OpenAPI

Machine-readable spec (import into GPT Actions, Postman, n8n):

- Local: [http://localhost:3456/openapi.json](/openapi.json)
- Deployed: `https://your-domain/openapi.json`

## Related

- [Endpoints reference](/docs/api/endpoints)
- [Deploy guide](/docs/deployment/deploy)
- [OpenAPI import](/docs/api/openapi)
- [Security](/docs/security)
