# Changelog

All notable changes to Substack Agent are documented here.

## [2.0.0] — 2026

### Added
- Full product upgrade: deployment modes section, use cases, comparison table, deploy CTA
- Playground onboarding checklist and cookie extraction guide
- REST API endpoints: `POST /api/tools/schedule-post`, `GET /api/tools/list-schedules`
- GitHub stars in trust bar, OpenAPI link in tools grid
- Vercel deployment mode warnings in playground
- FAQ accordion, responsive CSS rewrite across landing page

### Changed
- Removed simulated playground modal; all CTAs route to `/playground`
- Updated security documentation to reflect localStorage behavior
- Hero showcase status relabeled from "Connected" to "Example"
- `list_comments` documented as automation log, not Substack inbox

### Fixed
- Note publish gated on Substack connection state
- Footer brand link, anchor scroll offset for fixed navbar

## [1.0.0] — Initial release

- MCP server with Substack publishing tools
- Local web dashboard and REST tools API
- AI-powered newsletter and note generation
