# About

About is a slim `/about` page with the arc placeholder. No certificate wall and no required portrait in Phase 1.

## Sub-features

- `about-open` opens `/about` from nav `About`.
- `about-arc` shows `[placeholder: about.arc]`.

## How to get to it (user POV)

- Choose `About` in the header (desktop or mobile menu).
- Open `/portfolio-website/about` directly.

## Driving it with control-portfolio

Preconditions:

- Portfolio is healthy at `http://127.0.0.1:<port>/portfolio-website/`.
- Viewport is 1280×800.

- **Open about.** Choose `About`. Run `control-portfolio browser goto` then `control-portfolio browser click --role link --name "About"` then `control-portfolio browser wait-for --selector "#about"`. Heading `About` is in view and the path ends with `/about`.
- **Arc.** Confirm placeholder copy. Run `control-portfolio browser contains --text "[placeholder: about.arc]"`.
- **Proof.** Run `control-portfolio browser snapshot --aria --path artifacts/about/page.aria.txt` and `control-portfolio browser screenshot --path artifacts/about/page.png`. Artifacts show heading `About` and the arc placeholder. There is no credential chip wall.

## Gotchas

- About is a route, not a home section. Doctor on home will not list `#about`.
- Do not assert old Editorial Clean copy (`Leadership Philosophy`, `Certified PMP`) or a stock portrait.
