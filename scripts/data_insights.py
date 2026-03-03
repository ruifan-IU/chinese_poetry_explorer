#!/usr/bin/env python3
"""
Quick data insights viewer for Chinese Poetry dataset
"""

import json
from pathlib import Path


def print_insights():
    # Load statistics
    stats_file = Path(__file__).parent.parent / 'prisma' / 'data' / 'cleaned' / 'statistics.json'

    if not stats_file.exists():
        print("Error: Please run clean_data.py first to generate statistics")
        return

    with open(stats_file, 'r', encoding='utf-8') as f:
        stats = json.load(f)

    print("=" * 80)
    print("CHINESE POETRY DATASET - QUICK INSIGHTS")
    print("=" * 80)
    print()

    # Dataset size
    print(f"📚 Dataset Size:")
    print(f"   • {stats['total_poems']:,} poems (after removing {stats['duplicates_found']:,} duplicates)")
    print(f"   • {stats['total_poets']:,} poets")
    print(f"   • {stats['total_tags']:,} categories/tags")
    print(f"   • {stats['total_dynasties']:,} dynasties")
    print()

    # Data quality
    tagged_percent = (stats['poems_with_tags'] / stats['total_poems']) * 100 if stats['total_poems'] > 0 else 0
    print(f"✨ Data Quality:")
    print(f"   • {stats['poems_with_tags']:,} poems have tags ({tagged_percent:.1f}%)")
    print(f"   • {stats['poems_without_tags']:,} poems need categorization")
    print(f"   • Average poem length: {stats['poem_length_stats']['avg']:.0f} characters")
    print(f"   • Shortest poem: {stats['poem_length_stats']['min']} characters")
    print(f"   • Longest poem: {stats['poem_length_stats']['max']:,} characters")
    print()

    # Top dynasties
    print(f"🏛️  Most Prolific Dynasties:")
    for dynasty, count in sorted(stats['poems_by_dynasty'].items(), key=lambda x: -x[1])[:5]:
        percent = (count / stats['total_poems']) * 100
        print(f"   • {dynasty:12s}: {count:6,} poems ({percent:5.1f}%)")
    print()

    # Top tags
    print(f"🏷️  Popular Categories:")
    for tag, count in sorted(stats['poems_by_tag'].items(), key=lambda x: -x[1])[:10]:
        print(f"   • {tag:12s}: {count:5,} poems")
    print()

    # Interesting facts
    tang_poems = stats['poems_by_dynasty'].get('唐代', 0)
    song_poems = stats['poems_by_dynasty'].get('宋代', 0)
    total_classic = tang_poems + song_poems

    print(f"💡 Interesting Facts:")
    print(f"   • Tang and Song dynasties account for {total_classic:,} poems ({(total_classic/stats['total_poems']*100):.1f}%)")
    print(f"   • Tang Dynasty has {(tang_poems/song_poems):.1f}x more poems than Song Dynasty")
    print(f"   • On average, each poet has {(stats['total_poems']/stats['total_poets']):.0f} poems in the dataset")

    landscape_poems = stats['poems_by_tag'].get('写景', 0)
    lyrical_poems = stats['poems_by_tag'].get('抒情', 0)
    print(f"   • Most poems are about landscape (写景: {landscape_poems:,}) and emotions (抒情: {lyrical_poems:,})")
    print()

    print("=" * 80)
    print("For detailed statistics, see: prisma/data/cleaned/SUMMARY_REPORT.txt")
    print("=" * 80)


if __name__ == '__main__':
    print_insights()
