"""Builds one printable pack per file of the kit: every worksheet of that file, in the order you use them.

    python3 scripts/build-file-packs.py

Reads public/downloads/templates/*.pdf (made from the booklet) and writes public/downloads/worksheets-<file>.pdf.
The site offers each pack as the file's "Download PDF" (CONTEXT.md, D41). Rerun after a template changes.
Needs pypdf (pip install pypdf).
"""
from pathlib import Path
from pypdf import PdfWriter, PdfReader

ROOT = Path(__file__).resolve().parent.parent
TPL = ROOT / 'public/downloads/templates'
OUT = ROOT / 'public/downloads'

PACKS = {
    'existing-products': ['c1-media-story-template', 'c1-gossip-venn-template', 'c1-history-timeline-template',
                          'c1-break-villain-story-template', 'c1-break-flow-needs-template', 'c1-power-template',
                          'c1-synthesis-template'],
    'visual-culture': ['c2-capture-cards', 'c2-show-missions-blank', 'c2-read-passes-blank', 'c2-build-scenario-blank',
                       'c2-handoff-profile-blank'],
    'material-reality': ['c4-journey-strip', 'c4-build-loop-blank', 'c4-build-ladder-blank', 'c4-break-whisper-blank',
                         'c4-break-big-players-blank', 'c4-weigh-blank', 'c4-say-brief-blank', 'c4-ask-your-participants'],
    'language': ['c3-before-you-start', 'c3-listen-cue-cards', 'c3-listen-log-meaning-card-blank', 'c3-translate-blank',
                 'c3-translate-survey-sheet', 'c3-translate-tally-blank', 'c3-test-blank', 'c3-library-entries-blank',
                 'c3-relay-sheet-blank', 'c3-relay-idiom-cards'],
}

for name, parts in PACKS.items():
    w = PdfWriter()
    for p in parts:
        src = TPL / f'{p}.pdf'
        if not src.exists():
            raise SystemExit(f'missing {src}')
        for page in PdfReader(src).pages:
            w.add_page(page)
    w.add_metadata({'/Title': f'Beyond the Edge Case · worksheets · {name}'})
    w.compress_identical_objects()
    out = OUT / f'worksheets-{name}.pdf'
    with open(out, 'wb') as f:
        w.write(f)
    print(out.name, len(w.pages), 'pages', out.stat().st_size // 1024, 'KB')
