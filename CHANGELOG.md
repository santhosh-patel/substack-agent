# Changelog

All notable changes to Substack Agent are documented here.

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
