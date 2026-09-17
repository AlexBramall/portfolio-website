# Skills

Skills is the competencies band: eyebrow `Competencies`, heading `Core Skills`, and a grid of named cards grouped visually by category.

## Sub-features

- `skills-open` brings `#skills` into view from nav.
- `skills-heading` shows `Core Skills`.
- `skills-cards` shows the eight competency names from the live data file.

## How to get to it (user POV)

- Choose `Skills` in the header (desktop or mobile menu).
- Scroll between about and projects until the competencies grid appears.

## Driving it with control-portfolio

Preconditions:

- Portfolio is healthy at `http://127.0.0.1:<port>/portfolio-website/`.
- Viewport is 1280×800.
- `control-portfolio doctor` reports mounted `#skills`.

- **Open skills.** Choose `Skills`. Run `control-portfolio browser goto` then `control-portfolio browser click --role button --name "Skills"` then `control-portfolio browser wait-for --selector "#skills"`. `Core Skills` is in view.
- **Card names.** Confirm the grid. Run `control-portfolio browser contains --text "Team Leadership"`, `control-portfolio browser contains --text "Stakeholder Management"`, `control-portfolio browser contains --text "Project Management"`, `control-portfolio browser contains --text "Agile/Scrum"`, `control-portfolio browser contains --text "Technical Architecture"`, `control-portfolio browser contains --text "Cloud Platforms"`, `control-portfolio browser contains --text "Data Analytics"`, and `control-portfolio browser contains --text "Risk Management"`.
- **Categories.** Confirm at least the category labels that appear on cards. Run `control-portfolio browser contains --text "Leadership"` and `control-portfolio browser contains --text "Technical"`.
- **Proof.** Capture the grid. Run `control-portfolio browser snapshot --aria --path artifacts/skills/grid.aria.txt` and `control-portfolio browser screenshot --path artifacts/skills/grid.png`. Artifacts show `Core Skills` and `Team Leadership`.

## Gotchas

- Category text (`Leadership`, `Strategy`, `Technical`, `Analytics`, `Risk`) repeats on multiple cards. A single `contains` is not proof of card count; assert distinct **names**.
- Card descriptions are `line-clamp-2`. Prefer names over wrapping description text for assertions.
