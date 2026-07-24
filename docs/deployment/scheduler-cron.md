# Scheduler and Cron

The scheduler queues newsletters and notes for future publishing with optional recurrence.

## Local (recommended)

When running `npm run dev`:

- Schedules stored in `src/data/schedules.json`
- Background worker polls every **60 seconds**
- Full create/edit/run/retry in playground **Scheduler** tab

## Vercel limitations

On Vercel:

- Schedule data stored in **ephemeral `/tmp`** — lost on cold starts and redeploys
- No persistent background worker — relies on Vercel Cron + browser polling
- Playground shows a warning banner when `deploymentMode === 'vercel'`

## Vercel Cron setup

This repo does **not** ship a `crons` block in `vercel.json` — many Vercel plans reject cron config at deploy time. If your plan supports Vercel Cron, add it in the Vercel dashboard or your own `vercel.json` override:

```json
{
  "crons": [{
    "path": "/api/cron/process-schedules",
    "schedule": "*/5 * * * *"
  }]
}
```

Alternatively use an **external cron** (GitHub Actions, cron-job.org, Railway cron, etc.) to `POST` the endpoint below on your schedule.

Set `CRON_SECRET` (or reuse `API_SECRET`) in Vercel env. Cron requests must include:

```
Authorization: Bearer <CRON_SECRET>
```

Or pass `?secret=<CRON_SECRET>` as query param.

## Manual trigger

In playground Scheduler tab: **Trigger Queue Check** or call:

```bash
curl -X POST http://localhost:3456/api/cron/process-schedules \
  -H "Authorization: Bearer $CRON_SECRET"
```

## Next steps

- [Scheduler tab guide](/docs/dashboard/scheduler)
- [Deployment modes](/docs/deployment/modes)
