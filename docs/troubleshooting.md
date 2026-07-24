# Troubleshooting

Symptom → cause → fix. If you are stuck after these steps, [open a GitHub issue](https://github.com/santhosh-patel/substack-agent/issues) (no secrets in the report).

## Connection & session

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| "Not connected" in playground | No valid session | Paste fresh `connect.sid` → **Test** → **Connect** |
| 401 on **Connect** | Expired cookie | Re-extract from DevTools — [Session cookie](/docs/getting-started/session-cookie) |
| Auto-reconnect warning on load | Saved cookie invalid | Update cookie in settings; dismiss checklist when done |
| Toast: "refresh your connect.sid" | Substack session expired | Same as above — cookies expire after logout or time |
| Tools API `SESSION_EXPIRED` | Host env cookie stale | Update `SUBSTACK_SID` on server; redeploy |
| Health `connected: false` | SID or pub URL wrong | Verify `SUBSTACK_SID` + `SUBSTACK_PUB_URL` in host env |

## AI generation

| Symptom | Fix |
|---------|-----|
| "Please enter API key" | Add key in [Settings](/docs/dashboard/settings) or `.env` |
| Provider / model error | Click **Test API Key**; confirm model name for provider |
| Web search fails | Disable web search toggle or switch provider |
| Scheduled research post fails | Ensure API key saved with schedule or in `.env` |

## Publish

| Symptom | Fix |
|---------|-----|
| Publish button disabled | Connect Substack first |
| Note publish blocked | Connection required (by design) |
| Empty newsletter body | Add Markdown before publish |
| Substack API error | Refresh cookie; check publication URL matches your account |

## Scheduler

| Symptom | Fix |
|---------|-----|
| Jobs stuck pending (Vercel) | Use local `npm run dev` or external cron — [Scheduler & Cron](/docs/deployment/scheduler-cron) |
| Queue lost after deploy | Expected on Vercel `/tmp` — run locally for durable queue |
| Create disabled on Vercel | By design — see playground banner |
| Manual queue check does nothing | No due posts yet; check scheduled time timezone |

## Tools API & deploy

| Symptom | Fix |
|---------|-----|
| 401 Unauthorized | Add `Authorization: Bearer $API_SECRET` |
| 403 Forbidden | Wrong token — match host `API_SECRET` |
| 503 on tools routes | Set `API_SECRET` when `NODE_ENV=production` |
| 500 on Vercel | Check function logs; verify env vars |
| Health returns 200 without auth locally | Dev mode — set `API_SECRET` + `NODE_ENV=production` to test auth |

## MCP

| Symptom | Fix |
|---------|-----|
| Tools not in Claude/Cursor | Restart client; use **absolute path** in config — [MCP setup](/docs/mcp/setup) |
| Stdio errors | Run `npm run mcp` manually; read stderr |
| Remote MCP 401 | Bearer header must match `API_SECRET` — [Remote MCP](/docs/mcp/remote) |
| Remote MCP connection drops | Verify health endpoint; refresh `SUBSTACK_SID` on host |

## Vercel deploy

| Symptom | Fix |
|---------|-----|
| Deploy fails on cron config | Repo no longer ships `crons` in `vercel.json` — add cron in dashboard if your plan supports it |
| Playground works but scheduler empty | Ephemeral storage — expected |

## Diagnostic commands

```bash
# Local server responding
curl -s http://localhost:3456/api/config | head

# Auth + session (production)
curl -s http://localhost:3456/api/tools/health \
  -H "Authorization: Bearer $API_SECRET"

# Auth tests
API_SECRET=your-secret NODE_ENV=production npm start
npm run test:auth
```

## Related

- [Security](/docs/security)
- [Environment variables](/docs/getting-started/environment-variables)
- [Deployment modes](/docs/deployment/modes)
