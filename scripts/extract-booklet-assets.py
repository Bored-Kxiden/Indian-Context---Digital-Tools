#!/usr/bin/env python3
"""Generate the booklet and card-kit assets used by the site.

Reads the one source PDF, the final booklet (107 pages, all four components):
  public/downloads/designing-for-the-indian-context-booklet.pdf

Writes:
  public/booklet/<id>.webp          one image per booklet page (id = printed page, e.g. 1.06, 4.12)
  public/card-kit/<id>.webp         one image per card-kit page (S1..S8, B1..B7)
  public/downloads/templates/*.pdf  single-page templates and print sheets cut from the booklet
  public/downloads/card-kit/*.pdf   each sheet (S1..S8), each board (B1..B7), all sheets, all boards
  public/downloads/component-1-card-kit.pdf   the card-kit pages together (1.12 to 1.27)
  src/data/booklet-assets.json      which files exist, with pixel sizes (used for <img width/height>)

Usage (only needed when the source PDF changes; outputs are committed):
  pip install pymupdf pillow
  python3 scripts/extract-booklet-assets.py

Page numbering. Booklet PDF page n -> id:
  1 cover | 2-7 -> 02..07 | 8-36 -> Component 1: 1.01..1.27 (Reflection page R·1A after 1.02, R·1B after 1.10)
  37-53 -> Component 2: 2.01..2.15 (R·2A after 2.02, R·2B after 2.15)
  54-79 -> Component 3: 3.01..3.24 (R·3A after 3.03, R·3B after 3.24)
  80-103 -> Component 4: 4.01..4.22 (R·4A after 4.03, R·4B after 4.22)
  104-106 -> Look back R·E1..E3 | 107 end
The Reflection pages (R·…) are not rendered: the site has its own pages for them (see scripts/build-reflection-pdfs.mjs).
Card kit: 1.12 is the card-kit page, 1.13-1.20 are sheets S1-S8, 1.21-1.27 are boards B1-B7.
"""
import io
import json
import sys
from pathlib import Path

try:
    import pymupdf
except ImportError:  # older installs
    import fitz as pymupdf  # type: ignore
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
DL = ROOT / "public" / "downloads"
BOOKLET = DL / "designing-for-the-indian-context-booklet.pdf"

MAX_SIDE = 1800  # longest edge of rendered page images, in pixels
WEBP_QUALITY = 80

# Pages that are Claim & Reflection pages, inserted between a component's pages. Not rendered here.
REFLECTION_PAGES = {10: "R·1A", 19: "R·1B", 39: "R·2A", 53: "R·2B", 57: "R·3A", 79: "R·3B", 83: "R·4A", 103: "R·4B", 104: "R·E1", 105: "R·E2", 106: "R·E3"}


def booklet_id(n: int) -> str | None:
    """Printed id of PDF page n, or None for a Reflection page."""
    if n in REFLECTION_PAGES:
        return None
    if n == 1:
        return "cover"
    if 2 <= n <= 7:
        return f"{n:02d}"
    if 8 <= n <= 36:  # Component 1, with R·1A (p10) and R·1B (p19) inside
        return f"1.{n - 7 - (n > 10) - (n > 19):02d}"
    if 37 <= n <= 53:  # Component 2, R·2B is p53
        return f"2.{n - 36 - (n > 39):02d}"
    if 54 <= n <= 79:  # Component 3
        return f"3.{n - 53 - (n > 57):02d}"
    if 80 <= n <= 103:  # Component 4
        return f"4.{n - 79 - (n > 83):02d}"
    return "end"


def cardkit_id(n: int) -> str | None:
    """Card-kit id (S1..S8, B1..B7) of PDF page n, or None."""
    if 22 <= n <= 29:
        return f"S{n - 21}"
    if 30 <= n <= 36:
        return f"B{n - 29}"
    return None


