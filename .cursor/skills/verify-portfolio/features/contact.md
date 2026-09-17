# Contact

Contact is `/contact` (also the Hire target) plus the footer with email, LinkedIn, and GitHub.

## Sub-features

- `contact-open` opens `/contact` from nav `Contact` or `Hire`.
- `contact-placeholders` shows looking-for and channels placeholders.
- `contact-mailto` exposes a page `Email` link to `mailto:alex.Bramall@email.com`.
- `contact-footer` exposes footer links named `Email`, `LinkedIn`, and `GitHub`.

## How to get to it (user POV)

- Choose `Contact` or `Hire` in the header.
- Choose `Hire` on the hero.
- Open `/portfolio-website/contact` directly.

## Driving it with control-portfolio

Preconditions:

- Portfolio is healthy at `http://127.0.0.1:<port>/portfolio-website/`.
- Viewport is 1280×800.

- **Nav entry.** Choose `Contact`. Run `control-portfolio browser goto` then `control-portfolio browser click --role link --name "Contact"` then `control-portfolio browser wait-for --selector "#contact"`. Heading `Contact` is in view.
- **Hire entry.** Return home and use nav or hero Hire. Run `control-portfolio browser click --role link --name "Alex Bramall"`, `control-portfolio browser wait-for --selector "#home"`, `control-portfolio browser click --role link --name "Hire"`, `control-portfolio browser wait-for --selector "#contact"`. The same heading is in view. Hire is accent (sky), not green.
- **Placeholders.** Run `control-portfolio browser contains --text "[placeholder: contact.looking_for]"` and `control-portfolio browser contains --text "[placeholder: contact.channels]"`.
- **Mailto.** Confirm the page CTA. Run `control-portfolio browser snapshot --aria --path artifacts/contact/page.aria.txt`. The snapshot includes `link "Email" href=mailto:alex.Bramall@email.com`. Do not activate the link.
- **Footer.** Confirm identity links. The snapshot includes `link "Email" href=mailto:alex.Bramall@email.com`, `link "LinkedIn" href=https://linkedin.com/in/alexBramall`, and `link "GitHub" href=https://github.com/alexBramall`. Do not follow them.
- **Proof.** Run `control-portfolio browser screenshot --path artifacts/contact/page.png`. The screenshot shows heading `Contact` and the placeholders.

## Gotchas

- Activating mailto/social links leaves the app. Proof is the accessible name and `href`, not a successful send.
- Nav `Hire` and `Contact` share `/contact`. Either control is a valid hire path.
- Footer copyright includes the current calendar year. Do not hard-code a year in assertions.
- Email local-part uses capital `B` (`alex.Bramall@email.com`). Match it exactly.
- Do not assert `Austin, Texas` or `Let's Connect` — those were removed with the old contact band.
