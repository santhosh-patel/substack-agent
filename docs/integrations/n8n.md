# n8n Integration

Call Substack Agent Tools API from n8n workflows.

## Prerequisites

- Deployed Substack Agent on Vercel (or local tunnel)
- `API_SECRET` configured
- `SUBSTACK_SID` and `SUBSTACK_PUB_URL` in deployment env

## HTTP Request node

| Setting | Value |
|---------|-------|
| Method | POST |
| URL | `https://your-app.vercel.app/api/tools/publish-newsletter` |
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

- [Deploy to Vercel](/docs/deployment/vercel)
- [OpenAPI](/docs/api/openapi)
