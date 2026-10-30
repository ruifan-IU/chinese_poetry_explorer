# Data scripts

These scripts build the poetry dataset for Chinese Poetry Explorer. The current
pipeline covers **Tang poetry**. Its sources are:

- [chinese-poetry/chinese-poetry](https://github.com/chinese-poetry/chinese-poetry):
  全唐诗 (Complete Tang Poems), 唐诗三百首 and 千家诗.
- [Wikidata](https://www.wikidata.org/): poet identifiers, portraits, dates and aliases.

```
fetch_tang_data.py ──► prisma/data/raw/tang/          raw downloads (not committed)
        │
clean_tang_data.py ──► prisma/data/cleaned/tang/      seed input (not committed)
        │          └─► prisma/data/audit/tang/        reports for manual review
        │
match_wikidata_poets.py ─► cleaned/tang/poet_wikidata.json
                       └─► audit/tang/wikidata_matches.json
        │
prisma/seed.ts ──────► Postgres
```

## Setup

You need Python 3.10 or later, and one package for Traditional → Simplified conversion:

```bash
pip install opencc-python-reimplemented
```

Run every script from the repo root.

## 1. Fetch: `fetch_tang_data.py`

```bash
python3 scripts/fetch_tang_data.py
```

| Source | Saved as (`prisma/data/raw/tang/`) | Used for |
|---|---|---|
| `全唐诗/authors.tang.json` | `authors.tang.json` | poet names and bios |
| `全唐诗/poet.tang.*.json` (58 files) | `poems/poet.tang.*.json` | poems |
| `全唐诗/唐诗三百首.json` | `唐诗三百首.json` | fame signal |
| `蒙学/qianjiashi.json` | `千家诗.json` | fame signal (Tang entries only) |
| Wikidata SPARQL, [`queries/tang_poets.rq`](queries/tang_poets.rq) | `wikidata_tang_poets.json` | poet matching, portraits, dates |

The script is safe to re-run:

- GitHub files are skipped if they already exist.
- The Wikidata results store a SHA-256 hash of the query text, so editing
  `tang_poets.rq` triggers a fresh query. To refresh unchanged data, delete the file.
- All files are written to a `.tmp` file first and then renamed, so an
  interrupted run never leaves a partial file that later runs would skip.

The Wikidata request follows the
[User-Agent policy](https://meta.wikimedia.org/wiki/User-Agent_policy).
Any failure raises a `WikidataQueryError` that says which stage failed:

- **transport:** an HTTP error or no connection;
- **content:** the response isn't valid SPARQL JSON results;
- **empty:** the query returned 0 rows.

An empty result is never cached.

### The Wikidata query

`tang_poets.rq` selects items with occupation *poet* (`P106 = Q49757`) and
country of citizenship *Tang dynasty* (`P27 = Q9683`). For each item it returns:

- label and Chinese aliases (`zh`, `zh-hant`, `zh-hans`, with duplicates removed);
- portrait (`P18`);
- birth and death dates (`P569`, `P570`);
- `wikibase:sitelinks`, the number of Wikipedia editions with an article on the poet.

It currently returns about 2,900 items.

## 2. Clean: `clean_tang_data.py`

```bash
python3 scripts/clean_tang_data.py
```

The text-cleaning rules live in [`tang_cleaning.py`](tang_cleaning.py), and
`clean_tang_data.py` applies them to the whole dataset.

**Editorial markers.** The source keeps the 全唐诗 editors' notes in the text.
Each marker has a fixed meaning:

| Marker | Meaning | Handling |
|---|---|---|
| `（…）` | note or variant reading (一作…) | removed, kept in `notes` |
| `〖…〗` | footnote number or gloss | removed; glosses kept in `notes` |
| `[X]` | character supplied or corrected by the editors | brackets dropped, `X` kept |
| `[一]` | footnote reference | removed |
| `{…}` | description of a character with no Unicode codepoint | replaced with `□` |
| `●`, `□` | lost character | `□` |
| TAB in title | separates the title from a preface (小序) | preface moved to `notes` |

Notes are stripped after the paragraphs are joined, because a note often spans
several paragraph entries. Nested brackets are handled.

**Authors.**

- About a dozen "author unknown" placeholders are folded into a single **佚名**
  poet: 不詳, 無名氏, 缺名, 闕名, 失名, and others.
- Authors known only by a role or place, such as 江油令 or 天目僧, are
  deliberately kept as separate poets.
- A few known duplicate spellings are merged, for example 玄宗皇帝李隆基 → 明皇帝.

**Dedupe.** Poems are deduplicated by SHA-256 of the cleaned Simplified content,
the same `contentHash` that `prisma/seed.ts` computes. Copies that differ only in
their notes collapse into one, and the first copy wins.

**Fame.** The search-hit "rank" data was dropped because it measured how common
a title is, not how famous the poem is: generic titles like 句 scored far above
登鸛雀樓. Fame now comes from membership in curated anthologies:

- `in_tang300`: the poem appears in 唐诗三百首;
- `in_qianjia`: the poem appears in 千家诗;
- `poet_anthology_poems`: how many of the poet's poems appear in those anthologies.

Poems are matched to the anthologies by their first line, using CJK characters
only. When that fails, a fuzzy match against the same poet's poems
(similarity ≥ 0.75) catches variant readings (异文), such as 床前看月光 vs. 床前明月光.

The raw signals are saved per poem as `fameSignals`. Combining them into a
0–100 `fame` score is still a TODO in `fame_score()`. `stars` in the app remains
a pure count of user favorites.

All text is converted to Simplified Chinese (OpenCC `t2s`) after cleaning.

### Outputs

`prisma/data/cleaned/tang/` (seed input):

- `poems.json`: one entry per poem, with these fields: `title`, `content`,
  `contentHash`, `poetName`, `dynasty`, `type`, `tags`, `notes`, `fame` and
  `fameSignals`.
- `poets.json`: `name`, `introduction` (the longest bio among the duplicate
  entries) and `dynasty`.
- `dynasties.json`, `tags.json`.

`prisma/data/audit/tang/` (for manual review):

- `review.json`: poems that still need checking, for one of three reasons:
  more than 20% of their characters are `□`, leftover brackets, or fewer than
  10 characters of text.
- `author_list.json`: poets sorted by poem count, with every raw spelling that
  was folded into each one.

Latest run: 56,446 unique poems (964 duplicates removed), 3,628 poets,
1,869 poems under 佚名, 355 matched to 唐诗三百首 and 139 to 千家诗,
435 flagged for review.

## 3. Match poets to Wikidata: `match_wikidata_poets.py`

```bash
python3 scripts/match_wikidata_poets.py
```

This runs after `clean_tang_data.py`. Local poet names are compared with Wikidata
names, both converted to Simplified Chinese, in two tiers:

1. **Label:** the Wikidata item's main name.
2. **Alias:** courtesy names (字), style names (号) and alternative spellings.
   These are tried second because different people often share them.

If a name matches more than one item, `resolve_ambiguous()` decides which one to
use, or none. Many Wikidata items share names, especially the bulk-imported
items with no Wikipedia articles.

Outputs:

- `cleaned/tang/poet_wikidata.json`: local poet name → `wikidataId`,
  `matchMethod`, `sitelinks`, `birthYear`, `deathYear`, `picture`.
- `audit/tang/wikidata_matches.json`:
  - `summary`: counts per match method;
  - `ambiguous`: name clashes, with all candidates;
  - `unmatched`: poets with no match, sorted by poem count;
  - `collisions`: Wikidata items claimed by two local poets. These are usually
    the same person listed under two names in the source (武则天/武曌,
    李冶/李季兰), so they are candidates for merging.

Latest run (before ambiguity resolution): 2,331 of 3,628 poets matched, covering
44,532 of 56,446 poems.

## Status and next steps

- [ ] `fame_score()` in `clean_tang_data.py`: combine the anthology signals into `fame`.
- [ ] `resolve_ambiguous()` in `match_wikidata_poets.py`: the rule for name clashes.
- [ ] Unmatched famous poets (齐己, 贯休, 皮日休…): probably missing from the
      query because their Wikidata items lack `P27 = Tang dynasty`. Needs a
      second lookup by name.
- [ ] Merge the duplicate local poets found by `collisions`.
- [ ] Portraits: download the `P18` images from Wikimedia Commons with their
      license and author metadata, resize them to WebP, and save them in
      `public/portraits/<QID>.webp`.
- [ ] Update `prisma/schema.prisma` (`fame`, `wikidataId`, portrait fields) and
      `prisma/seed.ts`. The seed script still expects the old data shape.

## Legacy scripts

These predate the Tang pipeline. They work on the older mixed-dynasty dataset in
`prisma/data/raw/LC*.json`:

- `clean_data.py`: cleans and dedupes it into `prisma/data/cleaned/cleaned_*.json`.
- `create_dev_subset.py`: copies the top 5,000 poems by stars into `prisma/data/dev/`.
- `data_insights.py`: summarizes `prisma/data/cleaned/statistics.json`.
- `semantic_search.py`: a proof of concept of OpenAI-embeddings search. The app
  doesn't use it; its search is a simple `contains` query in `lib/queries.ts`.
