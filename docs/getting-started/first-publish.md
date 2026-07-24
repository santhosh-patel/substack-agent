# First Publish

Walk through your first newsletter draft using the local playground.

## Steps

1. **Start the server:** `npm run dev`
2. **Open playground:** [http://localhost:3456/playground](http://localhost:3456/playground)
3. **Complete onboarding checklist** (top banner):
   - Paste `connect.sid` → **Test** → **Connect**
   - Add an AI provider key → **Test API Key**
4. Go to **Newsletters** tab
5. Enter a topic → **Generate** (optional web search toggle)
6. Review title, subtitle, and markdown preview
7. Enable **Save as draft** → **Publish**

## Draft vs live

| Mode | Behavior |
|------|----------|
| Draft | Saved to Substack; not emailed to subscribers |
| Live | Published and emailed to subscribers |

## Limitations

- Requires local `npm run dev` for full dashboard features
- AI generation needs a configured provider key (browser or `.env`)

## Next steps

- [Newsletters guide](/docs/dashboard/newsletters)
- [MCP setup](/docs/mcp/setup) for Claude/Cursor
