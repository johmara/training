# Hybrid Training

Angular 21 rebuild of the 9-week hybrid training tracker. Themed to match
[johmara.github.io](https://johan.martinson.phd) (Inter font, CSS-variable
light/dark theme, same dark-mode toggle).

Deployed to GitHub Pages as a project page at
`https://johmara.github.io/training/`.

## Routes

- `/login` — 4-digit PIN gate (cosmetic only, not real auth)
- `/` — week-by-week schedule, filterable by block (all / base / build / peak)
- `/<workout-slug>` — one page per workout, e.g. `/power-circuit-w1`,
  `/core-achilles-w1`. Slugs are derived from the session name
  (see `slugify` in `src/app/utils/slug.ts`).

## Develop

```
npm start           # http://localhost:4200/
npm test
npm run build
```

Local dev uses base href `/`; the production build bakes in `/training/`
(`ng build --base-href=/training/`) for GitHub Pages.

## Deploy

`.github/workflows/deploy.yml` builds and deploys on every push to `main`
(or manually via the Actions tab). One-time setup: Settings → Pages →
Source: **GitHub Actions** (not "Deploy from a branch").

`legacy/index.html` is the original single-file static version kept for
reference; it is not part of the build.
