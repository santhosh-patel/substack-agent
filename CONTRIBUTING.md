# Contributing to Substack Agent

Thanks for your interest in contributing! This guide covers how to get started, what we expect in pull requests, and how to report issues safely.

## Getting started

1. Fork the repository and clone your fork.
2. Install dependencies: `npm install`
3. Copy the environment template: `cp .env.example .env`
4. Fill in your local `.env` values (never commit this file).
5. Start the dev server: `npm run dev`

## Development workflow

1. Create a branch from `main` with a descriptive name (e.g. `fix/connect-timeout`, `feat/list-drafts`).
2. Make focused changes — one logical change per pull request when possible.
3. Run smoke tests if you touched API routes: `npm run test:api`
4. Open a pull request against `main` and fill out the PR template.

## Code guidelines

- Match existing TypeScript and Express patterns in `src/`.
- Keep changes minimal and scoped to the problem being solved.
- Do not commit secrets, session cookies, API keys, or personal runtime data.
- Do not log credentials or partial session tokens.
- Prefer server-side env vars for secrets; the web UI should never receive raw keys from `/api/config`.

## Reporting bugs

Open a [bug report](https://github.com/santhosh-patel/substack-agent/issues/new) and include:

- Steps to reproduce
- Expected vs actual behavior
- Node.js version and OS
- Relevant logs (redact cookies, API keys, and personal URLs)

## Feature requests

Open a [feature request](https://github.com/santhosh-patel/substack-agent/issues/new) describing the use case and why it fits this project.

## Security issues

Do **not** open public issues for security vulnerabilities. See [SECURITY.md](SECURITY.md) for responsible disclosure.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
