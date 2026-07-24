# OpenAPI

Substack Agent exposes an OpenAPI 3.1 spec for AI agent discovery.

## Spec URL

[/openapi.json](/openapi.json)

## Using with Custom GPTs

1. Deploy to Vercel with `API_SECRET` set
2. In GPT Actions, import schema from `https://your-app.vercel.app/openapi.json`
3. Set authentication: **Bearer** with your `API_SECRET`

See [Custom GPT integration](/docs/integrations/custom-gpt).

## Documented operations

| Operation | Path |
|-----------|------|
| publishNewsletter | POST `/api/tools/publish-newsletter` |
| publishNote | POST `/api/tools/publish-note` |
| postComment | POST `/api/tools/comment` |
| automateComments | POST `/api/tools/automate-comments` |
| listNewsletters | GET `/api/tools/list-newsletters` |
| listNotes | GET `/api/tools/list-notes` |
| listComments | GET `/api/tools/list-comments` |
| schedulePost | POST `/api/tools/schedule-post` |
| listSchedules | GET `/api/tools/list-schedules` |

## AI plugin manifest

Also available at `/.well-known/ai-plugin.json` for ChatGPT plugin-style integrations.

## Next steps

- [Tools API overview](/docs/api/overview)
- [Endpoints](/docs/api/endpoints)
