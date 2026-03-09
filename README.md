# SG Application Insights (MVP)

Static website for SGCaseLens, deployed via GitHub Pages.

## Pages
- `/` Dashboard
- `/pages/cases.html` Case library with filters
- `/pages/submit.html` Structured case submission
- `/pages/insights.html` Similar case insights via RPC
- `/pages/auth.html` Magic link login
- `/pages/admin.html` Moderation queue (RLS-protected)

## Supabase
Config is in `js/config.js`.
Before full production, execute full SQL schema from `SGCaseLens.md` in Supabase.

## Deploy
Push to `main` (or default branch) and enable GitHub Pages.
