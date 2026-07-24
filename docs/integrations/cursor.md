# Cursor Integration

Add Substack Agent as an MCP server in Cursor.

## Setup

1. Open **Cursor Settings** → **MCP** (or edit MCP config file)
2. Add server entry:

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

## Usage

In Agent or Chat mode, ask Cursor to use Substack tools:

- "Use publish_newsletter to draft a post about..."
- "List my scheduled posts"

## Next steps

- [MCP setup](/docs/mcp/setup)
- [Tools reference](/docs/mcp/tools)
