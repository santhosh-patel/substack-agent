# Substack Agent

Automate Substack from a web UI, MCP server, or HTTP API. Publish newsletters, post notes, comment on posts, and run AI-powered comment automation.

Works with Claude Desktop, Cursor, ChatGPT, n8n, and any OpenAPI-aware agent.

## What it does

- Publish newsletters (draft or live)
- Post notes and comments
- Auto-comment on relevant posts from target accounts
- List newsletters, notes, and comment history
- Generate content with Groq, Gemini, or OpenAI

## Setup

**Requirements:** Node.js 18+, Substack account, `connect.sid` session cookie

```bash
git clone https://github.com/santhosh-patel/substack-agent.git
cd substack-agent
npm install
cp .env.example .env
```

Fill in `.env`:

```env
SUBSTACK_SID=          # connect.sid cookie from substack.com
SUBSTACK_PUB_URL=      # yourname.substack.com
API_SECRET=            # required for production / tool API
```

Optional: `GROQ_API_KEY`, `GEMINI_API_KEY`, or `OPENAI_API_KEY` for AI features.

To get your session cookie: log in to Substack → DevTools → Application → Cookies → `connect.sid`.

## Run

```bash
npm run dev    # Web UI at http://localhost:3456
npm run mcp    # MCP server (stdio)
```

## MCP

Add to Claude Desktop or Cursor:

```json
{
  "mcpServers": {
    "substack": {
      "command": "npx",
      "args": ["tsx", "/path/to/substack-agent/src/mcp-server.ts"],
      "env": {
        "SUBSTACK_SID": "...",
        "SUBSTACK_PUB_URL": "yourname.substack.com"
      }
    }
  }
}
```

**Tools:** `publish_newsletter` · `publish_note` · `post_comment` · `automate_comments` · `list_newsletters` · `list_notes` · `list_comments`

## HTTP API

Tool endpoints live at `/api/tools/*`. Full spec: [`public/openapi.json`](public/openapi.json)

Auth: `Authorization: Bearer <API_SECRET>`

## Deploy

```bash
vercel
```

Set `SUBSTACK_SID`, `SUBSTACK_PUB_URL`, and `API_SECRET` in your environment.

---

Contributing → [CONTRIBUTING.md](CONTRIBUTING.md) · Security → [SECURITY.md](SECURITY.md) · [MIT License](LICENSE)
