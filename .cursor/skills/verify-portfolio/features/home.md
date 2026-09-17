# Home / hero

The hero is the first screen: name, role, summary, and two buttons that scroll the same page to work and contact.

## Sub-features

- `hero-identity` shows `Alex Bramall` as the page heading with role `Technical Program Manager`.
- `hero-work-cta` scrolls to the projects section from `View My Work`.
- `hero-contact-cta` scrolls to the contact section from the hero `Get In Touch` button.

## How to get to it (user POV)

- Open the site; the first viewport is the home section.
- Choose `Home` in the header.
- Reload `/portfolio-website/`.

## Driving it with control-portfolio

Preconditions:

- Portfolio is healthy at `http://127.0.0.1:<port>/portfolio-website/`.
- Viewport is 1280×800.
- `control-portfolio doctor` reports the expected URL and mounted `#home h1`.

- **Open home.** Load the app. Run `control-portfolio browser goto`. The heading reads `Alex Bramall` and the role line includes `Technical Program Manager`.
- **Read identity.** Confirm copy without navigating away. Run `control-portfolio browser contains --text "Transforming complex technical challenges"`. The summary is visible in `#home`.
- **Work CTA.** Choose `View My Work`. Run `control-portfolio browser click --role button --name "View My Work"` then `control-portfolio browser wait-for --selector "#projects"`. `#projects` intersects the viewport and `Featured Projects` is visible.
- **Return home.** Choose `Home`. Run `control-portfolio browser click --role button --name "Home"` then `control-portfolio browser wait-for --selector "#home"`. `#home` is in view again.
- **Contact CTA.** Choose `Get In Touch` in the hero (a button, not the later mailto link). Run `control-portfolio browser click --role button --name "Get In Touch"` then `control-portfolio browser wait-for --selector "#contact"`. The heading `Let's Connect` is visible.
- **Proof.** Capture home after returning to it. Run `control-portfolio browser click --role button --name "Home"`, `control-portfolio browser wait-for --selector "#home"`, `control-portfolio browser snapshot --aria --path artifacts/home/hero.aria.txt`, and `control-portfolio browser screenshot --path artifacts/home/hero.png`. Both artifacts show `Alex Bramall`, `View My Work`, and `Get In Touch`.

## Gotchas

- The source role string has a trailing space (`Technical Program Manager `). Assert with contains, not a strict equality on the paragraph.
- Hero `Get In Touch` is a **button**. Contact-section `Get In Touch` is a **link**. Using `--role link` here is the wrong control.
- `View My Work` does not open a new route; proof is the projects section in view on the same URL.
- The bouncing chevron under the CTAs has no accessible name. Do not use it as the about entry point; use nav `About` or the about feature file.
