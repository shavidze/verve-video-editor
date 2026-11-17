# Verve Content Studio

Next.js dashboard for the Verve video production system (brand profile, job plans, model costs, model comparison).

- Deploy on Vercel with the repository root as the root directory.
- Set `APP_PASSWORD` in the Vercel project settings. Without it the site refuses all requests.
- `npm run build` copies data from `brands/` and `jobs/` into `data/` and `public/logo/`.

The video pipeline (agents, FFmpeg scripts) lives in `shavidze/verve-ai-content-starter`.
