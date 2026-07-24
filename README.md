# Substack Agent

**Automate your Substack publication with AI agents.**

Connect Substack to Claude, Cursor, ChatGPT, and n8n — publish newsletters, post notes, and engage programmatically.

## Three ways to run

| Mode | Command | Docs |
|------|---------|------|
| **Local Dashboard** | `npm run dev` → `/playground` | [Dashboard guide](/docs/dashboard/overview) |
| **Tools API** | Deploy anywhere + `API_SECRET` | [Deploy guide](/docs/deployment/deploy) · `GET /api/tools/health` |
| **MCP Server** | `npm run mcp` | [MCP setup](/docs/mcp/setup) |

Full documentation: browse [`docs/`](docs/index.md) in this repo, or visit **`/docs`** when the app is running locally or deployed.

## Quickstart

```bash
git clone https://github.com/santhosh-patel/substack-agent.git
cd substack-agent && npm install
cp .env.example .env
# Add SUBSTACK_SID and SUBSTACK_PUB_URL — see /docs/getting-started/session-cookie
npm run dev
# Open http://localhost:3456/playground
```

## MCP tools (9)

`publish_newsletter` · `publish_note` · `post_comment` · `automate_comments` · `list_newsletters` · `list_notes` · `list_comments` · `schedule_post` · `list_schedules`

## Links

- [Documentation](docs/index.md) (source) · `/docs` when app is running
- [Playground](/playground)
- [OpenAPI spec](/openapi.json)
- [Security](SECURITY.md)
- [Contributing](CONTRIBUTING.md)
- [Changelog](docs/changelog.md)

## License

[MIT](LICENSE)
