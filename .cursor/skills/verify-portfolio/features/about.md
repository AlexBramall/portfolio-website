# About

About presents a portrait, the `Leadership Philosophy` heading, narrative copy, credential chips, and a short highlight list.

## Sub-features

- `about-open` brings the about section into view from nav or from home.
- `about-identity` shows the `Alex Bramall` portrait and `About Me` eyebrow.
- `about-copy` shows philosophy text and at least one credential chip plus its matching highlight line.

## How to get to it (user POV)

- Choose `About` in the header (desktop or mobile menu).
- Scroll down from the hero until the gray about band appears.

## Driving it with control-portfolio

Preconditions:

- Portfolio is healthy at `http://127.0.0.1:<port>/portfolio-website/`.
- Viewport is 1280×800.
- `control-portfolio doctor` reports mounted `#about`.

- **Open about.** Choose `About`. Run `control-portfolio browser goto` then `control-portfolio browser click --role button --name "About"` then `control-portfolio browser wait-for --selector "#about"`. `Leadership Philosophy` is in view.
- **Portrait.** Confirm the portrait is present. Run `control-portfolio browser snapshot --aria --path artifacts/about/section.aria.txt`. The snapshot includes `img "Alex Bramall"` and `heading2 "Leadership Philosophy"`.
- **Copy.** Confirm narrative and a highlight. Run `control-portfolio browser contains --text "empowering teams to achieve extraordinary results"` and `control-portfolio browser contains --text "Certified PMP"`. Both strings are visible.
- **Proof.** Capture the in-view about band. Run `control-portfolio browser screenshot --path artifacts/about/section.png`. The screenshot shows the portrait, `About Me`, and `Leadership Philosophy`.

## Gotchas

- Credential chips display only the first two words of each highlight (for example `Certified PMP`), while the list below repeats the full sentence. Assert the full sentence with `contains`, not chip equality.
- The portrait is a remote Pexels URL. Offline or blocked images still leave the `alt` in the snapshot; do not fail the feature solely because pixels are missing unless you are proving image loading.
- Do not use the unlabeled hero chevron as the about entry point.
