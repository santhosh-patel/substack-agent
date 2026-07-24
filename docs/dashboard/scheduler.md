# Scheduler

Queue newsletters and notes for future publishing with optional recurrence.

## Post types

- **Newsletter** — full post with title/subtitle
- **Note** — short update

## Recurrence options

| Pattern | Description |
|---------|-------------|
| Once | One-off scheduled publish |
| Daily | Every day |
| Twice a day | Two times per day |
| Alternate days | Every other day |
| Weekly | Once per week |

## Presets

Choose content presets (Default, Brief, Builder, Reaction, Custom) with optional web research and per-job AI keys.

## Queue management

- View pending, paused, and failed jobs
- **Run now**, **Retry**, **Pause/Resume**
- **Trigger Queue Check** for manual cron run
- Inspector panel with logs

## Local vs Vercel

| Environment | Behavior |
|-------------|----------|
| Local `npm run dev` | Full scheduler with persistent JSON storage |
| Vercel | Ephemeral `/tmp`, warning banner, create disabled |

See [Scheduler & Cron](/docs/deployment/scheduler-cron).

## API equivalent

- Dashboard: `GET/POST /api/schedule`, etc.
- Tools API: `POST /api/tools/schedule-post`, `GET /api/tools/list-schedules`
- MCP: `schedule_post`, `list_schedules`

## Next steps

- [Deployment: Scheduler & Cron](/docs/deployment/scheduler-cron)
