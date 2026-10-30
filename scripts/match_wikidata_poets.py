#!/usr/bin/env python3
"""
Match the cleaned Tang poets to Wikidata items.

Input:
- prisma/data/cleaned/tang/poets.json, poems.json   (from clean_tang_data.py)
- prisma/data/raw/tang/wikidata_tang_poets.json     (from fetch_tang_data.py)

Output:
- prisma/data/cleaned/tang/poet_wikidata.json   matched poets -> QID, portrait, dates
- prisma/data/audit/tang/wikidata_matches.json  ambiguous + unmatched, for review

Matching runs in tiers, most trustworthy first: Wikidata label, then
Wikidata alias. Both sides are compared in Simplified Chinese, since the
local names are Simplified and the Wikidata labels are zh-hant.
"""

import json
from collections import Counter, defaultdict
from pathlib import Path

from opencc import OpenCC

DATA_DIR = Path(__file__).parent.parent / "prisma" / "data"
WIKIDATA_FILE = DATA_DIR / "raw" / "tang" / "wikidata_tang_poets.json"
CLEANED_DIR = DATA_DIR / "cleaned" / "tang"
AUDIT_DIR = DATA_DIR / "audit" / "tang"

t2s = OpenCC("t2s").convert


def _year(binding: dict | None) -> int | None:
    """'0701-05-23T00:00:00Z' -> 701. Negative years (BCE) keep their sign."""
    if not binding:
        return None
    value = binding["value"]
    sign = -1 if value.startswith("-") else 1
    try:
        return sign * int(value.lstrip("-").split("-", 1)[0])
    except ValueError:
        return None  # unknown-value / blank-node dates


def load_candidates() -> list[dict]:
    """Flatten SPARQL bindings into plain dicts, names in Simplified."""
    rows = json.loads(WIKIDATA_FILE.read_text(encoding="utf-8"))["results"]["bindings"]
    candidates = []
    for row in rows:
        aliases = row.get("aliases", {}).get("value", "")
        candidates.append({
            "qid": row["item"]["value"].rsplit("/", 1)[1],
            "label": t2s(row["itemLabel"]["value"]),
            "aliases": sorted({t2s(a) for a in aliases.split("|") if a}),
            "sitelinks": int(row["sitelinks"]["value"]),
            "birthYear": _year(row.get("birth")),
            "deathYear": _year(row.get("death")),
            "picture": row.get("picture", {}).get("value"),
        })
    return candidates


def build_index(candidates: list[dict], key: str) -> dict[str, list[dict]]:
    index = defaultdict(list)
    for c in candidates:
        names = c[key] if isinstance(c[key], list) else [c[key]]
        for name in names:
            index[name].append(c)
    return index


def resolve_ambiguous(name: str, candidates: list[dict]) -> dict | None:
    """
    Several Wikidata items share this poet's name. Return the one to use,
    or None to leave the poet unmatched (it then lands in the audit file).

    Each candidate has: qid, label, aliases, sitelinks, birthYear,
    deathYear, picture. All candidates already passed the query's
    "poet" + "Tang dynasty" filter.
    """
    # TODO(human)
    return None


def match_poet(name: str, by_label: dict, by_alias: dict) -> tuple[str, dict | None, list[dict]]:
    """Return (method, chosen candidate or None, all candidates considered)."""
    for method, index in (("label", by_label), ("alias", by_alias)):
        hits = index.get(name, [])
        if len(hits) == 1:
            return method, hits[0], hits
        if hits:
            chosen = resolve_ambiguous(name, hits)
            return f"{method}-ambiguous", chosen, hits
    return "none", None, []


def main() -> None:
    poets = json.loads((CLEANED_DIR / "poets.json").read_text(encoding="utf-8"))
    poems = json.loads((CLEANED_DIR / "poems.json").read_text(encoding="utf-8"))
    poem_count = Counter(p["poetName"] for p in poems)

    candidates = load_candidates()
    by_label = build_index(candidates, "label")
    by_alias = build_index(candidates, "aliases")

    matches, ambiguous, unmatched = {}, [], []
    methods = Counter()
    claimed = defaultdict(list)  # qid -> local poets matched to it

    for poet in poets:
        name = poet["name"]
        method, chosen, hits = match_poet(name, by_label, by_alias)
        methods[method if chosen or method == "none" else f"{method} (unresolved)"] += 1

        if chosen:
            matches[name] = {
                "wikidataId": chosen["qid"],
                "matchMethod": method,
                "sitelinks": chosen["sitelinks"],
                "birthYear": chosen["birthYear"],
                "deathYear": chosen["deathYear"],
                "picture": chosen["picture"],
            }
            claimed[chosen["qid"]].append(name)
        elif hits:
            ambiguous.append({"name": name, "poemCount": poem_count[name], "candidates": hits})
        else:
            unmatched.append({"name": name, "poemCount": poem_count[name]})

    # Two local poets resolving to one item usually means an alias collision
    # (e.g. a courtesy name shared with another poet's given name).
    collisions = {qid: names for qid, names in claimed.items() if len(names) > 1}

    by_count = lambda e: -e["poemCount"]
    audit = {
        "summary": dict(methods),
        "collisions": collisions,
        "ambiguous": sorted(ambiguous, key=by_count),
        "unmatched": sorted(unmatched, key=by_count),
    }

    for directory, filename, data in (
        (CLEANED_DIR, "poet_wikidata.json", matches),
        (AUDIT_DIR, "wikidata_matches.json", audit),
    ):
        directory.mkdir(parents=True, exist_ok=True)
        with open(directory / filename, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

    matched_poems = sum(poem_count[n] for n in matches)
    print(f"Matched {len(matches):,}/{len(poets):,} poets "
          f"({matched_poems:,}/{len(poems):,} poems)")
    for method, n in methods.most_common():
        print(f"  {method:28} {n:,}")
    print(f"  QIDs claimed by >1 poet      {len(collisions):,}")


if __name__ == "__main__":
    main()
