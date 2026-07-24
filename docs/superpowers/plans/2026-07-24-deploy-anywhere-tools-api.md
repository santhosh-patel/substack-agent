# Deploy-Anywhere Tools API Messaging Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reframe landing + README so the Tools API is “deploy anywhere, use your domain,” with no Vercel-required CTA.

**Architecture:** Copy and CTA updates only across existing React landing components and README/CHANGELOG. No new deploy buttons, no remote MCP transport, no playground/SECURITY scheduler-banner changes.

**Tech Stack:** React (landing-page Vite app), static README Markdown, `npm run build:landing` to sync into `public/`.

**Spec:** `docs/superpowers/specs/2026-07-24-deploy-anywhere-tools-api-design.md`

## Global Constraints

- Do **not** claim remote/hosted MCP over HTTP; MCP remains local stdio (`npm run mcp`).
- Soft wording allowed: use your domain with agents, automations, and MCP-style tool clients.
- Vercel may appear only as an optional example host.
- No new one-click deploy buttons (Vercel, Railway, Render, Fly, etc.).
- Do not edit playground Vercel banners in `public/app.js` or scheduler caveats in `SECURITY.md` / README “Scheduler on Vercel”.
- There is no `npm start` script; use `npm run dev` for Node-host run instructions.
- Repo URL: `https://github.com/santhosh-patel/substack-agent`

## File map

| File | Responsibility |
|------|----------------|
| `landing-page/src/components/DeployCTA.jsx` | Deploy section CTA (docs primary, GitHub secondary) |
| `landing-page/src/components/DeploymentModes.jsx` | Three-mode cards; Tools API + MCP wording |
| `landing-page/src/components/UseCases.jsx` | Automation use-case copy |
| `landing-page/src/components/Integrations.jsx` | REST method subtitle + highlights |
| `landing-page/src/components/HowItWorks.jsx` | Step 03 launch copy |
| `landing-page/src/components/FAQ.jsx` | Free/OSS, cookie, n8n answers |
| `landing-page/src/components/TrustBar.jsx` | Replace Vercel pill with OpenAPI |
| `README.md` | HTTP API blurb, Deploy section, deployment modes table |
| `CHANGELOG.md` | One Changed line |
| `public/` (via build) | Built landing output |

---

### Task 1: Redesign Deploy CTA

**Files:**
- Modify: `landing-page/src/components/DeployCTA.jsx`
- Test: grep verification (no automated unit tests for marketing copy)

**Interfaces:**
- Consumes: existing `DeployCTA.css` classes (`.deploy-actions`, `.btn-accent`, `.btn-outline`)
- Produces: primary docs link + secondary GitHub link; no Vercel clone URL

- [ ] **Step 1: Replace `DeployCTA.jsx` content**

Overwrite `landing-page/src/components/DeployCTA.jsx` with:

```jsx
import './DeployCTA.css';

const envVars = ['SUBSTACK_SID', 'SUBSTACK_PUB_URL', 'API_SECRET'];

export default function DeployCTA() {
  return (
    <section className="deploy-cta" id="deploy">
      <div className="container">
        <div className="deploy-card animate-in">
          <span className="section-badge">Deploy</span>
          <h2 className="section-title">Deploy the Tools API anywhere</h2>
          <p className="deploy-subtitle">
            Host the OpenAPI tools endpoints on any Node host. Then use your domain with agents, automations, and MCP-style tool clients (n8n, custom GPTs, webhooks). Keep local <code>npm run mcp</code> / <code>npm run dev</code> for Claude Desktop and the full dashboard.
          </p>

          <div className="deploy-env-checklist">
            <span className="deploy-env-label">Required environment variables:</span>
            <ul>
              {envVars.map((v) => (
                <li key={v}><code>{v}</code></li>
              ))}
            </ul>
          </div>

          <div className="deploy-actions">
            <a
              href="https://github.com/santhosh-patel/substack-agent#deploy"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent btn-lg"
            >
              Deployment docs
            </a>
            <a
              href="https://github.com/santhosh-patel/substack-agent"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-lg"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify CTA has no Vercel button**

Run:

```bash
rg -n "Deploy to Vercel|vercel.com/new/clone" "landing-page/src/components/DeployCTA.jsx"
```

Expected: no matches.

- [ ] **Step 3: Commit**

```bash
git add landing-page/src/components/DeployCTA.jsx
git commit -m "$(cat <<'EOF'
Update Deploy CTA for deploy-anywhere Tools API.