# Single-page templates and print sheets cut from the booklet: PDF page -> filename.
TEMPLATES = {
    # Component 1: every page is a template with Meera's example in [brackets]
    11: "c1-media-story-template.pdf",        # 1.03
    12: "c1-gossip-venn-template.pdf",        # 1.04
    13: "c1-history-timeline-template.pdf",   # 1.05
    14: "c1-break-flow-needs-template.pdf",   # 1.06
    15: "c1-break-villain-story-template.pdf",  # 1.07
    16: "c1-power-template.pdf",              # 1.08
    17: "c1-synthesis-template.pdf",          # 1.09
    # Component 2
    42: "c2-show-missions-blank.pdf",         # 2.05 mission cards + photo slips
    45: "c2-read-passes-blank.pdf",           # 2.08
    48: "c2-build-scenario-blank.pdf",        # 2.11
    51: "c2-handoff-profile-blank.pdf",       # 2.14
    # Component 3
    56: "c3-before-you-start.pdf",            # 3.03 (checklist, positionality note, glossary)
    59: "c3-listen-cue-cards.pdf",            # 3.05 (read first)
    61: "c3-listen-log-meaning-card-blank.pdf",  # 3.07
    64: "c3-translate-blank.pdf",             # 3.10 thick translation
    66: "c3-translate-survey-sheet.pdf",      # 3.12 reverse thick translation: survey sheet (print + read aloud)
    67: "c3-translate-tally-blank.pdf",       # 3.13 reverse thick translation: tally + support check
    70: "c3-test-blank.pdf",                  # 3.16
    73: "c3-library-entries-blank.pdf",       # 3.19
    76: "c3-relay-sheet-blank.pdf",           # 3.22
    77: "c3-relay-idiom-cards.pdf",           # 3.23
    # Component 4
    84: "c4-journey-strip.pdf",               # 4.04 (example + blank)
    88: "c4-build-loop-blank.pdf",            # 4.08
    90: "c4-build-ladder-blank.pdf",          # 4.10
    93: "c4-break-whisper-blank.pdf",         # 4.13
    95: "c4-break-big-players-blank.pdf",     # 4.15
    98: "c4-weigh-blank.pdf",                 # 4.18
    101: "c4-say-brief-blank.pdf",            # 4.21
    102: "c4-ask-your-participants.pdf",      # 4.22
}


def render(page, out: Path) -> tuple[int, int]:
    rect = page.rect
    scale = MAX_SIDE / max(rect.width, rect.height)
    pix = page.get_pixmap(matrix=pymupdf.Matrix(scale, scale), alpha=False)
    img = Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")
    out.parent.mkdir(parents=True, exist_ok=True)
    img.save(out, "WEBP", quality=WEBP_QUALITY, method=6)
    return img.size


def cut(src, pages: list[int], out: Path) -> None:
    """Write a new PDF from 1-based page numbers of `src`."""
    out.parent.mkdir(parents=True, exist_ok=True)
    doc = pymupdf.open()
    for p in pages:
        doc.insert_pdf(src, from_page=p - 1, to_page=p - 1)
    doc.save(out, garbage=4, deflate=True)
    doc.close()


def main() -> int:
    if not BOOKLET.exists():
        print(f"missing source PDF: {BOOKLET}", file=sys.stderr)
        return 1
    booklet = pymupdf.open(BOOKLET)
    if len(booklet) != 107:
        print(f"expected 107 pages, found {len(booklet)}: the page map in this script needs checking", file=sys.stderr)
        return 1

    # Start clean so pages dropped from a later booklet do not linger.
    for folder in (ROOT / "public" / "booklet", ROOT / "public" / "card-kit"):
        for f in folder.glob("*.webp"):
            f.unlink()
    for folder in (DL / "templates", DL / "card-kit"):
        for f in folder.glob("c[1-4]-*.pdf"):
            f.unlink()
        for f in folder.glob("sheet-*.pdf"):
            f.unlink()
        for f in folder.glob("board-*.pdf"):
            f.unlink()

    manifest = {"booklet": {}, "cardKit": {}, "templates": {}, "cardKitPdfs": {}}

    seen: set[str] = set()
    for n in range(1, len(booklet) + 1):
        bid = booklet_id(n)
        if bid is None:
            continue
        assert bid not in seen, f"duplicate page id {bid}"
        seen.add(bid)
        w, h = render(booklet[n - 1], ROOT / "public" / "booklet" / f"{bid}.webp")
        manifest["booklet"][bid] = {"page": n, "width": w, "height": h}

    for n, name in TEMPLATES.items():
        cut(booklet, [n], DL / "templates" / name)
        manifest["templates"][name] = {"bookletPage": booklet_id(n)}

    for n in range(22, 37):
        kid = cardkit_id(n)
        w, h = render(booklet[n - 1], ROOT / "public" / "card-kit" / f"{kid}.webp")
        manifest["cardKit"][kid] = {"page": n, "width": w, "height": h}
        name = f"{'sheet' if kid[0] == 'S' else 'board'}-{kid.lower()}.pdf"
        cut(booklet, [n], DL / "card-kit" / name)
        manifest["cardKitPdfs"][name] = {"id": kid}
    cut(booklet, list(range(22, 30)), DL / "card-kit" / "card-sheets-s1-s8.pdf")
    cut(booklet, list(range(30, 37)), DL / "card-kit" / "boards-b1-b7.pdf")
    cut(booklet, list(range(21, 37)), DL / "component-1-card-kit.pdf")
    manifest["cardKitPdfs"]["card-sheets-s1-s8.pdf"] = {"id": "S1-S8"}
    manifest["cardKitPdfs"]["boards-b1-b7.pdf"] = {"id": "B1-B7"}

    out = ROOT / "src" / "data" / "booklet-assets.json"
    out.write_text(json.dumps(manifest, indent=2, sort_keys=True) + "\n")
    print(
        f"booklet pages: {len(manifest['booklet'])}, card-kit pages: {len(manifest['cardKit'])}, "
        f"templates: {len(manifest['templates'])}, card-kit PDFs: {len(manifest['cardKitPdfs'])}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
