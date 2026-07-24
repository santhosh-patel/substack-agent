# Settings

The settings sidebar controls Substack connection and AI provider configuration.

## Substack Account

| Field | Description |
|-------|-------------|
| Session cookie | Your `connect.sid` value |
| Publication URL | e.g. `yourname.substack.com` |

**Test** validates the cookie without persisting a session. **Connect** establishes the server session.

Cookie guide: [Session Cookie](/docs/getting-started/session-cookie)

## AI Provider

Supported providers:

- Groq
- Gemini
- OpenAI
- OpenRouter

Select provider → model → paste API key → **Test API Key** → **Save API Key**.

Keys are stored in browser `localStorage` per provider unless set in server `.env`.

## System Prompt

Customize AI writing instructions for newsletters and notes. Reset to default anytime.

## Security notice

Settings display a warning: cookies and keys are stored locally and sent to your server on connect. See [Security](/docs/security).

## Next steps

- [First publish](/docs/getting-started/first-publish)
