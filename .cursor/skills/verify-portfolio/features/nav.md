# Navigation

Header navigation routes between Work, About, and Contact. Small viewports use `Open menu` to reveal the same labels.

## Sub-features

- `nav-desktop` shows Work · About · Contact at 1280×800.
- `nav-jump` opens each route without leaving `/portfolio-website/`.
- `nav-mobile-open` reveals the same labels after `Open menu` below the `md` breakpoint.
- `nav-mobile-jump` closes the menu and opens the chosen route.

## How to get to it (user POV)

- Use the header links on a desktop-width window.
- On a narrow window, open `Open menu`, then choose a label.
- After landing from a hero CTA, use the header to move again.

## Driving it with control-portfolio

Preconditions:

- Portfolio is healthy at `http://127.0.0.1:<port>/portfolio-website/`.
- Start at viewport 1280×800.
- `control-portfolio doctor` reports the expected URL and a visible `Work` link.

- **Desktop Work.** Choose `Work`. Run `control-portfolio browser goto` then `control-portfolio browser click --role link --name "Work"` then `control-portfolio browser wait-for --selector "#work"`. Heading `Work` is in view and the path ends with `/work`.
- **Desktop About.** Choose `About`. Run `control-portfolio browser click --role link --name "About"` then `control-portfolio browser wait-for --selector "#about"`. Heading `About` is in view.
- **Desktop Contact.** Choose `Contact`. Run `control-portfolio browser click --role link --name "Contact"` then `control-portfolio browser wait-for --selector "#contact"`. Heading `Contact` is in view.
- **Home wordmark.** Choose `Alex Bramall`. Run `control-portfolio browser click --role link --name "Alex Bramall"` then `control-portfolio browser wait-for --selector "#home"`.
- **Mobile menu.** Narrow the window and open the header menu. Run `control-portfolio browser viewport --width 375 --height 812 --mobile`, `control-portfolio browser goto`, then `control-portfolio browser click --role button --name "Open menu"`. Links named `Work`, `About`, and `Contact` are visible in the open menu.
- **Mobile jump.** Choose `Work` from the open menu. Run `control-portfolio browser click --role link --name "Work"` then `control-portfolio browser wait-for --selector "#work"`. `#work` is in view and the overlay menu is gone.
- **Proof.** Restore desktop and capture the Work route. Run `control-portfolio browser viewport --width 1280 --height 800`, `control-portfolio browser goto`, `control-portfolio browser click --role link --name "Work"`, `control-portfolio browser wait-for --selector "#work"`, `control-portfolio browser snapshot --aria --path artifacts/nav/work.aria.txt`, and `control-portfolio browser screenshot --path artifacts/nav/work.png`. The snapshot lists Work, About, and Contact.

## Gotchas

- These controls are **links**, not buttons.
- Desktop links stay in the DOM at mobile width but are `display: none`. Clicks must use the **visible** control (the helper already skips hidden nodes).
- The hamburger accessible name is `Open menu` (and `Close menu` while expanded).
- Client routing must keep the `/portfolio-website/` base. A jump to `/work` without the base is a product bug.
- Nav is Work · About · Contact only. There is no extra primary button in the header.
