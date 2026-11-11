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
| Wikidata SPARQL, [`queries/tang_poets.rq`](queries/tang_poets.rq) | `wikidata_tang_poets.json` | poet matching evidence (`isTangPoet`), portraits, dates |
| Wikidata SPARQL, [`queries/authors_by_name.rq`](queries/authors_by_name.rq), in batches | `wikidata_by_name/batch_NNN.json` | poet matching candidates, portraits, dates |

The script is safe to re-run:

- GitHub files are skipped if they already exist.
- Each Wikidata result stores a SHA-256 hash of the full query text it was
  produced by. Editing a `.rq` file, or a change in the author names that fill
  a batch, triggers a fresh query for the affected files only. To refresh
  unchanged data, delete the file. Batch files left over from a longer name
  list are removed.
- All files are written to a `.tmp` file first and then renamed, so an
  interrupted run never leaves a partial file that later runs would skip.

The Wikidata requests follow the
[User-Agent policy](https://meta.wikimedia.org/wiki/User-Agent_policy) and are
sent by POST, because a batch of names is too long for a URL.
Any failure raises a `WikidataQueryError` that says which stage failed:

- **transport:** an HTTP error or no connection;
- **content:** the response isn't valid SPARQL JSON results;
- **empty:** the query returned 0 rows.

An empty result is never cached.

### The Wikidata queries

There are two queries with different jobs. The by-name lookup provides
**coverage** (finding candidates), and the property query provides
**evidence** (Wikidata itself calls the item a Tang poet). Neither replaces
the other.

**`tang_poets.rq`** selects items with occupation *poet* (`P106 = Q49757`) and
country of citizenship *Tang dynasty* (`P27 = Q9683`). For each item it returns:

- label, falling back through `zh-hant → zh-hans → zh → mul → en`. Without the
  `zh`/`zh-hans` fallbacks, items labelled only in those variants came back with
  their QID as the label (33 items) and could never match by name;
- Chinese aliases (`zh`, `zh-hant`, `zh-hans`, with duplicates removed);
- portrait (`P18`);
- birth and death dates (`P569`, `P570`);
- `wikibase:sitelinks`, the number of Wikipedia editions with an article on the poet.

It currently returns about 2,900 items. On its own it misses many 全唐诗 poets,
because a missing statement on Wikidata excludes the item:

- no *poet* occupation: 貫休 is listed as painter, calligrapher and monk;
  吳筠 as a 道士;
- citizenship is a Five Dynasties and Ten Kingdoms state or 宋, not 唐:
  皮日休 (吳越國), 李中 (南唐), 徐鉉 (宋朝).

**`authors_by_name.rq`** turns the question around and looks up every local
author name. It is a template: `fetch_tang_data.py` fills its `{NAMES}`
placeholder with a `VALUES` list, 200 names per batch.

- **Names:** the raw author names after `normalize_author()` (the same rules
  as the cleaning step, so the spelling is cleaned but still Traditional).
  Each name is sent in its Traditional form and, if different, its
  Simplified form, because some items store Simplified text under a `zh-hant`
  or `zh` tag (王湾, not 王灣). Every form is sent under all three Chinese
  language tags, because `"貫休"@zh-hant` only matches labels tagged
  `zh-hant`. Names are escaped with `json.dumps`, so a name can't break the query.
- **Skipped names:** "surname + 氏" (王氏, 張氏) means "a woman née Wang", not a
  specific person, and matched thousands of items. Longer names such as
  閩后陳氏 are kept.
- **Match:** an item's label *or* an alias equals the name
  (`rdfs:label|skos:altLabel`). The search name is returned as `searchName`.
- **Filters:** humans only (`P31 = Q5`), because a name search also finds
  places (永安 is a town). A period filter drops items whose known dates rule
  out the era: born before 500 or after 1000, died before 580 or after 1100.
  Items without dates are kept: missing data is not evidence against them.

The by-name lookup can't catch variant characters (异体字): the source writes
龐藴, 陳彥, 胡証, and Wikidata stores 龐蘊, 陳彦, 胡證. `tang_poets.rq`
covers these, because its results are compared locally after `t2s` converts
both sides.

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

This runs after `clean_tang_data.py`. It first merges both Wikidata result sets
into one candidate per QID. The same item often appears several times: from
both queries, and once per local name that found it (王灣 and 王湾, or 李隆基 and
唐明皇). Each candidate records:

- `isTangPoet`: whether `tang_poets.rq` returned it;
- `foundBy`: the local names (Simplified) whose by-name search found it.

Local poet names are then compared with Wikidata names, both converted to
Simplified Chinese, in two tiers:

1. **Label:** the Wikidata item's main name.
2. **Alias:** courtesy names (字), style names (号) and alternative spellings.
   These are tried second because different people often share them.

If a name matches more than one item, `resolve_ambiguous()` decides which one to
use, or none. Many Wikidata items share names, especially the bulk-imported
items with no Wikipedia articles. It applies cautious filters in order, because
a wrong match (another person's portrait and dates) is worse than no match:

1. **Reject items that belong to another local poet.** If a candidate's label is
   a *different* name in the local poet list, the match came through a shared
   courtesy or Buddhist name. For example, 虚中 matches both 王毂 (字虚中) and
   the monk 释虚中; 王毂 is rejected and 释虚中 is used. Only labels are checked,
   not aliases: an alias that is also a local name usually means the same
   person is listed twice locally (皎然 / 清昼). If exactly one candidate is
   left it is used; if none are left the poet stays unmatched.
2. **Tang poets:** if any candidates have `isTangPoet`, only those are kept.
   If one is left it is used; several go on to steps 3–4, which choose among them.
3. **Sitelinks:** a candidate with a unique highest sitelink count is used.
   Candidates tied for the highest count go on to step 4.
4. **Duplicate items:** the tied candidates are accepted as duplicate items for
   one person only if at least two of them share a known birth or death year
   and no years conflict. Missing dates count as unknown, not as agreement;
   otherwise almost every pair of bulk-imported items without data would pass.
   The oldest item (lowest QID, compared numerically) is used.

The order matters. Each step decides only when its evidence is conclusive, and
otherwise passes the remaining candidates on. More specific evidence comes
before popularity:

- On sitelinks alone, 陆羽 (26 sitelinks, 字鸿渐) would take the name of the
  monk 释鸿渐; step 1 prevents that.
- 王建 the poet (9 sitelinks) would lose to 王建 the founder of Former Shu (16
  sitelinks); step 2 prevents that.

Outputs:

- `cleaned/tang/poet_wikidata.json`: local poet name → `wikidataId`,
  `matchMethod`, `sitelinks`, `birthYear`, `deathYear`, `picture`, `isTangPoet`.
- `audit/tang/wikidata_matches.json`:
  - `summary`: counts per match method;
  - `ambiguous`: name clashes, with all candidates;
  - `unmatched`: poets with no match, sorted by poem count;
  - `collisions`: Wikidata items claimed by two local poets. These are usually
    the same person listed under two names in the source (武则天/武曌,
    李冶/李季兰), so they are candidates for merging.

Latest run: 2,910 of 3,628 poets matched, covering 52,014 of 56,446 poems
(92%). 1,184 name clashes were resolved, 214 left for review, and 504 poets
have no candidate at all. Before the by-name lookup it was 2,371 poets and
46,037 poems.

**Known issue:** the label tier ends the search as soon as a label matches. In
38 cases a non-poet item whose label is exactly the local name wins over the
real poet, who is only reachable through an alias. For example 朱庆余 matches a
0-sitelink item labelled 朱庆余, while the poet Q11093704 is labelled 朱可久.

## Status and next steps

- [ ] `fame_score()` in `clean_tang_data.py`: combine the anthology signals into `fame`.
- [x] `resolve_ambiguous()` in `match_wikidata_poets.py`: the rule for name clashes.
- [x] Unmatched famous poets (齐己, 贯休, 皮日休…): found by the by-name lookup.
- [ ] Cross-tier matching in `match_poet()`: when no label match is a Tang
      poet, also consider alias matches (the 38 cases above).
- [ ] Merge the duplicate local poets found by `collisions` and by candidates
      whose `foundBy` lists two local names.
- [ ] Portraits: download the `P18` images from Wikimedia Commons with their
      license and author metadata, resize them to WebP, and save them in
      `public/portraits/<QID>.webp`.
- [ ] Update `prisma/schema.prisma` (`fame`, `wikidataId`, portrait fields) and
      `prisma/seed.ts`. The seed script still expects the old data shape.
- [ ] Wikidata contributions from the gaps found here: add `P106 = poet` to
      Tang poets without it (貫休), add the 全唐诗 spellings as aliases (龐藴 on
      Q6505629), add `P31 = human` where missing, and review likely duplicate
      items listed under `ambiguous`.

## Legacy scripts

These predate the Tang pipeline. They work on the older mixed-dynasty dataset in
`prisma/data/raw/LC*.json`:

- `clean_data.py`: cleans and dedupes it into `prisma/data/cleaned/cleaned_*.json`.
- `create_dev_subset.py`: copies the top 5,000 poems by stars into `prisma/data/dev/`.
- `data_insights.py`: summarizes `prisma/data/cleaned/statistics.json`.
- `semantic_search.py`: a proof of concept of OpenAI-embeddings search. The app
  doesn't use it; its search is a simple `contains` query in `lib/queries.ts`.
