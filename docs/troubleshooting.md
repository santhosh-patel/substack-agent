# Troubleshooting

Common issues and fixes.

## Connection / 401 errors

| Symptom | Cause | Fix |
|---------|-------|-----|
| "Not connected" | No valid session | Paste fresh `connect.sid`, click Connect |
| 401 on connect | Expired cookie | Re-extract cookie from browser DevTools |
| Auto-reconnect warning | Saved cookie invalid | Update cookie in settings |

## AI generation fails

| Symptom | Fix |
|---------|-----|
| "Please enter API key" | Add key in Settings or `.env` |
| Provider error | Click **Test API Key**; verify model name |
| Web search fails | Disable web search toggle or check provider support |

## Publish fails

| Symptom | Fix |
|---------|-----|
| Note publish without connect | Connect first (gate enforced) |
| Newsletter empty body | Add markdown content before publish |
| Substack API error | Check cookie; verify publication URL |

## Scheduler

| Symptom | Fix |
|---------|-----|
| Jobs stuck pending (Vercel) | Use local `npm run dev` or configure Cron + durable storage |
| Queue lost after deploy | Expected on Vercel `/tmp` — run locally |
| Create disabled on Vercel | By design — see deployment banner |

## Tools API

| Symptom | Fix |
|---------|-----|
| 401 Unauthorized | Set `Authorization: Bearer API_SECRET` |
| 500 on Vercel | Check env vars; view Vercel function logs |

## MCP

| Symptom | Fix |
|---------|-----|
| Tools not appearing | Restart client; verify absolute path in config |
| Stdio errors | Run `npm run mcp` manually to see stderr |

## Still stuck?

- [GitHub Issues](https://github.com/santhosh-patel/substack-agent/issues)
- [Security](/docs/security)
