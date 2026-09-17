# Bugbot rules — portfolio website

This repo is Alex Bramall’s personal portfolio: a **Vite + React 18 + TypeScript SPA** deployed to **GitHub Pages** with `base: '/portfolio-website/'` (`vite.config.ts`). There is no router, no backend, and no auth. Users stay on one document and scroll between `#home`, `#about`, `#skills`, `#projects`, `#experience`, and `#contact`.

Review for bugs, regressions, and safety. Do not nitpick style. Do not invent product copy, extra pages, or a design system.

## Deployment and client secrets

- Production URL path is `/portfolio-website/`. Flag asset, router, or fetch paths that assume `/` as the app root, or that drop the Vite `base`.
- This is a public static client. **No secrets in `src/`, committed env files, or client bundles.** `.env` is gitignored; `.env.example` may show placeholders only.
- Sentry is optional. The existing pattern is `import.meta.env.VITE_SENTRY_DSN` in `src/sentry.ts` (empty string when unset). Do not flag a missing DSN. Flag new client telemetry, hardcoded DSNs, or additional secret-like env vars that are not this same Vite `VITE_` pattern.

## Accessibility of controls

Prefer **accessible names** on interactive controls (visible text, `aria-label`, or `aria-labelledby`).

- **Flag new icon-only buttons or icon-only links without an accessible name.** Carousel and footer icons already use `aria-label` (`Previous projects` / `Next projects`, `Email` / `LinkedIn` / `GitHub`).
- Known debt: the mobile header hamburger (`src/components/layout/Header.tsx`) is icon-only and unlabeled. Do not require fixing it in unrelated PRs; do flag if a change adds another unnamed control or removes an existing label.
- `src/components/layout/Navigation.tsx` is unused; do not treat it as the live nav.

## Content and design

- **Do not invent portfolio content.** Placeholder/stock material is known debt: lorem ipsum projects in `src/data/*` and Pexels images. Do not block PRs for leaving that debt in place, and do not suggest replacing it with made-up real-sounding work, metrics, or employers.
- **Design source of truth is external** (Editorial Clean). Tokens live in `tailwind.config.js` and `src/index.css`. Do **not** approve large visual token churn (palette, type scale, spacing, radii) without an explicit design handoff in the PR. Leftover one-off colors (for example the contact CTA hex) are not a license to restyle the site.

## Verify-portfolio skill (infra only)

`.cursor/skills/verify-portfolio/` is **verification infrastructure**, not product code.

- Helpers must not become runtime dependencies of the app. Do not add Playwright/Cypress or other test runners to `package.json` “to make verification easier.”
- `helpers/control-portfolio.mjs` may `spawn` / `execSync` for `npm ci`, Vite, and Chrome. That is harness code. Cleanup must kill **only** pids recorded in that run’s `state.json`, after confirming the process is still the owned Vite/Chrome (`/proc/<pid>/cmdline` contains `vite` / the Chrome binary this helper started). **Flag `pkill vite`, `pkill chrome`, glob kills, or killing pids that were not written to `state.json`.**
- Isolation: concurrent runs need distinct `VERIFY_RUN_ID` and `VERIFY_PORT`. The helper uses `--strictPort` and must not attach to a server it did not launch.
- `browser eval` is a CDP escape hatch for the harness. Do not copy `eval` / `Runtime.evaluate` into product UI. Cleanup must never delete `/tmp/verify-portfolio/$VERIFY_RUN_ID/evidence/`.

## Light safety pass

Flag these when they show up in the diff, without turning the review into a generic OWASP essay:

- `eval`, `new Function`, or `exec` in **product** code (`src/`)
- `dangerouslySetInnerHTML` or other unchecked HTML injection
- `target="_blank"` without `rel="noopener noreferrer"`
- Dependency / license surprises in `package.json` / lockfile (copyleft or unexpected new runtime deps). Note lightly; do not bikeshed version bumps that stay in the existing stack (React, Vite, Tailwind, Sentry, Lucide).
