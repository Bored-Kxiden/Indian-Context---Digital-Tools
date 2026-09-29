# Designing for the Indian Context

A public website for **Designing for the Indian Context**, a toolkit from BITSDES 2024–28: tools for reading products, pictures, language and people's material lives, before you design for them. It is for design students, product teams, NGO and public-service teams, and field researchers.

The toolkit is built in **components**. Each is a different way of reading the world a product will land in, and each works on its own.

| Component | Status | What it reads |
| --- | --- | --- |
| **1 · Reading Existing Products** | Live | Whose user is built into a product, and who pays when it is wrong. Media & Gossip, History, The Break, Power, Synthesis. With a card kit. |
| **2 · Reading Visual Culture** | Coming next | Placeholder page only. |
| **3 · Reading Language** | Live | The Meaning-to-Interface Toolkit: Meaning Card, Physical Field Kit, Fidelity Protocol, Language Lens Audit, Expression Library, Design Language Library. |
| **4 · Reading Material Reality** | Live | What people have around them, what it costs, and who they lean on. Build, Break, Weigh, Say. |
| **Reflection** | Coming next | Placeholder page only. |

Every tool page has four tabs, in the same order: **Guide · Example · Blank template · Card kit** (the card kit is Component 1 only). The home page leads with an **"I want to…"** index that opens the right tool for the job.

> **Working on this repo?** Read [`CONTEXT.md`](CONTEXT.md) first. It records the project's context, decisions, open questions and a change log, and it is updated with every change. [`CLAUDE.md`](CLAUDE.md) has the working rules for AI assistants.

## Stack

[Astro](https://astro.build) in static mode. No backend, no client framework, one runtime dependency.

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
│       ├── designing-for-the-indian-context-booklet.pdf
│       ├── component-1-card-kit.pdf
│       ├── templates/             single-page blank templates cut from the booklet
│       └── card-kit/              each sheet, each board, all sheets, all boards
├── scripts/
│   ├── extract-booklet-assets.py  booklet + card-kit PDFs → images, blanks, split PDFs
│   └── build-templates.mjs        Component 3 PDFs and CSV from /templates
├── templates/                     source definitions for the Component 3 printable cards
└── src/
    ├── components/                Header, Footer, GoalIndex, ComponentRail, PageFigure, DownloadCard, …
    ├── data/
    │   ├── components.ts          the components (order, colour, status, blurb)
    │   ├── goals.ts               the "I want to…" index, all components
    │   ├── site.ts                site name, nav, links
    │   ├── booklet/               Components 1 and 4: tools, parts, steps, words, examples (from the booklet)
    │   ├── card-kit.ts            card sheets S1–S8 and boards B1–B7
    │   ├── downloads.ts           every downloadable file
    │   ├── rail.ts                the left rail on component pages
    │   ├── tools.ts, modules.ts   Component 3 tools and process flow
    │   └── library.ts, *.json     Component 3 Expression and Design Language libraries
    ├── layouts/                   BaseLayout, ComponentLayout, BookletToolLayout, ToolLayout (Language), ComingNextLayout
    ├── pages/                     index, components/*, card-kit, guideline, downloads, about
    ├── styles/global.css          design tokens and shared styles
    └── utils/                     url helper, page-image lookup, Fidelity Protocol rule
```

## Pages

| Path | What |
| --- | --- |
| `/` | Home: hero, "I want to…", components, why this exists, the guideline, Meera |
| `/components/` | All components |
| `/components/existing-products/` | Component 1 overview, with `pick-a-product/` and one page per tool |
| `/components/material-reality/` | Component 4 overview, with `before-you-start/`, one page per tool, `ask-your-participants/` |
| `/components/language/` | Component 3 overview, six tools, and `methodology/` |
| `/components/visual-culture/`, `/components/reflection/` | "Coming next" placeholders |
| `/card-kit/` | Component 1 boards and card sheets, with print instructions |
| `/guideline/` | The one guideline, how to read a tool (`#how-to-read`), Meera (`#meera`) |
| `/downloads/` | Every file, grouped |
| `/about/` | Who it is for, what comes after, further reading |
| `/tools/…` | Old Component 3 addresses. Redirect to `/components/language/…` |

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

## Content from the booklet

Components 1 and 4 come from the **Toolkit Booklet** and the **Component 1 Card Kit** (two PDFs in `public/downloads/`).

- **Words are copied from the booklet**, not paraphrased, and live in `src/data/booklet/`. Where the site adds text (a few card-kit intros, the Component 1 "I want to…" phrases, UI labels), `CONTEXT.md` says so.
- **Examples and blanks are the booklet's own pages**, shown as images with a text alternative and the steps beside them. Filled examples are illustrative, as the booklet says. Never invent quotes or data on the site.
- **`scripts/extract-booklet-assets.py`** renders every booklet and card-kit page to WebP, cuts the blank templates and card-kit sheets and boards into their own PDFs, and writes `src/data/booklet-assets.json`. Run it only when the source PDFs change (`pip install pymupdf pillow`); commit the outputs.
- **Page ids** follow the printed page numbers: `1.06` is the Media Story example, `4.12` is in Component 4. Card-kit ids are `S1`…`S8` and `B1`…`B7`.

To change a tool's wording, edit `src/data/booklet/existing-products.ts` or `material-reality.ts`. The tool page, the rail, the "I want to…" index (Component 4) and the download list all read from those files.

## Adding a new downloadable file

Every download is listed in one place, `src/data/downloads.ts`. The Downloads page and the tool pages read from it, and file sizes are measured at build time. The blank templates and the card-kit sheets and boards are derived from the content data, so they need no entry of their own.

1. Put the file in `public/downloads/`.
2. Add an entry to `downloadEntries` in `src/data/downloads.ts` (see the Component 3 entries for the shape): `id`, `title`, `description`, `file` (relative to `public/downloads`), `format` (`'PDF' | 'CSV' | 'JSON'`), `group` (`'booklet' | 'card-kit' | 'templates' | 'language'`), optionally `component` (`'c1' | 'c3' | 'c4'`, for colour), `page` (the site path of the page it belongs to), `note`, `status`.
3. Run `npm run build`. If the file is missing, the build fails with a message naming the entry, so a broken link can never be published.

### Regenerating the Component 3 printable cards

The two Language PDFs and the CSV are generated from `templates/`:

- `templates/meaning-card-fields.json` defines every field on the Meaning Card. The Meaning Card page, the PDF and the CSV columns all read from it.
- `templates/kit-cards.json` defines the decks in the Physical Field Kit.

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
