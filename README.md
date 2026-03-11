# SG Application Insights (MVP)

Static website for SGCaseLens, deployed via GitHub Pages.

## Pages
- `/` Dashboard
- `/pages/cases.html` Case library with filters
- `/pages/submit.html` Structured case submission (direct approval, no moderation)
- `/pages/insights.html` Similar case insights via RPC
- `/pages/trends.html` Trend charts
- `/pages/my-cases.html` My submissions (local list, edit links)
- `/pages/edit.html?t=TOKEN` Edit own case (token-only, no login)

## Supabase
Config is in `js/config.js`.
- Schema: run `Doc/supabase_anonymous_submission.sql` in Supabase SQL Editor
- Verify key (nickname+birthday for cross-device edit): run `Doc/supabase_verify_key.sql`
- Mock data: run `Doc/seed_mock_data.sql` to insert 500 test cases

## Deploy
Push to `main` (or default branch) and enable GitHub Pages.
