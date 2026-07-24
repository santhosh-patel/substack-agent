# MCP Setup

Run the MCP server locally for Claude Desktop, Cursor, and other stdio-compatible clients.

## Install

```bash
git clone https://github.com/santhosh-patel/substack-agent.git
cd substack-agent && npm install
```

## Claude Desktop

Edit `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "substack": {
      "command": "npx",
      "args": ["tsx", "/absolute/path/to/substack-agent/src/mcp-server.ts"],
      "env": {
        "SUBSTACK_SID": "your-connect-sid-cookie",
        "SUBSTACK_PUB_URL": "yourname.substack.com"
      }
    }
  }
}
```

Restart Claude Desktop. You should see 9 Substack tools available.

## Cursor

Add the same `mcpServers` entry in Cursor MCP settings (stdio transport).

## Run manually

```bash
npm run mcp
```

Server uses stdio — no HTTP port.

## Environment variables

Same as `.env.example`. MCP reads `SUBSTACK_SID` and `SUBSTACK_PUB_URL` from the config env block.

## Next steps

- [Tools reference](/docs/mcp/tools)
- [Limitations](/docs/mcp/limitations)
- [Claude Desktop cookbook](/docs/integrations/claude-desktop)
