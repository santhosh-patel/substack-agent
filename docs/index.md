# Substack Agent Documentation

Substack Agent connects your publication to AI assistants and automation tools. There is **no official Substack publishing API** — this project uses session-based authentication to bridge that gap.

## Choose your path

| Mode | Best for | Command |
|------|----------|---------|
| **Local Dashboard** | Hands-on publishing, AI compose, scheduler | `npm run dev` → `/playground` |
| **Tools API** | n8n, Custom GPTs, webhooks | Any Node host + `API_SECRET` |
| **MCP Server** | Claude Desktop, Cursor chat workflows | `npm run mcp` |

## Quick links

- [Install & setup](/docs/getting-started/install)
- [Session cookie guide](/docs/getting-started/session-cookie)
- [Open Playground](/playground)
- [OpenAPI spec](/openapi.json)
- [Security](/docs/security)
- [GitHub repository](https://github.com/santhosh-patel/substack-agent)

## What you can do

- Publish newsletters (draft or live)
- Post Substack Notes with optional link cards
- Automate comments on target accounts by keyword
- Schedule recurring posts (local server recommended)
- Expose 9 MCP tools or REST endpoints to external agents

## Next steps

1. [Install](/docs/getting-started/install) the project locally
2. [Extract your session cookie](/docs/getting-started/session-cookie)
3. [Publish your first draft](/docs/getting-started/first-publish)
