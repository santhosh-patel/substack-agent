# Newsletters

Compose and publish newsletter posts from the **Newsletters** tab.

## Generate with AI

1. Enter a **topic** or writing angle
2. Toggle **Enable web search for generation** (optional)
3. Click **Generate**
4. Review auto-filled title, subtitle, and markdown body

Requires a configured AI provider in [Settings](/docs/dashboard/settings).

## Edit and preview

- **Markdown** editor on the left
- **Substack-style preview** on the right (updates live)

## Publish

| Option | Behavior |
|--------|----------|
| Save as draft | Creates draft on Substack |
| Publish live | Emails subscribers |

Requires active Substack connection.

## Publish history

The bottom panel shows **browser drafts** stored in `localStorage` (separate from the History tab server data).

## API equivalent

- Dashboard: `POST /api/generate`, `POST /api/publish`
- Tools API: `POST /api/tools/publish-newsletter`
- MCP: `publish_newsletter`

## Next steps

- [History](/docs/dashboard/history)
- [Scheduler](/docs/dashboard/scheduler)
