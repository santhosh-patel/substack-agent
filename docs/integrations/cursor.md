# Cursor Integration

Use Substack Agent tools inside Cursor via **local stdio MCP** or **remote HTTP MCP** on your deployed domain.

## Option A — Local stdio (recommended for development)

1. Open **Cursor Settings** → **MCP**
2. Add a server entry:

```json
{
  "mcpServers": {
    "substack": {
      "command": "npx",
      "args": ["tsx", "/absolute/path/to/substack-agent/src/mcp-server.ts"],
      "env": {
        "SUBSTACK_SID": "your-connect-sid",
        "SUBSTACK_PUB_URL": "yourname.substack.com"
      }
    }
  }
}
```

3. Restart Cursor or reload MCP servers

Use an **absolute path** to `src/mcp-server.ts` on your machine.

## Option B — Remote MCP (deployed instance)

If Substack Agent runs at your domain with `API_SECRET` and `SUBSTACK_SID`:

```json
{
  "mcpServers": {
    "substack-remote": {
      "url": "https://your-domain/api/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_SECRET"
      }
    }
  }
}
```

Full guide: [Remote MCP](/docs/mcp/remote).

## Usage in chat

Ask Cursor Agent to call tools explicitly:

- "Use `publish_newsletter` to draft a post about…"
- "Call `list_schedules` to show my queue"
- "Post a note with `publish_note`"

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Tools not listed | Restart Cursor; verify absolute path (stdio) or URL + Bearer (remote) |
| Auth errors | Refresh `SUBSTACK_SID` — [Session cookie](/docs/getting-started/session-cookie) |
| Stdio crash | Run `npm run mcp` in terminal to read stderr |

## Related

- [MCP setup](/docs/mcp/setup)
- [Tools reference](/docs/mcp/tools)
- [Troubleshooting](/docs/troubleshooting)
