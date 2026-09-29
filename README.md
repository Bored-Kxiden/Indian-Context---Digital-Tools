# Meaning-to-Interface Toolkit

A public website for the **Meaning-to-Interface Toolkit**: a framework for capturing emotional and cultural meaning faithfully during cross-language field research, and carrying it through to interface wording that has been tested with the people who will use it.

It was built for research on first-generation Indian college students, and is reusable for any cross-language qualitative research.

The site explains each tool and lets visitors download the physical and digital templates:

| Tool | What it is |
| --- | --- |
| **The Meaning Card** | One card per "meaning moment", front and back. Printable, index-card sized. |
| **The Physical Field Kit** | Context, Interview, and Reflection Cards, a Researcher Positionality Card, and blank Meaning Cards. |
| **The Fidelity Protocol** | Four tags (source language, who interpreted, rendering type, single-source flag) that a finding needs before it carries full confidence. |
| **The Language Lens Audit** | Three lenses (Nomenclature, Proxy/Audience, Trust) for auditing interface copy. |
| **The Expression Library** | Searchable home for validated, de-identified meaning moments. |
| **The Design Language Library** | Validated wording and interaction patterns, each citing the Expression Library entries that justify it. |

## Stack

[Astro](https://astro.build) in static mode. No backend, no client framework, one runtime dependency.

Why Astro: the site is content-heavy with a handful of pages, and Astro turns `.astro` files (HTML with a little templating) into plain static HTML and CSS. Interactive bits (library search, the Fidelity checker) are small vanilla scripts. The result is fast, works without JavaScript for reading, and is easy for a non-specialist to edit.

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
npm run build:templates  # regenerate the PDFs and CSV (see below)
```

## Project structure

```
.
├── .github/workflows/deploy.yml   GitHub Pages deployment
├── public/
│   └── downloads/                 every downloadable file (PDF, CSV, JSON)
├── scripts/
│   └── build-templates.mjs        generates the PDFs and CSV from /templates
├── templates/                     source definitions for the printable cards
│   ├── meaning-card-fields.json   fields on the front/back of a Meaning Card
│   └── kit-cards.json             content of the Physical Field Kit decks
└── src/
    ├── components/                Header, Footer, ProcessFlow, cards, banners
    ├── data/
    │   ├── modules.ts             the process flow (entry, 3 modules, gates, loop)
    │   ├── tools.ts               the six tools
    │   ├── downloads.ts           the list of downloadable assets
    │   ├── expressions.json       Expression Library entries
    │   ├── patterns.json          Design Language Library entries
    │   └── library.ts             types and validation for the two libraries
    ├── layouts/                   BaseLayout and ToolLayout
    ├── pages/                     one file per page (index, tools/*, downloads, about)
    ├── styles/global.css          design tokens and shared styles
    └── utils/                     URL helper and the Fidelity Protocol rule
```

## Deploying to GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds the site and publishes it on every push to `main`.

**One-time setup:** in the repository on GitHub, go to **Settings → Pages** and set **Source** to **GitHub Actions**.

The site is then served at `https://bored-kxiden.github.io/Indian-Context---Digital-Tools/`.

Where the site is served from is controlled by two environment variables, read in `astro.config.mjs`:

| Variable | Meaning | Default |
| --- | --- | --- |
| `SITE_URL` | Public origin, e.g. `https://example.org` | unset |
| `BASE_PATH` | Sub-path the site lives under, e.g. `/Indian-Context---Digital-Tools` | `/` |

The workflow sets both for the GitHub Pages project URL. Internal links go through the `url()` helper in `src/utils/url.ts`, so they respect the base path.

**Custom domain:** set `BASE_PATH: /` and `SITE_URL: https://your-domain` in the workflow, add a `public/CNAME` file containing the domain, and configure the domain under **Settings → Pages**.

**Vercel:** [Import this repository into Vercel](https://vercel.com/new/import?s=https%3A%2F%2Fgithub.com%2FBored-Kxiden%2FIndian-Context---Digital-Tools). Vercel detects Astro and the defaults work as they are: build command `npm run build`, output directory `dist`, and no environment variables (`BASE_PATH` unset means the site is served from `/`).

**Other hosts (Netlify, Cloudflare Pages):** same settings as Vercel.

## Adding a new downloadable template

Every download is listed in one place, `src/data/downloads.ts`. The Downloads page and the relevant tool page both read from it, and file sizes are measured at build time.

1. Put the file in `public/downloads/`, for example `public/downloads/interview-guide.pdf`.
2. Add an entry to `downloadEntries` in `src/data/downloads.ts`:

   ```ts
   {
     id: 'interview-guide',
     title: 'Interview guide: printable',
     description: 'One or two sentences on what it is and when to use it.',
     file: 'interview-guide.pdf',   // filename inside public/downloads
     format: 'PDF',                 // 'PDF' | 'CSV' | 'JSON'
     group: 'print',                // 'print' or 'digital'
     tool: 'physical-field-kit',    // slug of the tool it belongs to (see src/data/tools.ts)
     note: 'Optional usage note.',
     status: 'Draft',               // 'Draft' or 'Final'
   },
   ```

3. Run `npm run build`. If the file is missing, the build fails with a message naming the entry, so a broken link can never be published.

To replace a file with a final version, overwrite it in `public/downloads/` (keep the filename) and change `status` to `'Final'`.

### Regenerating the printable cards

The two PDFs and the CSV are generated from the definitions in `templates/`:

- `templates/meaning-card-fields.json` defines every field on the Meaning Card. The site's Meaning Card page, the PDF, and the CSV columns all read from it, so they cannot drift apart.
- `templates/kit-cards.json` defines the decks in the Physical Field Kit (titles, prompts, and the back-of-card headings).

After editing either, run:

```bash
npm run build:templates
```

This renders the PDFs with headless Chromium through `playwright-core` (a dev dependency that does not download a browser). It looks for Chrome/Chromium automatically; if yours is somewhere unusual, set `CHROMIUM_PATH`. The script also fails if any card's text overflows the card. Commit the regenerated files: the site build and CI never need a browser.

If you have final, designed PDFs, skip the generator: put them in `public/downloads/` under the same filenames.

Cards are 6 × 4 in (152.4 × 102 mm). To change the size, edit `W_MM` and `H_MM` at the top of `scripts/build-templates.mjs`.

## Adding to the libraries

Both libraries are plain JSON, so entries can be added without touching any page code. Entries marked `"sample": true` are illustrative examples; delete them when you add your real data.

**Expression Library** (`src/data/expressions.json`): copy the object from `public/downloads/expression-library-template.json`, remove the `_help` key, and fill it in. Fill in all four fidelity tags. An entry missing any tag is shown as "Needs re-check" and cannot carry full confidence.

**Design Language Library** (`src/data/patterns.json`): each entry must list the IDs of the Expression Library entries it is justified by in `cites`. The build fails if `cites` is empty or names an entry that does not exist. A pattern that cites an entry still needing a re-check is flagged on the page.

De-identify before you digitize. Never put names, or details that could identify a participant or their family, in these files: they are published with the site.

## Content status

- The **process flow, Fidelity Protocol, Language Lens, and thick-translation** content follows the project's Meaning-to-Interface FigJam board and the Language component write-up.
- The **prompts on the Physical Field Kit cards** are a first draft written from the steps of the process. Replace them with your finals in `templates/kit-cards.json`.
- All **library entries and the worked Meaning Card example** are illustrative and contain no real participant data.

## License

[MIT](LICENSE)
