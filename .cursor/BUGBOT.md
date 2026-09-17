# Review checklist

Personal portfolio: Vite + React 18 + TypeScript SPA on GitHub Pages (`base: '/portfolio-website/'` in `vite.config.ts`). Client routing is `react-router-dom` with that basename. No backend or auth. Routes: `/`, `/work`, `/work/:slug`, `/about`, `/contact`. Home order: Hero → Proof bar → Selected work → How I work / AI honesty → Compact stack → Contact strip + footer.

## Deployment and secrets

- Production path is `/portfolio-website/`. Asset, router, and fetch URLs keep the Vite `base`. `BrowserRouter` uses `import.meta.env.BASE_URL`.
- Deep links (`/work`, `/work/:slug`, `/about`, `/contact`) rely on the built `dist/404.html` SPA fallback (copy of `index.html`).
- No secrets in `src/`, committed env files, or client bundles. `.env` is gitignored; `.env.example` may document public Vite keys only.
- Sentry is optional via `import.meta.env.VITE_SENTRY_DSN` in `src/sentry.ts`. An empty DSN is expected. Extra client telemetry or hardcoded DSNs are not.

## Accessibility

Interactive controls have accessible names (visible text, `aria-label`, or `aria-labelledby`). Footer icons are labeled Email / LinkedIn / GitHub. The mobile header control is named Open menu / Close menu. Nav lives in `src/components/layout/Header.tsx` (Work · About · Contact).

## Content and design

- UI metrics must be real and sourced.
- Empty proof chips stay hidden.
- Site copy lives in `src/data/`. Unfinished strings stay labeled `[placeholder: …]`.
- Tokens live in `src/index.css` and `tailwind.config.js`. Accent is `#0EA5E9`. Flag green primary CTAs (`#48A111`) and dark-mode toggles.
- Selected work is a grid. Case results badge `measured` | `proxy` | `projected`; proxy is not shown as measured.
- This site does not include `/writing` or a live `/lab`.

## Local preview helper

`.cursor/skills/verify-portfolio/` is a local preview helper, not a runtime dependency. It is not listed in `package.json`. Cleanup kills only pids written to that run’s `state.json`. Product UI does not call `eval` or `Runtime.evaluate`.

## Safety

Worth flagging in `src/` or lockfile changes:

- `eval`, `new Function`, or `exec`
- `dangerouslySetInnerHTML` or unchecked HTML injection
- `target="_blank"` without `rel="noopener noreferrer"`
- Unexpected new runtime dependencies or copyleft licenses
