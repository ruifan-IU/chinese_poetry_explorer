#!/usr/bin/env python3
"""
Match the cleaned Tang poets to Wikidata items.

Input:
- prisma/data/cleaned/tang/poets.json, poems.json   (from clean_tang_data.py)
- prisma/data/raw/tang/wikidata_tang_poets.json     (from fetch_tang_data.py)
- prisma/data/raw/tang/wikidata_by_name/*.json      (from fetch_tang_data.py)

Output:
- prisma/data/cleaned/tang/poet_wikidata.json   matched poets -> QID, portrait, dates
- prisma/data/audit/tang/wikidata_matches.json  ambiguous + unmatched, for review

The two Wikidata result sets are merged into one candidate per item (see
load_candidates). Matching runs in tiers, most trustworthy first: Wikidata
label, then Wikidata alias. Both sides are compared in Simplified Chinese,
since the local names are Simplified and the Wikidata labels are zh-hant.
"""

import json
from collections import Counter, defaultdict
from pathlib import Path

from opencc import OpenCC

DATA_DIR = Path(__file__).parent.parent / "prisma" / "data"
WIKIDATA_FILE = DATA_DIR / "raw" / "tang" / "wikidata_tang_poets.json"
BY_NAME_DIR = DATA_DIR / "raw" / "tang" / "wikidata_by_name"
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


def _read_bindings(path: Path) -> list[dict]:
    return json.loads(path.read_text(encoding="utf-8"))["results"]["bindings"]


def load_candidates() -> list[dict]:
    """
    Merge both Wikidata result sets into one candidate per QID, names in
    Simplified.

    The same item often comes back several times: from both queries, and
    within the by-name results once per local name that found it (王灣 and
    王湾, or 李隆基 and 唐明皇). The item data is identical across these rows
    (only GROUP_CONCAT's alias order varies, and aliases are sorted here), so
    the first row seen supplies it. Two fields record where it came from:

    - isTangPoet: returned by tang_poets.rq, i.e. Wikidata itself tags the
      item as a poet with Tang citizenship.
    - foundBy: the local names (Simplified) whose by-name search found it.
    """
    sources = [(path, False) for path in sorted(BY_NAME_DIR.glob("batch_*.json"))]
    sources.append((WIKIDATA_FILE, True))

    by_qid: dict[str, dict] = {}
    for path, is_tang_poet in sources:
        for row in _read_bindings(path):
            qid = row["item"]["value"].rsplit("/", 1)[1]
            candidate = by_qid.get(qid)
            if candidate is None:
                aliases = row.get("aliases", {}).get("value", "")
                candidate = by_qid[qid] = {
                    "qid": qid,
                    "label": t2s(row["itemLabel"]["value"]),
                    "aliases": sorted({t2s(a) for a in aliases.split("|") if a}),
                    "sitelinks": int(row["sitelinks"]["value"]),
                    "birthYear": _year(row.get("birth")),
                    "deathYear": _year(row.get("death")),
                    "picture": row.get("picture", {}).get("value"),
                    "isTangPoet": False,
                    "foundBy": set(),
                }
            candidate["isTangPoet"] |= is_tang_poet
            if "searchName" in row:
                candidate["foundBy"].add(t2s(row["searchName"]["value"]))

    candidates = list(by_qid.values())
    for c in candidates:
        c["foundBy"] = sorted(c["foundBy"])  # JSON-serializable for the audit file
    return candidates


def build_index(candidates: list[dict], key: str) -> dict[str, list[dict]]:
    index = defaultdict(list)
    for c in candidates:
        names = c[key] if isinstance(c[key], list) else [c[key]]
        for name in names:
            index[name].append(c)
    return index


