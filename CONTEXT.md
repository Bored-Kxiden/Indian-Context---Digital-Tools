# Project context and change log

This file is the running record of **why the site is the way it is** and **what has changed**. Read it before making changes. Update it in the same commit as any change to content, structure, design, hosting, or decisions.

## How to keep this file current

1. **Every change gets a change-log entry** (section 9, newest first): date, what changed, and why.
2. **Every decision gets an ID** (section 4). If a decision is reversed, do not delete it: mark it *Superseded by Dn* and add the new one.
3. **Assumptions are labelled as assumptions** until the project owner confirms them. Move them out of section 5 when confirmed.
4. **Keep private details out of this file.** The repository is public. No personal email addresses, tokens, or private links.

---

## 1. What this project is

A public website for **Beyond the Edge Case** (BITSDES 2024–28), a toolkit for designing in Indian contexts by questioning the universal assumptions behind what gets treated as an exception. Its central line: *what gets classified as an edge case depends on the baseline we design from* (D30). It began as "Designing for the Indian Context"; the booklets, card kit and printed cards still carry that title (Q17).

The toolkit is organised as **components**. Each component works on its own and reads a design problem from a different side:

| # | Component | Status on the site |
| --- | --- | --- |
| 1 | Reading Existing Products (4 tools + synthesis, optional card kit) | Live |
| 2 | Reading Visual Culture (Show, Read, Build, Hand off) | Live |
| 3 | Reading Language (Before you start, then Listen, Translate, Test, Library, Kahavat Relay). Includes the earlier Meaning-to-Interface pages | Live |
| 4 | Reading Material Reality (4 tools, 1 guideline, 1 map) | Live |
| – | Claim & Reflection (a Before and After page inside each component, three Look back pages at the end) | Live |

The site does three jobs: explain each tool, show a worked example (the running persona is **Meera**), and let visitors download the blank templates and the print-ready card kit.

**Audience:** design students, product teams, NGO and public-service teams, field researchers.

## 2. Sources

| Source | What it is | Where it lives |
| --- | --- | --- |
| Language component write-up | The Meaning-to-Interface process flow, Fidelity Protocol, Language Lens, and thick-translation method (PDF called "The Meaning-to-Interface Process Flow" and "The Thick Translation Methodology") | Owner's upload. Its content now sits under the booklet's tools: the Meaning Card, Field Kit, Fidelity Protocol, Lens Audit and libraries are "Go deeper" pages (`src/pages/components/language/`), and the methodology is the Reverse thick translation tab. The process-flow modules were retired (D27) |
| **Components 2 + 3 booklet** (36 pages) | Component 2 (pages 2.01–2.15) and Component 3 (3.01–3.21): guide pages, filled examples, blank templates, closing "Is it working?" pages. This is the main source for both | `public/downloads/components-2-3-booklet.pdf` (recompressed). Page images and blank PDFs are generated from it |
| **Component 02 draft** (6 pages) | An earlier draft of Component 2 that repeats most of the booklet | Owner's upload; not stored. What it adds is folded in once (D26) |
| FigJam board "First-Generation Personal" | The process-flow diagram (section 12) and the Fidelity Protocol and Language Lens notes. Sections 13 (information architecture), 14 (simplified wireframe), and 15 (task flows) were added during this project | Owner's Figma. Link intentionally not stored here |
| **Toolkit Booklet** (53 pages) | Components 1 and 4: guide pages, filled examples, blank templates, the "I want to…" list for Component 4, participant field cards, closing page | `public/downloads/designing-for-the-indian-context-booklet.pdf`. Page images and split PDFs are generated from it |
| **Component 1 Card Kit** (16 pages) | Card sheets S1–S8 and boards B1–B7 for Component 1 | `public/downloads/component-1-card-kit.pdf`. Split into sheets and boards |
| **Concept website** (HTML mock-ups) | The visual language, the page patterns (four-tab tool page, Paper/Cards switch, component cards), and the site map | Owner's upload; not stored in the repo (about 1 MB with embedded fonts). Its fonts were extracted into `public/fonts/` |
| diy-toolkit.org | Original reference for information hierarchy and the "I want to…" pattern | Blocked from the build environment, so the owner's screenshot was used |

## 3. Architecture and hosting

