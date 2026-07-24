# Comments Automation

Scan a **target Substack account's** recent posts and automatically post AI-generated comments when a **keyword** matches.

## Before you start

- [Connect](/docs/dashboard/settings) to Substack
- Configure an **AI provider key** in Settings
- Understand Substack's community guidelines — use automation responsibly

## Parameters

| Field | Description | Example |
|-------|-------------|---------|
| **Target account** | `@slug`, profile URL, or numeric ID | `@techwriter` |
| **Keyword** | Match phrase in post title/body | `AI agents` |
| **Instructions** | Optional tone/style for generated comments | "Friendly, concise, add one insight" |

## Run automation

1. Open the **Comments** tab
2. Fill target, keyword, and optional instructions
3. Click **Run Automation**
4. Watch the **console** for scan progress, matches, and errors

## Stop behavior

**Stop** cancels the browser HTTP request. The server may finish processing the current batch — refresh logs if unsure.

## Where comments are logged

Successful automation comments append to `src/data/comments_history.json` and appear in the **History** tab.

## API equivalents

| Surface | Route / tool |
|---------|--------------|
| Dashboard | `POST /api/comments/automate` |
| Tools API | `POST /api/tools/automate-comments` |
| MCP | `automate_comments` |

## Tips

- Start with a narrow keyword to avoid spammy matches
- Test with a small target account before broad automation
- Refresh `connect.sid` if comments fail with auth errors

## Related

- [Troubleshooting](/docs/troubleshooting)
- [MCP tools — automate_comments](/docs/mcp/tools)