def resolve_ambiguous(
    name: str, candidates: list[dict], local_names: set[str]
) -> dict | None:
    """
    Several Wikidata items share this poet's name. Return the one to use,
    or None to leave the poet unmatched (it then lands in the audit file).

    Each candidate has: qid, label, aliases, sitelinks, birthYear,
    deathYear, picture, isTangPoet, foundBy (see load_candidates).

    Steps, each one deciding only when its evidence is conclusive and
    otherwise passing the remaining candidates on:
    1. Reject items whose label is a different local poet.
    2. Keep only Tang poets (isTangPoet), if there are any. This comes
       before sitelinks so a famous namesake (王建 the Former Shu emperor)
       can't beat the poet.
    3. A unique highest sitelink count wins.
    4. Tied candidates are accepted as duplicate items only if they share a
       known year and no years conflict.

    local_names is every poet name in the cleaned data. A candidate whose
    label is a *different* local poet is rejected: it is that poet's item,
    reached through a shared courtesy or Buddhist name (虚中 matches both
    王毂, 字虚中, and the monk 释虚中). Aliases are not used for rejection,
    because an alias that is also a local name usually means the same person
    appears twice in the local data (皎然 / 清昼), not a wrong candidate.
    """
    # step1: rejecting candidates whose label is a different local poet
    filtered_candidates = [
        c for c in candidates if c["label"] == name or c["label"] not in local_names
    ]

    if len(filtered_candidates) == 1:
        return filtered_candidates[0]
    if not filtered_candidates:
        return None

    # Step 2: if any candidates are Tang poets on Wikidata, keep only those.
    # One left wins; several go on to steps 3-4, which choose among them.
    if any(c["isTangPoet"] for c in filtered_candidates):
        filtered_candidates = [c for c in filtered_candidates if c["isTangPoet"]]
    if len(filtered_candidates) == 1:
        return filtered_candidates[0]

    # Step 3: a unique highest sitelink count wins; ties fall through to step 4
    highest = max(c["sitelinks"] for c in filtered_candidates)
    top_candidates = [c for c in filtered_candidates if c["sitelinks"] == highest]
    if len(top_candidates) == 1:
        return top_candidates[0]

    # Step 4: the tied candidates look like duplicate items for one person.
    # Missing dates are unknown, not agreement: require at least two
    # candidates to share a known year, and no conflicting years.
    b_dates = set()
    d_dates = set()
    b_known = d_known = 0
    for c in top_candidates:
        if c["birthYear"] is not None:
            b_dates.add(c["birthYear"])
            b_known += 1
        if c["deathYear"] is not None:
            d_dates.add(c["deathYear"])
            d_known += 1
    if len(b_dates) > 1 or len(d_dates) > 1:
        return None
    if b_known < 2 and d_known < 2:
        return None
    # Lowest QID = oldest item. Compare numerically: as strings "Q45..." < "Q9".
    smallest = min(int(c["qid"][1:]) for c in top_candidates)
    for c in top_candidates:
        if int(c["qid"][1:]) == smallest:
            return c
    return None


def match_poet(
    name: str, by_label: dict, by_alias: dict, local_names: set[str]
) -> tuple[str, dict | None, list[dict]]:
    """Return (method, chosen candidate or None, all candidates considered)."""
    for method, index in (("label", by_label), ("alias", by_alias)):
        hits = index.get(name, [])
        if len(hits) == 1:
            return method, hits[0], hits
        if hits:
            chosen = resolve_ambiguous(name, hits, local_names)
            return f"{method}-ambiguous", chosen, hits
    return "none", None, []


def main() -> None:
    poets = json.loads((CLEANED_DIR / "poets.json").read_text(encoding="utf-8"))
    poems = json.loads((CLEANED_DIR / "poems.json").read_text(encoding="utf-8"))
    poem_count = Counter(p["poetName"] for p in poems)
    local_names = {p["name"] for p in poets}

    candidates = load_candidates()
    by_label = build_index(candidates, "label")
    by_alias = build_index(candidates, "aliases")

    matches, ambiguous, unmatched = {}, [], []
    methods = Counter()
    claimed = defaultdict(list)  # qid -> local poets matched to it

    for poet in poets:
        name = poet["name"]
        method, chosen, hits = match_poet(name, by_label, by_alias, local_names)
        methods[method if chosen or method == "none" else f"{method} (unresolved)"] += 1

        if chosen:
            matches[name] = {
                "wikidataId": chosen["qid"],
                "matchMethod": method,
                "sitelinks": chosen["sitelinks"],
                "birthYear": chosen["birthYear"],
                "deathYear": chosen["deathYear"],
                "picture": chosen["picture"],
                "isTangPoet": chosen["isTangPoet"],
            }
            claimed[chosen["qid"]].append(name)
        elif hits:
            ambiguous.append(
                {"name": name, "poemCount": poem_count[name], "candidates": hits}
            )
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
    print(
        f"Matched {len(matches):,}/{len(poets):,} poets "
        f"({matched_poems:,}/{len(poems):,} poems)"
    )
    for method, n in methods.most_common():
        print(f"  {method:28} {n:,}")
    print(f"  QIDs claimed by >1 poet      {len(collisions):,}")


if __name__ == "__main__":
    main()
