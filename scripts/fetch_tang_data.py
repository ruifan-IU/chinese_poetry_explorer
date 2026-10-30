#!/usr/bin/env python3
"""
Fetch raw Tang poetry data from github.com/chinese-poetry/chinese-poetry.

Downloads only what this project needs:
- 全唐诗/authors.tang.json       poet bios
- 全唐诗/poet.tang.*.json        poems (paragraphs, title, author)
- 全唐诗/唐诗三百首.json          curated "300 Tang Poems" anthology
- 蒙学/qianjiashi.json          千家诗 anthology (fame signal; Tang + Song)
- rank/poet/poet.tang.rank.*.json  search-engine hit counts, index-aligned
                                    with the poet.tang.*.json files

Safe to re-run: already-downloaded files are skipped.
"""

import json
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

REPO_BASE = "https://raw.githubusercontent.com/chinese-poetry/chinese-poetry/master"
INDICES = range(0, 58000, 1000)  # poet.tang.0.json ... poet.tang.57000.json

WIKIDATA_SPARQL_URL = "https://query.wikidata.org/sparql"
# Wikimedia rejects requests without a descriptive User-Agent (403).
# See https://meta.wikimedia.org/wiki/User-Agent_policy
WIKIDATA_HEADERS = {
    "User-Agent": "chinese-poetry-explorer/0.1 (ruifan.cs@gmail.com)",
    "Accept": "application/sparql-results+json",
}

QUERIES_DIR = Path(__file__).parent / "queries"
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


def fetch_wikidata(query_file: Path, dest: Path) -> None:
    """Run a SPARQL query against the Wikidata Query Service, save the JSON results."""
    if dest.exists():
        print(f"  skip (already downloaded): {dest.name}")
        return

    query = query_file.read_text(encoding="utf-8")
    url = WIKIDATA_SPARQL_URL + "?" + urllib.parse.urlencode({"query": query})
    req = urllib.request.Request(url, headers=WIKIDATA_HEADERS)

    try:
        with urllib.request.urlopen(req, timeout=90) as resp:
            data = json.load(resp)
    except urllib.error.HTTPError as e:
        # The body carries the useful part, e.g. a user-agent policy notice
        # or a SPARQL syntax error with the offending line.
        raise RuntimeError(
            f"Wikidata query {query_file.name} failed with HTTP {e.code}:\n"
            f"{e.read().decode('utf-8', errors='replace')[:1000]}"
        ) from e

    dest.parent.mkdir(parents=True, exist_ok=True)
    with open(dest, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"  saved {dest.name} ({len(data['results']['bindings']):,} rows)")


def main() -> None:
    print("Fetching poet bios...")
    fetch("全唐诗/authors.tang.json", OUT_DIR / "authors.tang.json")

    print("Fetching 唐诗三百首 curated anthology...")
    fetch("全唐诗/唐诗三百首.json", OUT_DIR / "唐诗三百首.json")

    print("Fetching 千家诗 anthology...")
    fetch("蒙学/qianjiashi.json", OUT_DIR / "千家诗.json")

    print(f"Fetching {len(INDICES)} poem files...")
    for i in INDICES:
        fetch(f"全唐诗/poet.tang.{i}.json", OUT_DIR / "poems" / f"poet.tang.{i}.json")

    print(f"Fetching {len(INDICES)} rank files...")
    for i in INDICES:
        fetch(
            f"rank/poet/poet.tang.rank.{i}.json",
            OUT_DIR / "rank" / f"poet.tang.rank.{i}.json",
        )

    print("Fetching Tang poets from Wikidata...")
    fetch_wikidata(QUERIES_DIR / "tang_poets.rq", OUT_DIR / "wikidata.json")

    print("Done.")


if __name__ == "__main__":
    main()