EOF
)"
```

---

### Task 2: Update DeploymentModes, HowItWorks, UseCases

**Files:**
- Modify: `landing-page/src/components/DeploymentModes.jsx`
- Modify: `landing-page/src/components/HowItWorks.jsx`
- Modify: `landing-page/src/components/UseCases.jsx`

**Interfaces:**
- Consumes: existing component CSS and section structure
- Produces: copy aligned with any-host + local MCP

- [ ] **Step 1: Update `DeploymentModes.jsx` mode data**

In `modes` array, set the `api` and `mcp` entries to:

```js
  {
    id: 'api',
    title: 'Deployed Tools API',
    command: 'any Node host + API_SECRET',
    bestFor: 'n8n, GPTs, webhooks, production automations',
    limits: 'Stateless tool calls only. Bearer auth required in production. Point clients at your domain.',
    cta: { label: 'View OpenAPI', href: '/openapi.json' },
  },
  {
    id: 'mcp',
    title: 'Local MCP Server',
    command: 'npm run mcp',
    bestFor: 'Claude Desktop, Cursor, chat-native workflows',
    limits: 'Stdio transport. Runs locally alongside your MCP client.',
    cta: { label: 'GitHub Setup', href: 'https://github.com/santhosh-patel/substack-agent#2-mcp-server' },
  },
```

Leave the `local` mode unchanged.

- [ ] **Step 2: Update `HowItWorks.jsx` step 03**

Replace the step `03` object with:

```js
  {
    step: '03',
    title: 'Launch & Connect',
    desc: 'Start the MCP server locally, or deploy the Tools API to any Node host and use your domain for HTTP tool clients.',
    code: 'npm run mcp        # For Claude / Cursor\nnpm run dev        # For Dashboard / Tools API',
  },
```

- [ ] **Step 3: Update `UseCases.jsx` Automation Engineer case**

Replace the Automation Engineer `desc` with:

```js
    desc: 'Deploy the REST tools API anywhere and wire n8n, Zapier, or custom GPTs to your domain with Bearer auth.',
```

- [ ] **Step 4: Verify required phrases**

Run:

```bash
rg -n "any Node host|your domain|not hosted on Vercel|Deploy the REST tools API to Vercel" \
  landing-page/src/components/DeploymentModes.jsx \
  landing-page/src/components/HowItWorks.jsx \
  landing-page/src/components/UseCases.jsx
```

Expected:
- Matches for `any Node host` and `your domain`
- No match for `not hosted on Vercel`
- No match for `Deploy the REST tools API to Vercel`

- [ ] **Step 5: Commit**

```bash
git add landing-page/src/components/DeploymentModes.jsx \
  landing-page/src/components/HowItWorks.jsx \
  landing-page/src/components/UseCases.jsx
git commit -m "$(cat <<'EOF'
Reframe deployment modes and use cases as any-host.

EOF
)"
```

---

### Task 3: Update Integrations, FAQ, TrustBar

**Files:**
- Modify: `landing-page/src/components/Integrations.jsx`
- Modify: `landing-page/src/components/FAQ.jsx`
- Modify: `landing-page/src/components/TrustBar.jsx`

**Interfaces:**
- Consumes: existing tabs/FAQ accordion/trust pills UI
- Produces: Vercel-optional / OpenAPI-forward copy

- [ ] **Step 1: Update REST method in `Integrations.jsx`**

In the `api` method object, set:

```js
    subtitle: 'Deployable on any Node host for n8n, GPTs & custom workflows',
    desc: 'Fully typed OpenAPI 3.0 endpoints. Call `/api/tools/*` on your domain from n8n, custom GPTs, Zapier, or backend webhooks.',
    highlights: ['Any Host', 'OpenAPI Schema', 'n8n & Zapier', 'Bearer Auth'],
