# Projects

Projects is the `Work` band: a heading `Featured Projects` and a horizontal carousel of four project cards with previous/next controls.

## Sub-features

- `projects-open` brings `#projects` into view from nav `Work` or hero `View My Work`.
- `projects-cards` shows all four titled cards in the carousel data.
- `projects-next` moves the carousel right with `Next projects`.
- `projects-prev` moves the carousel left with `Previous projects` once next has run.

## How to get to it (user POV)

- Choose `Work` in the header.
- Choose `View My Work` on the hero.
- Scroll to the `Work` / `Featured Projects` band.

## Driving it with control-portfolio

Preconditions:

- Portfolio is healthy at `http://127.0.0.1:<port>/portfolio-website/`.
- Viewport is 1280×800.
- `control-portfolio doctor` reports mounted `#projects`.

- **Nav entry.** Choose `Work`. Run `control-portfolio browser goto` then `control-portfolio browser click --role button --name "Work"` then `control-portfolio browser wait-for --selector "#projects"`. `Featured Projects` is in view.
- **Hero entry.** Return home and use the CTA. Run `control-portfolio browser click --role button --name "Home"`, `control-portfolio browser wait-for --selector "#home"`, `control-portfolio browser click --role button --name "View My Work"`, `control-portfolio browser wait-for --selector "#projects"`. The same heading is in view on the same path.
- **Card copy.** Confirm the four titles. Run `control-portfolio browser contains --text "Lorem Ipsum Project Alpha"`, and the same for `Project Beta`, `Project Gamma`, and `Project Delta`. Each title exists in the page text (Delta may require a carousel move if it is off-screen for screenshots, but `contains` reads the full DOM).
- **Next.** Choose `Next projects`. Run `control-portfolio browser click --role button --name "Next projects"`. The control stays enabled until the carousel cannot move further; `Previous projects` becomes usable after the first successful next.
- **Previous.** Choose `Previous projects`. Run `control-portfolio browser click --role button --name "Previous projects"`. The carousel moves left. The previous control is disabled again at the start of the list.
- **Proof.** Capture the work band after the nav entry. Run `control-portfolio browser snapshot --aria --path artifacts/projects/work.aria.txt` and `control-portfolio browser screenshot --path artifacts/projects/work.png`. Artifacts show `Featured Projects`, at least `Lorem Ipsum Project Alpha`, and the previous/next buttons.

## Gotchas

- Users see the nav word `Work`; assertions on a `Projects` button will fail.
- `Previous projects` starts disabled. Clicking it first is not a movement proof — next first, then previous.
- Carousel scroll is smooth. Wait until card text or button disabled state changes; do not screenshot mid-animation and call it empty.
- Only the first two technologies per card render as tags. Do not assert `Kubernetes` on Alpha just because `src/data/projects.ts` lists it.
- Card images are remote. Treat broken photos like about: alt text still proves the card; pixels are extra.
