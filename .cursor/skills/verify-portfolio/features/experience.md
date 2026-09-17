# Experience

Experience lists a professional journey: year, role, company, and achievement bullets for each job.

## Sub-features

- `experience-open` brings `#experience` into view from nav.
- `experience-roles` shows the three roles and companies from the live data file.
- `experience-years` shows each role's year range next to the role.

## How to get to it (user POV)

- Choose `Experience` in the header (desktop or mobile menu).
- Scroll past projects until `Professional Journey` appears.

## Driving it with control-portfolio

Preconditions:

- Portfolio is healthy at `http://127.0.0.1:<port>/portfolio-website/`.
- Viewport is 1280×800.
- `control-portfolio doctor` reports mounted `#experience`.

- **Open experience.** Choose `Experience`. Run `control-portfolio browser goto` then `control-portfolio browser click --role button --name "Experience"` then `control-portfolio browser wait-for --selector "#experience"`. `Professional Journey` is in view.
- **Current role.** Confirm the first job. Run `control-portfolio browser contains --text "Lorem Ipsum Senior Role"` and `control-portfolio browser contains --text "Form Facory"`. Both strings are visible (the company spelling is `Form Facory` on the page).
- **Earlier roles.** Confirm the remaining jobs. Run `control-portfolio browser contains --text "Lorem Ipsum Manager Role"`, `control-portfolio browser contains --text "Innovation Labs Inc."`, `control-portfolio browser contains --text "Lorem Ipsum Analyst Role"`, and `control-portfolio browser contains --text "DataDriven Corp"`.
- **Years.** Confirm ranges. Run `control-portfolio browser contains --text "2022 - Present"` and `control-portfolio browser contains --text "2014 - 2017"`.
- **Proof.** Capture the in-view journey. Run `control-portfolio browser snapshot --aria --path artifacts/experience/journey.aria.txt` and `control-portfolio browser screenshot --path artifacts/experience/journey.png`. Artifacts show `Professional Journey` and `Lorem Ipsum Senior Role`.

## Gotchas

- Copy is placeholder lorem. Assert the live strings above; do not invent a real employer name from the README author bio.
- `Form Facory` is the on-page company string. "Correcting" it during verification is out of scope.
- Achievement bullets repeat similar lorem across jobs. Role + company is the identity to assert, not a unique bullet.
