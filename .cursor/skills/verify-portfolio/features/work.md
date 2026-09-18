# Work

Selected work is a three-card grid on home (not a carousel). `/work` is the Work index: a page hero, the same Work cards in a 2-column grid, and a quiet Contact + Resume strip. Cards stay labeled placeholders until real cases land. There is no filter chrome.

## Sub-features

- `work-home-grid` shows three case cards under `Selected work`, each with eyebrow · title · outcome · tags.
- `work-index` opens `/work` from nav `Work`, hero `Work`, or Selected work `All work`.
- `work-index-hero` shows heading `Work`, `[placeholder: work.index.intro]`, and a secondary text `Contact` link to `/contact`.
- `work-index-grid` shows the same placeholder cards in a 2-column grid from `md` up (1 column on mobile). There are no filter chips.
- `work-index-cta` repeats Contact and Resume in the page footer strip.
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

- **Home grid.** Load home and bring Selected work into view. Run `control-portfolio browser goto`, `control-portfolio browser eval --expr "document.getElementById('selected-work').scrollIntoView({block:'start'})"`, then `control-portfolio browser wait-for --selector "#selected-work" --in-view`. Three cards are visible with eyebrow, title, outcome, and tags. There are no `Previous projects` / `Next projects` controls.
- **Index.** Choose header `Work`. Run `control-portfolio browser click --role link --name "Work"` then `control-portfolio browser wait-for --selector "#work"`. Path ends with `/work`. Heading `Work` is in view.
- **Intro.** Confirm the labeled support line. Run `control-portfolio browser contains --text "[placeholder: work.index.intro]"`.
- **Hero Contact.** Confirm the secondary text link. Run `control-portfolio browser snapshot --aria --path artifacts/work/hero.aria.txt`. `#work` includes `link "Contact"` to `/contact`. It is a text link, not a filled primary button. Prefer `#work a[href$='/contact']` when the header would match first.
- **Grid.** Bring the cards into view. Run `control-portfolio browser eval --expr "document.getElementById('work-grid').scrollIntoView({block:'start'})"` then `control-portfolio browser wait-for --selector "#work-grid" --in-view`. Cards show `[placeholder: work.card.1.title]`, `[placeholder: work.card.2.title]`, and `[placeholder: work.card.3.title]` with labeled eyebrows, outcomes, and tags. There is no filter chip row.
- **Footer strip.** Run `control-portfolio browser eval --expr "document.getElementById('work-cta').scrollIntoView({block:'start'})"` then `control-portfolio browser wait-for --selector "#work-cta" --in-view`. The strip heading is `Get in touch` and it repeats `Contact` and `Resume`. Do not activate Resume; it opens a new tab.
- **Open sample case.** Choose the sample card from the index. Run `control-portfolio browser goto --url "http://127.0.0.1:$VERIFY_PORT/portfolio-website/work"`, `control-portfolio browser wait-for --selector "#work"`, `control-portfolio browser eval --expr "document.getElementById('work-grid').scrollIntoView({block:'start'})"`, `control-portfolio browser wait-for --selector "#work-grid" --in-view`, `control-portfolio browser click --selector "a[href$='/work/sample-case']"`, then `control-portfolio browser wait-for --text "[placeholder: work.card.1.title]"`. Path ends with `/work/sample-case`.
- **Proof.** Capture the work index. Run `control-portfolio browser goto --url "http://127.0.0.1:$VERIFY_PORT/portfolio-website/work"`, `control-portfolio browser wait-for --selector "#work"`, `control-portfolio browser eval --expr "document.getElementById('work-grid').scrollIntoView({block:'start'})"`, `control-portfolio browser wait-for --selector "#work-grid" --in-view`, `control-portfolio browser snapshot --aria --path artifacts/work/index.aria.txt`, and `control-portfolio browser screenshot --full-page --path artifacts/work/index.png`. Artifacts show heading `Work`, the intro placeholder, a text Contact link, and the labeled placeholder cards. There is no filter row.

## Gotchas

- Cards are links; the accessible name includes the whole card text, not only the title. Prefer the `href` selector for a specific slug.
- Optional card metrics are omitted when empty. Do not invent numbers to assert a metric row.
- Hero and footer `Contact` share names with header links. Prefer `#work a` and `#work-cta a` when the header would match first.
- Activating `Resume` leaves the app. Proof is the accessible name, `href`, and `target=_blank`.
- Writing and lab routes are out of scope for Phase 1.
- Default `wait-for --selector` requires the target near the viewport top (or max scroll). `#work-grid` sits below the Work hero, so a bare wait after `goto /work` times out even when the grid intersects the viewport. Scroll it into view, then `wait-for --selector "#work-grid" --in-view`. Same for `#selected-work` on home and `#work-cta`.
