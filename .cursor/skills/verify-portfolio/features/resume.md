# Resume

Resume is `/resume`: a page hero, titles-only employer tiles newest first, one education tile, a compact skills row, and a Contact-only footer strip. There is no Download PDF control unless a real file URL is configured.

## Sub-features

- `resume-open` opens `/resume` from nav `Resume`.
- `resume-hero` shows heading `Resume`, the role line `AI-Native Program & Product Leader`, the caption `Austin, Texas`, and a primary `Contact` link to `/contact`.
- `resume-experience` lists Form Factory, Nomad, Gilleard Dental Marketing, CyberCoders, and Uncommon Threads with titles and date ranges only.
- `resume-education` shows Wake Forest University and Bachelor of Arts, Communication in one quiet tile.
- `resume-skills` shows a compact pill row: Program management, Product, Ecommerce, Shopify, Cross-functional delivery, AI-native operations.
- `resume-cta` repeats Contact in the page footer strip and omits Resume.
- `resume-deep-link` opens `/portfolio-website/resume` directly.

## How to get to it (user POV)

- Choose `Resume` in the header (desktop or mobile menu).
- Choose `Resume` on the About hero or on the About / Work footer strip.
- Open `/portfolio-website/resume` directly.

## Driving it with control-portfolio

Preconditions:

- Portfolio is healthy at `http://127.0.0.1:<port>/portfolio-website/`.
- Viewport is 1280×800.

- **Open resume.** Choose `Resume`. Run `control-portfolio browser goto` then `control-portfolio browser click --role link --name "Resume"` then `control-portfolio browser wait-for --selector "#resume"`. Heading `Resume` is in view and the path ends with `/resume`. The header Resume link is the active pill.
- **Hero.** Confirm the role line and location. Run `control-portfolio browser contains --text "AI-Native Program & Product Leader"` and `control-portfolio browser contains --text "Austin, Texas"`. `#resume` includes `link "Contact"` to `/contact`. There is no `Download PDF` link.
- **Experience.** Bring the tiles into view. Run `control-portfolio browser eval --expr "document.getElementById('resume-experience').scrollIntoView({block:'start'})"` then `control-portfolio browser wait-for --selector "#resume-experience" --in-view`. The section lists Form Factory, Nomad, Gilleard Dental Marketing, CyberCoders, and Uncommon Threads. Titles include `Head of Operations & Delivery`, `Director of Operations & Delivery`, `Senior Program Manager`, `Director of E-commerce & Digital Product`, `Ecommerce Manager`, `Technical Project Manager`, `Digital Project / Product Manager`, `Project Coordinator`, `Technical Recruiter`, and `Co-Founder`. Dates include `Jul 2024 – Present` and `Aug 2023 – Jun 2024`. There are no duty bullets.
- **Education.** Run `control-portfolio browser eval --expr "document.getElementById('resume-education').scrollIntoView({block:'start'})"` then `control-portfolio browser wait-for --selector "#resume-education" --in-view`. The tile shows `Wake Forest University` and `Bachelor of Arts, Communication`.
- **Skills.** Run `control-portfolio browser eval --expr "document.getElementById('resume-skills').scrollIntoView({block:'start'})"` then `control-portfolio browser wait-for --selector "#resume-skills" --in-view`. The row includes `Program management`, `Product`, `Ecommerce`, `Shopify`, `Cross-functional delivery`, and `AI-native operations`.
- **Footer strip.** Run `control-portfolio browser eval --expr "document.getElementById('resume-cta').scrollIntoView({block:'start'})"` then `control-portfolio browser wait-for --selector "#resume-cta" --in-view`. The strip heading is `Get in touch` and it shows `Contact` only.
- **Deep link.** Open the route directly. Run `control-portfolio browser goto --url "http://127.0.0.1:$VERIFY_PORT/portfolio-website/resume"` then `control-portfolio browser wait-for --selector "#resume"`. The path stays under `/portfolio-website/` and ends with `/resume`.
- **Proof.** Capture the page. Run `control-portfolio browser goto --url "http://127.0.0.1:$VERIFY_PORT/portfolio-website/resume"`, `control-portfolio browser wait-for --selector "#resume"`, `control-portfolio browser snapshot --aria --path artifacts/resume/page.aria.txt`, and `control-portfolio browser screenshot --full-page --path artifacts/resume/page.png`. Artifacts show heading `Resume`, the role line, Contact, and the employer tiles. There is no Download PDF link and no `example.com` href.

## Gotchas

- Resume is a route, not a home section. Doctor on home will not list `#resume`.
- Header, About, and Work `Resume` links share a name. From home, the header link is the one to click. On `/resume`, the footer strip does not include Resume.
- Do not invent duty bullets, metrics, or a PDF href. Proof of the missing download is the absence of `Download PDF` and `example.com` in the snapshot.
- The Director of Operations & Delivery range is `Aug 2023 – Jun 2024`. Head of Operations & Delivery is `Jul 2024 – Present`.
- Default `wait-for --selector` requires the target near the viewport top. `#resume-experience`, `#resume-education`, `#resume-skills`, and `#resume-cta` sit below the hero. Scroll them into view, then `wait-for --selector "#<id>" --in-view`.
