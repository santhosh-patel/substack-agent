# Dashboard Overview

The **playground** at `/playground` is a full local web dashboard for AI-assisted Substack publishing. It is the recommended way to learn Substack Agent before automating via the Tools API or MCP.

## Architecture

```
┌──────────────┐     fetch /api/*      ┌─────────────────┐
│   Browser    │ ────────────────────► │ Express :3456   │
│  playground  │   (no Bearer auth)    │                 │
└──────────────┘                       └────────┬────────┘
                                                  │ connect.sid
                                                  ▼
                                         ┌─────────────────┐
                                         │    Substack     │
                                         └─────────────────┘
```

The dashboard is **not** a production API surface. External systems should use [`/api/tools/*`](/docs/api/overview) or [`/api/mcp`](/docs/mcp/remote) with Bearer auth.

## Tabs

| Tab | What it does | Deep dive |
|-----|--------------|-----------|
| **Newsletters** | AI topic → Markdown → draft/publish | [Newsletters](/docs/dashboard/newsletters) |
| **Comments** | Keyword automation on target accounts | [Comments](/docs/dashboard/comments) |
| **Notes** | Short posts + link cards | [Notes](/docs/dashboard/notes) |
| **Scheduler** | Queue future / recurring publishes | [Scheduler](/docs/dashboard/scheduler) |
| **History** | Archive + app activity | [History](/docs/dashboard/history) |

Settings live in the **collapsible sidebar** — [Settings guide](/docs/dashboard/settings).

## Getting started

1. Run `npm run dev`
2. Open [http://localhost:3456/playground](http://localhost:3456/playground)
3. Complete the **onboarding checklist** (top of page):
   - Paste `connect.sid` → **Test** → **Connect**
   - Add AI provider key → **Test API Key**
4. Publish from **Newsletters** — [First publish walkthrough](/docs/getting-started/first-publish)

## Deployment banners

When the server detects Vercel or production config, banners explain:

- **Dashboard vs Tools API** — playground uses unauthenticated routes; automations should use Bearer-protected endpoints
- **Scheduler limits** — ephemeral storage on serverless hosts
- **Server SID** — warn if env cookie is configured on a public deploy

## Authentication model

| Route | Auth | Purpose |
|-------|------|---------|
| `/api/connect`, `/api/publish`, … | None | Playground only |
| `/api/tools/*` | Bearer | Production agents |
| `/api/mcp` | Bearer | Remote MCP |

See [Security](/docs/security) before exposing the playground publicly.

## Storage

| Data | Where |
|------|-------|
| Session cookie, AI keys | Browser `localStorage` (settings sidebar) |
| Schedules (local dev) | `src/data/schedules.json` |
| Comment automation log | `src/data/comments_history.json` |
| Publish history panel | Browser `localStorage` |

## Related

- [Settings](/docs/dashboard/settings)
- [Dashboard API routes](/docs/api/dashboard-api)
- [Deployment modes](/docs/deployment/modes)
