# Substack Agent Documentation

Substack has **no official publishing API**. Substack Agent bridges that gap using your browser session cookie and exposes your publication to AI assistants, automations, and a local web dashboard.

> **New here?** Pick a path below, then follow the linked guide — most users are running in under 10 minutes.

## Choose your path

| I want to… | Start here | Command / URL |
|------------|------------|---------------|
| **Use the web UI** — compose with AI, schedule posts, view history | [Install](/docs/getting-started/install) → [First publish](/docs/getting-started/first-publish) | `npm run dev` → `/playground` |
| **Automate via HTTP** — n8n, Custom GPTs, webhooks | [Tools API overview](/docs/api/overview) → [Deploy](/docs/deployment/deploy) | `https://your-domain/api/tools/*` |
| **Use Claude / Cursor locally** — chat-native tools | [MCP setup](/docs/mcp/setup) | `npm run mcp` (stdio) |
| **Use MCP on your domain** — remote agents | [Remote MCP](/docs/mcp/remote) | `https://your-domain/api/mcp` |

## How the pieces fit together

```
┌─────────────────────────────────────────────────────────────┐
│  Clients                                                    │
│  • Playground UI    • n8n / GPTs    • Claude / Cursor       │
└────────────┬────────────────┬─────────────────┬─────────────┘
             │                │                 │
             ▼                ▼                 ▼
     /api/* (no auth)  /api/tools/*      /api/mcp
                        Bearer auth       Bearer auth
             │                │                 │
             └────────────────┴─────────────────┘
                              │
                    Substack Agent server
                              │
                              ▼
                    Substack (session API)
```

| Surface | Auth | Best for |
|---------|------|----------|
| **Playground** `/playground` | None (local trust) | Hands-on publishing, scheduler, AI compose |
| **Tools API** `/api/tools/*` | `Bearer API_SECRET` | Production automations at your domain |
| **Remote MCP** `/api/mcp` | `Bearer API_SECRET` | MCP clients against a deployed host |
| **Local MCP** stdio | Env vars in client config | Claude Desktop, Cursor on your machine |

## Learning paths

### Path A — Local publisher (recommended first)

1. [Install](/docs/getting-started/install)
2. [Session cookie](/docs/getting-started/session-cookie)
3. [First publish](/docs/getting-started/first-publish)
4. Explore [Newsletters](/docs/dashboard/newsletters), [Scheduler](/docs/dashboard/scheduler), [History](/docs/dashboard/history)

### Path B — Production automation

1. [Deployment modes](/docs/deployment/modes) — confirm Tools API fits your use case
2. [Environment variables](/docs/getting-started/environment-variables) — set `API_SECRET`, `SUBSTACK_SID`
3. [Deploy the Tools API](/docs/deployment/deploy) — verify with `/api/tools/health`
4. [Endpoints](/docs/api/endpoints) or [OpenAPI](/docs/api/openapi) — wire n8n or Custom GPT

### Path C — AI assistant (MCP)

1. [MCP setup](/docs/mcp/setup) for local stdio, **or** [Remote MCP](/docs/mcp/remote) for deployed
2. [Tools reference](/docs/mcp/tools) — all 9 tools
3. [Claude Desktop](/docs/integrations/claude-desktop) or [Cursor](/docs/integrations/cursor)

## What you can automate

- **Newsletters** — draft or publish with Markdown body
- **Notes** — short posts with optional link cards
- **Comments** — post on a thread or automate by keyword on a target account
- **Scheduling** — one-off or recurring queue (local server recommended)
- **Read** — list newsletters, notes, and automation comment history

## Quick reference

| Resource | Link |
|----------|------|
| Open playground | [/playground](/playground) |
| OpenAPI spec | [/openapi.json](/openapi.json) |
| Health check | `GET /api/tools/health` (Bearer auth) |
| Security model | [Security](/docs/security) |
| Something broken? | [Troubleshooting](/docs/troubleshooting) |
| GitHub | [santhosh-patel/substack-agent](https://github.com/santhosh-patel/substack-agent) |

## Prerequisites

- **Node.js 18+** and npm
- A **Substack account** you control
- A fresh **`connect.sid`** cookie ([guide](/docs/getting-started/session-cookie))
- For AI features: an API key from Groq, Gemini, OpenAI, or OpenRouter
