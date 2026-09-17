# Bugbot rules — portfolio website

This repo is Alex Bramall’s personal portfolio: a **Vite + React 18 + TypeScript SPA** deployed to **GitHub Pages** with `base: '/portfolio-website/'` (`vite.config.ts`). Client routing is **react-router-dom** with that basename. There is no backend and no auth. Routes: `/`, `/work`, `/work/:slug`, `/about`, `/contact`. Home modules: Hero → Proof bar → Selected work → How I work / AI honesty → Compact stack → Hire CTA + footer.

Review for bugs, regressions, and safety. Do not nitpick style. Do not invent product copy, extra pages, or a competing design system.

## Deployment and client secrets

- Production URL path is `/portfolio-website/`. Flag asset, router, or fetch paths that assume `/` as the app root, or that drop the Vite `base`. `BrowserRouter` must use `import.meta.env.BASE_URL` (or the same `/portfolio-website/` prefix).
- Deep links (`/work`, `/work/:slug`, `/about`, `/contact`) on GitHub Pages require the built `dist/404.html` SPA fallback (copy of `index.html`). Flag removing that fallback.
- This is a public static client. **No secrets in `src/`, committed env files, or client bundles.** `.env` is gitignored; `.env.example` may show placeholders only.
- Sentry is optional. The existing pattern is `import.meta.env.VITE_SENTRY_DSN` in `src/sentry.ts` (empty string when unset). Do not flag a missing DSN. Flag new client telemetry, hardcoded DSNs, or additional secret-like env vars that are not this same Vite `VITE_` pattern.

## Accessibility of controls

Prefer **accessible names** on interactive controls (visible text, `aria-label`, or `aria-labelledby`).

- **Flag new icon-only buttons or icon-only links without an accessible name.** Footer icons use `aria-label` (`Email` / `LinkedIn` / `GitHub`). The mobile header control is named `Open menu` / `Close menu`.
- Live nav is `src/components/layout/Header.tsx` (Work · About · Contact, primary Hire). Do not treat deleted layout files as the live nav.

## Content and design

- **Do not invent portfolio content or metrics.** Remaining Phase 1 copy is labeled placeholders (`[placeholder: hero.value_prop]`, `work.card.*`, etc.). Locked strings that replace a placeholder (for example `hero.role_line`) are not invented content. Do not block PRs for leaving other placeholders, and do not suggest replacing them with made-up real-sounding work, metrics, or employers.
- **Proof bar must hide empty chips.** Never invent numbers to fill it.
- **Design source of truth is Modern AI Signal** (locked Design SoT: https://app.notion.com/p/3de6d089ce1881a8b57de6a133a31d95). Tokens live in `src/index.css` and `tailwind.config.js`. Editorial Clean is deprecated. Accent is `#0EA5E9`. **Flag green CTAs** (`#48A111`, emerald fill used as a primary button) and any dark-mode toggle. Do not revive magazine-scale display type or a projects carousel.
- Selected work is a **grid**, not a carousel. Case results must badge `measured` | `proxy` | `projected` and must not present proxy as measured.
- `/writing` and live `/lab` are out of scope for Phase 1.

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
- Dependency / license surprises in `package.json` / lockfile (copyleft or unexpected new runtime deps). Note lightly; do not bikeshed version bumps that stay in the existing stack (React, Vite, Tailwind, Sentry, Lucide, React Router).
