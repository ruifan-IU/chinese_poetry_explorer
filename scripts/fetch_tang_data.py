#!/usr/bin/env python3
"""
Fetch raw Tang poetry data from github.com/chinese-poetry/chinese-poetry.

Downloads only what this project needs:
- 全唐诗/authors.tang.json       poet bios
- 全唐诗/poet.tang.*.json        poems (paragraphs, title, author)
- 全唐诗/唐诗三百首.json          curated "300 Tang Poems" anthology
- 蒙学/qianjiashi.json          千家诗 anthology (fame signal; Tang + Song)

Fetch Tang poets data including portraits, aliases, birth and death dates, and sitelinks from WikiData:
- queries/tang_poets.rq       items with occupation poet + Tang citizenship
- queries/authors_by_name.rq  every local author name, looked up in batches
                              (saved to wikidata_by_name/batch_NNN.json)

Safe to re-run: already-downloaded files are skipped. Wikidata results are
re-fetched when their query changes (tracked by a hash of the full query
text stored in the saved JSON, so a changed name list counts too); delete
the file to force a refresh.
"""

import hashlib
import json
import re
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

from opencc import OpenCC

from tang_cleaning import UNKNOWN_POET_NAME, normalize_author

t2s = OpenCC("t2s").convert

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
BY_NAME_DIR = OUT_DIR / "wikidata_by_name"
BY_NAME_BATCH_SIZE = 200
GENERIC_SURNAME_RE = re.compile(r".氏")


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


def fetch_wikidata_by_name(authors: list[dict]) -> None:
    """
    Look up every local author name on Wikidata, in batches.

    Catches poets the property-based tang_poets.rq misses: items without
    occupation "poet" (貫休) or with a Five Dynasties / Song citizenship
    (皮日休, 徐鉉). Names are normalized with the same rules as the cleaning
    step but stay Traditional, matching Wikidata's zh-hant labels.
    """
    known_names = {a["name"] for a in authors}
    normalized_names = {normalize_author(name, known_names) for name in known_names} - {
        UNKNOWN_POET_NAME
    }
    # Skip "surname + 氏" (王氏, 張氏): it means "a woman née Wang", not a
    # specific person, and matches thousands of items no resolver can tell
    # apart. Longer names like 閩后陳氏 identify one person and are kept.
    # Sorted, so every run builds identical batches and the cache hashes hold.
    names = sorted(n for n in normalized_names if not GENERIC_SURNAME_RE.fullmatch(n))

    template = (QUERIES_DIR / "authors_by_name.rq").read_text(encoding="utf-8")
    batches = [names[i : i + BY_NAME_BATCH_SIZE] for i in range(0, len(names), BY_NAME_BATCH_SIZE)]
    print(f"  {len(names):,} names in {len(batches)} batches")

    for i, batch in enumerate(batches):
        dest = BY_NAME_DIR / f"batch_{i:03d}.json"
        run_wikidata_query(fill_names(template, batch), f"authors_by_name.rq batch {i}", dest)

    # A shorter name list leaves old batch files behind; they'd be read as
    # current results, so remove them.
    for stale in BY_NAME_DIR.glob("batch_*.json"):
        if int(stale.stem.removeprefix("batch_")) >= len(batches):
            stale.unlink()
            print(f"  removed stale {stale.name}")


def fill_names(template: str, names: list[str]) -> str:
    """
    Fill the template's {NAMES} placeholder with SPARQL literals.

    Each name is sent in its Traditional form and, if different, its
    Simplified form, because some items store the name in Simplified
    characters even under a zh-hant or zh tag (王湾, not 王灣). Every form is
    sent under all three Chinese language tags, because "貫休"@zh-hant only
    matches labels tagged zh-hant. json.dumps escapes quotes and
    backslashes, so a name can't break out of its literal.

    Variant characters (龐藴 vs 龐蘊) still can't match exactly; the
    property-based tang_poets.rq covers those by comparing after t2s locally.
    """
    forms = dict.fromkeys(form for name in names for form in (name, t2s(name)))
    literals = " ".join(
        f"{json.dumps(form, ensure_ascii=False)}@{tag}"
        for form in forms
        for tag in ("zh-hant", "zh", "zh-hans")
    )
    return template.replace("{NAMES}", literals)


def fetch_wikidata_tang_poets(query_file: Path, dest: Path) -> None:
    """Run a SPARQL query file against Wikidata, save the JSON results."""
    run_wikidata_query(query_file.read_text(encoding="utf-8"), query_file.name, dest)


def run_wikidata_query(query: str, name: str, dest: Path) -> None:
    """
    Run a SPARQL query against the Wikidata Query Service, save the JSON
    results to dest. `name` identifies the query in messages.
    """
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

    # POST, not GET: a batch of 200 names x 3 language tags is too long for a URL.
    req = urllib.request.Request(
        WIKIDATA_SPARQL_URL,
        data=urllib.parse.urlencode({"query": query}).encode("utf-8"),
        headers=WIKIDATA_HEADERS,
    )

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
    fetch_wikidata_tang_poets(
        QUERIES_DIR / "tang_poets.rq", OUT_DIR / "wikidata_tang_poets.json"
    )

    print("Looking up all author names on Wikidata...")
    authors = json.loads((OUT_DIR / "authors.tang.json").read_text(encoding="utf-8"))
    fetch_wikidata_by_name(authors)

    print("Done.")


if __name__ == "__main__":
    main()
