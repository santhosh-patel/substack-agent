# MCP Tools Reference

All 9 tools exposed by `src/mcp-server.ts`.

## publish_newsletter

Publish or draft a newsletter.

```json
{
  "title": "Weekly Digest",
  "subtitle": "Optional subtitle",
  "body": "# Markdown content",
  "isDraft": false
}
```

## publish_note

Post a short note.

```json
{
  "body": "Quick update for readers",
  "link": "https://example.com/optional-link"
}
```

## post_comment

Comment on a specific post.

```json
{
  "postUrl": "https://example.substack.com/p/post-slug",
  "body": "Great insights!"
}
```

## automate_comments

Scan a target account and AI-reply to keyword-matching posts.

```json
{
  "targetAccount": "@tech_insights",
  "keyword": "AI agents",
  "provider": "groq",
  "model": "llama-3.3-70b-versatile"
}
```

## list_newsletters

Returns recent newsletter archive posts (no parameters).

## list_notes

Returns recent notes from your publication (no parameters).

## list_comments

Returns **local automation comment log** — not Substack's full comment inbox.

## schedule_post

Queue a post for future publishing.

```json
{
  "title": "Scheduled Post",
  "body": "Markdown body",
  "scheduledAt": "2026-08-01T14:00:00Z",
  "recurrence": "weekly",
  "postType": "newsletter",
  "isDraft": true
}
```

## list_schedules

Returns all scheduled posts with status and recurrence metadata.

## REST API equivalents

See [Tools API Endpoints](/docs/api/endpoints) for HTTP versions of these operations.

## Next steps

- [Limitations](/docs/mcp/limitations)
