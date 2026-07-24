# History

The **History** tab is a unified view of what Substack Agent and Substack know about your recent activity.

## Data sources

| Source | Where it lives | What it shows |
|--------|----------------|---------------|
| **Browser drafts** | Newsletters tab panel | Last ~15 publishes stored in `localStorage` |
| **App history** | Server after Fetch | Actions logged by Substack Agent |
| **Substack archive** | Fetched from API | Your publication's recent posts |

The Newsletters tab bottom panel is **client-only** for quick reference. History tab merges server + archive data.

## Using the History tab

1. **Connect** to Substack in Settings
2. Click **Fetch History**
3. **Filter** by type: newsletter, note, comment
4. **Search** by title or body text
5. **Sort** by date
6. **Reuse** an item to pre-fill editors (where supported)

## API routes

| Route | Purpose |
|-------|---------|
| `GET /api/publications/history` | Server-side publication log |
| `GET /api/newsletters` | Substack archive fetch |

## Vercel note

History persistence on serverless hosts may be limited — local `npm run dev` gives the most reliable History experience.

## Related

- [Newsletters](/docs/dashboard/newsletters)
- [Comments](/docs/dashboard/comments)
