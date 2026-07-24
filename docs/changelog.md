# Changelog

All notable changes to Substack Agent are documented here.

## [2.2.0] — 2026

### Added
- GitHub Actions CI: build, auth tests, API smoke tests
- Full-text docs search, lazy-loaded `/docs` route, code-split syntax highlighting
- Integrations copy-toast feedback on landing
- Session error payloads on Tools API (`SESSION_EXPIRED`, clear cookie refresh message)
- Playground connection test with cookie-expiry toasts

### Changed
- CONTRIBUTING documents changelog sync process for releases

## [2.1.0] — 2026

### Added
- Remote MCP over HTTP at `/api/mcp` (Streamable HTTP, Bearer auth)
- Shared MCP tool handlers in `src/mcp/tools.ts` (stdio + HTTP)
- Playground split into ES modules under `public/js/`
- `GET /api/tools/health` for deploy smoke tests
- Docker deploy, `npm start`, Railway/Render/Fly docs
- Connection modes diagram on landing; remote MCP docs

### Changed
- Deploy-anywhere messaging across landing and docs
- macOS-style code windows unified via `shared/mac-window.css`
- Playground deployment banners (dashboard vs Tools API vs scheduler limits)
- Removed Vercel `crons` from `vercel.json` (optional external cron documented)

## [2.0.0] — 2026

### Added
- In-app documentation site at `/docs`
- Full product upgrade: deployment modes, use cases, comparison, deploy CTA
- Playground onboarding checklist and cookie extraction guide
- REST API: `POST /api/tools/schedule-post`, `GET /api/tools/list-schedules`
- GitHub stars in trust bar, OpenAPI link in tools grid
- Vercel deployment mode warnings in playground
- FAQ accordion, responsive CSS rewrite
- macOS-style code window cards across landing, docs, and playground

### Changed
- Deploy messaging reframed as any-host Tools API; use your domain with agents and automations (Vercel optional)
- Removed simulated playground modal; all CTAs route to `/playground`
- Updated security documentation for localStorage behavior
- Hero showcase status relabeled to "Example"
- `list_comments` documented as automation log

### Fixed
- Note publish gated on connection state
- Footer brand link, anchor scroll offset

## [1.0.0] — Initial release

- MCP server with Substack publishing tools
- Local web dashboard and REST tools API
- AI-powered newsletter and note generation
