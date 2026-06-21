# Substack Agent

Automate Substack publishing, notes, and comments with AI — via a web UI, MCP server, or OpenAPI tool-calling API.

Connect Claude Desktop, Cursor, ChatGPT GPTs, or n8n to publish newsletters, post notes, comment on posts, and run AI-powered comment automation on target accounts.

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
git clone git@personal:santhosh-patel/substack-agent.git
cd substack-agent
npm install
```

### Environment variables

Create a `.env` file in the project root:

```env
SUBSTACK_SID=your-connect-sid-cookie
SUBSTACK_PUB_URL=yourname.substack.com

# Optional — for AI features in the web UI
GROQ_API_KEY=
GEMINI_API_KEY=
OPENAI_API_KEY=

# Optional — required for deployed /api/tools/* endpoints
API_SECRET=your-random-secret
```

**Getting your Substack session cookie**

1. Log in to [substack.com](https://substack.com) in your browser
2. Open DevTools → Application → Cookies
3. Copy the value of `connect.sid`

### Run locally

```bash
# Web UI + REST API (http://localhost:3456)
npm run dev

# MCP server (stdio)
npm run mcp
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

When deployed (or running locally with `API_SECRET` set), agents can call tool endpoints over HTTP:

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

Set environment variables in the Vercel dashboard (`SUBSTACK_SID`, `SUBSTACK_PUB_URL`, `API_SECRET`, and any AI keys). The included `vercel.json` routes `/api/*` to the Express server and serves the web UI from `public/`.

## Project structure

```
├── api/index.ts          # Vercel serverless entry
├── public/               # Web UI (HTML, CSS, JS)
├── src/
│   ├── ai/generate.ts    # AI content & comment generation
│   ├── lib/substack-client.ts
│   ├── mcp-server.ts     # MCP stdio server
│   ├── routes/api.ts     # Web UI REST routes
│   ├── routes/tools.ts   # OpenAPI tool endpoints
│   └── server.ts         # Local Express server
└── scripts/test-apis.js  # API smoke tests
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start web UI and API on port 3456 |
| `npm run mcp` | Start MCP server over stdio |
| `npm run test:api` | Run API smoke tests |

## License

MIT
