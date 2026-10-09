# Beyond the Edge Case

A public website for **Beyond the Edge Case**, a toolkit from BITSDES 2024–28 for designing in Indian contexts by questioning the universal assumptions behind what gets treated as an exception. It is for design students, product teams, NGO and public-service teams, and field researchers.

> What gets classified as an edge case depends on the baseline we design from.

The toolkit is built in **components**. Each is a different way of reading the world a product will land in, and each works on its own.

| Component | Status | What it reads |
| --- | --- | --- |
| **1 · Reading Existing Products** | Live | Whose user is built into a product, and who pays when it is wrong. Media & Gossip, History, The Break, Power, Synthesis. With a card kit. |
| **2 · Reading Visual Culture** | Live | What people have learned to notice, trust and act on. Follows the owner's FigJam board: Capture, Affinity, Build, Verify, Scenario, over four tools (Show, Read, Build, Hand off). Six photo missions the participants take. |
| **3 · Reading Language** | Live | What was meant, not only what was said. Before you start, then Listen, Translate (thick, and reverse thick, translation), Test, Library and the Kahavat Relay. Under them sit the Meaning Card, Physical Field Kit, Fidelity Protocol, Language Lens Audit and the two libraries. |
| **4 · Reading Material Reality** | Live | What people have around them, what it costs, and who they lean on. Build, Break, Weigh, Say. |
| **Claim & Reflection** | Live | Runs through all four: a Before and After page in each component, and three Look back pages at the end. |

Every tool page has the same tabs, in the same order: **Guide · Example · Template** (Component 1: **Guide · Template · Card kit**). Two tools add a tab of their own: **The six missions** (Component 2 · Show) and **Reverse thick translation** (Component 3 · Translate). The home page leads with an **"I want to…"** index, one card per component, that opens the right tool for the job. A sticky strip keeps every component one click away, and **Find a tool** (press `/`) searches every tool, step, page and term. **Ask the toolkit** answers questions from the toolkit's own content, without an AI model: in a small chat popup from the round button at the bottom right of every page (the other Ask links open it too), or on its own page (`/ask/`). The **Glossary** (`/glossary/`) lists every term the toolkit uses. Every template can also be **filled on screen** (the **Fill on screen** tab on each tool page, and the Reflection and Meaning Card pages), saved only in the visitor's browser, then printed, saved as PDF or downloaded; **My work** (`/my-work/`) lists what has been filled.

> **Working on this repo?** Read [`CONTEXT.md`](CONTEXT.md) first. It records the project's context, decisions, open questions and a change log, and it is updated with every change. [`CLAUDE.md`](CLAUDE.md) has the working rules for AI assistants.

## Stack

