# Dashboard API Reference

Routes under `/api/*` used by the playground UI.

> **Warning:** These routes have **no authentication**. Intended for local `npm run dev` only. Do not expose publicly with a live Substack session.

## Connection

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/config` | Deployment mode, env flags (no secrets) |
| POST | `/api/connect` | Establish Substack session |
| GET | `/api/profile` | Connected profile info |
| POST | `/api/disconnect` | Clear session |

## Content

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/generate` | AI newsletter generation |
| POST | `/api/publish` | Publish newsletter |
| GET | `/api/newsletters` | List archive |
| POST | `/api/notes/generate` | AI note generation |
| POST | `/api/notes/publish` | Publish note |
| GET | `/api/notes` | List notes |

## Automation

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/comments/automate` | Run comment automation |
| GET | `/api/comments` | Comment automation log |
| GET | `/api/publications/history` | Server publication history |

## Scheduler

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/schedule` | List schedules |
| POST | `/api/schedule` | Create schedule |
| DELETE | `/api/schedule/:id` | Delete schedule |
| POST | `/api/schedule/:id/toggle` | Pause/resume |
| POST | `/api/schedule/:id/run-now` | Run immediately |
| POST | `/api/schedule/:id/retry` | Retry failed job |

## Cron

| Method | Path | Description |
|--------|------|-------------|
| GET/POST | `/api/cron/process-schedules` | Process due schedules |

## Testing

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/test/substack` | Validate session cookie |
| POST | `/api/test/ai-key` | Validate AI provider key |

## Production alternative

Use [Tools API](/docs/api/overview) with Bearer auth for deployed integrations.
