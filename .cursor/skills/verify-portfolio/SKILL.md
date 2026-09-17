---
name: verify-portfolio
description: Drive the Alex Bramall Vite+React+TS+Tailwind portfolio website in a real browser to prove user-visible behavior. Use when verifying navigation, section content, screenshots, or any UI change for this repo.
---

# Verify portfolio website

This repo is a **single-page** Vite + React + TypeScript + Tailwind portfolio. A user never leaves one document: they scroll (or click nav) between `#home`, `#about`, `#skills`, `#projects`, `#experience`, and `#contact`. There is no in-repo Playwright/Cypress harness. Drive the **production preview** (same `base` as GitHub Pages) through the Chrome CDP helper this skill ships.

Read `features/README.md` before proving a change. Drive the mapped feature that matches the user-visible area you touched, not a convenient neighbor.

## Launch

From the repo root, start an isolated preview owned by this run. Do not reuse a leftover `npm run dev` on 5173.

```bash
export VERIFY_RUN_ID="${VERIFY_RUN_ID:-$RANDOM}"
export VERIFY_PORT="${VERIFY_PORT:-4173}"
./.cursor/skills/verify-portfolio/helpers/control-portfolio.mjs launch --mode preview --port "$VERIFY_PORT"
```

- Installs `node_modules` with `npm ci` when Vite is missing, then `npm run build`, then `vite preview --host 127.0.0.1 --port <port> --strictPort`.
- Ready when `GET http://127.0.0.1:<port>/portfolio-website/` returns 2xx. Vite `base` is `/portfolio-website/`; `/` is the wrong URL.
- State: `/tmp/verify-portfolio/$VERIFY_RUN_ID/state.json`
- Logs: `/tmp/verify-portfolio/$VERIFY_RUN_ID/vite.log`
- Evidence: `/tmp/verify-portfolio/$VERIFY_RUN_ID/evidence/` (survives cleanup)

Fast iteration (HMR, not what GitHub Pages serves):

```bash
./.cursor/skills/verify-portfolio/helpers/control-portfolio.mjs launch --mode dev --port 5173
```

Isolation: two runs need distinct `VERIFY_RUN_ID` **and** `VERIFY_PORT`. The helper refuses a port it does not own (`--strictPort`). Never attach to a server this run did not launch.

Sentry is optional. Empty `VITE_SENTRY_DSN` is expected in local/cloud verification; do not add secrets.

## Doctor

Run before the first drive, after any failed drive, and whenever the page looks wrong.

```bash
./.cursor/skills/verify-portfolio/helpers/control-portfolio.mjs doctor
```

Pass means all of:

- `state.json` exists and its `pid` is alive
- that process command line contains `vite`
- `GET <url>` is 2xx and the HTML title is `Alex Bramall | Technical Program Manager`
- Chrome actually mounted the SPA: `#home h1` is `Alex Bramall` and sections `home about skills projects experience contact` exist

Exit `1` if any check fails. Do not drive a failing instance — cleanup, relaunch, doctor again.

## Drive

Put the helper on your mental PATH as `control-portfolio`. Commands below are literal. Default viewport is **1280×800** so desktop nav (`md:flex`) is visible. Mobile nav is `md:hidden` and only exists after opening the unlabeled header menu.

```bash
control-portfolio() {
  ./.cursor/skills/verify-portfolio/helpers/control-portfolio.mjs "$@"
}

control-portfolio browser goto
control-portfolio browser click --role button --name "Work"
control-portfolio browser wait-for --selector "#projects"
control-portfolio browser contains --text "Featured Projects"
control-portfolio browser snapshot --aria --path artifacts/nav/work.aria.txt
control-portfolio browser screenshot --path artifacts/nav/work.png
```

Stable handles from this repo (prefer these over CSS/coordinates):

| User control | Handle |
| --- | --- |
| Desktop nav | `button` named `Home`, `About`, `Skills`, `Work`, `Experience`, `Contact` |
| Hero primary CTA | `button` named `View My Work` (scrolls to `#projects`) |
| Hero secondary CTA | `button` named `Get In Touch` (scrolls to `#contact`) |
| Project carousel | `button` named `Previous projects` / `Next projects` |
| Footer | `link` named `Email`, `LinkedIn`, `GitHub` |
| Contact CTA | `link` named `Get In Touch` (`mailto:`) — not a button |
| Sections | `#home` `#about` `#skills` `#projects` `#experience` `#contact` |

The header logo text `Alex Bramall` is not a control. `src/components/layout/Navigation.tsx` is unused; do not drive it.

Hamburger (viewport below `md`): the toggle has **no accessible name**. Use `nav.fixed > div > button` as documented in `features/nav.md`, then click the same section names as desktop.

Smooth scroll is async. After a nav/CTA click, `wait-for --selector "#<id>"` until that section is aligned near the top of the viewport (or the page cannot scroll further); do not `sleep` a fixed number. Snapshots mark `[in-view]` on nodes that currently intersect the viewport — use that, not mere presence, as scroll proof.

## Evidence

Write proof under `/tmp/verify-portfolio/$VERIFY_RUN_ID/evidence/` (relative `--path` values resolve there). Cleanup must not delete this directory.

Proof standards:

- Exercise the real user path (click the visible `Work` button, not `element.scrollIntoView` from eval unless the feature file says so).
- Capture the **action** and the **resulting state** (before snapshot optional; after snapshot + screenshot required).
- UI proof includes an ARIA/text snapshot **and** a screenshot where the portfolio identity (`Alex Bramall`) and the target section heading are visible.
- This app has no server mutations. Side effects to confirm: URL still on `/portfolio-website/`, `scrollY` changed, target `section[id]` in view, expected copy from `src/data/*` visible.
- Do not call Sentry, mailto, LinkedIn, or GitHub as proof that the page works; asserting the `href`/`mailto` is enough for those controls.
- Mocks: none. External Pexels images may fail offline; missing photos are not a product-failure unless the feature file is proving images.

Record the feature file id and the entry point used next to the artifacts (a one-line `meta.txt` is enough).

## Cleanup

Kill **only** the pids in `state.json` (Vite process group and the Chrome process this helper started). Never `pkill vite` / `pkill chrome`.

```bash
./.cursor/skills/verify-portfolio/helpers/control-portfolio.mjs cleanup
```

Removes instance state, Vite/Chrome logs, and the Chrome user-data dir. **Leaves** `/tmp/verify-portfolio/$VERIFY_RUN_ID/evidence/`. After cleanup, confirm those files still exist before calling the run proven.

## Helpers

Executable: `.cursor/skills/verify-portfolio/helpers/control-portfolio.mjs`

Requires Node 18+ (repo: 20/22) and a Chrome/Chromium binary (`google-chrome` on this cloud image; override with `CHROME_PATH`). No extra npm dependency — Playwright is not in this repo and must not be added for verification.

```bash
./.cursor/skills/verify-portfolio/helpers/control-portfolio.mjs --help
```

Keep the feature map honest with `/maintain-verification-skill` when sections, labels, or nav change.
