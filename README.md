# Substack Agent

**Automate your Substack publication with AI agents.**

Substack Agent connects your publication to the tools you already use — Claude, Cursor, ChatGPT, and n8n — so you can publish, engage, and manage content programmatically instead of doing everything by hand.

---

## Why I built this

Substack is great for writing, but it was not built for automation. There is no official public API for publishing newsletters, posting notes, or commenting at scale. If you use AI assistants daily, that gap becomes obvious quickly: your agent can draft content, but it cannot act on Substack without a bridge.

I created Substack Agent to solve that. It gives AI agents a reliable, structured way to interact with Substack — publish a newsletter from a Claude conversation, post a note from a workflow, or scan relevant posts and leave thoughtful comments without switching tabs all day.

Whether you are a solo writer, a growth-focused creator, or building agent-powered workflows, this project turns Substack into something your tools can actually use.

---

## How to use it

Substack Agent works in three ways. Pick the one that fits your workflow.

### 1. Web dashboard

Best for: manual control with AI-assisted drafting.

Run the local server and open the UI in your browser. Connect your Substack session, generate posts with Groq/Gemini/OpenAI, preview markdown live, and publish or save as draft.

```bash
npm run dev
# Open http://localhost:3456
```

### 2. MCP server

Best for: Claude Desktop, Cursor, and other MCP-compatible clients.

Add the server to your MCP config. Your AI assistant gets native tools to publish newsletters, post notes, comment on posts, and list your content — directly from chat.

```json
{
  "mcpServers": {
    "substack": {
      "command": "npx",
      "args": ["tsx", "/path/to/substack-agent/src/mcp-server.ts"],
      "env": {
        "SUBSTACK_SID": "your-connect-sid-cookie",
        "SUBSTACK_PUB_URL": "yourname.substack.com"
      }
    }
  }
}
```

```bash
npm run mcp
```

**Available tools:** `publish_newsletter` · `publish_note` · `post_comment` · `automate_comments` · `list_newsletters` · `list_notes` · `list_comments`

### 3. HTTP API

Best for: deployed integrations, GPTs, n8n, and custom agents.

Deploy to Vercel (or any Node host) and call OpenAPI-defined endpoints. Any tool that speaks HTTP can publish to Substack on your behalf.

- Spec: [`public/openapi.json`](public/openapi.json)
- Base path: `/api/tools/*`
- Auth: `Authorization: Bearer <API_SECRET>`

---

## What you can do

| Capability | Description |
|------------|-------------|
| Publish newsletters | Draft or publish live and email subscribers |
| Post notes | Short updates with optional link cards |
| Comment on posts | By post URL or ID |
| Automate comments | AI scans a target account, matches posts by keyword, and comments on relevant ones |
| List content | Browse recent newsletters, notes, and comment history |
| Generate with AI | Use Groq, Gemini, or OpenAI for drafting and comment generation |

---

## Getting started

**Requirements:** Node.js 18+, a Substack account, and your `connect.sid` session cookie.

```bash
git clone https://github.com/santhosh-patel/substack-agent.git
cd substack-agent
npm install
cp .env.example .env
```

Configure `.env`:

```env
SUBSTACK_SID=          # connect.sid from browser cookies
SUBSTACK_PUB_URL=      # e.g. yourname.substack.com
API_SECRET=            # required for production / HTTP API

# Optional — for AI generation features
GROQ_API_KEY=
GEMINI_API_KEY=
OPENAI_API_KEY=
```

**Session cookie:** Log in to [substack.com](https://substack.com) → DevTools → Application → Cookies → copy `connect.sid`.

> Never commit `.env` or share your session cookie. Treat it like a password.

---

## Deploy

```bash
vercel
```

Set `SUBSTACK_SID`, `SUBSTACK_PUB_URL`, and `API_SECRET` in your deployment environment.

---

## Contributing

Issues and pull requests are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines and [SECURITY.md](SECURITY.md) for reporting vulnerabilities.

## License

[MIT](LICENSE)
