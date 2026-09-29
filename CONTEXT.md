# Project context and change log

This file is the running record of **why the site is the way it is** and **what has changed**. Read it before making changes. Update it in the same commit as any change to content, structure, design, hosting, or decisions.

## How to keep this file current

1. **Every change gets a change-log entry** (section 9, newest first): date, what changed, and why.
2. **Every decision gets an ID** (section 4). If a decision is reversed, do not delete it: mark it *Superseded by Dn* and add the new one.
3. **Assumptions are labelled as assumptions** until the project owner confirms them. Move them out of section 5 when confirmed.
4. **Keep private details out of this file.** The repository is public. No personal email addresses, tokens, or private links.

---

## 1. What this project is

A public website for the **Designing for the Indian Context** toolkit (BITSDES 2024–28): tools for reading products, pictures, language, and people's material lives before you design for them.

The toolkit is organised as **components**. Each component works on its own and reads a design problem from a different side:

| # | Component | Status on the site |
| --- | --- | --- |
| 1 | Reading Existing Products (4 tools + synthesis, optional card kit) | Live |
| 2 | Reading Visual Culture | Placeholder ("coming next") |
| 3 | Reading Language, which is the **Meaning-to-Interface Toolkit** | Live |
| 4 | Reading Material Reality (4 tools, 1 guideline, 1 map) | Live |
| – | Reflection | Placeholder ("coming next") |

The site does three jobs: explain each tool, show a worked example (the running persona is **Meera**), and let visitors download the blank templates and the print-ready card kit.

**Audience:** design students, product teams, NGO and public-service teams, field researchers.

## 2. Sources

| Source | What it is | Where it lives |
| --- | --- | --- |
| Language component write-up | The Meaning-to-Interface process flow, Fidelity Protocol, Language Lens, and thick-translation method (PDF called "The Meaning-to-Interface Process Flow" and "The Thick Translation Methodology") | Owner's upload. Content is reflected in `src/pages/components/language/` and `src/data/modules.ts` |
| FigJam board "First-Generation Personal" | The process-flow diagram (section 12) and the Fidelity Protocol and Language Lens notes. Sections 13 (information architecture), 14 (simplified wireframe), and 15 (task flows) were added during this project | Owner's Figma. Link intentionally not stored here |
| **Toolkit Booklet** (53 pages) | Components 1 and 4: guide pages, filled examples, blank templates, the "I want to…" list for Component 4, participant field cards, closing page | `public/downloads/designing-for-the-indian-context-booklet.pdf`. Page images and split PDFs are generated from it |
| **Component 1 Card Kit** (16 pages) | Card sheets S1–S8 and boards B1–B7 for Component 1 | `public/downloads/component-1-card-kit.pdf`. Split into sheets and boards |
| **Concept website** (HTML mock-ups) | The visual language, the page patterns (four-tab tool page, Paper/Cards switch, component cards), and the site map | Owner's upload; not stored in the repo (about 1 MB with embedded fonts). Its fonts were extracted into `public/fonts/` |
| diy-toolkit.org | Original reference for information hierarchy and the "I want to…" pattern | Blocked from the build environment, so the owner's screenshot was used |

## 3. Architecture and hosting

