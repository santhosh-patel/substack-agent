# Security Policy

## Supported versions

| Version | Supported |
| ------- | --------- |
| latest on `main` | yes |

## Reporting a vulnerability

Please **do not** file public GitHub issues for security vulnerabilities.

Instead, email the repository owner with:

- A description of the issue
- Steps to reproduce
- Impact assessment (if known)

We will acknowledge receipt and work on a fix as soon as possible.

## Security practices for contributors

- Never commit `.env`, session cookies, or API keys.
- Set `API_SECRET` on all production / Vercel deployments — tool routes are disabled without it in production.
- Treat Substack `connect.sid` values like passwords; rotate them if exposed.
- Runtime comment history is stored locally in `src/data/comments_history.json` and is gitignored — do not commit it.

## Known considerations

### Browser storage (playground UI)

The web dashboard at `/playground` persists the following in browser `localStorage`:

- Substack `connect.sid` session cookie and publication URL (`substack_settings`)
- AI provider API keys per provider (`substack_apikey_*`)
- Theme, sidebar state, and system prompt preferences

Treat these values like passwords. Anyone with access to your browser profile can read them. Clear site data or disconnect when using a shared machine.

When you click **Connect**, your session cookie is sent to **your running Substack Agent server** (`POST /api/connect`). The server uses it to call Substack on your behalf. It is not sent to third parties, but it does leave the browser.

### API authentication model

| Route prefix | Auth | Purpose |
|--------------|------|---------|
| `/api/tools/*` | Bearer `API_SECRET` (required in production) | External agents, n8n, GPTs |
| `/api/*` (dashboard) | **None** | Local playground UI |

The dashboard API is designed for local development (`npm run dev`). If you deploy the playground publicly with `SUBSTACK_SID` in server environment variables, anyone who can reach your deployment can control your Substack account via unauthenticated dashboard routes. Use tools API auth for production integrations instead.

### Other notes

- `/api/tools/*` endpoints require Bearer auth when `API_SECRET` is set. In local development only, auth is skipped when `API_SECRET` is unset.
- On Vercel, scheduler and history data may be stored in ephemeral `/tmp` and lost on cold starts — use local `npm run dev` for reliable scheduling.
