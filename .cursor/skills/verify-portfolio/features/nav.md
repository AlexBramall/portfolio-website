# Navigation

Header navigation is Work · About · Resume · Contact. All four are in-app routes with the same text weight. Resume opens `/resume` and takes the active pill there. Small viewports use `Open menu` to reveal the same four labels.

## Sub-features

- `nav-desktop` shows Work · About · Resume · Contact at 1280×800.
- `nav-jump` opens Work, About, Resume, and Contact without leaving `/portfolio-website/`.
- `nav-resume` exposes a text `Resume` link (same weight as the other labels, not a filled CTA) to `/resume`, with the active pill on that route.
- `nav-mobile-open` reveals the same four labels after `Open menu` below the `md` breakpoint.
- `nav-mobile-jump` closes the menu and opens the chosen in-app route.

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
- **Desktop Resume.** Choose `Resume`. Run `control-portfolio browser click --role link --name "Resume"` then `control-portfolio browser wait-for --selector "#resume"`. Heading `Alex Bramall` is in view inside the resume sheet and the path ends with `/resume`. The header `Resume` link has `aria-current="page"` and the active pill. It is not a filled primary button and it does not leave the app.
- **Desktop Contact.** Choose `Contact`. Run `control-portfolio browser click --role link --name "Contact"` then `control-portfolio browser wait-for --selector "#contact"`. Heading `Contact` is in view.
- **Home wordmark.** Choose `Alex Bramall`. Run `control-portfolio browser click --role link --name "Alex Bramall"` then `control-portfolio browser wait-for --selector "#home"`.
- **Mobile menu.** Narrow the window and open the header menu. Run `control-portfolio browser viewport --width 375 --height 812 --mobile`, `control-portfolio browser goto`, then `control-portfolio browser click --role button --name "Open menu"`. Links named `Work`, `About`, `Resume`, and `Contact` are visible in the open menu.
- **Mobile jump.** Choose `Resume` from the open menu. Run `control-portfolio browser click --role link --name "Resume"` then `control-portfolio browser wait-for --selector "#resume"`. `#resume` is in view, the path ends with `/resume`, and the overlay menu is gone.
- **Proof.** Restore desktop and capture the Resume route. Run `control-portfolio browser viewport --width 1280 --height 800`, `control-portfolio browser goto`, `control-portfolio browser click --role link --name "Resume"`, `control-portfolio browser wait-for --selector "#resume"`, `control-portfolio browser snapshot --aria --path artifacts/nav/resume.aria.txt`, and `control-portfolio browser screenshot --path artifacts/nav/resume.png`. The snapshot lists Work, About, Resume, and Contact, and the Resume link href ends with `/resume`.

## Gotchas

- These controls are **links**, not buttons.
- Desktop links stay in the DOM at mobile width but are `display: none`. Clicks must use the **visible** control (the helper already skips hidden nodes).
- The hamburger accessible name is `Open menu` (and `Close menu` while expanded).
- Client routing must keep the `/portfolio-website/` base. A jump to `/resume` without the base is a product bug.
- Nav is Work · About · Resume · Contact. Resume is a text link, not a filled CTA. The active pill appears on `/resume`.
- Header `Resume` shares its name with About and Work footer `Resume` links. From home, the header link is the visible one.
