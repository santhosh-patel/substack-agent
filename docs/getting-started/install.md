# Install

**Prerequisites:** Node.js 18+, npm, a Substack account.

## Clone and install

```bash
git clone https://github.com/santhosh-patel/substack-agent.git
cd substack-agent
npm install
cp .env.example .env
```

## Configure environment

Edit `.env` with at minimum:

```env
SUBSTACK_SID=
SUBSTACK_PUB_URL=yourname.substack.com
```

See [Environment Variables](/docs/getting-started/environment-variables) for all options.

## Start the local server

```bash
npm run dev
```

Open:

- **Playground:** [http://localhost:3456/playground](http://localhost:3456/playground)
- **Landing page:** [http://localhost:3456/](http://localhost:3456/)

> The landing page is built separately via `npm run build:landing`. During dev, Vite serves the marketing site on its own port if you run `cd landing-page && npm run dev`.

## Other commands

| Command | Purpose |
|---------|---------|
| `npm run mcp` | Start MCP stdio server for Claude/Cursor |
| `npm run build:landing` | Build marketing site into `public/` |
| `npm run test:api` | Smoke-test local dashboard API |

## Next steps

- [Session cookie](/docs/getting-started/session-cookie)
- [First publish](/docs/getting-started/first-publish)
