# Navigation

Header navigation jumps the same page between Home, About, Skills, Work, Experience, and Contact. Desktop uses a pill bar; small viewports use a hamburger that reveals the same labels.

## Sub-features

- `nav-desktop` shows six labeled buttons at 1280×800 and highlights the section in view.
- `nav-jump` scrolls each labeled section into view without changing the path.
- `nav-mobile-open` reveals the same six labels after opening the header menu below the `md` breakpoint.
- `nav-mobile-jump` closes the menu and scrolls to the chosen section.

## How to get to it (user POV)

- Use the pill buttons in the top header on a desktop-width window.
- On a narrow window, open the header menu icon, then choose a section name.
- After landing from a hero CTA, use the header to move again.

## Driving it with control-portfolio

Preconditions:

- Portfolio is healthy at `http://127.0.0.1:<port>/portfolio-website/`.
- Start at viewport 1280×800.
- `control-portfolio doctor` reports the expected URL and a visible `Work` button.

- **Desktop Work.** Choose `Work`. Run `control-portfolio browser goto` then `control-portfolio browser click --role button --name "Work"` then `control-portfolio browser wait-for --selector "#projects"`. `Featured Projects` is in view and the URL path remains `/portfolio-website/`.
- **Desktop About.** Choose `About`. Run `control-portfolio browser click --role button --name "About"` then `control-portfolio browser wait-for --selector "#about"`. `Leadership Philosophy` is in view.
- **Desktop Experience.** Choose `Experience`. Run `control-portfolio browser click --role button --name "Experience"` then `control-portfolio browser wait-for --selector "#experience"`. `Professional Journey` is in view.
- **Desktop remaining.** Repeat the same click + wait-for pattern for `Skills` → `#skills` (`Core Skills`), `Contact` → `#contact` (`Let's Connect`), `Home` → `#home` (`Alex Bramall` heading).
- **Mobile menu.** Narrow the window and open the unlabeled header toggle. Run `control-portfolio browser viewport --width 375 --height 812 --mobile`, `control-portfolio browser goto`, then `control-portfolio browser click --selector "nav.fixed > div > button"`. Buttons named `Home`, `About`, `Skills`, `Work`, `Experience`, and `Contact` are visible in the open menu.
- **Mobile jump.** Choose `Work` from the open menu. Run `control-portfolio browser click --role button --name "Work"` then `control-portfolio browser wait-for --selector "#projects"`. `#projects` is in view and the overlay menu is gone.
- **Proof.** Restore desktop and capture the Work jump. Run `control-portfolio browser viewport --width 1280 --height 800`, `control-portfolio browser goto`, `control-portfolio browser click --role button --name "Work"`, `control-portfolio browser wait-for --selector "#projects"`, `control-portfolio browser snapshot --aria --path artifacts/nav/work.aria.txt`, and `control-portfolio browser screenshot --path artifacts/nav/work.png`. The snapshot lists the six nav names and `heading2 "Featured Projects"`.

## Gotchas

- Nav label for projects is `Work`, not `Projects`. The section id is still `#projects`.
- Desktop buttons stay in the DOM at mobile width but are `display: none`. Clicks must use the **visible** button (the helper already skips hidden nodes).
- The hamburger has no `aria-label`. The `nav.fixed > div > button` selector is the supported escape hatch; do not "fix" the product in a verification run.
- `src/components/layout/Navigation.tsx` is not mounted. Driving lowercase labels (`projects`, `about`) from that unused component is not a user path.
- Smooth scroll is not instantaneous. Assert intersecting `#id`, not a screenshot taken immediately after click.