```

Leave `code` and other methods unchanged.

- [ ] **Step 2: Update FAQ answers in `FAQ.jsx`**

Replace these three answer strings only:

```js
    a: 'Yes. It is published under the MIT license. You can deploy it locally, host it on any Node host (for example Vercel), or include it in proprietary agent pipelines without restrictions.',
```

```js
    a: 'Your connect.sid cookie is equivalent to your Substack password. In the playground, it is saved in browser localStorage and sent to your Substack Agent server when you connect. In MCP/API mode, store it in .env or your host environment variables only. Never share it publicly — rotate immediately if exposed.',
```

```js
    a: 'Yes. Deploy the REST API endpoints to any Node host and point HTTP Request nodes at your domain with Bearer authorization.',
```

(These correspond to the free/OSS, cookie safety, and n8n/Zapier FAQ entries.)

- [ ] **Step 3: Update `TrustBar.jsx` integrations list**

Replace:

```js
  { name: 'Vercel' },
```

with:

```js
  { name: 'OpenAPI' },
```

- [ ] **Step 4: Verify**

Run:

```bash
rg -n "Vercel Ready|Deployable on Vercel|Deploy the REST API endpoints to Vercel|name: 'Vercel'" \
  landing-page/src/components/Integrations.jsx \
  landing-page/src/components/FAQ.jsx \
  landing-page/src/components/TrustBar.jsx
```

Expected: no matches.

Also:

```bash
rg -n "Any Host|any Node host|OpenAPI" \
  landing-page/src/components/Integrations.jsx \
  landing-page/src/components/FAQ.jsx \
  landing-page/src/components/TrustBar.jsx
```

Expected: matches in all three files.

- [ ] **Step 5: Commit**

```bash
git add landing-page/src/components/Integrations.jsx \
  landing-page/src/components/FAQ.jsx \
  landing-page/src/components/TrustBar.jsx
git commit -m "$(cat <<'EOF'
De-emphasize Vercel in integrations, FAQ, and trust bar.

EOF
)"
```

---

### Task 4: Rewrite README deploy story

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: existing `#deploy` heading (keep so CTA links still resolve)
- Produces: any-host Deploy section; Tools API row not Vercel-only; Scheduler on Vercel subsection unchanged

- [ ] **Step 1: Update HTTP API blurb**

In `README.md` under `### 3. HTTP API`, replace:

```markdown
Deploy to Vercel (or any Node host) and call OpenAPI-defined endpoints. Any tool that speaks HTTP can publish to Substack on your behalf.
```

with:

```markdown
Deploy to any Node host and call OpenAPI-defined endpoints at your domain. Use that URL with agents, automations, and MCP-style tool clients. Any tool that speaks HTTP can publish to Substack on your behalf.
```

- [ ] **Step 2: Replace the Deploy section**

Replace the entire `## Deploy` section (from `## Deploy` through the blank line before `## Security model`) with the following content (write it exactly into `README.md`):

~~~~markdown
## Deploy

Host the Tools API on any Node platform (Vercel, Railway, a VPS, etc.).

1. Set these environment variables on your host:

```env
SUBSTACK_SID=
SUBSTACK_PUB_URL=
API_SECRET=
```

2. Run the server on your host with Node 18+ (locally: `npm run dev`). Example optional path: deploy this repo with the Vercel CLI (`vercel`) if that is your preferred host.

3. Call your Tools API:

```bash
curl -X POST "https://your-domain/api/tools/publish-newsletter" \
  -H "Authorization: Bearer $API_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"title":"Hello","body":"Markdown body","isDraft":true}'
```

OpenAPI spec: `https://your-domain/openapi.json` (also in [`public/openapi.json`](public/openapi.json)).