- **Stack:** Astro 7, static output, no backend, one runtime dependency. Node 22.12 or newer.
- **Source of truth for content:** files in `src/data/` (TypeScript and JSON), not the page files. Pages render from data.
- **Downloads:** every file is listed in `src/data/downloads.ts`; sizes are measured at build time and a missing file fails the build.
- **Generated assets:** `scripts/build-templates.mjs` (Language component cards and CSV) and `scripts/extract-booklet-assets.py` (booklet and card-kit page images and split PDFs; `--c23-only` adds Components 2 and 3 without touching the first booklet's files). Outputs are committed, so builds never need a browser or Python.
- **Hosting:**
  - **Vercel** (primary). Project `meaning-to-interface-toolkit`, production alias `https://meaning-to-interface-toolkit.vercel.app`. Git-connected: a push to `main` deploys to production; any other branch gets a preview. Vercel Authentication is off, because the site is public.
  - **GitHub Pages** workflow (`.github/workflows/deploy.yml`) runs on pushes to `main`. It needs Settings → Pages → Source: GitHub Actions to be switched on. It sets `SITE_URL` and `BASE_PATH` for the project URL.
- **Supabase:** a project was supplied by the owner. The site is static and nothing uses it. See open question Q6.
- **Branches:** work happens on the feature branch. `main` is the production branch. **Do not push to `main` without the owner's go-ahead**, because that publishes.

## 4. Decisions

Status: **Confirmed** by the owner, or **Assumed** (made to keep moving; needs confirming).

| ID | Decision | Status |
| --- | --- | --- |
| D1 | Static Astro site, no backend. Simplest to maintain for content-heavy pages with downloadable files. | Confirmed (stack left to us) |
| D2 | Hosting on Vercel, with a GitHub Pages workflow kept as a fallback. Base path comes from `BASE_PATH`/`SITE_URL` env vars. | Confirmed |
| D3 | The site is the whole toolkit (then titled **Designing for the Indian Context**, now **Beyond the Edge Case**, D30). The Meaning-to-Interface work becomes **Component 3 · Reading Language**. | Assumed. Based on the Language write-up calling itself "the Language component" and the concept site listing Language as component 3. |
| D4 | Visual language comes from the concept website: Bricolage Grotesque + IBM Plex Mono, ground `#FAF7F0`, white surfaces, ink `#16140F`, pill buttons, mono uppercase labels, dark footer. Fonts are self-hosted (both are SIL OFL). | Confirmed |
| D5 | Component colours follow the concept: **1 green `#1E6B52`**, **2 turmeric `#E8A92A`** (ink text), **3 terracotta `#B8492C`**, **4 indigo `#3144A6`**. | Confirmed for 1, 4 (concept style page). 2, 3 taken from the concept's overlapping-circles logo. |
| D6 | The **"I want to…" flow stays** as the main way in: on the home page (across components), and on each component overview. Component 4 uses the booklet's own six items. | Confirmed |
| D7 | Every Component 1 and 4 tool is one page with four tabs: **Guide, Example, Blank template, Card kit**, plus a **Paper / Cards** switch that remembers how the visitor works. The Card kit tab exists only for Component 1, because the booklet has no card kit for Component 4. | Assumed from the concept site map |
| D8 | v1 shows the booklet's example and blank pages **as images**, with the guide text and "how to use it" steps as real text. Rebuilding examples natively in HTML (as the concept does) is a later step. | Assumed (keeps content faithful and shippable) |
| D9 | The booklet and card-kit PDFs are hosted as downloads, and split into per-template PDFs, card sheets (A4) and boards (A2). | Assumed |
| D10 | Library entries (Expression Library, Design Language Library) are illustrative samples and say so on the page. | Confirmed |
| D11 | Old `/tools/*` and `/about/` (methodology) URLs move under `/components/language/`; old `/tools/*` URLs redirect. | Assumed |
| D12 | ~~Language module chips use turmeric, ink and terracotta.~~ *Superseded by D20 (three depths of terracotta).* | Superseded |
| D13 | The six Language tool pages keep their long-form layout (no tabs, no left rail) inside the new shell: terracotta accent, breadcrumb `Home › Components › 3 · Language › tool`, prev/next. They are prose-and-interactive pages, not booklet pages. | Assumed |
| D14 | **No licence claims about the booklet or card kit.** The repository code is MIT and the site says only that. The booklet states no licence, so the site does not say its content is free to adapt or share (see Q2). | Confirmed by the source (nothing stated) |
| D15 | Home page order: hero, then **"I want to…" straight away**, then components, why this exists, how every tool works, the guideline, Meera. The goal-first flow is the first thing after the hero. | Assumed |
| D16 | Tool-page tabs are progressive enhancement: without JavaScript the four panels stack under their headings; with it they become tabs (ARIA roles added by script, keyboard arrows, `#guide`, `#example`, `#blank`, `#card-kit` and `#part-b` deep links). The Paper / Cards choice is remembered in `localStorage` and only decides which tab opens first. | Assumed |
| D17 | Redirects for old `/tools/*` are explicit per slug in `astro.config.mjs` (Astro's dynamic redirects need a matching dynamic route). The destinations carry the base path, because Astro does not add it. | Assumed |
| D18 | `vercel.json` pins the framework to Astro (`npm run build`, output `dist`), so a Vercel project with the wrong preset still builds. It matches what Vercel auto-detects, so projects that were already right are unaffected. | Assumed |
| D19 | **Design system.** Spacing steps are multiples of 8 px (4 px for hairlines): `--sp-half … --sp-16`. Type scale is 12 · 14 · 16 · 18 · 20 · 24 · 32 · 40 · 48–72. Radii are 8 / 16 / 24 px. Body text is 18 px. Small mono labels are never below 12 px. All of it lives as tokens in `src/styles/global.css`. Every component has a text-safe `-deep` colour for small type on light and tinted grounds. | Confirmed (asked for: rule of 8, hierarchy, consistency, contrast) |
| D20 | **Colour means the component, and nothing else.** Chips, tags, buttons, dots and headers take their own component's colour: 1 green, 2 turmeric, 3 terracotta, 4 indigo. Component 4's Break is indigo, not terracotta. Reflection is neutral ink, not turmeric. Language's tools are all terracotta (its three modules, three depths of it, were retired in D27). Status chips (confirmed, needs re-check, sensitive) and warnings are colour-neutral: a glyph and a border style carry the meaning, so green, amber and red never suggest a component. Decorative blocks (how a tool works, "with it", "good") use ink and sand. Supersedes D12. | Confirmed (asked for) |
| D21 | **End-to-end layout.** The content container runs to 1920 px with a fluid 16–48 px gutter, and pages are built in columns: split sections (heading left, content right), examples side by side, and each example decides with a container query whether its steps sit beside or below the page so the page stays large. Reading text stays at about 68 characters. | Confirmed (asked for) |
| D22 | **Navigation.** A sticky component strip on wide screens (all components one click away, current one filled in), a "Find a tool" search over every tool, step and page (opens with `/` or Ctrl+K; on phones a search button), a Menu on phones, a step bar under every component heading (replaces the old left rail, so Components 1 to 4 navigate the same way), and a sticky tab bar on tool pages. Language pages get an "On this page" column. | Confirmed (asked for) |
| D23 | **"I want to…" is one card per component, and it lists broad goals only.** Every card is a short list (Language lists its five themes: understand the setting, capture what people mean, translate without losing meaning, test interface wording, build on what we already know), so no component looks bigger than it is. The steps and ways of doing each theme (the cards, the lenses, the libraries…) sit on the theme's own page and stay findable through "Find a tool". Home shows the four cards two by two, in order. Component overviews show their own card as a full-width list. | Confirmed (asked for) |
| D24 | **Accessibility bar: WCAG 2.2 AA, checked, not assumed.** axe-core (WCAG 2 A/AA, 2.1, 2.2 AA and best practice) reports no violations on every page, every tab, the search dialog and the phone menu, at 1440, 390 and 320 px (and, for the pages with examples, 1024 px). Keyboard: every focus stop has a visible ring and is never hidden under a sticky bar. Targets are at least 44 px where they are primary controls. Reduced motion and forced colours are handled. | Confirmed (asked for) |
| D25 | **Filled examples are real HTML, drawn from the booklet's own geometry.** Each of the 25 filled examples (1.06, 1.08, 1.11, 1.14, 1.16, 1.17, 1.20, 1.22, 2.04, 2.07, 2.10, 2.13, 3.05, 3.06, 3.09, 3.12, 3.15, 3.18, 3.20, 4.07, 4.09, 4.12, 4.14, 4.17, 4.20; 3.05 and 3.20 are print sheets) is rebuilt as HTML/CSS/SVG in `src/components/examples/`, so text is sharp, searchable, selectable and translatable. Positions, sizes, gaps, colours and line breaks come from a PDF extraction (PyMuPDF): one unit `--u` is one point of the A4 page (511.5 pt content width), so the example scales exactly with its column. (The Component 2 and 3 booklet is scanned pages with an OCR text layer and no vector shapes, so there sizes were fitted: each printed line's width is measured against Bricolage's real metrics in the browser, and the result is compared with the page at the same scale. Drawings, such as the relay's, are redrawn in SVG.) Type pins Bricolage's optical size to the printed size (`opsz` = pt × 4/3), which is what makes line breaks match the print. Inside an example the booklet's own colours apply (indigo #283a7a, green #2e5e4e, terracotta #a8432a, amber #e3a72f, note yellow and teal), an intentional exception to the site's component colours (D20), because the example is the printed page. Below about 45 rem the printed layout gives way to a reflowed one (stacked cards, tables that scroll in a keyboard-reachable region, diagrams with a text list); there `--u` is fixed at a print-size pixel so padding and gaps stay readable. Every example keeps its text alternative and a "Compare with the booklet page" disclosure showing the original page image. Blank templates stay page images. | Confirmed (asked for) |
| D26 | **Components 2 and 3 are built from the new booklet; the six-page draft is merged in once.** The booklet is the base for both. The earlier Component 02 draft repeated most of it (overview, missions, passes, scenario, hand-off), so wherever the two agree the booklet's wording appears once. What only the draft has is kept: the rule not to photograph "Indian culture", the lists of actions and enablers for Passes 1 and 2, the nine structures as questions, the fuller prompt under each of the nine scenario boxes, the edge-case check, the visual reading, the twelve Context Profile lines, the one-sentence reading, and the general question each hand-off asks. Nothing is shown twice: each piece lives on the page it belongs to (see D28 for Language). Filled examples are the booklet's, labelled illustrative. | Confirmed (asked for) |
| D27 | **One vocabulary for Language: Before you start + Tools 1 to 5.** The booklet's route (Listen, Translate, Test, Library, Kahavat Relay) replaces the earlier Modules 1 to 3, the "six tools" count and the process-flow diagram. Each earlier page stays at its address and now hangs under the tool it belongs to as a "Go deeper" link: Meaning Card and Field Kit under Listen, Fidelity Protocol under Translate, Lens Audit under Test, the two libraries under Library. On those pages the step bar keeps the parent tool lit and the breadcrumb and button lead back to it. The booklet's Meaning Card (short: said, observed, inferred, what it meant, correction) and the site's full card are the same card at two levels of detail, and the Meaning Card page now says so with a line-by-line table. New questions loop back to Tool 1 · Listen, as the booklet says. Lens N is "New (the form's own words: nomenclature)" and Lens P is "Proxy". The positionality prompts are the union of the site's five and the booklet's five (seven), written once in `templates/kit-cards.json` and shown on Before you start. | Assumed: how the request was met. Confirm |
| D28 | **Reverse thick translation is the centre of Language and is easy to find.** The booklet only touches it lightly, so the site gives it a tab of its own on Translate (three directions with their questions, the reading of the result, small signals, the glossary entry), a feature section on the Language overview, a marked row in the route, its own lines in "I want to…" and search, and a redirect from the old methodology page. The two-direction and three-direction sections of the old methodology page are one set of three directions now. The three directions are kept apart from the three lenses (N, P, T) in Test. | Confirmed (asked for) |
| D29 | **Colour stays with the component, also in Components 2 and 3.** The booklet colours each tool's guide page differently (indigo, terracotta, turmeric), which would put Component 4's indigo on a Component 2 page (D20). So in Components 2 and 3 the guide page image sits under the text, one click away, and the text uses the two columns. Components 1 and 4 keep the page beside the text. Component 2 takes turmeric, Component 3 terracotta. The printable Language cards now use two depths of terracotta too. | Assumed: follows D20. Confirm (Q14) |

| D30 | **The toolkit is titled "Beyond the Edge Case" and says one thing first.** Title: *Beyond the Edge Case*. Description (also the meta description and the tagline under the title): *A toolkit for designing in Indian contexts by questioning the universal assumptions behind what gets treated as an exception.* The owner's introductory statement sits straight under the hero (`EdgeIntro`): the four opening sentences, "unusual to the system does not necessarily mean unusual to the person", "Beyond the Edge Case is a toolkit for finding and investigating these situations before they are reduced to exceptions", and the move from "How do I accommodate this edge case?" to "What made this an edge case in the first place?". The central line, **"What gets classified as an edge case depends on the baseline we design from."**, is the next block on the home page, set large on ink with the larger idea beside it ("The goal is not to replace one universal with another…"), and the same band opens About (`CentralLine`). All of it is written once, in `intro` in `src/data/site.ts`. The section heading over the introduction ("Start from the situation, not the default.") is ours. | Confirmed (asked for). The heading is ours: confirm |

| D31 | **Reflection is live as "Claim & Reflection" and runs through the other four components.** Content is from the owner's reference HTML (twelve A4 pages, codes R·1A … R·E3). Five steps: 1 Position and 2 Prediction on a **Before** page, 3 Claim (the stanza) and 4 Redaction on an **After** page, 5 Summarise in three **Look back** pages (Summarise, Wheel, Consequences). Every component has its own `reflect-before/` and `reflect-after/` page (8 in all) with the step bar item "Reflect: before" after its opening page and "Reflect: after" at its end, and a row in its route; the pages keep their component's colour. Placement follows the reference: Component 1 before Tool 1 (after Pick a product) and after Synthesis (where its "Is it working?" sits); Component 2 before Show and after Is it working?; Component 3 after Before you start and after Is it working?; Component 4 before Before you start (the reference puts it before "Map the journey", which is the Journey Strip) and after Ask your participants. The Reflection overview and the three Look back pages are neutral ink (D20, Q12). On screen each page is a reading version in the site's theme (the questions, where it goes, what to do next); the printable page is a blank A4 sheet, built by `npm run build:reflection` from `templates/reflection/claim-and-reflection.html` (the reference layout with its fonts pointed at the site's own) into `public/downloads/templates/reflection-*.pdf`, `public/downloads/claim-and-reflection.pdf` and previews in `public/reflection/`. Those sheets and previews keep the reference's blue page, like the booklet's page images (D25): it is the printed page. Toolkit name in the sheets follows D30 ("DFIC 07" became "07"). Their footers still cite the reference's booklet numbers ("after 1.02", "fill before 1.03 Media Story"), which belong to the final booklet; the site pages use tool names instead (Q18). "I want to…" gets a fifth, full-width Reflection card (five broad goals, written by us). The Wheel is drawn as SVG from the printed geometry; it is an illustration, not a fill-in tool (backlog). | Assumed: the site layout and the placement on C4. Confirm |

