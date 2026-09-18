# Home / hero

The hero is the first screen: name, locked role line, value prop, availability chip, and Contact / Work CTAs that route off home. The last home module is a contact strip (not a collapsible block).

## Sub-features

- `hero-identity` shows `AI-Native Program & Product Leader` as the page heading. From `md` up, the hero also shows an `Alex Bramall` eyebrow. Below `md`, that eyebrow is omitted because the header wordmark already shows the name.
- `hero-work-cta` opens `/work` from the hero `Work` control.
- `hero-contact-cta` opens `/contact` from the hero `Contact` control.
- `home-contact-strip` shows the home contact strip with get-in-touch copy and a `Contact` link.

## How to get to it (user POV)

- Open the site; the first viewport is the home hero.
- Choose the `Alex Bramall` wordmark in the header.
- Reload `/portfolio-website/`.
- Scroll to the contact strip at the bottom of home.

## Driving it with control-portfolio

Preconditions:

- Portfolio is healthy at `http://127.0.0.1:<port>/portfolio-website/`.
- Viewport is 1280×800.
- `control-portfolio doctor` reports the expected URL and mounted `#home h1`.

- **Open home.** Load the app. Run `control-portfolio browser goto`. The heading includes `AI-Native Program & Product Leader`. At this desktop viewport the `Alex Bramall` eyebrow is visible above the heading.
- **Read copy.** Confirm copy without navigating away. Run `control-portfolio browser contains --text "I lead AI-native program and product delivery"`. Availability shows `[placeholder: hero.availability]`.
- **Work CTA.** Choose hero `Work` (not the header `Work` link). Run `control-portfolio browser click --selector "#home a[href$='/work']"` then `control-portfolio browser wait-for --selector "#work"`. The path ends with `/work` and heading `Work` is visible.
- **Return home.** Choose the wordmark. Run `control-portfolio browser click --role link --name "Alex Bramall"` then `control-portfolio browser wait-for --selector "#home"`. `#home` is in view again.
- **Contact CTA.** Choose hero `Contact`. Run `control-portfolio browser click --selector "#home a[href$='/contact']"` then `control-portfolio browser wait-for --selector "#contact"`. The heading `Contact` is visible and the path ends with `/contact`.
- **Contact strip.** Return home and bring the strip into view. Run `control-portfolio browser click --role link --name "Alex Bramall"`, `control-portfolio browser wait-for --selector "#home"`, `control-portfolio browser eval --expr "document.getElementById('contact-strip').scrollIntoView({block:'start'})"`, then `control-portfolio browser wait-for --selector "#contact-strip" --in-view`. The strip heading is `Contact` and copy includes `[placeholder: contact.intro]` and `[placeholder: contact.channels]`. There is no collapsible hide-section control.
- **Proof.** Capture home from the top. Run `control-portfolio browser goto`, `control-portfolio browser wait-for --selector "#home"`, `control-portfolio browser snapshot --aria --path artifacts/home/hero.aria.txt`, and `control-portfolio browser screenshot --path artifacts/home/hero.png`. The snapshot has `heading1 "AI-Native Program & Product Leader" [in-view]` and links named `Contact` and `Work` inside `#home`. The screenshot shows the filled blue Contact button, not green.

## Gotchas

- Hero `Contact` and `Work` are **links**, not buttons. Nav also exposes `Work`, `About`, `Resume`, and `Contact`. Using `--role link --name "Work"` or `--role link --name "Contact"` from home may hit the header first; use `#home a[href$='/work']` or `#home a[href$='/contact']` for the hero path.
- Proof chips with empty values are omitted. Do not fail the run if `#proof` is missing.
- Hero heading: `AI-Native Program & Product Leader`. Value prop: `I lead AI-native program and product delivery…`. Availability: `[placeholder: hero.availability]`.
- There is no `#hire` landmark and no `Hire` control.
- Below `md`, `#home` has no name eyebrow. Identity on small screens is the header wordmark plus the role-line heading.
- The wordmark `Alex Bramall` is a `Link` to `/`. A click while already on `/` does not scroll to `#home`. After a home-section scroll, use `browser goto` (or `scrollIntoView` on `#home`) before a near-top wait.
