# Environment Variables

All variables from `.env.example`:

## Required

| Variable | Description |
|----------|-------------|
| `SUBSTACK_SID` | `connect.sid` cookie value |
| `SUBSTACK_PUB_URL` | Publication hostname, e.g. `yourname.substack.com` |

## Production (Tools API)

| Variable | Description |
|----------|-------------|
| `API_SECRET` | Bearer token for `/api/tools/*` — **required in production** |

## AI providers (optional)

| Variable | Used for |
|----------|----------|
| `GROQ_API_KEY` | Groq models in playground / automation |
| `GEMINI_API_KEY` | Google Gemini models |
| `OPENAI_API_KEY` | OpenAI models + DALL-E sketch illustrations |
| `OPENROUTER_API_KEY` | OpenRouter models in playground |

You can also paste AI keys in playground settings (stored in browser `localStorage`).

## Scheduler cron

| Variable | Description |
|----------|-------------|
| `CRON_SECRET` | Auth for `/api/cron/process-schedules` (falls back to `API_SECRET`) |

## Vercel notes

- Scheduler and history data use ephemeral `/tmp` on Vercel unless durable storage is configured
- See [Scheduler & Cron](/docs/deployment/scheduler-cron)

## Next steps

- [Deployment modes](/docs/deployment/modes)
- [Security](/docs/security)
