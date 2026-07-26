#!/usr/bin/env python3
"""
Clean raw Tang poetry data (from github.com/chinese-poetry/chinese-poetry)
into the JSON shape the seed script expects.

- Dedupes poems by a hash of the original Traditional-Chinese content.
- Converts title/content/poet bios to Simplified Chinese for display.
- Matches poems against the 唐诗三百首 anthology (by id, falling back to
  title+author) to carry over its curated tags.
- Carries the rank/poet search-hit-count data through as a `fame` number
  per poem, but does NOT turn it into `stars` -- stars stays a pure
  in-app favorite counter. `fame` is available in the output for whatever
  "well-known poems" feature gets built later.

Input:  prisma/data/raw/tang/
Output: prisma/data/cleaned/tang/
"""

import hashlib
import json
from pathlib import Path

import opencc

RAW_DIR = Path(__file__).parent.parent / "prisma" / "data" / "raw" / "tang"
OUT_DIR = Path(__file__).parent.parent / "prisma" / "data" / "cleaned" / "tang"

DYNASTY_NAME = "唐"
UNKNOWN_POET_NAME = "佚名"

t2s = opencc.OpenCC("t2s")


def load_json(path: Path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def content_hash(traditional_text: str) -> str:
    return hashlib.sha256(traditional_text.encode("utf-8")).hexdigest()


def load_poets():
    """
    Returns (poets_by_simplified_name, raw_name_to_simplified).

    authors.tang.json has duplicate entries for the same poet under
    different script/variant spellings (e.g. both '韓愈' and '韩愈', one
    with a full bio and one blank). Converting to Simplified surfaces
    these as literal name collisions, so poets are deduped by simplified
    name here, keeping whichever duplicate has the fullest bio. Every raw
    name variant is kept mapped to the merged poet so poems referencing
    any variant still resolve correctly.
    """
    authors = load_json(RAW_DIR / "authors.tang.json")

    groups: dict[str, list] = {}
    for a in authors:
        simplified_name = t2s.convert(a["name"])
        groups.setdefault(simplified_name, []).append(a)

    poets = {}
    raw_name_to_simplified = {}
    for simplified_name, entries in groups.items():
        best = max(entries, key=lambda a: len(a.get("desc") or ""))
        poets[simplified_name] = {
            "name": simplified_name,
            "introduction": t2s.convert(best["desc"]) if best.get("desc") else None,
            "dynasty": DYNASTY_NAME,
        }
        for a in entries:
            raw_name_to_simplified[a["name"]] = simplified_name

    poets[UNKNOWN_POET_NAME] = {
        "name": UNKNOWN_POET_NAME,
        "introduction": None,
        "dynasty": DYNASTY_NAME,
    }
    raw_name_to_simplified[UNKNOWN_POET_NAME] = UNKNOWN_POET_NAME

    return poets, raw_name_to_simplified


def load_poems_with_rank() -> list:
    """Zip each poet.tang.{i}.json with its index-aligned rank file."""
    poem_files = sorted(
        (RAW_DIR / "poems").glob("poet.tang.*.json"),
        key=lambda p: int(p.stem.split(".")[-1]),
    )

    pairs = []
    rank_mismatches = 0
    for poem_file in poem_files:
        index = poem_file.stem.split(".")[-1]
        rank_file = RAW_DIR / "rank" / f"poet.tang.rank.{index}.json"

        poems = load_json(poem_file)
        ranks = load_json(rank_file) if rank_file.exists() else []
        if len(ranks) != len(poems):
            ranks = [None] * len(poems)

        for poem, rank in zip(poems, ranks):
            if rank and (rank.get("title") != poem.get("title") or rank.get("author") != poem.get("author")):
                rank_mismatches += 1
                rank = None
            pairs.append((poem, rank))

    if rank_mismatches:
        print(f"  warning: {rank_mismatches} rank entries didn't line up with their poem and were dropped")

    return pairs


def load_anthology_tags():
    """唐诗三百首.json -> tag lookups keyed by id and by (title, author)."""
    items = load_json(RAW_DIR / "唐诗三百首.json")
    by_id, by_title_author = {}, {}
    for item in items:
        tags = item.get("tags", [])
        if item.get("id"):
            by_id[item["id"]] = tags
        by_title_author[(item.get("title"), item.get("author"))] = tags
    return by_id, by_title_author


def fame_score(rank: dict | None) -> int:
    if not rank:
        return 0
    return sum(rank.get(k, 0) or 0 for k in ("baidu", "so360", "google", "bing", "bing_en"))


def main():
    print("Loading poets...")
    poets, raw_name_to_simplified = load_poets()
    print(f"  {len(poets)} poets (incl. fallback '{UNKNOWN_POET_NAME}')")

    print("Loading poems + rank data...")
    pairs = load_poems_with_rank()
    print(f"  {len(pairs)} raw poem entries")

    print("Loading 唐诗三百首 anthology tags...")
    anthology_by_id, anthology_by_ta = load_anthology_tags()

    seen_hashes = set()
    cleaned_poems = []
    poets_missing = 0
    duplicates = 0
    anthology_matched = 0
    tag_set = set()

    for poem, rank in pairs:
        paragraphs = poem.get("paragraphs", [])
        if not paragraphs:
            continue

        original_content = "\n".join(paragraphs)
        c_hash = content_hash(original_content)
        if c_hash in seen_hashes:
            duplicates += 1
            continue
        seen_hashes.add(c_hash)

        author = poem.get("author")
        simplified_name = raw_name_to_simplified.get(author)
        if simplified_name is None:
            poets_missing += 1
            simplified_name = UNKNOWN_POET_NAME
        poet_name = poets[simplified_name]["name"]

        anthology_tags = (
            anthology_by_id.get(poem.get("id"))
            or anthology_by_ta.get((poem.get("title"), poem.get("author")))
            or []
        )
        if anthology_tags:
            anthology_matched += 1
        tag_set.update(anthology_tags)

        cleaned_poems.append(
            {
                "title": t2s.convert(poem.get("title", "")),
                "content": t2s.convert(original_content),
                "contentHash": c_hash,
                "poetName": poet_name,
                "dynasty": DYNASTY_NAME,
                "type": "shi",
                "tags": anthology_tags,
                "fame": fame_score(rank),
            }
        )

    print(f"  {len(cleaned_poems)} unique poems ({duplicates} duplicates skipped)")
    print(f"  {poets_missing} poems with unrecognized author -> '{UNKNOWN_POET_NAME}'")
    print(f"  {anthology_matched} poems matched against the 唐诗三百首 anthology")
    print(f"  {len(tag_set)} distinct tags carried over from the anthology")

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    (OUT_DIR / "poets.json").write_text(
        json.dumps(list(poets.values()), ensure_ascii=False, indent=2), encoding="utf-8"
    )
    (OUT_DIR / "poems.json").write_text(
        json.dumps(cleaned_poems, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    (OUT_DIR / "dynasties.json").write_text(
        json.dumps([DYNASTY_NAME], ensure_ascii=False, indent=2), encoding="utf-8"
    )
    (OUT_DIR / "tags.json").write_text(
        json.dumps(sorted(tag_set), ensure_ascii=False, indent=2), encoding="utf-8"
    )

    print(f"\nSaved cleaned data to {OUT_DIR}")


if __name__ == "__main__":
    main()
