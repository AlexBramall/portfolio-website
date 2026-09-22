# Case

Each work slug uses the same case template: title + outcome, required field slots, and a Results badge of `measured`, `proxy`, or `projected`. The first featured case is the e.l.f. Cosmetics Shopify migration at `/work/elf-shopify-migration`, with a `proxy` badge and no result numbers.

## Sub-features

- `case-open` opens `/work/elf-shopify-migration` from a work card.
- `case-slots` shows Context, Role & scope, Constraints, Insights, Options rejected, Decisions, What shipped, AI tooling honesty, Results, and Learnings.
- `case-badge` shows a Results badge whose label is exactly `measured`, `proxy`, or `projected`. The e.l.f. case badge is `proxy`.

## How to get to it (user POV)

- From `/work` or home Selected work, choose the e.l.f. Cosmetics card.
- Open `/portfolio-website/work/elf-shopify-migration` directly.

## Driving it with control-portfolio

Preconditions:

- Portfolio is healthy at `http://127.0.0.1:<port>/portfolio-website/`.
- Viewport is 1280×800.

- **Open case.** From home, choose the e.l.f. card. Run `control-portfolio browser goto` then `control-portfolio browser click --selector "a[href$='/work/elf-shopify-migration']"` then `control-portfolio browser wait-for --text "Results"`. Path ends with `/work/elf-shopify-migration`.
- **Read slots.** Confirm required headings without inventing copy. Run `control-portfolio browser contains --text "Context"`, then the same for `Role & scope`, `Constraints`, `Insights`, `Options rejected`, `Decisions`, `What shipped`, `AI tooling honesty`, `Results`, and `Learnings`.
- **Badge.** Confirm the e.l.f. results kind. Run `control-portfolio browser contains --text "proxy"`. The title is `Salesforce Commerce Cloud → Shopify`. Empty result numbers are omitted.
- **Proof.** Run `control-portfolio browser snapshot --aria --path artifacts/case/elf.aria.txt` and `control-portfolio browser screenshot --path artifacts/case/elf.png`. Artifacts show the case title and the Results badge.

## Gotchas

- Direct load of `/work/elf-shopify-migration` on GitHub Pages depends on the `404.html` SPA fallback. Preview mode already falls back to `index.html`.
- Do not treat proxy or projected as measured. The visible badge text is the kind.
- Optional artifacts are hidden when empty.
- The case has no metric and no result items. Do not invent numbers to assert a metric row.
