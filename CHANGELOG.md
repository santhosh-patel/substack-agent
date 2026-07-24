# Changelog

All notable changes to Substack Agent are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] — 2026-07-24

### Added
- Docs link in the landing navbar (desktop); absolute `/#section` links so Features/Integrations work from `/docs`
- Route error boundary for `/docs` so render failures show a recoverable UI
- Hash scroll on the marketing page for `/#features`-style deep links
- CI pipeline: `lint-build` (Node 20.19 / 22) and `api-smoke` (Node 22)
- Static CI checks (`npm run ci:static`): docs nav ↔ markdown, OpenAPI ↔ tool routes, public assets, `.env.example`, changelog parity
- Credential-free HTTP smoke suite (`npm run test:smoke`)
- Dependabot for root npm, landing-page npm, and GitHub Actions
- `scripts/sync-landing-dist.mjs` to copy Vite output into `public/` reliably in CI

### Changed
- Node engine requirement: `^20.19.0 || >=22.12.0` (Vite 8)
- Landing build script uses `npm run build --prefix landing-page` + sync script (no fragile shell globs)
- CI job/step names clarified (`lint-build`, `api-smoke`, typed step titles)
- `.env` load no longer overwrites variables already set in the environment
- Server `PORT` is configurable via `process.env.PORT` (default `3456`)
- API smoke tests skip credential-gated cases instead of failing when secrets are missing
- Hero showcase uses inner panes instead of nested Mac window chrome
- Playground app header: removed logo image; responsive icon tabs and wrapping layout

### Fixed
- Docs page crash: `rehypePlugins is not defined` in `DocsPageContent`
- Favicon `404` — build now copies `favicon.svg` / `icons.svg` into `public/`
- Stale hashed landing chunks left in `public/assets` after rebuilds
- GitHub Actions build failures on unsupported Node 18 / pre-20.19 runtimes

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
