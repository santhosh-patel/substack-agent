# Comments Automation

Automate contextual replies on a target Substack account's posts.

## Setup

1. Connect to Substack in [Settings](/docs/dashboard/settings)
2. Configure AI provider key
3. Go to **Comments** tab

## Parameters

| Field | Description |
|-------|-------------|
| Target account | `@username`, publication URL, or post ID |
| Keyword | Only comment on posts matching this keyword |
| Instructions | Optional prompt for comment tone/style |

## Run

Click **Run Automation**. The console shows live logs as posts are scanned and commented on.

## Stop button

**Stop** cancels the **browser request only**. The server may continue processing the current automation run until completion.

## API equivalent

- Dashboard: `POST /api/comments/automate`
- Tools API: `POST /api/tools/automate-comments`
- MCP: `automate_comments`

## Next steps

- [Troubleshooting](/docs/troubleshooting)
