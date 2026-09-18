---
name: verify-portfolio
description: Drive the Alex Bramall Vite+React+TS+Tailwind portfolio website in a real browser to prove user-visible behavior. Use when verifying navigation, section content, screenshots, or any UI change for this repo.
---

# Verify portfolio website

This repo is a **Vite + React + TypeScript + Tailwind** portfolio with **client routing** (`react-router-dom`) and GitHub Pages `base` `/portfolio-website/`. Routes: `/`, `/work`, `/work/:slug`, `/about`, `/contact`. There is no in-repo Playwright/Cypress harness. Drive the **production preview** (same `base` as GitHub Pages) through the Chrome CDP helper this skill ships.

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
- Chrome actually mounted the SPA: `nav` is present, `#home h1` exists, and home sections `home selected-work how-i-work stack contact-strip` exist. `#proof` is optional (hidden when chips have no values). No `#hire` section and no `Hire` link.

Exit `1` if any check fails. Do not drive a failing instance — cleanup, relaunch, doctor again.

## Drive

Put the helper on your mental PATH as `control-portfolio`. Commands below are literal. Default viewport is **1280×800** so desktop nav (`md:flex`) is visible. Mobile nav is `md:hidden` until `Open menu` is chosen.

```bash
control-portfolio() {
  ./.cursor/skills/verify-portfolio/helpers/control-portfolio.mjs "$@"
}

control-portfolio browser goto
control-portfolio browser click --role link --name "Work"
control-portfolio browser wait-for --selector "#work"
control-portfolio browser contains --text "Work"
control-portfolio browser snapshot --aria --path artifacts/nav/work.aria.txt
control-portfolio browser screenshot --path artifacts/nav/work.png
```

Stable handles from this repo (prefer these over CSS/coordinates):

| User control | Handle |
| --- | --- |
| Wordmark | `link` named `Alex Bramall` (home) |
| Desktop / mobile nav | `link` named `Work`, `About`, `Resume`, `Contact` |
| Nav Resume | `link` named `Resume` (PDF from `resume.url`, new tab; do not click to prove it) |
| Nav / hero primary CTA | `link` named `Contact` (goes to `/contact`) |
| Hero secondary CTA | `#home a` whose accessible name is `Work` (goes to `/work`) |
| Selected-work cards | `link` whose `href` contains `/work/<slug>` |
| Footer | `link` named `Email`, `LinkedIn`, `GitHub` |
| Contact mailto | `link` named `Email` |
| Home sections | `#home` `#selected-work` `#how-i-work` `#stack` `#contact-strip` |
| Routes | `#work` `#work-grid` `#work-cta` `#about` `#contact` plus `/work/:slug` case template |

Smooth in-page scroll is async. After a hash jump, `wait-for --selector "#<id>"` until that section is aligned near the top of the viewport (or the page cannot scroll further); do not `sleep` a fixed number. After a **route** click, wait-for the destination landmark the same way (`#work`, `#about`, `#contact`, or the case `h1`). Snapshots mark `[in-view]` on nodes that currently intersect the viewport — use that, not mere presence, as proof.

## Evidence

Write proof under `/tmp/verify-portfolio/$VERIFY_RUN_ID/evidence/` (relative `--path` values resolve there). Cleanup must not delete this directory.

Proof standards:

- Exercise the real user path (click the visible `Work` link, not `history.pushState` from eval unless the feature file says so).
- Capture the **action** and the **resulting state** (before snapshot optional; after snapshot + screenshot required).
- UI proof includes an ARIA/text snapshot **and** a screenshot where the portfolio identity (`Alex Bramall`) and the target heading are visible.
- Side effects to confirm: URL stays under `/portfolio-website/`, path matches the route (`/`, `/work`, `/work/<slug>`, `/about`, `/contact`), expected placeholder copy (`[placeholder: …]`) is visible when that is the live content.
- Do not call Sentry, mailto, LinkedIn, or GitHub as proof that the page works; asserting the `href`/`mailto` is enough for those controls.
- Mocks: none. Do not invent metrics to make the proof bar appear.

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

Keep the feature map honest when routes, labels, or home modules change.
