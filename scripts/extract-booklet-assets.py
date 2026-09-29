#!/usr/bin/env python3
"""Generate the booklet and card-kit assets used by the site.

Reads the two source PDFs in public/downloads/:
  designing-for-the-indian-context-booklet.pdf   (53 pages)
  component-1-card-kit.pdf                        (16 pages)

Writes:
  public/booklet/<id>.webp        one image per booklet page (id = printed page, e.g. 1.06, 4.12)
  public/card-kit/<id>.webp       one image per card-kit page (S1..S8, B1..B7)
  public/downloads/templates/*.pdf  single-page blank templates cut from the booklet
  public/downloads/card-kit/*.pdf   each sheet (S1..S8), each board (B1..B7), all sheets, all boards
  src/data/booklet-assets.json    which files exist, with pixel sizes (used for <img width/height>)

Usage (only needed when the source PDFs change; outputs are committed):
  pip install pymupdf pillow
  python3 scripts/extract-booklet-assets.py

Page numbering. Booklet PDF page n -> printed label:
  1 cover | 2-6 -> 02..06 | 7-30 -> 1.01..1.24 | 31-52 -> 4.01..4.22 | 53 end
Card-kit PDF page -> 1 = 1.25 (intro) | 2-9 = sheets S1-S8 | 10-16 = boards B1-B7
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
CARDKIT = DL / "component-1-card-kit.pdf"

MAX_SIDE = 1800  # longest edge of rendered page images, in pixels
WEBP_QUALITY = 80


def booklet_id(n: int) -> str:
    if n == 1:
        return "cover"
    if 2 <= n <= 6:
        return f"{n:02d}"
    if 7 <= n <= 30:
        return f"1.{n - 6:02d}"
    if 31 <= n <= 52:
        return f"4.{n - 30:02d}"
    return "end"


def cardkit_id(n: int) -> str:
    if n == 1:
        return "1.25"
    if 2 <= n <= 9:
        return f"S{n - 1}"
    return f"B{n - 9}"


# Single-page blank templates cut from the booklet: PDF page -> filename.
BLANKS = {
    13: "c1-media-story-blank.pdf",          # 1.07
    15: "c1-gossip-venn-blank.pdf",          # 1.09
    18: "c1-history-timeline-blank.pdf",     # 1.12
    21: "c1-break-flow-needs-blank.pdf",     # 1.15
    22: "c1-break-blame-scale.pdf",          # 1.16 (example above, blank below)
    24: "c1-break-villain-story-blank.pdf",  # 1.18
    27: "c1-power-lenses-blank.pdf",         # 1.21
    29: "c1-synthesis-blank.pdf",            # 1.23
    34: "c4-journey-strip.pdf",              # 4.04 (example + blank)
    38: "c4-build-loop-blank.pdf",           # 4.08
    40: "c4-build-ladder-blank.pdf",         # 4.10
    43: "c4-break-whisper-blank.pdf",        # 4.13
    45: "c4-break-big-players-blank.pdf",    # 4.15
    48: "c4-weigh-blank.pdf",                # 4.18
    51: "c4-say-brief-blank.pdf",            # 4.21
    52: "c4-ask-your-participants.pdf",      # 4.22
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
    for f in (BOOKLET, CARDKIT):
        if not f.exists():
            print(f"missing source PDF: {f}", file=sys.stderr)
            return 1

    manifest: dict = {"booklet": {}, "cardKit": {}, "templates": {}, "cardKitPdfs": {}}

    booklet = pymupdf.open(BOOKLET)
    for n in range(1, len(booklet) + 1):
        bid = booklet_id(n)
        w, h = render(booklet[n - 1], ROOT / "public" / "booklet" / f"{bid}.webp")
        manifest["booklet"][bid] = {"page": n, "width": w, "height": h}
    for n, name in BLANKS.items():
        cut(booklet, [n], DL / "templates" / name)
        manifest["templates"][name] = {"bookletPage": booklet_id(n)}

    kit = pymupdf.open(CARDKIT)
    for n in range(1, len(kit) + 1):
        kid = cardkit_id(n)
        w, h = render(kit[n - 1], ROOT / "public" / "card-kit" / f"{kid}.webp")
        manifest["cardKit"][kid] = {"page": n, "width": w, "height": h}
        if kid[0] in "SB" and len(kid) == 2:
            name = f"{'sheet' if kid[0] == 'S' else 'board'}-{kid.lower()}.pdf"
            cut(kit, [n], DL / "card-kit" / name)
            manifest["cardKitPdfs"][name] = {"id": kid}
    cut(kit, list(range(2, 10)), DL / "card-kit" / "card-sheets-s1-s8.pdf")
    cut(kit, list(range(10, 17)), DL / "card-kit" / "boards-b1-b7.pdf")
    manifest["cardKitPdfs"]["card-sheets-s1-s8.pdf"] = {"id": "S1-S8"}
    manifest["cardKitPdfs"]["boards-b1-b7.pdf"] = {"id": "B1-B7"}

    out = ROOT / "src" / "data" / "booklet-assets.json"
    out.write_text(json.dumps(manifest, indent=2, sort_keys=True) + "\n")
    print(f"booklet pages: {len(manifest['booklet'])}, card-kit pages: {len(manifest['cardKit'])}, "
          f"templates: {len(manifest['templates'])}, card-kit PDFs: {len(manifest['cardKitPdfs'])}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