| D32 | **Component 2 is updated from the write-up, and the Figma template is its main download.** The write-up ("Reading Visual Culture") is the updated content. Where it agrees with the booklet the wording appears once; what only it has is added: the opening framing and the interface-versus-situation pair, what "visual culture" means, the six movements (Show, Find, Read, Build, Challenge, Hand off), what you will make, a new **Before you start** page (four things you need, participant autonomy, what not to do, the designer's role, the checklist), "start with evidence, not explanation" with its example, when to reach for it, five hand-offs each with a reason (Existing Products, Material Reality, Language, Reflection, "we don't know yet") and the core principle. The four tools stay (the booklet's examples and blank templates are built on them). **Our mapping, not the write-up's:** Find sits in Tool 2 · Read (Pass 1), Read in Passes 2 and 3 and the nine questions, Challenge in the evidence tags, the stop rule, the edge-case check and "Is it working?". The write-up's names for other components are the site's: "Reading Material Conditions" is Material Reality, "Reading Language Conditions" is Language, "Reading Yourself" is Reflection. The **Figma template** (`public/downloads/visual-culture-framework.fig`, format FIG) is the component's main file: a block on the overview (what is in it, how to open it), a "Or work in Figma" note on the Blank template tab of Show, Build and Hand off, and first in Component 2's templates on Downloads. The blank PDFs stay. | Assumed: the mapping and the placement of Before you start (after Overview, before Reflect: before). Confirm |

### Earlier decisions that still apply (Language component)

- **Fidelity rule:** a finding missing any of the four tags (source language, who interpreted, rendering type, single-source flag) cannot carry full confidence until re-checked. A single-source finding stays provisional until a second reader agrees. *(Assumed reading of the write-up.)*
- **The three directions** (native to English, English to native, native to regional) are the booklet's, with the earlier write-up's reasons for each. They are kept apart from the Language Lens's three lenses (N, P, T).
- **Tested-status meanings** (Confirmed / Partially confirmed / Not yet tested) and the **Correction status options** on the Meaning Card are our wording. *(Assumed.)*
- **Printable cards** for the Language component are 6 × 4 in. Their prompts (Context, Interview, Reflection, Positionality) are a first draft written from the process steps, in `templates/kit-cards.json`. They are labelled Draft v0.2: "Module" labels became Before you start / Tool 1 · Listen, and the positionality card has seven prompts.
- **India 1 / 2 / 3** is used only as an audience label; the segments are not defined.
- **The site never invents research data.** Sample entries and worked examples are labelled illustrative.

## 5. Information architecture (current)

```
/                                   Home: hero, "I want to…" (all components), components, why, how every tool works, guideline, Meera
/components/                        the five components (Reflection sits under the four as a band)
  existing-products/                1 · overview + "I want to…", route, two ways to work, design claim
    pick-a-product/                   one specific product, before Tool 1
    media-gossip/ history/ the-break/ power/ synthesis/     4 tabs each: Guide · Example · Blank template · Card kit
  visual-culture/                   2 · overview: why, what "visual culture" means, the Figma template, "I want to…", six movements and route, situation not persona, evidence, when to use it, hand-offs, core principle
    before-you-start/                 context, participants, activity, their explanation; autonomy; what not to do; your role; checklist
    show/ read/ build/ hand-off/      Guide · Example · Blank template (Show adds "The six missions"; blank tabs point to the Figma template)
    is-it-working/                    good and warning signs, the closing line
  language/                         3 · overview, reverse thick translation, "I want to…", route, problems, where to use
    before-you-start/                 team, six things to do, positionality note, provisional glossary
    listen/ translate/ test/ library/ kahavat-relay/     Guide · Example · Blank template (Translate adds "Reverse thick translation")
    is-it-working/                    good and warning signs, hand-offs
    meaning-card/ physical-field-kit/ fidelity-protocol/ language-lens-audit/ expression-library/ design-language-library/
                                      "Go deeper" pages, each under its tool (D27)
  material-reality/                 4 · overview + "I want to…", nine layers, route
    before-you-start/                 Journey Strip, Visual Toolkit photos
    build/ break/ weigh/ say/         3 tabs each: Guide · Example · Blank template
    ask-your-participants/            field cards: questions, consent, care
  reflection/                       Claim & Reflection: overview (idea, five steps, where the pages are, print) + central line
    summarise/ wheel/ consequences/   the three Look back pages (R·E1–E3)
  (each of the four components)     reflect-before/ reflect-after/   R·nA, R·nB: position and prediction, claim and redaction
/card-kit/                          boards B1–B7, sheets S1–S8, print and set-up
/guideline/                         one real thing (#one-real-thing), how to read (#how-to-read), Meera (#meera)
/downloads/                         booklet, card kit, blank templates, Language templates
/about/                             who it is for, after the toolkit, further reading, open code
/tools/…, /components/language/methodology/    redirects to /components/language/… (methodology → translate/#reverse)
```

Every component page has a **step bar** under its heading (overview, then the tools in order; it scrolls sideways on a phone and fades where more steps continue). Tool pages add a sticky tab bar with the Paper | Cards switch for Component 1. The Language "Go deeper" pages add an "On this page" column built from their headings. Site-wide: a sticky component strip and "Find a tool" search (D22).

Fuller wireframes, a simplified wireframe, and task flows are in the owner's FigJam board (sections 13 to 15). Those describe the earlier six-tool site and need refreshing for this structure (see backlog).

## 6. Content status

| Area | Status |
| --- | --- |
| Component 1 and 4 guide text, steps, words, "I want to…" (C4) | Copied from the booklet (light editing for the web) |
| Component 1 cross-component "I want to…" phrases | **Written by us** from each tool's subtitle. Not in the booklet |
| Component 2 (Visual culture) guide text, steps, words, missions, boxes, closing page | Copied from the booklet; the earlier draft's extra lists and prompts folded in once (D26) |
| Component 2 overview, Before you start, hand-offs, evidence rule, when to use it | From the write-up, lightly edited for the web (D32). The six-movements-to-four-tools mapping, the section headings and the "What is in it" descriptions of the Figma frames are **written by us** |
| Component 3 (Language) guide text, steps, words, cue cards, closing page | Copied from the booklet |
| Language "Go deeper" pages, reverse thick translation, team, glossary | From the earlier Language write-up, re-pointed at the booklet's tools (D27, D28); card prompts drafted by us |
| Component 2 and 3 "I want to…" phrases (the four tool lines for Component 2; cue cards, provisional glossary and Kahavat Relay for Component 3) | **Written by us.** The first Component 2 line is the booklet's own |
| Examples (Components 1 and 4) | Rebuilt as HTML from the booklet's own geometry and text (D25); the original page stays one click away |
| Examples (Components 2 and 3) | Rebuilt as HTML like Components 1 and 4 (D25); the original page stays one click away. The blank templates and the guide pages stay page images |
| Blank templates | Booklet pages as images |
| Guideline, "how to read", Meera, "after the toolkit", further reading | Copied from the booklet's front and back matter |
| Home, About and component-overview framing text | **Written by us** (short connecting copy; "Where it comes from" on About) |
| Card-kit page: sheet and board blurbs, per-tool "Play it on the table" intros | From the card kit and booklet; a few intros composed by us from booklet phrases |
| Reflection (overview, eight Before and After pages, three Look back pages, printable sheets) | From the owner's reference HTML, lightly edited for the web (D31). Framing headings, the "I want to…" lines and the "what next" lines are **written by us** |

## 7. Open questions

| ID | Question |
| --- | --- |
| Q1 | Is Language really component 3, and is terracotta its colour? |
| Q2 | Licence for the booklet and card-kit content. The repository code is MIT, but the toolkit content is not covered by that automatically. |
| Q3 | Credits and partners: who is named, and where? (Nothing on the site yet.) |
| Q4 | Define India 1 / 2 / 3 for the Language Lens? |
| Q5 | The examples are now native HTML (D25). Still open: fill-on-screen templates and the interactive Synthesis builder? |
| Q6 | Supabase: does anything need a database? |
| Q7 | Custom domain, or stay on the vercel.app address? |
| Q8 | GitHub's default branch is still the feature branch; switch it to `main`. |
| Q9 | The Vercel connection used in build sessions is not the owner's original Vercel project; confirm which account should own the site. **Update:** three Vercel projects are linked to this repo. Two built the restructure; the owner's original one failed on every push with "No Next.js version detected": its Framework Preset was set to Next.js. Fixed in the repo with `vercel.json` (D18), which pins Astro. **Confirmed:** after `vercel.json` all three projects built green on PR 1. Setting the preset to Astro in that project's dashboard is still the cleaner fix. Still open: which project and account should be the production site. |
| Q10 | Wording check: the About page's "Where it comes from" paragraph and the connecting copy on Home and the component overviews are ours. Confirm, and say who is credited (see Q3). |
| Q11 | Where should "Print" and "You need" sit on a tool page? Now: a right-hand column on very wide screens (92rem+), otherwise below the tabs. |
| Q12 | Reflection has no colour of its own yet, so it uses neutral ink (D20). Does it get one? Turmeric is Component 2's. The reference HTML draws Reflection in blue (`#2A6FD1` on `#CFE0F0`), which sits close to Component 4's indigo (`#3144A6`), so the site has not adopted it. The printable sheets are still blue. |
| Q14 | The booklet colours each Component 2 and 3 tool page differently (indigo, terracotta, turmeric). The site keeps colour = component (D29). Should the booklet be recoloured to match, so the page images agree with the site? |
| Q15 | Wording check for Components 2 and 3: the connecting copy (section headings such as "Start with their world", "Then hand it on", "Six things to do first"), the "I want to…" lines we added, and the way the Meaning Card page maps the short card to the full card are ours. Confirm, and see Q10. |
| Q17 | The booklets (`designing-for-the-indian-context-booklet.pdf`, `components-2-3-booklet.pdf`), the card kit and the printed Language cards still say "Designing for the Indian Context". The site says Beyond the Edge Case (D30). The final booklet was promised in the same message as the rename but was not attached, so the PDFs, their file names and the page images are unchanged until it arrives. | 
| Q18 | The reference Reflection pages cite page numbers from a booklet that is not here ("after 1.02", "1.10 Is it working?", "3.24 Is it working?", "fill before 1.03 Media Story", "Tool 1A · Media Story"). They differ from the booklets on the site (for example, the site's Tool 1 is "Media & Gossip"). The printed sheets keep them as given; the site pages use tool names. Do the printed sheets need re-checking against the final booklet? |
| Q19 | The .fig is the **working file**, not a clean template. Besides the Component 2 frames it holds the Component 1 booklet layouts (Page 1, plus a "final designs" page), empty Component 4 frames, a moodboard, a layout study and pictures that look like photographs of other people's printed toolkits, illustrations (one carries a shop's name) and AI-generated images, and a to-do note on the canvas. It is published as given, at the owner's instruction, in a public repository. Should a cleaned copy (Component 2 frames only, no third-party or reference images) replace it? Until then the page tells visitors what else is inside. |
| Q20 | Component 2 has three versions of its structure: the booklet's four tools and nine scenario boxes, the write-up's six movements, and the Figma file's own five stages (Capture, Affinity, Build, Verify, Scenario) and eight-box canvas (no "visual cue" or "condition", the edge case as box 08). The site keeps the four tools and nine boxes and says where the Figma differs. The write-up also records a fourth participant line ("What else should we know?") where the booklet and the Figma cards say three questions only; the site keeps the three and adds the fourth as an open invitation. Which structure is final? |
| Q16 | The six-page Component 02 draft repeated the booklet. Anything in it that should stay out? Everything it added is folded in (D26). |
| Q13 | **Resolved (D25):** the filled examples are native HTML. Still open: the Journey Strip (p.4.04), the Visual Toolkit photos (p.4.05) and the participant field cards (p.4.22) are page images, and so are the blank templates. Rebuild them the same way? |

## 8. Backlog

- Native HTML for the remaining page images: blank templates, Journey Strip (4.04), Visual Toolkit (4.05), field cards (4.22).
- Fill-on-screen blank templates, and the interactive **Synthesis builder** with "Save as PDF".
- Refresh FigJam sections 13 to 15 for the multi-component structure.
- A cleaned Figma template (Component 2 frames only) and, if wanted, the Figma file's own eight-box canvas reconciled with the booklet's nine boxes (Q19, Q20).
- Fill-on-screen Reflection pages (saved only in the visitor's browser) and an interactive Wheel. Today the Wheel is an illustration and the pages are read, then printed.
- A print stylesheet check for tool pages.
- "Visited" progress in the rail.
- Decide what a Component 1 tool page shows in Cards mode beyond opening the Card kit tab first.

## 9. Change log (newest first)

### 2026-09-30 · Component 2 updated from the write-up; Figma template added (D32)
Requested: use the write-up as the updated Visual Culture content, with the Figma template as the component's main download.

- **Overview rebuilt** around the write-up: why it exists (the interface-versus-situation pair, and the line that whether something is an edge case depends on the baseline we designed from), what "visual culture" means, **The Figma template** (download, what is in it, how to open it, how it differs from the booklet), the six movements laid over the four tools, what you will make (the nine questions), "start with evidence, not explanation", when to reach for it, five hand-offs with reasons (Reflection is one), and the core principle.
- **New page: Before you start** (four needs, participant autonomy, what not to do, the designer's role, the checklist). In the step bar, routes, "I want to…" and search. Show gains "The missions are optional" and "Keep the participant's explanation with every photo".
- **Figma download:** `visual-culture-framework.fig` (11.6 MB) added; `DownloadFormat` gained `FIG`. See Q19 for what the file holds and Q20 for where it differs from the booklet.
- **Reflection:** Component 2's Before page now sits after Before you start.
- **Checked (this batch, all three changes):** `npm run build` (53 pages); base-path build, 10,312 internal references, 0 problems; axe-core (WCAG 2 A/AA, 2.1, 2.2 AA, best practice) clean on 462 scans (every page and tab, the search dialog and the phone menu) at 1440, 1024, 390 and 320 px; no horizontal scroll at 320, 360, 768, 1024, 1280, 1920 and 2560 px on the new and changed pages. One contrast miss on the way (a small label on the "you are here" box in Component 3's terracotta) was fixed.

### 2026-09-30 · Reflection built (D31)
Requested: use the reference HTML to build the Reflection component, and add the reflection pages that sit inside the other components, in the website's theme.

- **Claim & Reflection is live:** overview, three Look back pages, and a Before and After page in each of Components 1 to 4 (`ReflectSheetLayout`), wired into the step bars ("Reflect: before", "Reflect: after"), the component routes, "I want to…" (a fifth, full-width card), search, the footer, and Downloads (a Claim & Reflection section; each component's pair sits with its blank templates). The home and components pages show Reflection as one wide band under the four tiles.
- **Printable pages:** `scripts/build-reflection-pdfs.mjs` (`npm run build:reflection`) renders the twelve A4 pages one by one, plus all twelve as one file, plus WebP previews. Verified against the reference render.
- **Layout fixes:** `ComponentLayout` and the step bar no longer assume a component number (Reflection has none; the mark is "R").

### 2026-09-30 · Retitled "Beyond the Edge Case" (D30)
Requested: new title and description, the owner's introductory statement, the central line as one of the toolkit's central statements, and the "one universal for another" idea after it.

- Title and description updated in `site.ts` (header, footer, page titles, meta, README, `package.json`, CSS header comment). The home page title now reads "Beyond the Edge Case: a toolkit for designing in Indian contexts".
- New home sections: **Introduction** (`EdgeIntro`) and **The central idea** (`CentralLine`, on ink); **About** opens with the central line. The words live once in `intro` in `src/data/site.ts`.
- Not changed: the booklet PDFs and the card kit (see Q17).

### 2026-09-30 · Components 2 and 3 built from the new booklet
Requested: use the two new PDFs (the 36-page Components 2 + 3 booklet as the main process, and the six-page Component 02 draft) to build out Visual culture and Language on the site, fix the gaps and inconsistencies, leave nothing out and repeat nothing, and give reverse thick translation real emphasis in Language.

- **Component 2 · Reading Visual Culture is live** (D26): overview (idea, situation not persona, "I want to…", route, evidence statuses and the stop rule, hand-offs), four tools (Show, Read, Build, Hand off) with Guide, Example and Blank template tabs, "The six missions" tab on Show (six mission cards, the three questions, the printable cards), and an "Is it working?" page. Turmeric is its colour.
- **Component 3 · Reading Language is restructured** (D27, D28): Before you start (team, six things to do, positionality note, provisional glossary), Tools 1 to 5 (Listen, Translate, Test, Library, Kahavat Relay), and "Is it working?". The six earlier pages keep their addresses and sit under the tool they belong to as "Go deeper" links. The methodology page is gone: it became the **Reverse thick translation** tab on Translate, and `/components/language/methodology/` redirects there. The Modules 1 to 3 wording, the process-flow diagram, the module chips and the "six tools" cards were removed.
- **Reverse thick translation is easy to find:** its own tab, a feature section on the Language overview, a marked row in the route, "I want to…" and search entries.
- **Gaps and inconsistencies fixed:**
  - The draft repeated the booklet; its extra detail is in once (D26).
  - Lens N was "Nomenclature" on the site and "New" in the booklet, and Lens P "Proxy / Audience" against "Proxy": now "New (the form's own words: nomenclature)" and "Proxy", in the pages, the library filters and the goal index.
  - The positionality prompts differed between the site's card and the booklet page: now seven, written once in `templates/kit-cards.json`, shown on Before you start, and printed on the card.
  - The booklet's short Meaning Card and the site's full card are now explained as one card at two levels, with a mapping table; the full card's "Notice" step (already in Listen) was dropped and its "Hand on" step re-pointed at Translate.
  - New questions loop back to Tool 1 · Listen (the booklet's loop), not to a "Module 1".
  - The idiom probe in the old Module 2 branch is now Tool 5 · Kahavat Relay, with links both ways to Component 2 (drawings are participant-made images) and Translate (own-language lines).
  - The old methodology page had two-direction and three-direction sections; there is one set of three directions now, kept apart from the three lenses.
  - The team and "before fieldwork" text existed on both the methodology page and the overview; it now lives once, on Before you start. The glossary explanation lives once, in the Reverse thick translation tab.
  - The home page, the components list, the footer and the downloads page still called Visual culture "coming next": all updated (four live tiles, footer columns, two booklets, blank templates for Components 2 and 3).
- **Printable cards regenerated (Draft v0.2):** "Module" labels replaced by Before you start / Tool 1 · Listen, the footer says Reading Language, the positionality card has seven prompts, and the cards use terracotta instead of orange, teal and indigo (D29). No card overflows.
- **Layout:** short word lists (the actions, enablers and profile lines) show as chips; in Components 2 and 3 the booklet's guide page sits under the text (D29). `Section` gained the turmeric tone; `RouteList` gained a sub-label and a marker; a shared `ClosingChecks` component serves both "Is it working?" pages; a `panels` registry holds the two extra tabs.
- **Assets:** `scripts/extract-booklet-assets.py --c23-only` renders the 36 pages to WebP and cuts twelve blank or print sheets; `components-2-3-booklet.pdf` is a new download.
- **Checked:** `npm run build` (41 pages); base-path build with 6,769 internal references, 0 problems; axe-core (WCAG 2 A/AA, 2.1, 2.2 AA, best practice) clean on 414 scans (every page and tab, the new examples included) at 1440, 1024, 390 and 320 px; no horizontal scroll at 320, 360, 768, 1024, 1280, 1920 and 2560 px; keyboard pass including the new tabs; search finds every Language step. Contrast misses on the way, all fixed: a "coming next" chip on the turmeric tile (gone with the chip) and two small label colours in the new examples (darkened).
- **Filled examples rebuilt as HTML** (D25): 2.04 (Meera's six photos), 2.07 (three passes), 2.10 (Context Scenario), 2.13 (Context Profile and the reading), 3.05 (six cue cards and log symbols, a print sheet), 3.06 (log and Meaning Card), 3.09 (thick translation, reverse survey, support check), 3.12 (candidate wording and three lenses), 3.15 (two linked library entries), 3.18 (the relay, with its three drawings redrawn as SVG) and 3.20 (idiom cards, a print sheet). The source pages carry no vector data, so sizes were fitted against the printed line widths and each example was compared with its page at the same scale. Hindi is set in real text (`lang="hi"`), marks (Observed, Reported, Inferred, pass, fail, "held up") carry hidden text, and each example reflows below 45 rem.
- **Home "I want to…" trimmed (asked for):** Language lists its five broad themes only. The steps under them moved to their own pages and to search (Context Cards, Positionality note, Provisional glossary, Cue cards, Interview Cards, Meaning Card, Blank Meaning Cards, Reflection Cards, Kahavat Relay, Thick translation, Reverse thick translation, Fidelity Protocol, the three lenses, the Lens Audit and the two libraries). The home board is two by two now (1 and 2, then 3 and 4). **Kept a fifth theme, "Capture what people mean" (Tool 1 · Listen), which the request did not list, so Listen stays one click from the index; say if it should go.**

### 2026-09-30 · Filled examples rebuilt as native HTML
Requested: build the examples as exact HTML (Reflection's colour can wait), then open a pull request into `main`.

- **14 examples rebuilt** (D25): Media Story, Gossip Venn, Timeline, Ideal flow + needs, Blame Scale, Villain Story, Three lenses + findings, Synthesis (Component 1); Loop, Access Ladder, Whisper, Big players & the Cut, What gets compromised first?, Brief pad (Component 4). Each lives in `src/components/examples/Ex<page>.astro`, registered in `index.ts` by booklet page id. A page with no entry still falls back to its page image.
- **Method:** text, shapes and colours extracted from the PDF with PyMuPDF; layout in points (`--u`); diagrams (Venn, Loop, Cut) in inline SVG with the printed dash pattern; text set at the printed optical size so lines break where the print breaks. Compared against a crop of the PDF page for each example.
- **Responsive:** exact layout above about 45 rem; below it, cards stack, tables (Ladder, Whisper, Villain Story, Ideal flow) scroll inside a focusable region, and diagrams add a list of the same tokens and lines as text. `<br>` line breaks (`Lines.astro`) apply only in the exact layout.
- **Accessibility:** real tables with headers and captions; marks (✓, ✕, dots) carry hidden text; SVG drawings are hidden from assistive technology and replaced by a text list; the page image stays available under "Compare with the booklet page".
- **Layout:** examples may be up to 72 rem wide; two parts sit side by side only when each gets 50 rem, so the exact layout applies on wide screens too. The duplicate "Card kit" pill inside each example was dropped (the part header already links it).
- Typographic apostrophes replace the booklet's straight ones. Card-kit board references are not repeated inside examples.
- **Checked:** `npm run build`; axe-core (WCAG 2 A/AA, 2.1, 2.2 AA, best practice) clean on all 191 scans of the previous pass plus the nine tool pages with examples at 1440, 1024, 390 and 320 px (with the "Compare" disclosures open); no horizontal scroll on those pages at 320, 360, 768, 1024, 1280 and 1920 px; keyboard pass; base-path build with 4,233 links all resolving. Two fixes on the way: an example's hidden helper text was widening the page (scroll regions are now positioned), and the "Find a tool" button had no accessible name between 1024 and 1280 px (it now has an `aria-label`).
- **Not changed:** Reflection stays neutral ink (Q12); blank templates stay page images.

### 2026-09-29 · Redesign: layout, colour, navigation and accessibility pass
Requested: better layout, the rule of 8, hierarchy, consistency and contrast; better accessibility; consistent colour (Break in Component 4 must not look like Language); no dead side margins, with examples as large as possible; closer to the reference and less generic; easier navigation.

**Layout and system (D19, D21)**
- `global.css` rewritten as a system: 8 px spacing tokens, a fixed type scale, radii, text-safe `-deep` colours, one focus ring, reduced-motion and forced-colours support, 48 px buttons and 44 px links.
- Container widened to 1920 px with a fluid gutter. New `Section` (eyebrow, title, optional split heading with content beside it) and `PageHead` give every page the same structure.
- Tool pages: two-column head, full-width step bar, sticky tab bar, and a sticky side column (Print, You need, You end up with). Examples and blanks sit **side by side** on wide screens and each stays as large as its column allows; steps go beside the page only when the column is 1280 px or wider. The Guide tab shows the booklet page next to the text instead of hiding it.
- Card kit boards render at up to 1500 px wide.
- Asymmetric compositions instead of three equal cards: component tiles (1 tall, 3 and 4 beside it), "How every tool works" as three rows, split sections.

**Colour (D20)**
- Component 4 chips no longer borrow other components' colours; Reflection is ink; Language modules are terracotta in three depths; status chips and warnings are colour-neutral with a glyph and border style; decorative blocks use ink and sand. Venn circles and logo no longer multiply into muddy overlaps.

**Navigation (D22, D23)**
- Sticky component strip, "Find a tool" search dialog (`/`, Ctrl+K), phone menu, step bar on Components 1, 3 and 4, "On this page" on Language pages, a footer sitemap listing every tool.
- "I want to…" is one card per component; Home shows them as a board with a Visual culture placeholder.
- `ComponentRail` removed; `ComponentStepper`, `ComponentNav`, `Finder`, `Section`, `PageHead` and `src/data/finder.ts` added. Language joined `railFor`.

**Accessibility (D24)**
- axe-core: no violations across 191 scans (30 pages, every tab, search dialog, phone menu) at 1440, 390 and 320 px. Fixed on the way: small text on terracotta and tinted grounds under 4.5:1, and scrollable tables that keyboards could not reach.
- Keyboard: every focus stop has a ring and is never covered by a sticky bar.
- No horizontal scroll at 320, 360, 768, 1024, 1280, 1920 and 2560 px (two overflows found and fixed: a long chip and the previous/next pills).
- Hash jumps no longer leave a heavy frame around a whole tab panel.

**Checked**: `npm run build`; a base-path build with 4,233 links, images, downloads and anchors all resolving; tabs, arrow keys, deep links, Paper | Cards, filter, no-JavaScript fallback and the redirect all behave as before.

### 2026-09-29 · Restructure into "Designing for the Indian Context"
The site is now the whole toolkit, not only the Meaning-to-Interface Toolkit.

**Added**
- This file, and `CLAUDE.md` (working rules).
- **Components 1 and 4** from the Toolkit Booklet and Card Kit: overview pages, "Pick a product", "Before you start", "Ask your participants", and one page per tool with Guide / Example / Blank template (/ Card kit for Component 1). Wording is in `src/data/booklet/`.
- **Card kit page** (`/card-kit/`): boards B1–B7 and sheets S1–S8 with print and set-up instructions.
- **Guideline page**, with "how to read a tool" and Meera. **About page** (after the toolkit, further reading).
- **Components index**, and "coming next" pages for Visual culture and Reflection.
- **Home page** rebuilt: hero with the four-circle mark, "I want to…" straight after it (across all components), components, why this exists, how every tool works, guideline, Meera.
- **Downloads** rebuilt and grouped: booklet, card kit (all, sheets, boards, one at a time), 16 blank templates, Language files (39 files in all). Sizes still measured at build time.
- `scripts/extract-booklet-assets.py`: renders 53 booklet pages and 16 card-kit pages to WebP, cuts 16 blank templates and 17 card-kit PDFs, writes `src/data/booklet-assets.json`.
- Fonts (Bricolage Grotesque, IBM Plex Mono, SIL OFL) self-hosted in `public/fonts/`.

**Changed**
- Visual language replaced with the concept site's (D4, D5): tokens in `src/styles/global.css`, `data-c` accent switching per component, new header and dark footer, pill buttons, mono labels. Old token names kept as aliases so Language pages still work.
- **Language work moved to Component 3**: `/tools/*` became `/components/language/*`, the methodology page moved to `/components/language/methodology/` (the old `/about/` is now the new About page), and `/tools/*` redirects (D11, D17). New Language overview page (problem, "I want to…", process flow, tools, where to use it).
- Process-flow badges and labels use contrast-safe text colours per module (`--mod-ink`, `--mod-text`).
- `GoalIndex` handles several components, a stacked layout for narrow columns, and search.
- `README.md` rewritten for the new structure.

**Checked**
- `npm run build`: 30 pages. A second build with `BASE_PATH=/Indian-Context---Digital-Tools` (the GitHub Pages URL): 1,418 internal links, images, downloads and `#anchors` resolve, `@font-face` URLs carry the base path, and the redirect pages carry it too.
- Browser checks (Chromium): no console errors or failed requests on 20 pages (the only 404 is the browser asking for `/favicon.ico` on Astro's generated redirect pages); no horizontal scroll at 390 px or 1440 px; tabs, arrow keys, `#part-b` and `#card-kit` deep links, the Paper | Cards switch (remembered across reload), the goal search, and the no-JavaScript fallback all work; old `/tools/meaning-card/` lands on the new address.
- One `h1` per page, no skipped heading levels, no duplicate ids, every image has alt text.

**Pull request**: PR 1 (`claude/charming-hypatia-j6hsyh` into `main`). Vercel previews: two of three linked projects built. The third failed because its Framework Preset was Next.js; `vercel.json` now pins Astro (D18, Q9).

**Not done / to confirm**: see open questions Q1, Q2, Q10, Q11 and the backlog. FigJam sections 13–15 still show the earlier six-tool site.

### 2026-09-29 · FigJam: simplified wireframe and task flows
- FigJam sections **14 Simplified Wireframe** (five page layouts and a phone home) and **15 Task Flows** (five flows with decisions and loops).

### 2026-09-29 · FigJam: information architecture wireframe
- FigJam section **13 Website Information Architecture**: sitemap, "I want to…" index, page wireframes, tool-page template, reusable components, open questions.

### 2026-09-29 · Goal-first "I want to…" information architecture
- Home and Tools page now lead with an "I want to…" index, with live search. Goals are in `src/data/goals.ts`.
- Footer gained an A–Z index of every tool and step. Deep links land on the exact card (kit decks, each lens).
- Removed the home sections that the index replaced. *(Footer A–Z index is superseded by the concept footer; see the change above when it lands.)*

### 2026-09-29 · Hosting on Vercel
- Created `main` from the feature branch.
- Vercel project linked to the GitHub repo. Production deploys from `main`. Vercel Authentication turned off (public site).
- README: one-click Vercel import link.

### 2026-09-29 · First site: Meaning-to-Interface Toolkit
- Astro static site: home, tools overview, six tool pages (Meaning Card, Physical Field Kit, Fidelity Protocol, Language Lens Audit, Expression Library, Design Language Library), downloads, methodology.
- Print-ready 6 × 4 in PDFs generated from `templates/` (Meaning Card; 44-page Physical Field Kit), plus a Meaning Cards CSV and an Expression Library JSON template.
- Libraries are JSON-backed with client-side search; the build fails if a design pattern cites no Expression Library entry.
- Fidelity Protocol rule implemented once in `src/utils/fidelity.ts` and reused by the interactive checker and the library.
- GitHub Pages workflow, README, MIT licence, `.gitignore`.
