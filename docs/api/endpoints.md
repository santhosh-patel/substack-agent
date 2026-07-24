# Tools API Endpoints

All routes under `/api/tools/*`. Method and path:

## Publishing

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/tools/publish-newsletter` | Draft or publish newsletter |
| POST | `/api/tools/publish-note` | Publish a note |
| POST | `/api/tools/comment` | Comment on a post |
| POST | `/api/tools/automate-comments` | Keyword comment automation |

## Query

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/tools/list-newsletters` | Recent newsletter archive |
| GET | `/api/tools/list-notes` | Recent notes |
| GET | `/api/tools/list-comments` | Automation comment log |

## Scheduling

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/tools/schedule-post` | Queue scheduled post |
| GET | `/api/tools/list-schedules` | List schedule queue |

## Example: publish newsletter

```bash
curl -X POST https://your-domain/api/tools/publish-newsletter \
  -H "Authorization: Bearer $API_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Hello from API",
    "body": "## Markdown body",
    "isDraft": true
  }'
```

## Example: schedule post

```bash
curl -X POST https://your-domain/api/tools/schedule-post \
  -H "Authorization: Bearer $API_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Weekly",
    "body": "Content",
    "scheduledAt": "2026-08-01T12:00:00Z",
    "postType": "newsletter",
    "recurrence": "once"
  }'
```

## Next steps

- [OpenAPI guide](/docs/api/openapi)
- [MCP tools](/docs/mcp/tools)
