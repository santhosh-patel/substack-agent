# Environment Variables

Reference for server configuration. Copy `.env.example` to `.env` for local development.

## Required (all modes)

| Variable | Description | Example |
|----------|-------------|---------|
| `SUBSTACK_SID` | `connect.sid` cookie value | See [Session cookie](/docs/getting-started/session-cookie) |
| `SUBSTACK_PUB_URL` | Publication hostname | `yourname.substack.com` |

Also accepted: `PUBLICATION_URL` (alias for pub URL).

## Production (Tools API & Remote MCP)

| Variable | Description |
|----------|-------------|
| `API_SECRET` | Bearer token for `/api/tools/*` and `/api/mcp` — **required when `NODE_ENV=production`** |
| `NODE_ENV` | Set to `production` on hosted deploys |

Without `API_SECRET` in production, tool routes return **503**.

## AI providers (optional)

Used when playground or automation does not receive a key in the request body.

| Variable | Provider |
|----------|----------|
| `GROQ_API_KEY` | Groq |
| `GEMINI_API_KEY` | Google Gemini |
| `OPENAI_API_KEY` | OpenAI |
| `OPENROUTER_API_KEY` | OpenRouter |

Playground keys can also live in browser `localStorage` via Settings.

## Scheduler & cron

| Variable | Description |
|----------|-------------|
| `CRON_SECRET` | Auth for `GET/POST /api/cron/process-schedules` (falls back to `API_SECRET`) |

Used by playground polling, manual queue check, and external cron jobs — [Scheduler & Cron](/docs/deployment/scheduler-cron).

## Platform-specific

| Variable | Description |
|----------|-------------|
| `VERCEL` | Set automatically on Vercel — enables deployment mode banners |
| `VERCEL_URL` | Used for default tools API URL hint in playground config |
| `TOOLS_API_BASE_URL` | Optional override shown in deploy banners |

## What `/api/config` exposes

The playground fetches `/api/config` for **non-secret flags only**:

- `hasSubstackSid`, `hasGroqApiKey`, etc. (booleans)
- `deploymentMode`, `publicationUrl`, default prompts

Never exposes raw cookies or API keys to the browser.

## Local vs deployed checklist

| Variable | Local dev | Production deploy |
|----------|-----------|-------------------|
| `SUBSTACK_SID` | `.env` | Host env |
| `SUBSTACK_PUB_URL` | `.env` | Host env |
| `API_SECRET` | Optional | **Required** |
| `NODE_ENV` | unset | `production` |

## Related

- [Security](/docs/security)
- [Deploy the Tools API](/docs/deployment/deploy)
- [Deployment modes](/docs/deployment/modes)
