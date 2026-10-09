"""Small thumbnails for the step cards on file pages (D47).

Makes a 400 px wide WebP of every booklet page, Reflection page and board image, in public/thumbs/,
mirroring the folders they come from (public/booklet/1.09.webp -> public/thumbs/booklet/1.09.webp).
The cards show the top of the page only, so 400 px is plenty and keeps a strip of nine cards light.

Run after changing any page image:  npm run build:thumbs   (needs Pillow: pip install pillow)
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / 'public'
SOURCES = ['booklet', 'reflection', 'boards']
WIDTH = 400

made = 0
for folder in SOURCES:
    out_dir = PUBLIC / 'thumbs' / folder
    out_dir.mkdir(parents=True, exist_ok=True)
    for src in sorted((PUBLIC / folder).glob('*.webp')):
        out = out_dir / src.name
        if out.exists() and out.stat().st_mtime >= src.stat().st_mtime:
            continue
        im = Image.open(src).convert('RGB')
        h = round(im.height * WIDTH / im.width)
        im.resize((WIDTH, h), Image.LANCZOS).save(out, 'WEBP', quality=72, method=6)
        made += 1
print(f'thumbnails: {made} made, in public/thumbs/')
