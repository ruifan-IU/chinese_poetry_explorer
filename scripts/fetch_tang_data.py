#!/usr/bin/env python3
"""
Fetch raw Tang poetry data from github.com/chinese-poetry/chinese-poetry.

Downloads only what this project needs:
- 全唐诗/authors.tang.json       poet bios
- 全唐诗/poet.tang.*.json        poems (paragraphs, title, author)
- 全唐诗/唐诗三百首.json          curated "300 Tang Poems" anthology
- 蒙学/qianjiashi.json          千家诗 anthology (fame signal; Tang + Song)

Fetch Tang poets data including portraits, aliases, birth and death dates, and sitelinks from WikiData.

Safe to re-run: already-downloaded files are skipped. Wikidata results are
re-fetched when their query file changes (tracked by a hash stored in the
saved JSON); delete the file to force a refresh.
"""

import hashlib
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


class WikidataQueryError(RuntimeError):
    """A Wikidata query failed or returned unusable results."""


def fetch(repo_path: str, dest: Path) -> None:
    if dest.exists():
        print(f"  skip (already downloaded): {dest.name}")
        return

    url = REPO_BASE + "/" + urllib.parse.quote(repo_path)
    with urllib.request.urlopen(url, timeout=90) as resp:
        data = resp.read()

    dest.parent.mkdir(parents=True, exist_ok=True)
    tmp = dest.with_suffix(dest.suffix + ".tmp")
    tmp.write_bytes(data)
    tmp.replace(dest)
    print(f"  saved {dest.name} ({len(data):,} bytes)")


def fetch_wikidata(query_file: Path, dest: Path) -> None:
    """Run a SPARQL query against the Wikidata Query Service, save the JSON results."""

    query = query_file.read_text(encoding="utf-8")
    query_hash = hashlib.sha256(query.encode("utf-8")).hexdigest()

    # Reuse the cache only if it was produced by this exact query. A file
    # that is unreadable or lacks a hash is treated as stale, not as an error.
    if dest.exists():
        try:
            cached = json.loads(dest.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, UnicodeDecodeError):
            cached = {}
        if isinstance(cached, dict) and cached.get("queryHash") == query_hash:
            print(f"  skip (query unchanged): {dest.name}")
            return

    url = WIKIDATA_SPARQL_URL + "?" + urllib.parse.urlencode({"query": query})
    req = urllib.request.Request(url, headers=WIKIDATA_HEADERS)

    name = query_file.name

    # 1. Transport: the request itself failed.
    try:
        with urllib.request.urlopen(req, timeout=90) as resp:
            body = resp.read()
    except urllib.error.HTTPError as e:
        # The body carries the useful part, e.g. a user-agent policy notice
        # or a SPARQL syntax error with the offending line.
        raise WikidataQueryError(
            f"Wikidata query {name} failed with HTTP {e.code}:\n"
            f"{e.read().decode('utf-8', errors='replace')[:1000]}"
        ) from e
    except (urllib.error.URLError, TimeoutError) as e:
        # HTTPError subclasses URLError, so it must be caught first (above).
        raise WikidataQueryError(
            f"Wikidata query {name}: could not reach the server ({e})"
        ) from e

    # 2. Content: the body isn't SPARQL JSON results (truncated, or an HTML
    # error page from a proxy). Read first, then parse, so we can show it.
    try:
        data = json.loads(body)
        rows = data["results"]["bindings"]
    except (json.JSONDecodeError, KeyError, TypeError) as e:
        preview = body[:300].decode("utf-8", errors="replace")
        raise WikidataQueryError(
            f"Wikidata query {name} returned {len(body):,} bytes that aren't valid "
            f"SPARQL JSON results (truncated?). Response starts with:\n{preview}"
        ) from e

    # 3. Semantics: valid but empty -- usually a typo'd property or item ID.
    # Never cache this, or every later run would silently reuse it.
    if not rows:
        raise WikidataQueryError(f"Wikidata query {name} returned 0 rows")

    data["queryHash"] = query_hash
    # Write to a temp file, then rename: the rename is atomic, so an
    # interrupted run never leaves a half-written cache behind.
    dest.parent.mkdir(parents=True, exist_ok=True)
    tmp = dest.with_suffix(dest.suffix + ".tmp")
    with open(tmp, "w", encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=2)
    tmp.replace(dest)
    print(f"  saved {dest.name} ({len(rows):,} rows)")


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

    print("Fetching Tang poets from Wikidata...")
    fetch_wikidata(QUERIES_DIR / "tang_poets.rq", OUT_DIR / "wikidata_tang_poets.json")

    print("Done.")


if __name__ == "__main__":
    main()
