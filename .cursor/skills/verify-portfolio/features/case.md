# Case

Each work slug uses the same case template: title + outcome, required field slots, and a Results badge of `measured`, `proxy`, or `projected`.

## Sub-features

- `case-open` opens `/work/sample-case` from a work card.
- `case-slots` shows Context, Role & scope, Constraints, Insights, Options rejected, Decisions, What shipped, AI tooling honesty, Results, and Learnings.
- `case-badge` shows a Results badge whose label is exactly `measured`, `proxy`, or `projected`.

## How to get to it (user POV)

- From `/work` or home Selected work, choose a card.
- Open `/portfolio-website/work/sample-case` directly.

## Driving it with control-portfolio

Preconditions:

- Portfolio is healthy at `http://127.0.0.1:<port>/portfolio-website/`.
- Viewport is 1280×800.

- **Open sample.** From home, choose the sample card. Run `control-portfolio browser goto` then `control-portfolio browser click --selector "a[href$='/work/sample-case']"` then `control-portfolio browser wait-for --text "Results"`. Path ends with `/work/sample-case`.
- **Read slots.** Confirm required headings without inventing copy. Run `control-portfolio browser contains --text "Context"`, then the same for `Role & scope`, `Constraints`, `Insights`, `Options rejected`, `Decisions`, `What shipped`, `AI tooling honesty`, `Results`, and `Learnings`.
- **Badge.** Confirm the sample results kind. Run `control-portfolio browser contains --text "projected"`. Empty result numbers are omitted.
- **Proof.** Run `control-portfolio browser snapshot --aria --path artifacts/case/sample.aria.txt` and `control-portfolio browser screenshot --path artifacts/case/sample.png`. Artifacts show the placeholder title and the Results badge.

## Gotchas

- Direct load of `/work/sample-case` on GitHub Pages depends on the `404.html` SPA fallback. Preview mode already falls back to `index.html`.
- Do not treat proxy or projected as measured. The visible badge text is the kind.
- Optional artifacts are hidden when empty.
