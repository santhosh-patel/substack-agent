# Scheduler

Queue **newsletters** and **notes** for future publishing with optional recurrence. Best experienced on **local `npm run dev`** where storage is persistent.

## Overview

```
Create schedule → JSON queue → worker/cron → publish at due time
```

| Component | Local dev | Vercel |
|-----------|-----------|--------|
| Storage | `src/data/schedules.json` | Ephemeral `/tmp` |
| Worker | 60s background poll | Manual / external cron |
| Create UI | Enabled | Disabled (banner) |

## Post types

| Type | Fields |
|------|--------|
| **Newsletter** | Title, subtitle, Markdown body |
| **Note** | Body, optional link URL |

## Recurrence

| Pattern | Use case |
|---------|----------|
| Once | Single future publish |
| Daily | Same time every day |
| Twice daily | Two times per day |
| Alternate days | Every other day |
| Weekly | Same weekday |

Use the **date/time picker** or quick presets (30 min, 1 hour, tomorrow 9 AM).

## AI research mode

Enable **web search** on a schedule to let AI research a topic at run time and generate content. Store an API key with the job or rely on server env vars.

**Presets:** Brief, Builder, Default, Reaction — starting points for `schedBody` guidelines.

## Queue management

| Action | Description |
|--------|-------------|
| **Trigger Queue Check** | Manually process due jobs now |
| **Run now** | Publish a specific queued item immediately |
| **Pause / Resume** | Temporarily skip a job |
| **Retry** | Re-run a failed job |
| **Inspector logs** | View worker output; copy for debugging |

Browser **polling** (every 60s on Scheduler tab) also calls `/api/cron/process-schedules`.

## Cron endpoint

```http
GET|POST /api/cron/process-schedules
Authorization: Bearer $CRON_SECRET
```

See [Scheduler & Cron](/docs/deployment/scheduler-cron) for external cron setup. This repo does **not** ship Vercel cron in `vercel.json`.

## API equivalents

| Surface | Route / tool |
|---------|--------------|
| Dashboard | `/api/schedule/*` |
| Tools API | `POST /api/tools/schedule-post`, `GET /api/tools/list-schedules` |
| MCP | `schedule_post`, `list_schedules` |

## Related

- [Deployment: Scheduler & Cron](/docs/deployment/scheduler-cron)
- [Newsletters](/docs/dashboard/newsletters)
- [Notes](/docs/dashboard/notes)