[Astro](https://astro.build) in static mode, no client framework, one runtime dependency. A small [Supabase](https://supabase.com) backend sits beside it for the libraries and the Ask search (see [Backend](#backend-supabase)); every page works without it.

The site is content-heavy with a handful of page types. Astro turns `.astro` files (HTML with a little templating) into plain static HTML and CSS. Interactive bits are small vanilla scripts: the tabs, the Paper | Cards switch, the "I want to…" search, and the library search and Fidelity checker in Component 3. Everything reads without JavaScript; with it, the tool-page panels become tabs.

## Local development

You need **Node 22.12 or newer**.

```bash
npm install
npm run dev        # http://localhost:4321
```

Other commands:

```bash
npm run build            # static site into ./dist
npm run preview          # serve ./dist locally
npm run build:templates  # regenerate the Component 3 PDFs and CSV (see below)
npm run build:reflection  # regenerate the twelve Claim & Reflection sheets and previews from templates/reflection/
npm run build:capture-cards  # regenerate Component 2's capture cards and photo slips from templates/visual-culture/capture-cards.json
python3 scripts/extract-booklet-assets.py   # regenerate page images and split PDFs from the booklet (see below)
```

## Project structure

```
.
├── CONTEXT.md                     project record: decisions, sources, open questions, change log
├── CLAUDE.md                      working rules for AI assistants
├── .github/workflows/deploy.yml   GitHub Pages deployment
├── public/
│   ├── booklet/                   one WebP per booklet page (1.06.webp, 4.12.webp, …)
│   ├── card-kit/                  one WebP per card sheet and board (S1…S8, B1…B7)
│   ├── fonts/                     Bricolage Grotesque and IBM Plex Mono (SIL OFL), self-hosted
│   └── downloads/                 every downloadable file
│       ├── designing-for-the-indian-context-booklet.pdf   the final booklet, 107 pages, all four components
│       ├── component-1-card-kit.pdf                       the card-kit pages (1.12–1.27) as one file
│       ├── templates/             single-page templates cut from the booklet, and the Claim & Reflection pages
│       └── card-kit/              each sheet, each board, all sheets, all boards
├── scripts/
│   ├── extract-booklet-assets.py  the final booklet → page images, templates, card-kit sheets and boards, split PDFs
│   ├── build-templates.mjs        Component 3 PDFs and CSV from /templates
│   ├── build-chat-index.mjs       after `astro build`: every page split into passages → dist/chat-index.json (the Ask search index)
│   └── build-reflection-pdfs.mjs  the twelve Claim & Reflection A4 sheets, one file of all twelve, and page previews
├── templates/                     source definitions for the Component 3 printable cards, and reflection/ (the twelve-page layout)
├── supabase/
│   ├── migrations/                the database: libraries, members, search index, rate limits, row-level security
│   ├── functions/ask/             search only: meaning (gte-small) + keywords over the index; no language model
│   ├── functions/index-sync/      copies /chat-index.json into the index and embeds it
│   └── seed.sql                   the illustrative library entries
└── src/
    ├── components/                Header, ComponentNav (sticky strip), Finder (search), ComponentStepper, Section, PageHead,
    │                              GoalIndex, PageFigure, DownloadCard, Footer, …
    │   ├── panels/                the extra tabs a tool can have (the six missions, reverse thick translation), and index.ts
    │   └── examples/              the 25 filled examples as HTML (Ex106, Ex108, … Ex420), ExFrame (frame + "compare with the
    │                              booklet page"), Tag, Lines, and index.ts (booklet page id → component)
    ├── data/
    │   ├── components.ts          the components (order, colour, status, blurb)
    │   ├── goals.ts               the "I want to…" index, all components
    │   ├── site.ts                site name, nav, links
    │   ├── booklet/               Components 1 to 4: tools, parts, steps, words, examples (from the two booklets)
    │   ├── card-kit.ts            card sheets S1–S8 and boards B1–B7
    │   ├── downloads.ts           every downloadable file
    │   ├── reflection.ts          Claim & Reflection: the steps, the Before and After worksheets, the three Look back pages
│   ├── rail.ts                the step bar on component pages (Components 1 to 4 and Reflection)
    │   ├── finder.ts              everything the "Find a tool" search can open
    │   ├── glossary.ts            every term: read from the page data, plus toolkit concepts and labelled general terms
    │   ├── backend.ts             the Supabase address the site calls (PUBLIC_SUPABASE_URL, or "off")
    │   ├── fill/                  Fill on screen: each template as fields (types.ts, templates.ts)
    │   ├── tools.ts               Component 3 deeper pages (Meaning Card, Field Kit, …) and the tool each belongs to
    │   └── library.ts, *.json     Component 3 Expression and Design Language libraries
    ├── layouts/                   BaseLayout, ComponentLayout, BookletToolLayout, ToolLayout (Language), ComingNextLayout
    ├── pages/                     index, components/*, card-kit, guideline, downloads, about, glossary, ask, my-work, ask-data.json
    ├── scripts/ask/engine.ts      the Ask answer engine (no language model); ui.ts, the conversation (page and chat panel)
    ├── components/ChatWidget.astro   the chat button and chat popup on every page
    ├── components/fill/           FillForm and FillField: a template as a form; scripts/fill/store.ts saves, prints and exports it
    ├── styles/global.css          design tokens and shared styles
    └── utils/                     url helper, page-image lookup, Fidelity Protocol rule
```

## Design system

Everything visual is a token in `src/styles/global.css`; components use the tokens, not raw numbers.

- **Spacing** is a multiple of 8 px (`--sp-1` = 8 px … `--sp-16` = 128 px; `--sp-half` = 4 px for hairlines). **Type** follows a fixed scale (`--fs-xs` 12 px … `--fs-display`). **Radii** are 8, 16 and 24 px.
- **Colour means the component and nothing else**: `--c1` green, `--c2` turmeric, `--c3` terracotta, `--c4` indigo, each with a `-tint` and a text-safe `-deep`. Set `data-c="c1"` (and so on) on any element and `--accent`, `--accent-deep`, `--accent-tint` and `--accent-ink` follow. Status and warnings are deliberately colour-neutral. Do not use one component's colour for another idea.
- **Layout**: `.wrap` is fluid up to 1920 px. Use `Section` (with `split` for a heading-left, content-right layout) and `PageHead` so pages share one structure.
- **Accessibility** is checked with axe-core (WCAG 2.2 AA) at 1440, 390 and 320 px. Keep it that way: 4.5:1 text contrast, a visible focus ring (`:focus-visible` is set globally, never remove it), 44 px targets for primary controls, and words or glyphs alongside any colour.

## Pages

| Path | What |
| --- | --- |
| `/` | Home: hero, "I want to…", components, why this exists, the guideline, Meera |
| `/components/` | All components |
| `/components/existing-products/` | Component 1 overview, with `pick-a-product/` and one page per tool |
| `/components/material-reality/` | Component 4 overview, with `before-you-start/`, one page per tool, `ask-your-participants/` |
| `/components/visual-culture/` | Component 2 overview, one page per tool, and `is-it-working/` |
| `/components/language/` | Component 3 overview, `before-you-start/`, one page per tool, `is-it-working/`, and the deeper pages (`meaning-card/`, `physical-field-kit/`, `fidelity-protocol/`, `language-lens-audit/`, `expression-library/`, `design-language-library/`) |
| `/components/reflection/` | Claim & Reflection, with `summarise/`, `wheel/` and `consequences/`; each component has `reflect-before/` and `reflect-after/` |
| `/card-kit/` | Component 1 boards and card sheets, with print instructions |
| `/guideline/` | The one guideline, how to read a tool (`#how-to-read`), Meera (`#meera`) |
| `/downloads/` | Every file, grouped |
| `/about/` | Who it is for, what comes after, further reading |
| `/glossary/` | Every term, A–Z, with a filter; each term has its own anchor (`/glossary/#reverse-thick-translation`) |
| `/ask/` | Ask the toolkit. `?q=` asks straight away |
| `/my-work/` | Everything filled on screen in this browser, per project: open it, download it all, load a copy, delete a project |
| `/tools/…`, `/components/language/methodology/` | Old Component 3 addresses. Redirect to `/components/language/…` (the methodology is now the **Reverse thick translation** tab of `translate/`) |

## Deploying

**GitHub Pages.** The workflow in `.github/workflows/deploy.yml` builds and publishes the site on every push to `main`. One-time setup: **Settings → Pages → Source: GitHub Actions**. The site is served at `https://bored-kxiden.github.io/Indian-Context---Digital-Tools/`.

Where the site is served from is controlled by two environment variables, read in `astro.config.mjs`:

| Variable | Meaning | Default |
| --- | --- | --- |
| `SITE_URL` | Public origin, e.g. `https://example.org` | unset |
| `BASE_PATH` | Sub-path the site lives under, e.g. `/Indian-Context---Digital-Tools` | `/` |

The workflow sets both for the GitHub Pages project URL. Internal links go through the `url()` helper in `src/utils/url.ts`, so they respect the base path. The redirects from the old `/tools/…` addresses are prefixed with the base path in `astro.config.mjs` for the same reason.

**Vercel.** [Import this repository](https://vercel.com/new/import?s=https%3A%2F%2Fgithub.com%2FBored-Kxiden%2FIndian-Context---Digital-Tools). Vercel detects Astro and the defaults work as they are: build command `npm run build`, output directory `dist`, no environment variables. `vercel.json` pins the same settings and the Astro framework, so a project whose Framework Preset was set wrongly (for example to Next.js) still builds. Pushes to a branch get a preview URL; the production branch is `main`.

**Custom domain or other hosts.** Set `BASE_PATH: /` and `SITE_URL: https://your-domain` in the workflow, add `public/CNAME` with the domain, and configure it under **Settings → Pages**. Netlify and Cloudflare Pages use the same settings as Vercel.

## Ask the toolkit and the glossary

There is **no language model**. `src/scripts/ask/engine.ts` reads the kind of question (what is, how do I, where is the template, how long, what do I need, which tool, the difference between), in English, Hindi or Hinglish, finds the terms and tools it names in the glossary and the tool data, and arranges the toolkit's own text into an answer: a term card, a tool's steps and template, a comparison, "I want to…" lines, and quoted passages with the question's words marked. It never writes a sentence of its own, so an answer can be incomplete but not made up.

- **Terms** come from `src/data/glossary.ts`. Most are read from the page data (each tool's `words`, the tools, card sheets and boards, tags, structures, layers), so they follow the pages. To add a term the data does not have, add an entry there. General terms (OTP, code-switching…) must be marked `General` and carry a source.
- **Passages** come from `dist/chat-index.json`, built by `npm run build` (every page's main text, split at its headings). The Supabase `ask` function searches them by meaning and keywords; if it cannot be reached the page searches them in the browser by keywords.
- **After content changes**, refresh the Supabase index once the site is deployed: call `index-sync` with `{"mode":"sync"}` (it reads `/chat-index.json` from the production site), then `{"mode":"embed","batch":8}` until `remaining` is 0.

## Filling templates on screen

Every template can be filled on screen as well as on paper. A template is described once as fields in `src/data/fill/templates.ts` (types in `types.ts`): single lines, longer answers, sentences with blanks ("The product claims ___, but ___ revealed ___"), choices, tick boxes, and groups that repeat (one Meaning Card per moment). The booklet's [bracketed] example shows as each empty field's placeholder, as on paper. `src/components/fill/FillForm.astro` draws it; `src/scripts/fill/store.ts` does the rest.

- **Where it shows:** a **Fill on screen** tab on every tool page (one form per part), "Fill it here" on the eight Before and After pages and the three Look back pages, and on the Meaning Card page.
- **Saving:** in the visitor's browser only (`localStorage`, keys `bte-fill:v1:<project>:<template id>`), as they type, under the name of what they are working on ("NSP · Meera"). Nothing is sent to a server. Template ids are the keys answers are saved under: never rename one that has shipped.
- **Getting it out:** Print or save as PDF (a plain copy with the answers written in, empty lines left for handwriting), Download a copy (JSON, which Load a copy reads back, here or on another device), and a spreadsheet (CSV) for repeating groups such as Meaning Cards. `/my-work/` lists everything per project and downloads or loads it all at once.
- **Status:** 15 forms have all of their page's fields: Synthesis (1.09), the thick translation table (3.10), the brief pad (4.21), the Meaning Card, and the eleven Reflection pages. The other 22 template parts have the part's steps as a checklist and a notes box for now (marked "steps and notes" in My work). To model one, add its sections under its id in `full` in `templates.ts`.

## Backend (Supabase)

The project address is in `src/data/backend.ts` (public by design; the database is protected by row-level security). `PUBLIC_SUPABASE_URL=off` builds a site that never calls it. Keys and secrets are never committed.

Owner setup that cannot be done from the repository (Supabase dashboard):

1. **Auth → URL configuration:** site URL `https://meaning-to-interface-toolkit.vercel.app`, and redirect URLs for it, the Vercel previews and `http://localhost:4321`.
2. **Auth → Providers → Email:** turn off "Allow new users to sign up" (researchers are invited).
3. **Auth → SMTP:** a custom SMTP sender (for example a free Resend or Brevo account). Supabase's built-in email only reaches the project's own team, so invitations need it.
4. **Make the owner an editor:** after signing in once, add a row for that user in `public.members` with role `editor` (SQL editor).
5. Optional **Edge Function secrets:** `ASK_SALT` (any random text, for the daily visitor hash), `ASK_MIN_SIMILARITY`, `ASK_PER_MINUTE`, `ASK_PER_DAY`, `ASK_SITE_PER_DAY`, `INDEX_SOURCES`.

## Content from the booklet

All four components come from the **final booklet**, one 107-page PDF (`public/downloads/designing-for-the-indian-context-booklet.pdf`), which now holds the Component 1 card kit (p.1.11–1.27) and the Claim & Reflection pages. Component 2 also follows the write-up "Reading Visual Culture". An earlier six-page Component 2 draft repeated most of the booklet; its extra detail is folded in once (see D26 in `CONTEXT.md`).

- **Words are copied from the booklet**, not paraphrased, and live in `src/data/booklet/`. Where the site adds text (a few card-kit intros, the Component 1 "I want to…" phrases, UI labels), `CONTEXT.md` says so.
- **Examples are rebuilt as HTML** from the booklet's own geometry and text (see `src/components/examples/` and D25 in `CONTEXT.md`), with the original page one click away under "Compare with the booklet page". **Templates are the booklet's own pages** (anything in [brackets] on them is an example), shown as images with a text alternative and the steps beside them. In Component 1 the page is both example and template, so a tool has one Template tab. Filled examples are illustrative, as the booklet says. Never invent quotes or data on the site.
- **`scripts/extract-booklet-assets.py`** renders every booklet page (and the card-kit sheets and boards) to WebP, cuts the templates and card-kit sheets and boards into their own PDFs, and writes `src/data/booklet-assets.json`. It holds the page map for the 107-page booklet and stops if the page count changes. Run it only when the source PDF changes (`pip install pymupdf pillow`); commit the outputs.
- **Page ids** follow the printed page numbers: `1.06` is the Media Story example, `4.12` is in Component 4, `2.07` is the three passes and `3.09` is the thick translation. Card-kit ids are `S1`…`S8` and `B1`…`B7`.

To change a tool's wording, edit `src/data/booklet/existing-products.ts`, `visual-culture.ts`, `language.ts` or `material-reality.ts`. The tool page, the rail, the "I want to…" index (Component 4) and the download list all read from those files.

## Adding or changing a native example

Each filled example is one Astro component in `src/components/examples/`, wrapped in `ExFrame` and registered in `index.ts` under its booklet page id. A page id with no entry falls back to the page image, so examples can be added one at a time.

- Size everything with `calc(var(--u) * N)` where N is points on the printed A4 page (511.5 pt content width). Read the numbers from the PDF (text lines with position, size and colour; shapes with fill and stroke).
- Keep the printed line breaks with `Lines.astro` and `white-space: nowrap`; they switch off below 45 rem so text can wrap.
- Use real tables for grids, hide decorative SVG from assistive technology, and give every diagram a text list.
- Compare with a crop of the PDF page at the same width before committing.


## Adding a new downloadable file

Every download is listed in one place, `src/data/downloads.ts`. The Downloads page and the tool pages read from it, and file sizes are measured at build time. The blank templates and the card-kit sheets and boards are derived from the content data, so they need no entry of their own.

1. Put the file in `public/downloads/`.
2. Add an entry to `downloadEntries` in `src/data/downloads.ts` (see the Component 3 entries for the shape): `id`, `title`, `description`, `file` (relative to `public/downloads`), `format` (`'PDF' | 'CSV' | 'JSON' | 'FIG'`), `group` (`'booklet' | 'card-kit' | 'templates' | 'language' | 'reflection'`), optionally `component` (`'c1' | 'c2' | 'c3' | 'c4' | 'ink'`, for colour), `page` (the site path of the page it belongs to), `note`, `status`.
3. Run `npm run build`. If the file is missing, the build fails with a message naming the entry, so a broken link can never be published.

### Regenerating the Component 3 printable cards

The two Language PDFs and the CSV are generated from `templates/`:

- `templates/meaning-card-fields.json` defines every field on the Meaning Card. The Meaning Card page, the PDF and the CSV columns all read from it.
- `templates/kit-cards.json` defines the decks in the Physical Field Kit, and the positionality prompts. The prompts also show on the Before you start page, so they are written once.

After editing either, run `npm run build:templates`. This renders the PDFs with headless Chromium through `playwright-core` (a dev dependency that does not download a browser); set `CHROMIUM_PATH` if yours is somewhere unusual. The script fails if any card's text overflows. Commit the regenerated files: the site build and CI never need a browser. Cards are 6 × 4 in; to change that, edit `W_MM` and `H_MM` at the top of `scripts/build-templates.mjs`.

## The "I want to…" index

The home page and each component's overview lead with an "I want to…" index: phrases that finish the sentence, each opening the tool that does the job. It is the site's main way in, and it is kept on purpose (see `CONTEXT.md`, decision D6).

To add or change an item, edit `src/data/goals.ts`. Each item has a `phrase`, a `tag` (the tool, shown as a coloured chip), a `tone` (chip colour), and an `href` (a site path, optionally with an anchor, such as `/components/language/language-lens-audit/#lens-t`). The Component 4 items are the booklet's own list (page 4.03) and are read from `src/data/booklet/material-reality.ts`.

## Adding to the libraries (Component 3)

Both libraries are plain JSON, so entries can be added without touching any page code. Entries marked `"sample": true` are illustrative examples; delete them when you add your real data.

**Expression Library** (`src/data/expressions.json`): copy the object from `public/downloads/expression-library-template.json`, remove the `_help` key, and fill it in. Fill in all four fidelity tags. An entry missing any tag is shown as "Needs re-check" and cannot carry full confidence.

**Design Language Library** (`src/data/patterns.json`): each entry must list the IDs of the Expression Library entries it is justified by in `cites`. The build fails if `cites` is empty or names an entry that does not exist.

De-identify before you digitize. Never put names, or details that could identify a participant or their family, in these files: they are published with the site.

## Content status

- **Components 1 and 4:** wording, examples and blanks are from the booklet and card kit. Some card-kit intros and the Component 1 "I want to…" phrases are ours (marked in `CONTEXT.md`).
- **Component 3:** the process flow, Fidelity Protocol, Language Lens and thick-translation content follow the Meaning-to-Interface FigJam board and the Language component write-up. The prompts on the Physical Field Kit cards are a first draft. All library entries and the worked Meaning Card example are illustrative and contain no real participant data.
- **Components 2 and Reflection:** not written yet.

## License

[MIT](LICENSE). The licence covers the site's code. The booklet and card-kit content comes from BITSDES 2024–28 and is not covered by it automatically: check with the toolkit's authors before reusing it elsewhere.
