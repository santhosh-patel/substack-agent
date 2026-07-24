# Tools API Endpoints

All routes require `Authorization: Bearer <API_SECRET>` in production. Base path: `/api/tools`.

## Health & status

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/tools/health` | Version, Substack connection status, publication hostname |

```bash
curl -s "https://your-domain/api/tools/health" \
  -H "Authorization: Bearer $API_SECRET"
```

## Publishing

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/tools/publish-newsletter` | Create draft or publish newsletter (Markdown body) |
| POST | `/api/tools/publish-note` | Publish a short note |
| POST | `/api/tools/comment` | Post a comment on a specific post |
| POST | `/api/tools/automate-comments` | Scan target account + keyword; AI comments on matches |

### Publish newsletter

```bash
curl -X POST "https://your-domain/api/tools/publish-newsletter" \
  -H "Authorization: Bearer $API_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Hello from API",
    "subtitle": "Optional teaser",
    "body": "## Markdown body\n\nParagraph text.",
    "isDraft": true
  }'
```

| Field | Required | Notes |
|-------|----------|-------|
| `title` | Yes | Newsletter title |
| `body` | Yes | Markdown content |
| `subtitle` | No | Teaser line |
| `isDraft` | No | `true` (default) = draft; `false` = publish + email |

## Query

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/tools/list-newsletters` | Recent newsletter archive |
| GET | `/api/tools/list-notes` | Recent notes |
| GET | `/api/tools/list-comments` | Comments posted via automation (local log) |

## Scheduling

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/tools/schedule-post` | Queue a newsletter or note |
| GET | `/api/tools/list-schedules` | List pending/completed queue |

> **Note:** Schedule storage is durable on local `npm run dev`; on Vercel it is ephemeral — see [Scheduler & Cron](/docs/deployment/scheduler-cron).

### Schedule post

```bash
curl -X POST "https://your-domain/api/tools/schedule-post" \
  -H "Authorization: Bearer $API_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Weekly digest",
    "body": "Markdown or plain text",
    "scheduledAt": "2026-08-01T12:00:00Z",
    "postType": "newsletter",
    "recurrence": "once",
    "isDraft": true
  }'
```

## HTTP status codes

| Status | Typical cause |
|--------|---------------|
| 401 | Missing Bearer token or session expired (`SESSION_EXPIRED`) |
| 403 | Invalid `API_SECRET` |
| 400 | Missing required JSON fields |
| 503 | `API_SECRET` not configured in production |
| 500 | Substack API error — check cookie and publication URL |

## MCP parity

Every Tools API action has an equivalent MCP tool — see [MCP tools reference](/docs/mcp/tools).

## Related

- [Tools API overview](/docs/api/overview)
- [OpenAPI guide](/docs/api/openapi)
- [Deploy](/docs/deployment/deploy)
- [Troubleshooting](/docs/troubleshooting)
