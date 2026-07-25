# Changelog

All notable changes to **Substack Agent** are documented in this file.

- **Format:** [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
- **Versioning:** [Semantic Versioning](https://semver.org/spec/v2.0.0.html) (`1.0.x` patches, `1.x.0` minors)
- **Mirror:** [`docs/changelog.md`](docs/changelog.md) must stay identical (enforced by `npm run ci:static`)

## How entries are organized

Each release uses standard Keep a Changelog sections (`Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`).

Within a section, bullets are grouped by **area** (subheading) and written for engineers:

| Area | Scope |
|------|--------|
| **Playground** | `public/playground.html`, `public/js/`, `public/styles.css` |
| **API / MCP** | `src/routes/`, `src/mcp/`, OpenAPI, Tools API |
| **Landing / Docs** | `landing-page/`, `docs/`, `public/index.html` |
| **CI / Build** | `.github/workflows/`, `scripts/`, `package.json` engines |
| **Tooling** | Maintainer scripts (`scripts/wire-playground.mjs`, etc.) |

Bullets cite files, routes, env keys, or runtime behavior where useful. User-facing impact is implied by the technical change.

---

## [1.1.0] — 2026-07-25

> Release engineering, changelog structure, and contributor workflow documentation.

### Added

#### CI / Build — Release tags
- **Annotated git tags** `v1.0.0` … `v1.0.6` on `main` — monotonic on git history; enables GitHub compare URLs in the changelog footer (`compare/v1.0.5...v1.0.6`, etc.).
- **`release/1.0.6` branch** — maintenance branch pointing at `v1.0.6` for hotfixes.

| Tag | Commit | Scope |
|-----|--------|--------|
| `v1.0.0` | `e23b5a5` | MCP server, Tools API, playground |
| `v1.0.1` | `35088e4` | `/docs`, onboarding, scheduling API |
| `v1.0.2` | `9fc5a6f` | Remote MCP HTTP, `public/js/` ES modules |
| `v1.0.3` | `bcb4752` | CI static checks, docs search |
| `v1.0.4` | `10b8abe` | Node 20.19+, landing asset sync |
| `v1.0.5` | `d8fd1b5` | Playground tooltips, reconnect, sidebar UX |
| `v1.0.6` | `bb7567c` | Security callout, fullscreen preview, JS bundle fixes |

#### Maintainer docs
- **`CONTRIBUTING.md` rewrite** — fork/upstream workflow, branch naming (`feat/`, `fix/`, `bug/`, `docs/`, `chore/`, etc.), PR steps from fork, issue templates (bug vs feature), changelog rules, semver release/tag process for maintainers.

### Changed

#### Maintainer docs
- **Changelog format** — area-scoped subheadings, technical bullets, compare-link footer; preamble documents structure and mirror requirement (`CHANGELOG.md` ↔ `docs/changelog.md`).
- **Package version** — `1.1.0` in `package.json`, `APP_VERSION` (`src/routes/tools.ts`), MCP server metadata (`src/mcp/create-server.ts`), `public/openapi.json`.

---

## [1.0.6] — 2026-07-25

> Playground module load reliability, Settings sidebar UX, and newsletter preview fullscreen.

### Added

#### Playground — Settings
- **`dismissSecurityCallout()`** — exported on `window` via `public/js/main.js` (`WINDOW_EXPORTS`); hides `#securityCallout` and persists `localStorage` key `security_callout_dismissed_v1`.
- **`initSecurityCallout()`** — restores hidden state on load; runs before `await PG.loadConfigFromBackend()` so UI init is not blocked by `/api/config`.
- **Scrollable Settings body** — `aside.card .card-body` uses `flex: 1; min-height: 0; overflow-y: auto` so `#settingsPanel` content scrolls inside the sticky sidebar max-height.

#### Playground — Newsletters compose
- **Fullscreen Substack preview** — `#substackPreviewWrap` clone into `#previewFullscreenOverlay`; `openPreviewFullscreen()` / `closePreviewFullscreen()` in `public/js/publish.js`; expand control in `.editor-pane-header--actions`; Escape closes when overlay is visible; fullscreen typography via `.substack-preview-wrap--fullscreen` (~680px reading column).

### Fixed

#### Playground — JavaScript bundle
- **Nav tabs and sidebar toggle dead** — root cause: duplicate `import PG` / `const` alias blocks in `public/js/{tabs,history,publish,notes,comments,models,scheduler-core,scheduler-polling}.js` from running `scripts/wire-playground.mjs` twice → `SyntaxError: Identifier 'PG' has already been declared` → `main.js` never attached `window.switchTab`, `window.toggleSidebar`, etc.
- **Name collisions in wired modules** — removed `const` re-exports that shadowed local functions (e.g. `updatePreviewMetadata` in `publish.js`, scheduler helpers in `scheduler-core.js` / `scheduler-polling.js`).

#### Playground — Settings
- **Security notice × button inert** — dismiss listener was registered only after `await PG.loadConfigFromBackend()`; replaced with `onclick="dismissSecurityCallout()"` on `#securityCalloutDismiss`.

#### Tooling
- **`scripts/wire-playground.mjs`** — idempotent re-run: `stripExistingWire()` removes prior import/assign footer; `FILE_DEPS` filtered with `!fnExports.includes(dep)`; deps list trimmed for symbols defined in-file (`updatePreviewMetadata`, scheduler formatters, polling log helpers).

---

## [1.0.5] — 2026-07-25

> Playground chrome, tooltips, reconnect flow, and web-search control styling.

### Added

#### Playground
- **`title` / `aria-label` tooltips** on nav tabs, settings fields, compose/scheduler/history controls, and dynamically rendered queue/history actions.
- **Reconnect profile card** — `#connectionBadge` click/keydown calls `openSidebarAndFocusSid()` when `.is-actionable`; focuses `#sid` and surfaces reconnect toast.

### Changed

#### Playground — Layout & chrome
- **`#sidebarToggle`** — Lucide `settings` icon; `syncSidebarToggleUi()` updates `aria-expanded` and title for collapsed state.
- **Web search** — checkbox replaced with themed `.feature-toggle` in compose (`#webSearchToggle`) and scheduler (`#schedWebSearchToggle`).
- **Theme** — removed light/dark toggle; `document.body.classList.remove('light-theme')` on init (dark-only playground).

### Fixed

#### Playground — Settings sidebar
- **`#sidebarClose` / `toggleSidebar()`** — panel collapse via `.main-grid.sidebar-collapsed` and `localStorage.sidebar_collapsed`; close button styles restored (`.btn-sidebar-close`).

---

## [1.0.4] — 2026-07-24

> Node 20.19+ baseline, CI hardening, landing/docs routing fixes, asset sync.

### Added

#### Landing / Docs
- **Navbar docs link** (desktop); marketing hash links use absolute `/#section` so `/docs` → home anchors work.
- **`/docs` error boundary** — render failures show recoverable UI instead of blank page.
- **Hash scroll** on `/` for `/#features`, `/#integrations`, etc.

#### CI / Build
- **GitHub Actions** — `lint-build` (Node 20.19 + 22), `api-smoke` (Node 22).
- **`npm run ci:static`** — validates docs nav ↔ markdown files, OpenAPI ↔ tool route names, required `public/` assets, `.env.example` keys, `CHANGELOG.md` ↔ `docs/changelog.md` parity.
- **`npm run test:smoke`** — credential-free HTTP smoke against running server.
- **Dependabot** — root `npm`, `landing-page/npm`, GitHub Actions.
- **`scripts/sync-landing-dist.mjs`** — copies Vite `landing-page/dist` into `public/` (replaces fragile shell globs).

### Changed

#### CI / Build
- **`engines.node`:** `^20.19.0 || >=22.12.0` (Vite 8 requirement).
- **`npm run build:landing`** — `npm run build --prefix landing-page && node scripts/sync-landing-dist.mjs`.
- **CI job names** — `lint-build`, `api-smoke`; descriptive step titles.
- **`.env` loading** — does not overwrite env vars already set in the process environment.
- **`PORT`** — configurable via `process.env.PORT` (default `3456`).
- **API smoke** — skips credential-gated cases when secrets absent instead of failing the job.

#### Landing / Playground
- **Hero showcase** — inner panes only (removed nested Mac window chrome).
- **Playground app header** — removed logo image; responsive icon tabs (`.nav-btn-label`), wrapping `.app-header`.

### Fixed

#### Landing / Docs
- **`DocsPageContent`** crash — `rehypePlugins is not defined`.
- **Favicon 404** — `favicon.svg` / `icons.svg` copied into `public/` on landing build.

#### CI / Build
- **Stale hashed chunks** in `public/assets/` after rebuilds (sync script replaces output cleanly).
- **GHA failures** on Node 18 / pre-20.19 (engine + matrix alignment).

---

## [1.0.3] — 2026

> Docs search, CI expansion, Tools API session errors.

### Added

#### CI
- **GitHub Actions** — build, `npm run test:auth`, API smoke tests.

#### Docs
- **Full-text search**, lazy `/docs` route, code-split syntax highlighting.

#### API
- **Session error payloads** on Tools API — `SESSION_EXPIRED` and explicit cookie-refresh messaging.

#### Playground
- **Connection test** — `testSubstackSession()` surfaces cookie-expiry toasts on 401/session errors.

#### Landing
- **Integrations copy** — toast feedback on clipboard actions.

### Changed

#### Maintainer docs
- **`CONTRIBUTING.md`** — documents syncing `CHANGELOG.md` and `docs/changelog.md` on release.

---

## [1.0.2] — 2026

> Remote MCP HTTP transport, playground ES module split, deploy docs.

### Added

#### API / MCP
- **Remote MCP** — Streamable HTTP at `POST /api/mcp` (Bearer auth).
- **Shared handlers** — `src/mcp/tools.ts` used by stdio MCP and HTTP transport.
- **`GET /api/tools/health`** — deploy smoke endpoint.

#### Playground
- **ES module split** — `public/js/` (`main.js`, `pg.js` namespace, feature modules); `scripts/wire-playground.mjs` for cross-module wiring.

#### Docs
- **Docker / PaaS** — Railway, Render, Fly deploy guides; `npm start`.
- **Connection modes diagram**; remote MCP documentation.

### Changed

#### Product copy
- Deploy-anywhere messaging (Tools API on any host; Vercel optional).

#### Playground
- **Deployment banners** — dashboard `/api/*` vs Bearer Tools API vs Vercel scheduler ephemeral storage.

#### Styles
- **macOS code windows** — unified `shared/mac-window.css` across landing, docs, playground.

#### Deploy
- **Removed Vercel crons** from `vercel.json`; external cron documented for production scheduling.

---

## [1.0.1] — 2026

> In-app docs site, REST scheduling API, playground onboarding, landing refresh.

### Added

#### Docs
- **Documentation site** at `/docs` (served from built landing app).

#### API
- **`POST /api/tools/schedule-post`**
- **`GET /api/tools/list-schedules`**

#### Playground
- **Onboarding checklist** — `#onboardingChecklist`, `localStorage` key `onboarding_checklist_v1`.
- **Cookie extraction guide** — `<details class="cookie-guide">` with link to `/docs/getting-started/session-cookie`.
- **Vercel deployment warnings** — `#deploymentBanner`, `#schedulerDeployBanner`.

#### Landing
- Product sections: deployment modes, use cases, comparison, deploy CTA.
- **FAQ accordion**; responsive CSS rewrite.
- **macOS-style code window cards** across landing, docs, playground.
- GitHub stars in trust bar; OpenAPI link in tools grid.

### Changed

#### Product / UX
- Deploy messaging — any-host Tools API; agents use your domain (Vercel optional).
- Removed simulated playground modal; CTAs route to `/playground`.
- Hero showcase status relabeled **Example**.
- **`list_comments`** documented as automation log output.

#### Security docs
- Updated for browser `localStorage` session/API key persistence.

### Fixed

#### Playground
- **Note publish** gated on `PG.isConnected` / session state.

#### Landing
- Footer brand link; anchor scroll offset for fixed header.

---

## [1.0.0] — Initial release

### Added

#### MCP
- Stdio MCP server with Substack publishing tools (`npm run mcp`).

#### API
- Local REST **Tools API** under `/api/tools/*`.

#### Playground
- Web dashboard at `/playground` — AI newsletter/note generation, comment automation, scheduler UI, history.

#### Core
- AI providers: Groq, Gemini, OpenAI, OpenRouter.
- Substack session via `connect.sid` cookie; publication URL configuration.

---

[1.1.0]: https://github.com/santhosh-patel/substack-agent/compare/v1.0.6...v1.1.0
[1.0.6]: https://github.com/santhosh-patel/substack-agent/compare/v1.0.5...v1.0.6
[1.0.5]: https://github.com/santhosh-patel/substack-agent/compare/v1.0.4...v1.0.5
[1.0.4]: https://github.com/santhosh-patel/substack-agent/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/santhosh-patel/substack-agent/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/santhosh-patel/substack-agent/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/santhosh-patel/substack-agent/compare/v1.0.0...v1.0.1
