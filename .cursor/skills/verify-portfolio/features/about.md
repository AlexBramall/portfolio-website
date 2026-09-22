# About

About is `/about`: a short arc, Contact and Resume CTAs, three employer chapter tiles, a compact credentials row, and a quiet Contact + Resume strip. No certificate wall and no required portrait.

## Sub-features

- `about-open` opens `/about` from nav `About`.
- `about-arc` shows `[placeholder: about.arc]`.
- `about-hero-ctas` shows a primary `Contact` link to `/contact` and a secondary `Resume` link to `/resume`.
- `about-chapters` shows Form Factory, Nomad, and Gilleard tiles with locked role arcs and labeled chapter placeholders.
- `about-credentials` shows a compact credentials row of labeled placeholders, not a certificate wall.
- `about-cta` repeats Contact and Resume in the page footer strip.
- `about-deep-link` opens `/portfolio-website/about` directly.

## How to get to it (user POV)

- Choose `About` in the header (desktop or mobile menu).
- Open `/portfolio-website/about` directly.

## Driving it with control-portfolio

Preconditions:

- Portfolio is healthy at `http://127.0.0.1:<port>/portfolio-website/`.
- Viewport is 1280×800.

- **Open about.** Choose `About`. Run `control-portfolio browser goto` then `control-portfolio browser click --role link --name "About"` then `control-portfolio browser wait-for --selector "#about"`. Heading `About` is in view and the path ends with `/about`.
- **Arc.** Confirm placeholder copy. Run `control-portfolio browser contains --text "[placeholder: about.arc]"`.
- **Hero CTAs.** Confirm the hero row. Run `control-portfolio browser snapshot --aria --path artifacts/about/hero.aria.txt`. `#about` includes `link "Contact"` to `/contact` and `link "Resume"` whose href ends with `/resume`. Activating it opens `/resume`.
- **Chapters.** Bring the tiles into view. Run `control-portfolio browser eval --expr "document.getElementById('about-chapters').scrollIntoView({block:'start'})"` then `control-portfolio browser wait-for --selector "#about-chapters" --in-view`. The section lists Form Factory, Nomad, and Gilleard. Role arcs are `Ops & delivery`, `TPM → Ecommerce Manager → Director of E-commerce & Digital Product`, and `Digital Project / Product Manager`. Bodies show `[placeholder: about.chapter.form_factory]`, `[placeholder: about.chapter.nomad]`, and `[placeholder: about.chapter.gilleard]`.
- **Credentials.** Run `control-portfolio browser eval --expr "document.getElementById('about-credentials').scrollIntoView({block:'start'})"` then `control-portfolio browser wait-for --selector "#about-credentials" --in-view`. The row includes `[placeholder: about.credentials.1]`, `[placeholder: about.credentials.2]`, and `[placeholder: about.credentials.3]` and is a compact chip row, not a cert grid.
- **Footer strip.** Run `control-portfolio browser eval --expr "document.getElementById('about-cta').scrollIntoView({block:'start'})"` then `control-portfolio browser wait-for --selector "#about-cta" --in-view`. The strip heading is `Get in touch` and it repeats `Contact` and `Resume`.
- **Deep link.** Open the route directly. Run `control-portfolio browser goto --url "http://127.0.0.1:$VERIFY_PORT/portfolio-website/about"` then `control-portfolio browser wait-for --selector "#about"`. The path stays under `/portfolio-website/` and ends with `/about`.
- **Proof.** Capture the hero and the three tiles. Run `control-portfolio browser goto --url "http://127.0.0.1:$VERIFY_PORT/portfolio-website/about"`, `control-portfolio browser wait-for --selector "#about"`, `control-portfolio browser snapshot --aria --path artifacts/about/page.aria.txt`, and `control-portfolio browser screenshot --full-page --path artifacts/about/page.png`. Artifacts show heading `About`, the arc placeholder, Contact + Resume, and the three employer tiles. There is no credential chip wall.

## Gotchas

- About is a route, not a home section. Doctor on home will not list `#about`.
- Do not assert old Editorial Clean copy (`Leadership Philosophy`, `Certified PMP`) or a stock portrait.
- Employer names and role arcs are locked. Do not treat invented metrics or blurbs as the live chapter bodies.
- Hero and footer `Contact` / `Resume` share names with header links. Prefer `#about a` and `#about-cta a` when the header would match first.
- About `Resume` stays in the app and opens `/resume`. Proof is the accessible name and an href ending in `/resume`.
