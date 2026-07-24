# Tools API Overview

HTTP endpoints for external agents, n8n, Custom GPTs, and webhooks.

## Base URL

| Environment | URL |
|-------------|-----|
| Local | `http://localhost:3456` |
| Deployed | `https://your-domain` |

## Authentication

```
Authorization: Bearer <API_SECRET>
```

- **Production:** `API_SECRET` required
- **Local dev:** auth skipped when `API_SECRET` is unset

## Response format

```json
{
  "success": true,
  "data": { ... }
}
```

Error:

```json
{
  "success": false,
  "error": "Human-readable message"
}
```

## Auto-connect

Tools API routes auto-connect using `SUBSTACK_SID` from server environment — no separate `/connect` step.

## OpenAPI

Machine-readable spec: [/openapi.json](/openapi.json)

## Next steps

- [Endpoints reference](/docs/api/endpoints)
- [Deploy the Tools API](/docs/deployment/deploy)
