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

- The web UI stores non-secret preferences (theme, publication URL, provider) in browser `localStorage`. Session cookies and API keys are not persisted there.
- `/api/tools/*` endpoints require Bearer auth when `API_SECRET` is set. In local development only, auth is skipped when `API_SECRET` is unset.
