# Notes

Publish short **Substack Notes** from the **Notes** tab.

## Workflow

1. Enter a topic → **Generate** (AI-assisted)
2. Edit note body in the textarea
3. Optionally add a **link URL** for link card preview
4. **Publish Note**

## Requirements

- Must be **connected** to Substack (connection gate enforced)
- AI generation requires provider key

## Preview

Live preview shows how the note will appear in the Substack feed.

## Fetch notes

Click **Fetch Notes** to load recent notes from your publication.

## API equivalent

- Dashboard: `POST /api/notes/generate`, `POST /api/notes/publish`, `GET /api/notes`
- Tools API: `POST /api/tools/publish-note`, `GET /api/tools/list-notes`
- MCP: `publish_note`, `list_notes`

## Next steps

- [Newsletters](/docs/dashboard/newsletters)
