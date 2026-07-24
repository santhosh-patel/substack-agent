# Session Cookie

Substack Agent authenticates using your browser **`connect.sid`** session cookie. Treat it like a password — it grants full access to your Substack account.

## Extract connect.sid

1. Log in at [substack.com](https://substack.com)
2. Open **DevTools** (F12 or right-click → Inspect)
3. Go to **Application** → **Cookies** → `https://substack.com`
4. Find **`connect.sid`** and copy its value
5. Paste into playground **Settings** or `.env` as `SUBSTACK_SID`

## Where the cookie is stored

| Location | Used when |
|----------|-----------|
| Playground settings | Saved in browser `localStorage` |
| `.env` file | Local server / MCP / API auto-connect |
| Host environment variables | Deployed server auto-connect |

When you click **Connect** in the playground, the cookie is sent to **your Substack Agent server** (`POST /api/connect`).

## Security

- Never commit cookies to git or share them publicly
- Rotate immediately if exposed (log out of Substack, log back in)
- Clear browser site data on shared machines
- See [Security](/docs/security) for the full model

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Connection fails / 401 | Cookie expired — extract a fresh one |
| Auto-connect fails on load | Update saved cookie in settings |

## Next steps

- [Environment variables](/docs/getting-started/environment-variables)
- [First publish](/docs/getting-started/first-publish)
