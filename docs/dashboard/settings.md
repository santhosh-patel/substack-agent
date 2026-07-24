# Settings

The settings sidebar controls Substack connection, AI providers, and writing prompts. Open it from the **gear icon** or it auto-expands on first visit when no session is configured.

## Substack account

| Field | Description |
|-------|-------------|
| **Session cookie** | Your `connect.sid` value — [extraction guide](/docs/getting-started/session-cookie) |
| **Publication URL** | e.g. `yourname.substack.com` (with or without `https://`) |

### Connection buttons

| Button | Behavior |
|--------|----------|
| **Test** | Validates cookie with Substack without changing UI state heavily |
| **Connect** | Establishes server session (`POST /api/connect`); enables publish actions |
| **Disconnect** | Clears server session and cookie field |

If you see a **“refresh your connect.sid”** toast, extract a new cookie from DevTools — sessions expire after logout or time.

## AI provider

| Provider | Typical models |
|----------|----------------|
| Groq | Llama 3.x |
| Gemini | Gemini 2.x |
| OpenAI | GPT-4o mini, etc. |
| OpenRouter | Multi-model gateway |

**Workflow:** Select provider → choose model → paste API key → **Test API Key** → **Save API Key**.

Keys are stored in browser **`localStorage`** per provider unless the server has keys in `.env` (then model select may work without saving locally).

## System prompt

Customize AI instructions for **Newsletters** and **Notes** tabs. Changes save automatically. **Reset** restores the server default from `/api/config`.

## Security

- Cookies and keys in `localStorage` are visible to anyone with access to your browser profile
- Connect sends the cookie to **your** Substack Agent server only
- Do not use the dashboard on untrusted shared machines without clearing site data afterward

Full model: [Security](/docs/security).

## Deployment-aware banners

On Vercel or production hosts, banners at the top of the playground explain dashboard vs Tools API boundaries and scheduler limits.

## Related

- [First publish](/docs/getting-started/first-publish)
- [Dashboard overview](/docs/dashboard/overview)
- [Environment variables](/docs/getting-started/environment-variables)
