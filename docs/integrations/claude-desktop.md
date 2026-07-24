# Claude Desktop Integration

Connect Substack Agent to Claude Desktop via MCP.

## Config file location

| OS | Path |
|----|------|
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |

## Configuration

```json
{
  "mcpServers": {
    "substack": {
      "command": "npx",
      "args": ["tsx", "/absolute/path/to/substack-agent/src/mcp-server.ts"],
      "env": {
        "SUBSTACK_SID": "your-connect-sid",
        "SUBSTACK_PUB_URL": "yourname.substack.com",
        "GROQ_API_KEY": "optional-for-automate_comments"
      }
    }
  }
}
```

Use absolute paths. Restart Claude Desktop after saving.

## Verify

Ask Claude: "What Substack tools do you have?" — you should see 9 tools.

## Example prompts

- "Publish a draft newsletter titled Weekly Update with body about AI agents"
- "List my recent newsletters"
- "Post a note about our new feature launch"

## Next steps

- [MCP tools reference](/docs/mcp/tools)
- [Session cookie](/docs/getting-started/session-cookie)
