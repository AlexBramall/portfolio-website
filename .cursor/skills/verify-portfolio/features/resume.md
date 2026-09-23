# Resume

Resume is `/resume`: a narrow paper CV under the site header. The document header is the name, the locked role line, Austin, Texas, and text links for Contact and LinkedIn. Experience is titles and dates only, newest first, separated by hairlines. Education and skills are compact lines. A quiet Contact text link closes the sheet. There is no marketing tile stack, no proof chips, and no Get in touch strip. There is no Download PDF control unless a real file URL is configured.

## Sub-features

- `resume-open` opens `/resume` from nav `Resume`.
- `resume-header` shows heading `Alex Bramall`, the role line `AI-Native Program & Product Leader`, the caption `Austin, Texas`, a text `Contact` link to `/contact`, and a text `LinkedIn` link. There is no filled Contact pill and no page title `Resume`.
- `resume-experience` lists Form Factory, Nomad, Gilleard Dental Marketing, CyberCoders, and Uncommon Threads with titles and date ranges only, separated by hairlines.
- `resume-education` shows Wake Forest University and Bachelor of Arts, Communication on one compact line.
- `resume-skills` shows one quiet line: Program management, Product, Ecommerce, Shopify, Cross-functional delivery, AI-native operations.
- `resume-contact` repeats a text `Contact` link at the bottom of the sheet. There is no `Get in touch` strip.
- `resume-deep-link` opens `/portfolio-website/resume` directly.

## How to get to it (user POV)

- Choose `Resume` in the header (desktop or mobile menu).
- Choose `Resume` on the About hero or on the About / Work footer strip.
- Open `/portfolio-website/resume` directly.

## Driving it with control-portfolio

Preconditions:

- Portfolio is healthy at `http://127.0.0.1:<port>/portfolio-website/`.
- Viewport is 1280×800.

- **Open resume.** Choose `Resume`. Run `control-portfolio browser goto` then `control-portfolio browser click --role link --name "Resume"` then `control-portfolio browser wait-for --selector "#resume"`. Heading `Alex Bramall` is in view and the path ends with `/resume`. The header Resume link is the active pill.
- **Document header.** Confirm the role line and location. Run `control-portfolio browser contains --text "AI-Native Program & Product Leader"` and `control-portfolio browser contains --text "Austin, Texas"`. `#resume` includes a text `link "Contact"` to `/contact` and a text `link "LinkedIn"`. There is no filled Contact pill and no `Download PDF` link.
- **Experience.** Bring the entries into view. Run `control-portfolio browser eval --expr "document.getElementById('resume-experience').scrollIntoView({block:'start'})"` then `control-portfolio browser wait-for --selector "#resume-experience" --in-view`. The section lists Form Factory, Nomad, Gilleard Dental Marketing, CyberCoders, and Uncommon Threads. Titles include `Head of Operations & Delivery`, `Director of Operations & Delivery`, `Senior Program Manager`, `Director of E-commerce & Digital Product`, `Ecommerce Manager`, `Technical Project Manager`, `Digital Project / Product Manager`, `Project Coordinator`, `Technical Recruiter`, and `Co-Founder`. Dates include `Jul 2024 – Present` and `Aug 2023 – Jun 2024`. There are no duty bullets and no employer kind chips.
- **Education.** Run `control-portfolio browser eval --expr "document.getElementById('resume-education').scrollIntoView({block:'start'})"` then `control-portfolio browser wait-for --selector "#resume-education" --in-view`. The line shows `Wake Forest University` and `Bachelor of Arts, Communication`.
- **Skills.** Run `control-portfolio browser eval --expr "document.getElementById('resume-skills').scrollIntoView({block:'start'})"` then `control-portfolio browser wait-for --selector "#resume-skills" --in-view`. The line includes `Program management`, `Product`, `Ecommerce`, `Shopify`, `Cross-functional delivery`, and `AI-native operations`.
- **Closing contact.** Run `control-portfolio browser eval --expr "document.getElementById('resume-contact').scrollIntoView({block:'start'})"` then `control-portfolio browser wait-for --selector "#resume-contact" --in-view`. The sheet ends with a text `Contact` link. There is no heading `Get in touch`.
- **Deep link.** Open the route directly. Run `control-portfolio browser goto --url "http://127.0.0.1:$VERIFY_PORT/portfolio-website/resume"` then `control-portfolio browser wait-for --selector "#resume"`. The path stays under `/portfolio-website/` and ends with `/resume`.
- **Proof.** Capture the page. Run `control-portfolio browser goto --url "http://127.0.0.1:$VERIFY_PORT/portfolio-website/resume"`, `control-portfolio browser wait-for --selector "#resume"`, `control-portfolio browser snapshot --aria --path artifacts/resume/page.aria.txt`, and `control-portfolio browser screenshot --full-page --path artifacts/resume/page.png`. Artifacts show heading `Alex Bramall`, the role line, Contact, and the employer entries on one paper sheet. There is no Download PDF link and no `example.com` href.

## Gotchas

- Resume is a route, not a home section. Doctor on home will not list `#resume`.
- Header `Alex Bramall` is the wordmark link. The document heading is also `Alex Bramall` and is not a link. Header, document, and closing `Contact` share a name. Prefer `#resume a` when the header would match first.
- Header, About, and Work `Resume` links share a name. From home, the header link is the one to click. The resume sheet does not include a Resume link.
- Do not invent duty bullets, metrics, or a PDF href. Proof of the missing download is the absence of `Download PDF` and `example.com` in the snapshot.
- The Director of Operations & Delivery range is `Aug 2023 – Jun 2024`. Head of Operations & Delivery is `Jul 2024 – Present`.
- Default `wait-for --selector` requires the target near the viewport top. `#resume-experience`, `#resume-education`, `#resume-skills`, and `#resume-contact` sit below the document header. Scroll them into view, then `wait-for --selector "#<id>" --in-view`.
- The sheet is one paper column. Do not look for marketing tiles, dual-accent chips, or a `Get in touch` strip.
