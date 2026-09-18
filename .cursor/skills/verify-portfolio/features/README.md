# Portfolio verification map

This directory is the maintained source for verifying the user-facing behavior of the Alex Bramall portfolio website. Read the index before driving the app, then use the matching feature file as the recipe.

## Baseline preconditions

- Launch with `control-portfolio launch --mode preview` so the site is served at `http://127.0.0.1:<port>/portfolio-website/`.
- Set `VERIFY_RUN_ID` and, for concurrent runs, a unique `VERIFY_PORT`.
- Run `control-portfolio doctor` and require the expected URL, Vite pid, title `Alex Bramall | Technical Program Manager`, mounted `#home`, and home sections `home selected-work how-i-work stack contact-strip`.
- Default viewport is 1280×800 (desktop nav visible). Switch viewport only when a recipe says so.
- Never drive an instance that was not started by this verification run.

## Driving conventions

- Start every recipe from the top of the page (`control-portfolio browser goto`) unless its preconditions say otherwise.
- Prefer role + accessible name over CSS. Hero `Work` is the documented exception when nav `Work` would match first — use `#home a` whose name is `Work`, or `a[href$="/work"]` inside `#home`.
- Treat every command as literal. Keep quoted names and flags unchanged.
- After clicks that change route or hash, wait until the target landmark is aligned near the top (or the page is at max scroll) and `scrollY` is stable. Snapshots mark `[in-view]` for viewport proof.
- Restore viewport 1280×800 after a mobile recipe. Do not remove proof artifacts during cleanup.

## Proof and skip reporting

- Capture the user action and the resulting state, not only the final screen.
- UI proof includes an ARIA snapshot and a screenshot with `Alex Bramall` and the section heading visible.
- Record the feature ID and entry point used with every artifact.
- Report an unreachable path with the attempted command and the unmet precondition.
- Do not report a skipped entry point as verified through a different path.

## Feature entry contract

Each feature file starts with an H1 title and one paragraph describing the user-visible behavior. It then uses exactly four H2 sections in this order.

1. `Sub-features` lists short IDs with one line for each behavior.
2. `How to get to it (user POV)` lists every user entry point.
3. `Driving it with control-portfolio` starts with `Preconditions:` and uses labeled bullets that pair each user action with an exact command and observable result.
4. `Gotchas` lists traps that can waste or invalidate a verification run.

Keep implementation details out of the map. Name only user paths, stable handles, required state, commands, and observable proof.

## Features

- [Home / hero](./home.md) covers identity, the locked role line and value prop, and the Contact / Work CTAs.
- [Navigation](./nav.md) covers desktop route links, the Resume PDF link, and the mobile menu.
- [Work](./work.md) covers the selected-work grid and `/work` index.
- [Case](./case.md) covers the sample case template and result badge.
- [About](./about.md) covers `/about`: arc, Contact / Resume CTAs, employer chapters, and the quiet footer strip.
- [Contact](./contact.md) covers `/contact`, the home contact strip, and footer identity links.
