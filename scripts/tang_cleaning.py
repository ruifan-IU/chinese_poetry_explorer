"""
Text-normalization rules for the 全唐诗 data from github.com/chinese-poetry.

The source is a digitization of 全唐诗 plus 全唐诗补编, and keeps the
editors' apparatus inline. Each marker has a consistent meaning:

    （…）     editorial note / variant reading, e.g. 羣鹿逐（一作「豕」）
    〖…〗     footnote number or gloss, e.g. 〖1〗, 〖張志和〗
    [X]      editor-supplied/corrected character -> keep X, drop brackets
    [一]     footnote reference marker -> drop
    {巩/言}   ideographic description of a char with no codepoint -> □
    □ / ●    lost or unencodable character -> □
    TAB      title / 小序 separator in 新樂府 titles

All functions operate on the raw Traditional text; convert to Simplified
afterwards. They return the stripped notes alongside the cleaned text so
nothing is silently discarded.
"""

import re

MISSING_GLYPH = "□"
UNKNOWN_POET_NAME = "佚名"

_IDS_RE = re.compile(r"\{[^{}]*\}")
_FOOTNOTE_REF_RE = re.compile(r"\[[一二三四五六七八九十]+\]")
_CORRECTION_RE = re.compile(r"\[([^\[\]]*)\]")
_CJK_RE = re.compile(r"[㐀-鿿\U00020000-\U0003ffff]")
_NON_CJK_RE = re.compile(r"[^㐀-鿿\U00020000-\U0003ffff□]")

# Placeholders the source uses for "author unknown". Matched after
# stripping markers, against the Traditional spelling.
_UNKNOWN_AUTHOR_NAMES = {
    "不詳", "未詳", "佚名", "無名氏", "無名", "缺名", "闕名", "失名",
    "吳越失姓名人", "敦煌人作品", "王重民輯錄，劉脩業整理。",
    "失撰人名", "某大德",
}
# Deliberately NOT folded: authors known only by role or place, e.g.
# 江油令, 天目僧, 開元儒士. Their bios say 姓名不詳, but the label itself
# tells the reader something, so they stay as separate poets.
# Anonymous personas: 無名僧, 無名鬼, 無名女鬼, 南唐失名僧, ...
_UNKNOWN_AUTHOR_RE = re.compile(r"^無名|失名|失姓名")

# Same person under two spellings in the source. Only aliases whose
# target is verified to exist in authors.tang.json belong here.
_AUTHOR_ALIASES = {
    "玄宗皇帝李隆基": "明皇帝",
    "鮑氏君[徽]微": "鮑氏君徽",
}
# 太宗皇帝李世民 -> 太宗皇帝, applied only if the short form is a known poet.
_EMPEROR_FULL_NAME_RE = re.compile(r"^(.+皇帝)李.{1,2}$")


def strip_spans(text: str, open_ch: str, close_ch: str) -> tuple[str, list[str]]:
    """
    Remove every open_ch…close_ch span, nesting-aware.
    Returns (text_without_spans, [span_contents]).

    Stray closers are dropped. An unclosed opener swallows the rest of the
    text -- in this dataset that happens when the source truncated a long
    note, so the tail is note text, not verse.
    """
    kept, removed, buf, depth = [], [], [], 0
    for ch in text:
        if ch == open_ch:
            depth += 1
            if depth == 1:
                buf = []
                continue
        elif ch == close_ch:
            if depth == 0:
                continue
            depth -= 1
            if depth == 0:
                removed.append("".join(buf))
                continue
        (buf if depth else kept).append(ch)
    if depth:
        removed.append("".join(buf))
    return "".join(kept), removed


def _strip_notes(text: str) -> tuple[str, list[str]]:
    text, notes = strip_spans(text, "（", "）")
    text, glosses = strip_spans(text, "〖", "〗")
    # 〖1〗-style footnote numbers carry no information on their own.
    notes += [g for g in glosses if not g.strip().isdigit()]
    return text, [n.strip() for n in notes if n.strip()]


def _normalize_glyphs(text: str) -> str:
    text = _IDS_RE.sub(MISSING_GLYPH, text)
    text = text.replace("●", MISSING_GLYPH)
    text = _FOOTNOTE_REF_RE.sub("", text)
    return _CORRECTION_RE.sub(r"\1", text)


def has_cjk(text: str) -> bool:
    return bool(_CJK_RE.search(text))


def first_line_key(text: str) -> str:
    """CJK-only first line, used to match the same poem across sources
    whose titles differ (千家诗 calls 春曉 "春眠")."""
    first = text.split("\n", 1)[0]
    return _NON_CJK_RE.sub("", first)


def clean_title(raw: str) -> tuple[str, list[str]]:
    title, _, subtitle = raw.partition("\t")
    title, notes = _strip_notes(title)
    title = _normalize_glyphs(title)
    title = re.sub(r"\s+", " ", title).strip(" ，。：、")
    if subtitle.strip():
        notes.append(subtitle.strip())
    return title or "无题", notes


def clean_content(paragraphs: list[str]) -> tuple[str, list[str]]:
    # Join first: notes routinely span several paragraph entries.
    text = "\n".join(p.strip() for p in paragraphs)
    text, notes = _strip_notes(text)
    text = _normalize_glyphs(text)
    # Drop lines left holding only punctuation after their note was removed.
    lines = [line.strip() for line in text.split("\n")]
    lines = [line for line in lines if has_cjk(line) or MISSING_GLYPH in line]
    return "\n".join(lines), notes


def normalize_author(raw: str | None, known_authors: set[str]) -> str:
    """Return the canonical Traditional author name, or UNKNOWN_POET_NAME."""
    if not raw:
        return UNKNOWN_POET_NAME
    name = _AUTHOR_ALIASES.get(raw, raw)
    name, _ = _strip_notes(name)
    name = _normalize_glyphs(name).replace("　", "、").strip()

    if not name or name in _UNKNOWN_AUTHOR_NAMES or _UNKNOWN_AUTHOR_RE.search(name):
        return UNKNOWN_POET_NAME

    m = _EMPEROR_FULL_NAME_RE.match(name)
    if m and m.group(1) in known_authors:
        return m.group(1)
    return name
