# First Publish

Publish your first newsletter **draft** from the playground in about five minutes.

## Prerequisites

- [Installed](/docs/getting-started/install) and `npm run dev` running
- [Session cookie](/docs/getting-started/session-cookie) extracted from DevTools
- (Optional) AI provider key for **Generate**

## Step-by-step

### 1. Open the playground

[http://localhost:3456/playground](http://localhost:3456/playground)

### 2. Complete onboarding

The checklist at the top tracks progress:

1. Paste **`connect.sid`** in Settings sidebar → **Test** → **Connect**
2. Select AI provider → paste key → **Test API Key**
3. Publish your first draft (this guide)

### 3. Generate or write content

**Option A — AI generate:**

1. Go to **Newsletters**
2. Enter a topic (e.g. "Weekly update on AI tooling")
3. Optionally enable **web search**
4. Click **Generate**

**Option B — manual:**

Type title, subtitle, and Markdown body directly in the editor.

### 4. Review preview

The right panel shows a **Substack-style preview**. Edit the Markdown on the left — preview updates live.

### 5. Publish as draft

1. Enable **Save as draft** (recommended for first run)
2. Click **Publish**
3. Confirm success toast — draft appears on Substack

## Draft vs live

| Mode | Checkbox | Result |
|------|----------|--------|
| **Draft** | Save as draft **on** | Saved to Substack; not emailed |
| **Live** | Save as draft **off** | Published and emailed to subscribers |

Start with drafts until you trust the workflow.

## After your first publish

- Check Substack's editor for the draft URL
- Explore [Scheduler](/docs/dashboard/scheduler) for timed publishes
- Try [MCP setup](/docs/mcp/setup) for Claude/Cursor

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Publish disabled | Connect Substack first |
| Generate fails | Add/test AI key in Settings |
| 401 / session error | Refresh `connect.sid` — [Troubleshooting](/docs/troubleshooting) |

## Related

- [Newsletters guide](/docs/dashboard/newsletters)
- [Settings](/docs/dashboard/settings)
