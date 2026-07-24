# Dashboard Overview

The playground at `/playground` is a full local web dashboard for Substack publishing with AI assistance.

## Architecture

```
Browser (playground UI)
    ↓ fetch /api/*
Local Express server (port 3456)
    ↓ session auth
Substack (unofficial session API)
```

## Tabs

| Tab | Purpose |
|-----|---------|
| Newsletters | AI compose, markdown preview, draft/publish |
| Comments | Keyword-based comment automation |
| Notes | Short posts with optional link cards |
| Scheduler | Queue future/recurring publishes |
| History | App history + Substack archive |

## Authentication

- Dashboard `/api/*` routes have **no Bearer auth**
- Designed for **local development only**
- Session established via `POST /api/connect`

## Getting started

1. `npm run dev`
2. Open `/playground`
3. Complete the onboarding checklist
4. See [Settings](/docs/dashboard/settings)

## Next steps

- [Newsletters](/docs/dashboard/newsletters)
- [Security](/docs/security)
