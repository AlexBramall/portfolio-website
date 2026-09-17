# Contact

Contact is the closing band (`Let's Connect`, Austin location, mailto button) plus the dark footer with email, LinkedIn, GitHub, and copyright.

## Sub-features

- `contact-open` brings `#contact` into view from nav or the hero `Get In Touch` button.
- `contact-location` shows `Austin, Texas`.
- `contact-mailto` exposes a `Get In Touch` link to `mailto:alex.Bramall@email.com`.
- `contact-footer` exposes footer links named `Email`, `LinkedIn`, and `GitHub`.

## How to get to it (user POV)

- Choose `Contact` in the header.
- Choose `Get In Touch` on the hero (scrolls here; does not open mail).
- Scroll to the bottom of the page.

## Driving it with control-portfolio

Preconditions:

- Portfolio is healthy at `http://127.0.0.1:<port>/portfolio-website/`.
- Viewport is 1280×800.
- `control-portfolio doctor` reports mounted `#contact`.

- **Nav entry.** Choose `Contact`. Run `control-portfolio browser goto` then `control-portfolio browser click --role button --name "Contact"` then `control-portfolio browser wait-for --selector "#contact"`. `Let's Connect` is in view.
- **Hero entry.** Return home and use the hero button. Run `control-portfolio browser click --role button --name "Home"`, `control-portfolio browser wait-for --selector "#home"`, `control-portfolio browser click --role button --name "Get In Touch"`, `control-portfolio browser wait-for --selector "#contact"`. The same heading is in view.
- **Location.** Confirm city. Run `control-portfolio browser contains --text "Austin, Texas"`.
- **Mailto.** Confirm the section CTA is a link, not a button. Run `control-portfolio browser snapshot --aria --path artifacts/contact/section.aria.txt`. The snapshot includes `link "Get In Touch" href=mailto:alex.Bramall@email.com`. Do not activate the link.
- **Footer.** Confirm identity links. The snapshot includes `link "Email" href=mailto:alex.Bramall@email.com`, `link "LinkedIn" href=https://linkedin.com/in/alexBramall`, and `link "GitHub" href=https://github.com/alexBramall`. Do not follow them.
- **Proof.** Capture the contact band and footer. Run `control-portfolio browser screenshot --path artifacts/contact/section.png`. The screenshot shows `Let's Connect`, `Austin, Texas`, and `Get In Touch`.

## Gotchas

- Activating mailto/social links leaves the app (mail client or a third-party site). Proof is the accessible name and `href`, not a successful send.
- Hero `Get In Touch` is a button that only scrolls. After that click, the in-section control is the mailto **link** with the same visible name.
- Footer copyright includes the current calendar year. Do not hard-code a year in assertions.
- Email local-part uses capital `B` (`alex.Bramall@email.com`). Match it exactly.
