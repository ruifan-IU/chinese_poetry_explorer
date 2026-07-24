#!/usr/bin/env python3
"""
Fetch raw Tang poetry data from github.com/chinese-poetry/chinese-poetry.

Downloads only what this project needs:
- 全唐诗/authors.tang.json       poet bios
- 全唐诗/poet.tang.*.json        poems (paragraphs, title, author)
- 全唐诗/唐诗三百首.json          curated "300 Tang Poems" anthology
- rank/poet/poet.tang.rank.*.json  search-engine hit counts, index-aligned
                                    with the poet.tang.*.json files

Safe to re-run: already-downloaded files are skipped.
"""

import urllib.parse
import urllib.request
from pathlib import Path

REPO_BASE = "https://raw.githubusercontent.com/chinese-poetry/chinese-poetry/master"
INDICES = range(0, 58000, 1000)  # poet.tang.0.json ... poet.tang.57000.json

OUT_DIR = Path(__file__).parent.parent / "prisma" / "data" / "raw" / "tang"


def fetch(repo_path: str, dest: Path) -> None:
    if dest.exists():
        print(f"  skip (already downloaded): {dest.name}")
        return

    url = REPO_BASE + "/" + urllib.parse.quote(repo_path)
    with urllib.request.urlopen(url) as resp:
        data = resp.read()

    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(data)
    print(f"  saved {dest.name} ({len(data):,} bytes)")


def main() -> None:
    print("Fetching poet bios...")
    fetch("全唐诗/authors.tang.json", OUT_DIR / "authors.tang.json")

    print("Fetching 唐诗三百首 curated anthology...")
    fetch("全唐诗/唐诗三百首.json", OUT_DIR / "唐诗三百首.json")

    print(f"Fetching {len(INDICES)} poem files...")
    for i in INDICES:
        fetch(f"全唐诗/poet.tang.{i}.json", OUT_DIR / "poems" / f"poet.tang.{i}.json")

    print(f"Fetching {len(INDICES)} rank files...")
    for i in INDICES:
        fetch(f"rank/poet/poet.tang.rank.{i}.json", OUT_DIR / "rank" / f"poet.tang.rank.{i}.json")

    print("Done.")


if __name__ == "__main__":
    main()
