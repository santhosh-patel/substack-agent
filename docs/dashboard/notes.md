# Notes

Publish short **Substack Notes** — the feed-style updates on Substack — from the **Notes** tab.

## Workflow

1. Enter a **topic** (optional) → **Generate** for AI draft
2. Edit the note body (keep it concise — Notes are short-form)
3. Optionally add a **link URL** for a link card in the preview
4. Click **Publish Note**

## Requirements

| Requirement | Why |
|-------------|-----|
| Substack **connected** | Publish is blocked until session is valid |
| AI key (for Generate) | Provider configured in [Settings](/docs/dashboard/settings) |

## Preview

The right panel shows a **feed-style preview** that updates as you type the link URL and body.

## Fetch recent notes

**Fetch Notes** loads your latest notes from Substack into the list below the editor — useful for checking what you have already posted.

## API equivalents

| Surface | Route / tool |
|---------|--------------|
| Dashboard | `POST /api/notes/generate`, `POST /api/notes/publish`, `GET /api/notes` |
| Tools API | `POST /api/tools/publish-note`, `GET /api/tools/list-notes` |
| MCP | `publish_note`, `list_notes` |

## Tips

- Notes work well for quick updates; use **Newsletters** for long-form Markdown
- Link cards require a valid absolute URL (`https://...`)

## Related

- [Newsletters](/docs/dashboard/newsletters)
- [First publish](/docs/getting-started/first-publish)