- **Stack:** Astro 7, static output, no backend, one runtime dependency. Node 22.12 or newer.
- **Source of truth for content:** files in `src/data/` (TypeScript and JSON), not the page files. Pages render from data.
- **Downloads:** every file is listed in `src/data/downloads.ts`; sizes are measured at build time and a missing file fails the build.
- **Generated assets:** `scripts/build-templates.mjs` (Language component cards and CSV) and `scripts/extract-booklet-assets.py` (booklet and card-kit page images and split PDFs). Outputs are committed, so builds never need a browser or Python.
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
| D3 | The site is the whole **Designing for the Indian Context** toolkit. The Meaning-to-Interface work becomes **Component 3 · Reading Language**. | Assumed. Based on the Language write-up calling itself "the Language component" and the concept site listing Language as component 3. |
| D4 | Visual language comes from the concept website: Bricolage Grotesque + IBM Plex Mono, ground `#FAF7F0`, white surfaces, ink `#16140F`, pill buttons, mono uppercase labels, dark footer. Fonts are self-hosted (both are SIL OFL). | Confirmed |
| D5 | Component colours follow the concept: **1 green `#1E6B52`**, **2 turmeric `#E8A92A`** (ink text), **3 terracotta `#B8492C`**, **4 indigo `#3144A6`**. | Confirmed for 1, 4 (concept style page). 2, 3 taken from the concept's overlapping-circles logo. |
| D6 | The **"I want to…" flow stays** as the main way in: on the home page (across components), and on each component overview. Component 4 uses the booklet's own six items. | Confirmed |
| D7 | Every Component 1 and 4 tool is one page with four tabs: **Guide, Example, Blank template, Card kit**, plus a **Paper / Cards** switch that remembers how the visitor works. The Card kit tab exists only for Component 1, because the booklet has no card kit for Component 4. | Assumed from the concept site map |
| D8 | v1 shows the booklet's example and blank pages **as images**, with the guide text and "how to use it" steps as real text. Rebuilding examples natively in HTML (as the concept does) is a later step. | Assumed (keeps content faithful and shippable) |
| D9 | The booklet and card-kit PDFs are hosted as downloads, and split into per-template PDFs, card sheets (A4) and boards (A2). | Assumed |
| D10 | Library entries (Expression Library, Design Language Library) are illustrative samples and say so on the page. | Confirmed |
| D11 | Old `/tools/*` and `/about/` (methodology) URLs move under `/components/language/`; old `/tools/*` URLs redirect. | Assumed |
| D12 | Language-component module chips use the concept's tool palette: Module 1 turmeric (ink text), Module 2 ink (white text), Module 3 terracotta (white text). | Assumed |
| D13 | The six Language tool pages keep their long-form layout (no tabs, no left rail) inside the new shell: terracotta accent, breadcrumb `Home › Components › 3 · Language › tool`, prev/next. They are prose-and-interactive pages, not booklet pages. | Assumed |
| D14 | **No licence claims about the booklet or card kit.** The repository code is MIT and the site says only that. The booklet states no licence, so the site does not say its content is free to adapt or share (see Q2). | Confirmed by the source (nothing stated) |
| D15 | Home page order: hero, then **"I want to…" straight away**, then components, why this exists, how every tool works, the guideline, Meera. The goal-first flow is the first thing after the hero. | Assumed |
| D16 | Tool-page tabs are progressive enhancement: without JavaScript the four panels stack under their headings; with it they become tabs (ARIA roles added by script, keyboard arrows, `#guide`, `#example`, `#blank`, `#card-kit` and `#part-b` deep links). The Paper / Cards choice is remembered in `localStorage` and only decides which tab opens first. | Assumed |
| D17 | Redirects for old `/tools/*` are explicit per slug in `astro.config.mjs` (Astro's dynamic redirects need a matching dynamic route). The destinations carry the base path, because Astro does not add it. | Assumed |
| D18 | `vercel.json` pins the framework to Astro (`npm run build`, output `dist`), so a Vercel project with the wrong preset still builds. It matches what Vercel auto-detects, so projects that were already right are unaffected. | Assumed |

### Earlier decisions that still apply (Language component)

- **Fidelity rule:** a finding missing any of the four tags (source language, who interpreted, rendering type, single-source flag) cannot carry full confidence until re-checked. A single-source finding stays provisional until a second reader agrees. *(Assumed reading of the write-up.)*
- **"Three directions of comparison"** is our name for the write-up's three thick-translation comparisons (native to English, English to native, native to regional dialect), to avoid clashing with the Language Lens's three lenses (N, P, T).
- **Tested-status meanings** (Confirmed / Partially confirmed / Not yet tested) and the **Correction status options** on the Meaning Card are our wording. *(Assumed.)*
- **Printable cards** for the Language component are 6 × 4 in. Their prompts (Context, Interview, Reflection, Positionality) are a first draft written from the process steps, in `templates/kit-cards.json`.
- **India 1 / 2 / 3** is used only as an audience label; the segments are not defined.
- **The site never invents research data.** Sample entries and worked examples are labelled illustrative.

## 5. Information architecture (current)

```
/                                   Home: hero, "I want to…" (all components), components, why, how every tool works, guideline, Meera
/components/                        the five components (two placeholders)
  existing-products/                1 · overview + "I want to…", route, two ways to work, design claim
    pick-a-product/                   one specific product, before Tool 1
    media-gossip/ history/ the-break/ power/ synthesis/     4 tabs each: Guide · Example · Blank template · Card kit
  language/                         3 · overview, "I want to…", process flow, tools
    meaning-card/ physical-field-kit/ fidelity-protocol/ language-lens-audit/ expression-library/ design-language-library/
    methodology/                      thick translation, bidirectional validation
  material-reality/                 4 · overview + "I want to…", nine layers, route
    before-you-start/                 Journey Strip, Visual Toolkit photos
    build/ break/ weigh/ say/         3 tabs each: Guide · Example · Blank template
    ask-your-participants/            field cards: questions, consent, care
  visual-culture/  reflection/      "coming next" placeholders
/card-kit/                          boards B1–B7, sheets S1–S8, print and set-up
/guideline/                         one real thing (#one-real-thing), how to read (#how-to-read), Meera (#meera)
/downloads/                         booklet, card kit, blank templates, Language templates
/about/                             who it is for, after the toolkit, further reading, open code
/tools/…                            redirects to /components/language/…
```

Component pages share a left **rail** (the component's tools in order, sub-parts under the current tool, Paper | Cards switch for Component 1). On a phone the rail folds into a menu above the page.

Fuller wireframes, a simplified wireframe, and task flows are in the owner's FigJam board (sections 13 to 15). Those describe the earlier six-tool site and need refreshing for this structure (see backlog).

## 6. Content status

| Area | Status |
| --- | --- |
| Component 1 and 4 guide text, steps, words, "I want to…" (C4) | Copied from the booklet (light editing for the web) |
| Component 1 cross-component "I want to…" phrases | **Written by us** from each tool's subtitle. Not in the booklet |
| Component 3 (Language) content | From the Language write-up; card prompts drafted by us |
| Examples and blanks | Booklet pages as images (v1) |
| Guideline, "how to read", Meera, "after the toolkit", further reading | Copied from the booklet's front and back matter |
| Home, About and component-overview framing text | **Written by us** (short connecting copy; "Where it comes from" on About) |
| Card-kit page: sheet and board blurbs, per-tool "Play it on the table" intros | From the card kit and booklet; a few intros composed by us from booklet phrases |
| Placeholders: Visual culture, Reflection | Minimal "coming next" pages. No invented content |

## 7. Open questions

| ID | Question |
| --- | --- |
| Q1 | Is Language really component 3, and is terracotta its colour? |
| Q2 | Licence for the booklet and card-kit content. The repository code is MIT, but the toolkit content is not covered by that automatically. |
| Q3 | Credits and partners: who is named, and where? (Nothing on the site yet.) |
| Q4 | Define India 1 / 2 / 3 for the Language Lens? |
| Q5 | Rebuild the examples natively in HTML, and add fill-on-screen templates and the interactive Synthesis builder? |
| Q6 | Supabase: does anything need a database? |
| Q7 | Custom domain, or stay on the vercel.app address? |
| Q8 | GitHub's default branch is still the feature branch; switch it to `main`. |
| Q9 | The Vercel connection used in build sessions is not the owner's original Vercel project; confirm which account should own the site. **Update:** three Vercel projects are linked to this repo. Two built the restructure; the owner's original one failed on every push with "No Next.js version detected": its Framework Preset was set to Next.js. Fixed in the repo with `vercel.json` (D18), which pins Astro. Setting the preset to Astro in that project's dashboard is still the cleaner fix. Confirm the next build there is green. |
| Q10 | Wording check: the About page's "Where it comes from" paragraph and the connecting copy on Home and the component overviews are ours. Confirm, and say who is credited (see Q3). |
| Q11 | Where should "Print" and "You need" sit on a tool page? Now: a right-hand column on very wide screens (92rem+), otherwise below the tabs. |

## 8. Backlog

- Native HTML examples (the concept's version) instead of page images.
- Fill-on-screen blank templates, and the interactive **Synthesis builder** with "Save as PDF".
- Refresh FigJam sections 13 to 15 for the multi-component structure.
- Visual culture and Reflection components when their content exists.
- A print stylesheet check for tool pages.
- Give the Language tool pages the left rail and, where it fits, the same tabs (D13).
- "Visited" progress in the rail.
- Decide what a Component 1 tool page shows in Cards mode beyond opening the Card kit tab first.

## 9. Change log (newest first)

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
