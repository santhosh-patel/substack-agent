# History

The **History** tab aggregates publication activity from multiple sources.

## Three data sources

| Source | Location | Description |
|--------|----------|-------------|
| **Browser drafts** | Newsletters tab bottom panel | `localStorage` publish history (last 15 items) |
| **App history** | History tab after Fetch | Server-side publication log |
| **Substack archive** | History tab after Fetch | Pulled from Substack API |

## Using History tab

1. Connect to Substack
2. Click **Fetch History**
3. Filter by type (newsletter, note, comment)
4. Search by title or content
5. Sort by date

## Why sources differ

Newsletter tab history is client-only for quick reference. The History tab merges server records with fetched Substack archive data.

## API

- `GET /api/publications/history` — server publication history
- `GET /api/newsletters` — Substack archive fetch

## Next steps

- [Newsletters](/docs/dashboard/newsletters)
