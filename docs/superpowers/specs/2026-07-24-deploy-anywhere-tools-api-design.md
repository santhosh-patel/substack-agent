# Deploy-Anywhere Tools API Messaging

**Date:** 2026-07-24  
**Status:** Approved for implementation planning

## Goal

Reframe Substack Agent’s Tools API deploy story as **host anywhere**, then **use your domain** with agents, automations, and MCP-style tool clients. Remove the implication that Vercel is required. Vercel may appear only as an optional example host.

Do **not** claim remote/hosted MCP over HTTP. MCP remains local stdio (`npm run mcp`). Soft wording is allowed: use your domain with agents, automations, and MCP-style tool clients.

## Non-goals

- No new one-click deploy buttons (Vercel, Railway, Render, Fly, etc.)
- No remote MCP / SSE / HTTP MCP transport implementation
- No changes to playground Vercel deployment-mode banners or scheduler caveats in `SECURITY.md` / README “Scheduler on Vercel” (those stay as factual Vercel limits)

## Deploy CTA (`DeployCTA.jsx`)

| Element | Spec |
|---------|------|
| Headline | Deploy the Tools API anywhere |
| Subtitle | Host the OpenAPI tools endpoints on any Node host. Then use your domain with agents, automations, and MCP-style tool clients (n8n, custom GPTs, webhooks). Keep local `npm run mcp` / `npm run dev` for Claude Desktop and the full dashboard. |
| Env checklist | Unchanged: `SUBSTACK_SID`, `SUBSTACK_PUB_URL`, `API_SECRET` |
| Primary CTA | **Deployment docs** → GitHub README `#deploy` |
| Secondary CTA | **GitHub** → repository root |
| Removed | Deploy to Vercel button and clone URL |

## Landing copy map

| Component | Change |
|-----------|--------|
| `DeploymentModes.jsx` | Tools API command: `any Node host + API_SECRET`. MCP limits: keep local stdio; remove “not hosted on Vercel.” |
| `UseCases.jsx` | Automation case: deploy Tools API anywhere; wire n8n/Zapier/GPTs via your domain + Bearer auth. |
| `Integrations.jsx` | REST subtitle: any Node host. Highlight `Any Host` instead of `Vercel Ready`. |
| `HowItWorks.jsx` | Step 03: launch MCP locally or deploy Tools API and use your domain for HTTP tool clients. |
| `FAQ.jsx` | Free/OSS, cookie storage, and n8n answers: any host / your deployment URL; Vercel only as optional example. |
| `TrustBar.jsx` | Replace `Vercel` pill with `OpenAPI`. |

## README

### HTTP API blurb

Lead with any Node host (not “Deploy to Vercel”).

### Deploy section

Replace the Vercel-only `vercel` snippet with an any-host guide:

1. Set `SUBSTACK_SID`, `SUBSTACK_PUB_URL`, `API_SECRET` in the host environment.
2. Run on any Node host (`npm start` / platform of choice; Vercel optional example).
3. Call `https://your-domain/api/tools/*` with `Authorization: Bearer <API_SECRET>`; OpenAPI at `/openapi.json`.
4. Soft note: use that domain with agents, automations, and MCP-style tool clients. Claude Desktop / Cursor continue to use local `npm run mcp`.

### Deployment modes table

Tools API row: not Vercel-only. Keep the separate “Scheduler on Vercel” subsection as an optional host-specific caveat.

## CHANGELOG

Add one **Changed** line for deploy-anywhere messaging (landing + README).

## Success criteria

- No landing CTA implies Vercel is required.
- Users can find docs + GitHub as the path to deploy and use their own domain.
- MCP is still described as local; domain usage is for HTTP/OpenAPI-style clients with soft MCP-style wording only.
- Factual Vercel scheduler/ephemeral-storage warnings remain where they already exist.
