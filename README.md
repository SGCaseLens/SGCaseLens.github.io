<p align="center">
  <img src="./assets/logo-sgcaselens-mark.svg" alt="SGCaseLens Logo" width="140" />
</p>

<h1 align="center">SGCaseLens - Singapore Application Insights</h1>

> A lightweight data platform for Singapore PR/Citizenship applicants to explore cases, analyze trends, and share experience.

[SGCaseLens](https://sgcaselens.github.io/) is a public website built on real user-submitted cases for Singapore PR/Citizenship applicants. It provides:

- Case browsing and filtering
- Similar-case analysis and trend references
- Anonymous case submission
- Bilingual UI (Chinese/English) with Light/Dark themes

This project is a static website deployed on GitHub Pages, with Supabase as the data backend.

## Pages

- `/`: Dashboard (core metrics, trend charts, quick guide)
- `/pages/cases.html`: Case library (filters, sorting, detail dialog)
- `/pages/submit.html`: Submit case (structured form, terms checkbox)
- `/pages/insights.html`: Insights (similar cases, comparison charts)
- `/pages/trends.html`: Trend Center (descriptive trends by industry/income)
- `/pages/my-cases.html`: My Cases (query and management entry)
- `/pages/edit.html?t=TOKEN`: Edit case (verification-based flow)
- `/pages/terms.html`: Terms and Conditions

## Tech Stack

- Frontend: HTML + CSS + JavaScript (no framework build)
- Charts: ECharts
- Backend: Supabase (PostgreSQL + RPC + RLS)
- Hosting: GitHub Pages

## Local Development

This is a static site. You can run it with any static server, for example:

```bash
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173`.

## JavaScript Minification

Built-in minification command (using `terser`):

```bash
npm install
npm run minify-js
```

This command minifies `js/*.js` in place.

## Supabase Notes

Frontend connection settings are in `js/config.js` (`supabaseUrl` + `anon key`).

RLS + policies are used with least-privilege principles:

- Anonymous users only get required capabilities (e.g. constrained insert)
- Public reads are limited to approved records
- Anonymous update/delete is denied

Related SQL and ops scripts are in `Doc/` (security health checks, anti-abuse, test-data cleanup, etc.).

## Security and Disclaimer

- This site provides historical samples and statistical references only. It is not legal advice and does not guarantee immigration outcomes.
- The platform includes input validation, baseline anti-abuse controls, and database policy protection. Regular security checks are still recommended.

## Deployment

Push to the default branch and enable GitHub Pages to publish.

## Contribution Guide

Issues and pull requests are welcome. Please follow the rules below.

### Branch and PR Rules

- Create feature branches from the latest default branch, e.g. `feat/mobile-nav`, `fix/rls-policy`
- Keep one PR focused on one topic (feature, fix, or docs)
- PR title suggestions:
  - `feat: ...` new feature
  - `fix: ...` bug fix
  - `docs: ...` documentation update
  - `refactor: ...` code refactor (no behavior change)
- PR description should include:
  - Why
  - What changed
  - How to test
  - Risk and rollback notes (especially for Supabase SQL)

### Commit Convention

Use Conventional Commits:

```text
<type>(optional-scope): <subject>
```

Common types:

- `feat`: new feature
- `fix`: bug fix
- `docs`: documentation change
- `style`: style/format only (no logic changes)
- `refactor`: refactor (no new feature, no bug fix)
- `test`: tests
- `chore`: tooling, scripts, dependency maintenance

Examples:

- `feat(nav): add mobile-friendly top menu`
- `fix(submit): prevent duplicate submission during pending request`
- `docs(readme): add contribution guide`

### Pre-Submission Checklist

- Pass frontend self-checks (theme switch, i18n, submission flow, charts)
- Run JS minification when `js/*.js` changed:
  - `npm install`
  - `npm run minify-js`
- Do not commit sensitive information (keys, credentials, production exports)
- For SQL changes, document in PR:
  - Impact scope (tables, policies, triggers)
  - Execution order
  - Rollback SQL

### Database and Security Change Requirements

- For RLS/policy changes, include validation results at minimum:
  - Anonymous read is limited to approved data
  - Anonymous write is constrained by least privilege
  - Anonymous update/delete is denied
- Validate in a test environment before production whenever possible.
