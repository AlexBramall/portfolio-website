# Work

Selected work is a three-card grid on home (not a carousel) and a `/work` index of the same cases.

## Sub-features

- `work-home-grid` shows three case cards under `Selected work`, each with eyebrow · title · outcome · tags.
- `work-index` opens `/work` from nav `Work` or hero `Work`.
- `work-card-open` opens `/work/sample-case` from a card.

## How to get to it (user POV)

- Scroll to Selected work on home.
- Choose `Work` in the header or the hero `Work` control.
- Choose `All work` from the selected-work heading row.
- Choose `View case →` on a card.

## Driving it with control-portfolio

Preconditions:

- Portfolio is healthy at `http://127.0.0.1:<port>/portfolio-website/`.
- Viewport is 1280×800.
- `control-portfolio doctor` reports mounted `#selected-work`.

- **Home grid.** Load home. Run `control-portfolio browser goto` then `control-portfolio browser wait-for --selector "#selected-work"`. Three cards are visible with eyebrow, title, outcome, and tags. There are no `Previous projects` / `Next projects` controls.
- **Index.** Choose header `Work`. Run `control-portfolio browser click --role link --name "Work"` then `control-portfolio browser wait-for --selector "#work"`. Path ends with `/work`.
- **Open sample case.** Choose the sample card. Run `control-portfolio browser click --selector "a[href$='/work/sample-case']"` then `control-portfolio browser wait-for --text "[placeholder: work.card.1.title]"`. Path ends with `/work/sample-case`.
- **Proof.** Capture the work index. Run `control-portfolio browser click --role link --name "Work"`, `control-portfolio browser wait-for --selector "#work"`, `control-portfolio browser snapshot --aria --path artifacts/work/index.aria.txt`, and `control-portfolio browser screenshot --path artifacts/work/index.png`. Artifacts show heading `Work` and three cards with placeholder eyebrows, titles, outcomes, and tags.

## Gotchas

- Cards are links; the accessible name includes the whole card text, not only the title. Prefer the `href` selector for a specific slug.
- Optional card metrics are omitted when empty. Do not invent numbers to assert a metric row.
- Writing and lab routes are out of scope for Phase 1.