Use your domain with agents, automations, and MCP-style tool clients (n8n, custom GPTs, webhooks). Claude Desktop and Cursor continue to use the local MCP server via `npm run mcp`.
~~~~

Keep the `#deploy` heading text as `## Deploy` so existing anchors work.

- [ ] **Step 3: Update deployment modes table Tools API row**

Replace the table with:

```markdown
| Mode | Command | Works on Vercel | Notes |
|------|---------|-----------------|-------|
| **Local dashboard** | `npm run dev` | Partial | Full scheduler, history, AI compose at `http://localhost:3456/playground` |
| **Tools API** | any Node host + `API_SECRET` | Yes | Stateless `/api/tools/*` for n8n, GPTs, webhooks — point clients at your domain |
| **MCP server** | `npm run mcp` | No (local stdio) | Claude Desktop / Cursor integration |
```

Do **not** edit the `### Scheduler on Vercel` subsection.

- [ ] **Step 4: Verify**

Run:

```bash
rg -n "^## Deploy$|your-domain|any Node host|npm run mcp" README.md
rg -n "Scheduler on Vercel" README.md
rg -n "^\`\`\`bash$|^vercel$" README.md
```

Expected:
- `## Deploy`, `your-domain`, `any Node host`, `npm run mcp` present
- `Scheduler on Vercel` still present
- Standalone Deploy section is no longer only a bare `vercel` command as the whole guide (a mention of `vercel` as optional example is fine)

- [ ] **Step 5: Commit**

```bash
git add README.md
git commit -m "$(cat <<'EOF'
Document any-host Tools API deploy and domain usage.

EOF
)"
```

---

### Task 5: CHANGELOG, rebuild landing, final verification

**Files:**
- Modify: `CHANGELOG.md`
- Modify: `public/index.html` and `public/assets/*` (via `npm run build:landing`)

**Interfaces:**
- Consumes: all landing JSX changes from Tasks 1–3
- Produces: built static landing reflecting deploy-anywhere copy

- [ ] **Step 1: Add CHANGELOG Changed line**

Under `## [2.0.0] — 2026` → `### Changed`, add:

```markdown
- Deploy messaging reframed as any-host Tools API; use your domain with agents and automations (Vercel optional)
```

- [ ] **Step 2: Rebuild landing into `public/`**

Run:

```bash
npm run build:landing
```

Expected: build succeeds; `public/index.html` and assets updated.

- [ ] **Step 3: Final verification grep**

Run from repo root:

```bash
rg -n "Deploy the Tools API to Vercel|Deploy to Vercel|vercel.com/new/clone|Vercel Ready|Deployable on Vercel" \
  landing-page/src README.md CHANGELOG.md
```

Expected: no matches in `landing-page/src` or `CHANGELOG.md`. README may mention Vercel only as an optional example / scheduler caveat (not as a required CTA).

Also confirm soft domain wording exists:

```bash
rg -n "MCP-style tool clients|your domain" landing-page/src/components/DeployCTA.jsx README.md
```

Expected: matches in both files.

Confirm non-goals untouched:

```bash
rg -n "deploymentMode === 'vercel'|Scheduler on Vercel" public/app.js README.md SECURITY.md
```

Expected: still present (do not remove).

- [ ] **Step 4: Commit**

```bash
git add CHANGELOG.md public/index.html public/assets
git commit -m "$(cat <<'EOF'
Ship deploy-anywhere landing build and changelog note.

EOF
)"
```

---

## Spec coverage checklist

| Spec requirement | Task |
|------------------|------|
| Deploy CTA headline/subtitle/actions | Task 1 |
| DeploymentModes / UseCases / HowItWorks | Task 2 |
| Integrations / FAQ / TrustBar | Task 3 |
| README HTTP API + Deploy + modes table | Task 4 |
| CHANGELOG Changed line | Task 5 |
| Soft MCP-style domain wording | Tasks 1, 4 |
| No remote MCP / no new deploy buttons | Global + Tasks 1–5 |
| Keep Scheduler on Vercel / playground banners | Tasks 4–5 verification |
