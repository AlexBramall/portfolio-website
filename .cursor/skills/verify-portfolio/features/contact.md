# Contact

Contact is `/contact` plus the home contact strip and the footer with email, LinkedIn, and GitHub. Copy is get-in-touch only.

## Sub-features

- `contact-open` opens `/contact` from nav `Contact` or the hero `Contact` control.
- `contact-placeholders` shows intro and channels placeholders.
- `contact-mailto` exposes a page `Email` link to `mailto:alex.Bramall@email.com`.
- `contact-footer` exposes footer links named `Email`, `LinkedIn`, and `GitHub`.
- `contact-legacy-path` remaps `/hire` to `/contact` without extra framing.

## How to get to it (user POV)

- Choose `Contact` in the header.
- Choose `Contact` on the hero or the home contact strip.
- Open `/portfolio-website/contact` directly.
- Open `/portfolio-website/hire` and land on Contact.

## Driving it with control-portfolio

Preconditions:

- Portfolio is healthy at `http://127.0.0.1:<port>/portfolio-website/`.
- Viewport is 1280×800.

- **Nav entry.** Choose `Contact`. Run `control-portfolio browser goto` then `control-portfolio browser click --role link --name "Contact"` then `control-portfolio browser wait-for --selector "#contact"`. Heading `Contact` is in view.
- **Hero entry.** Return home and use the hero Contact control. Run `control-portfolio browser click --role link --name "Alex Bramall"`, `control-portfolio browser wait-for --selector "#home"`, `control-portfolio browser click --selector "#home a[href$='/contact']"`, `control-portfolio browser wait-for --selector "#contact"`. The same heading is in view. The primary CTA is filled blue, not green.
- **Placeholders.** Run `control-portfolio browser contains --text "[placeholder: contact.intro]"` and `control-portfolio browser contains --text "[placeholder: contact.channels]"`.
- **Mailto.** Confirm the page CTA. Run `control-portfolio browser snapshot --aria --path artifacts/contact/page.aria.txt`. The snapshot includes `link "Email" href=mailto:alex.Bramall@email.com`. Do not activate the link.
- **Footer.** Confirm identity links. The snapshot includes `link "Email" href=mailto:alex.Bramall@email.com`, `link "LinkedIn" href=https://linkedin.com/in/alexBramall`, and `link "GitHub" href=https://github.com/alexBramall`. Do not follow them.
- **Legacy path.** Open the remapped path. Run `control-portfolio browser goto --url "http://127.0.0.1:$VERIFY_PORT/portfolio-website/hire"` then `control-portfolio browser wait-for --selector "#contact"`. The path ends with `/contact` and heading `Contact` is in view.
- **Proof.** Run `control-portfolio browser screenshot --path artifacts/contact/page.png`. The screenshot shows heading `Contact` and the get-in-touch placeholders.

## Gotchas

- Activating mailto/social links leaves the app. Proof is the accessible name and `href`, not a successful send.
- Nav `Contact`, hero `Contact`, and the home contact-strip `Contact` link share `/contact`.
- Footer copyright includes the current calendar year. Do not hard-code a year in assertions.
- Email local-part uses capital `B` (`alex.Bramall@email.com`). Match it exactly.
- Do not assert `Austin, Texas` or `Let's Connect` — those were removed with the old contact band.
- Contact copy uses `[placeholder: contact.intro]`, not a looking-for string.
