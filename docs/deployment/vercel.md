# Deploy to Vercel

Deploy the **Tools API** for production integrations. The playground UI can be served statically but **scheduler and history are limited** on serverless.

## One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/santhosh-patel/substack-agent)

## Required environment variables

| Variable | Required | Notes |
|----------|----------|-------|
| `SUBSTACK_SID` | Yes | Session cookie |
| `SUBSTACK_PUB_URL` | Yes | e.g. `yourname.substack.com` |
| `API_SECRET` | Yes | Bearer token for `/api/tools/*` |

Optional: `GROQ_API_KEY`, `GEMINI_API_KEY`, `OPENAI_API_KEY`, `OPENROUTER_API_KEY`, `CRON_SECRET`

## Manual deploy

```bash
vercel
```

Set env vars in the Vercel dashboard under **Settings → Environment Variables**.

## Public dashboard risk

If `SUBSTACK_SID` is in Vercel env and your deployment is public, unauthenticated `/api/*` dashboard routes can control your Substack account. Restrict access or use Tools API only for production.

## What works on Vercel

| Feature | Status |
|---------|--------|
| Tools API (`/api/tools/*`) | Full support |
| Playground UI (static) | Served, but limited backend |
| Scheduler | Ephemeral storage — see [Scheduler & Cron](/docs/deployment/scheduler-cron) |
| MCP server | Not supported (local stdio only) |

## Next steps

- [Tools API overview](/docs/api/overview)
- [Scheduler & Cron](/docs/deployment/scheduler-cron)
