# Home / hero

The hero is the first screen: name, role-line placeholder, value prop, availability chip, and Hire / Work CTAs that route off home.

## Sub-features

- `hero-identity` shows `Alex Bramall` as the eyebrow and `[placeholder: hero.role_line]` as the page heading.
- `hero-work-cta` opens `/work` from the hero `Work` control.
- `hero-hire-cta` opens `/contact` from the hero `Hire` control.

## How to get to it (user POV)

- Open the site; the first viewport is the home hero.
- Choose the `Alex Bramall` wordmark in the header.
- Reload `/portfolio-website/`.

## Driving it with control-portfolio

Preconditions:

- Portfolio is healthy at `http://127.0.0.1:<port>/portfolio-website/`.
- Viewport is 1280×800.
- `control-portfolio doctor` reports the expected URL and mounted `#home h1`.

- **Open home.** Load the app. Run `control-portfolio browser goto`. The heading includes `[placeholder: hero.role_line]` and the eyebrow `Alex Bramall` is visible.
- **Read placeholders.** Confirm copy without navigating away. Run `control-portfolio browser contains --text "[placeholder: hero.value_prop]"`. Availability shows `[placeholder: hero.availability]`.
- **Work CTA.** Choose hero `Work` (not the header `Work` link). Run `control-portfolio browser click --selector "#home a[href$='/work']"` then `control-portfolio browser wait-for --selector "#work"`. The path ends with `/work` and heading `Work` is visible.
- **Return home.** Choose the wordmark. Run `control-portfolio browser click --role link --name "Alex Bramall"` then `control-portfolio browser wait-for --selector "#home"`. `#home` is in view again.
- **Hire CTA.** Choose hero `Hire`. Run `control-portfolio browser click --selector "#home a[href$='/contact']"` then `control-portfolio browser wait-for --selector "#contact"`. The heading `Contact` is visible and the path ends with `/contact`.
- **Proof.** Capture home after returning to it. Run `control-portfolio browser click --role link --name "Alex Bramall"`, `control-portfolio browser wait-for --selector "#home"`, `control-portfolio browser snapshot --aria --path artifacts/home/hero.aria.txt`, and `control-portfolio browser screenshot --path artifacts/home/hero.png`. The snapshot has `heading1` with the role-line placeholder `[in-view]` and links named `Hire` and `Work`. The screenshot shows the accent Hire button (sky, not green).

## Gotchas

- Hero `Hire` and `Work` are **links**, not buttons. Nav also exposes `Work`, `Hire`, and `Contact`. Using `--role link --name "Work"` from home may hit the header first; use `#home a[href$='/work']` for the hero path.
- Proof chips with empty values are omitted. Do not fail the run if `#proof` is missing.
- Do not expect live metrics or real case copy. Placeholders are the intended Phase 1 content.
