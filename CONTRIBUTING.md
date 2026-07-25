# Contributing to Substack Agent

Thanks for your interest in contributing! This guide covers forking, branching, pull requests, issues, changelogs, and releases.

## Table of contents

1. [Fork and clone](#fork-and-clone)
2. [Local setup](#local-setup)
3. [Branch naming](#branch-naming)
4. [Development workflow](#development-workflow)
5. [Commit messages](#commit-messages)
6. [Opening a pull request](#opening-a-pull-request)
7. [Changelog discipline](#changelog-discipline)
8. [Reporting issues](#reporting-issues)
9. [Release process (maintainers)](#release-process-maintainers)
10. [Code guidelines](#code-guidelines)
11. [Security](#security)
12. [License](#license)

---

## Fork and clone

### 1. Fork on GitHub

1. Open [github.com/santhosh-patel/substack-agent](https://github.com/santhosh-patel/substack-agent).
2. Click **Fork** (top right) to create a copy under your account.

### 2. Clone your fork

Replace `YOUR_USER` with your GitHub username:

```bash
git clone https://github.com/YOUR_USER/substack-agent.git
cd substack-agent
```

### 3. Add upstream remote

Keep your fork synced with the canonical repository:

```bash
git remote add upstream https://github.com/santhosh-patel/substack-agent.git
git fetch upstream
```

### 4. Sync `main` before starting work

```bash
git checkout main
git pull upstream main
git push origin main
```

---

## Local setup

**Requirements:** Node.js **20.19+** or **22.12+** (Vite 8).

```bash
npm install
npm install --prefix landing-page
cp .env.example .env
# Edit .env — never commit this file
npm run dev
```

Open:

- Landing: [http://localhost:3456/](http://localhost:3456/)
- Playground: [http://localhost:3456/playground](http://localhost:3456/playground)

---

## Branch naming

Create branches from an up-to-date `main`. Use a **type prefix**, optional **scope**, and a **short kebab-case slug**.

### Format

```text
<type>/<short-description>
<type>/<scope>-<short-description>
```

### Types

| Prefix | Use when |
|--------|----------|
| `feat/` | New user-facing capability or API surface |
| `fix/` | Bug fix (non-breaking) |
| `bug/` | Alias for `fix/` — same intent |
| `docs/` | Documentation only (`docs/`, `CONTRIBUTING.md`, README) |
| `chore/` | Tooling, deps, CI, version bumps, no product logic change |
| `refactor/` | Internal restructure, same external behavior |
| `test/` | Tests or smoke scripts only |
| `ci/` | GitHub Actions / CI config |
| `release/` | Release prep (changelog, version bump) — maintainers |

### Examples

```text
feat/playground-fullscreen-preview
fix/sidebar-toggle-dead
bug/security-callout-dismiss
docs/contributing-branch-guide
chore/bump-openapi-version
ci/static-check-playground-js
```

### Rules

- Lowercase letters, numbers, and hyphens only.
- One logical change per branch when possible.
- Do not commit directly to `main` on the upstream repo — use a PR from your fork.

---

## Development workflow

1. **Branch** from `main`:

   ```bash
   git checkout main
   git pull upstream main
   git checkout -b feat/your-feature-name
   ```

2. **Implement** focused changes. Match patterns in `src/`, `public/js/`, and `landing-page/`.

3. **Run checks** before pushing:

   ```bash
   npm run typecheck
   npm run lint
   npm run build && npm run ci:static
   ```

   With the dev server running (`npm run dev`):

   ```bash
   npm run test:auth
   npm run test:smoke
   ```

   Optional live Substack checks (skips missing credentials):

   ```bash
   npm run test:api
   ```

4. **Push** to your fork:

   ```bash
   git push -u origin feat/your-feature-name
   ```

5. **Open a PR** against `main` on the upstream repo (see below).

### Playground JavaScript modules

If you modify files under `public/js/`, avoid running `scripts/wire-playground.mjs` twice — it prepends imports and can duplicate blocks. The script is idempotent as of 1.0.6, but prefer editing wired modules directly unless you know you need a full re-wire.

---

## Commit messages

Use clear, imperative subject lines. Optional body for *why* and *what* changed.

```text
feat(playground): add fullscreen Substack preview overlay

Clone #substackPreviewWrap into #previewFullscreenOverlay on open.
Escape closes when overlay is visible.
```

Prefixes mirror branch types: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `ci`.

---

## Opening a pull request

### From a fork

1. Push your branch to **your fork** (`origin`).
2. On GitHub, open **Compare & pull request** (or **New pull request**).
3. Set:
   - **base repository:** `santhosh-patel/substack-agent` → **base:** `main`
   - **head repository:** `YOUR_USER/substack-agent` → **compare:** your branch
4. Fill out the [PR template](.github/pull_request_template.md):
   - **Summary** — what changed and why
   - **Test plan** — commands you ran
   - **Checklist** — changelog if user-facing, no secrets committed
5. Link related issues: `Fixes #123` or `Closes #123` in the description.

### CI on PRs

GitHub Actions runs:

- **`lint-build`** — Node 20.19 and 22: typecheck, lint, build, `ci:static`
- **`api-smoke`** — Node 22: HTTP smoke tests

Fix failing checks before requesting review.

### After merge

Maintainers delete the branch or you can:

```bash
git checkout main
git pull upstream main
git branch -d feat/your-feature-name
git push origin --delete feat/your-feature-name
```

---

## Changelog discipline

User-facing changes must update **both** files (must stay **identical** — enforced by `npm run ci:static`):

- [`CHANGELOG.md`](CHANGELOG.md) (repo root)
- [`docs/changelog.md`](docs/changelog.md)

### When to update

| Change | Changelog? |
|--------|------------|
| New playground / API / docs feature | **Yes** — `### Added` |
| Bug fix users would notice | **Yes** — `### Fixed` |
| Breaking behavior | **Yes** — `### Changed` + call out breaking |
| Refactor, internal only | Usually no |
| Typo in comment | No |

### Entry format

Follow [Keep a Changelog](https://keepachangelog.com/). Use area subheadings (`#### Playground`, `#### API / MCP`, etc.) and cite files, routes, or DOM ids where helpful. See existing `[1.0.x]` sections in `CHANGELOG.md`.

Add your entry under **`## [Unreleased]`** or the next version section in the same PR as the feature/fix.

---

## Reporting issues

Use GitHub Issues on the [upstream repository](https://github.com/santhosh-patel/substack-agent/issues).

### Bug reports

**Template:** [Bug report](https://github.com/santhosh-patel/substack-agent/issues/new?template=bug_report.yml)

**Title format:** `[Bug]: short summary`

Include:

- Clear description of what went wrong
- **Steps to reproduce** (numbered)
- **Expected** vs **actual** behavior
- **Node.js version** and OS
- Logs or screenshots — **redact** `connect.sid`, API keys, publication URLs, and personal data

Search [existing issues](https://github.com/santhosh-patel/substack-agent/issues) first to avoid duplicates.

### Feature requests

**Template:** [Feature request](https://github.com/santhosh-patel/substack-agent/issues/new?template=feature_request.yml)

**Title format:** `[Feature]: short summary`

Include:

- Problem or use case (who benefits?)
- Proposed solution
- Alternatives considered (optional)

Feature requests do not need a PR upfront — discuss first if the scope is large.

### Questions vs bugs

- **Bug** — something worked before or docs say it should work but does not.
- **Feature** — new capability not promised by current docs/API.
- **Question** — use [Discussions](https://github.com/santhosh-patel/substack-agent/discussions) if enabled, or an issue labeled as question.

---

## Release process (maintainers)

Substack Agent uses [Semantic Versioning](https://semver.org/):

| Bump | When |
|------|------|
| **Patch** `1.0.x` | Bug fixes, small UX tweaks, docs fixes |
| **Minor** `1.x.0` | New features, backward compatible |
| **Major** `x.0.0` | Breaking API or behavior changes |

### Steps

1. Ensure `main` is green in CI.
2. Finalize `CHANGELOG.md` / `docs/changelog.md` with a dated `## [x.y.z]` section.
3. Bump version in:
   - `package.json` / `package-lock.json`
   - `src/routes/tools.ts` (`APP_VERSION`)
   - `src/mcp/create-server.ts`
   - `public/openapi.json` (`info.version`)
   - Docs examples that cite package version (e.g. `docs/api/overview.md`)
4. Merge release PR to `main`.
5. Tag and push:

   ```bash
   git checkout main
   git pull upstream main
   git tag -a v1.1.0 -m "v1.1.0 — summary"
   git push origin v1.1.0
   # or: git push upstream v1.1.0
   ```

6. Optional maintenance branch for hotfixes:

   ```bash
   git branch release/1.1.0 v1.1.0
   git push origin release/1.1.0
   ```

7. Create a [GitHub Release](https://github.com/santhosh-patel/substack-agent/releases/new) from the tag; paste the changelog section.

Changelog compare links at the bottom of `CHANGELOG.md` use `vX.Y.Z` tags (e.g. `compare/v1.0.6...v1.1.0`).

---

## Code guidelines

- Match existing TypeScript and Express patterns in `src/`.
- Keep changes minimal and scoped to the problem.
- Do not commit secrets, session cookies, API keys, or personal runtime data.
- Do not log credentials or partial session tokens.
- Prefer server-side env vars for secrets; the web UI must not receive raw keys from `/api/config`.
- Playground handlers exported to `window` must be listed in `public/js/main.js` → `WINDOW_EXPORTS`.

---

## Security

Do **not** open public issues for security vulnerabilities. See [SECURITY.md](SECURITY.md) for responsible disclosure.

---

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
