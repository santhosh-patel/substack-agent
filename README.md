# Substack Agent

Automate Substack publishing, notes, and comments with AI — via a web UI, MCP server, or OpenAPI tool-calling API.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Connect Claude Desktop, Cursor, ChatGPT GPTs, or n8n to publish newsletters, post notes, comment on posts, and run AI-powered comment automation.

## Features

- **Publish newsletters** — Create drafts or publish live and email subscribers
- **Post notes** — Short Substack notes with optional link cards
- **Comment on posts** — Post comments by URL or post ID
- **Automate comments** — Scan a target account's recent posts, match against a keyword with AI, and auto-comment on relevant posts (with deduplication)
- **List content** — Browse recent newsletters, notes, and comment history
- **Web dashboard** — Tabbed UI for posts, comments, and newsletters with live markdown preview
- **MCP server** — Native tools for Claude Desktop, Claude Code, and Cursor
- **OpenAPI tools API** — Bearer-authenticated endpoints for any OpenAPI-aware agent

## Quick start

### Prerequisites

- Node.js 18+
- A Substack account with publication access
- Your Substack `connect.sid` session cookie
- (Optional) AI provider API key — Groq, Gemini, or OpenAI — for generation and comment automation

### Install

```bash
git clone https://github.com/santhosh-patel/substack-agent.git
cd substack-agent
npm install
cp .env.example .env
```

### Environment variables

Edit `.env` with your values:

| Variable | Required | Description |
|----------|----------|-------------|
| `SUBSTACK_SID` | Yes | Substack `connect.sid` session cookie |
| `SUBSTACK_PUB_URL` | Yes | Your publication hostname (e.g. `yourname.substack.com`) |
| `GROQ_API_KEY` | No | Groq API key for AI features |
| `GEMINI_API_KEY` | No | Google Gemini API key |
| `OPENAI_API_KEY` | No | OpenAI API key |
| `API_SECRET` | Production | Bearer token for `/api/tools/*` endpoints |

**Getting your Substack session cookie**

1. Log in to [substack.com](https://substack.com) in your browser
2. Open DevTools → Application → Cookies
3. Copy the value of `connect.sid`

> **Security:** Never commit `.env` or share session cookies. The web UI does not expose server-side secrets — API keys can be set in `.env` and used server-side, or entered manually in the UI per session.

### Run locally

```bash
# Web UI + REST API (http://localhost:3456)
npm run dev

# MCP server (stdio)
npm run mcp

# API smoke tests
npm run test:api
```

## MCP setup (Claude Desktop / Cursor)

Add to your MCP config (`claude_desktop_config.json` or Cursor MCP settings):

```json
{
  "mcpServers": {
    "substack": {
      "command": "npx",
      "args": ["tsx", "/absolute/path/to/substack-agent/src/mcp-server.ts"],
      "env": {
        "SUBSTACK_SID": "your-sid-cookie",
        "SUBSTACK_PUB_URL": "yourname.substack.com"
      }
    }
  }
}
```

### MCP tools

| Tool | Description |
|------|-------------|
| `publish_newsletter` | Publish or draft a newsletter (title, subtitle, markdown body) |
| `publish_note` | Post a short note with optional link |
| `post_comment` | Comment on a post by URL or ID |
| `automate_comments` | AI-powered comment automation on a target account |
| `list_newsletters` | List your 25 most recent newsletters |
| `list_notes` | List your 25 most recent notes |
| `list_comments` | List comments posted through this tool |

## OpenAPI tools API

When deployed with `API_SECRET` set, agents can call tool endpoints over HTTP:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/tools/publish-newsletter` | POST | Publish or draft a newsletter |
| `/api/tools/publish-note` | POST | Post a note |
| `/api/tools/post-comment` | POST | Comment on a post |
| `/api/tools/automate-comments` | POST | Run comment automation |
| `/api/tools/list-newsletters` | GET | List recent newsletters |
| `/api/tools/list-notes` | GET | List recent notes |
| `/api/tools/list-comments` | GET | List comment history |

Full schema: [`public/openapi.json`](public/openapi.json)

Authenticate with `Authorization: Bearer <API_SECRET>`.

## Deploy to Vercel

```bash
vercel
```

Set `SUBSTACK_SID`, `SUBSTACK_PUB_URL`, and **`API_SECRET`** (required) in the Vercel dashboard. Add AI keys if you use generation or comment automation.

## Project structure

```
├── api/index.ts              # Vercel serverless entry
├── public/                   # Web UI and OpenAPI spec
├── src/
│   ├── ai/generate.ts        # AI content & comment generation
│   ├── data/                 # Runtime comment history (gitignored)
│   ├── lib/substack-client.ts
│   ├── mcp-server.ts         # MCP stdio server
│   ├── routes/api.ts         # Web UI REST routes
│   ├── routes/tools.ts       # OpenAPI tool endpoints
│   └── server.ts             # Local Express server
└── scripts/test-apis.js      # API smoke tests
```

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

For security concerns, see [SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE) © Santhosh Patel
