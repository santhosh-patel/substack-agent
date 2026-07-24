# n8n Integration

Call Substack Agent Tools API from n8n workflows.

## Prerequisites

- Deployed Substack Agent on any Node host (or local tunnel)
- `API_SECRET` configured
- `SUBSTACK_SID` and `SUBSTACK_PUB_URL` in deployment env

## HTTP Request node

| Setting | Value |
|---------|-------|
| Method | POST |
| URL | `https://your-domain/api/tools/publish-newsletter` |
| Authentication | Header Auth |
| Header Name | `Authorization` |
| Header Value | `Bearer YOUR_API_SECRET` |
| Body | JSON |

## Example body

```json
{
  "title": "Automated Weekly Digest",
  "body": "## This week\n\nContent from your workflow...",
  "isDraft": false
}
```

## Other endpoints

See [Tools API Endpoints](/docs/api/endpoints) for publish-note, automate-comments, schedule-post, etc.

## Next steps

- [Deploy the Tools API](/docs/deployment/deploy)
- [OpenAPI](/docs/api/openapi)
