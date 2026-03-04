#!/usr/bin/env python3
"""
Extract a development subset of the cleaned data.
Takes the top 5000 poems by star count and their related entities.
"""

import json
from pathlib import Path
from collections import defaultdict

def load_json(filepath):
    """Load JSON file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_json(data, filepath):
    """Save data to JSON file."""
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def create_dev_subset(input_dir, output_dir, top_n=5000):
    """
    Create a development subset with top N poems by stars.

    Args:
        input_dir: Directory containing cleaned data
        output_dir: Directory to save dev subset
        top_n: Number of top poems to include
    """
    input_path = Path(input_dir)
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)

    # Load all data
    print(f"Loading cleaned data from {input_dir}...")
    poems = load_json(input_path / 'cleaned_poems.json')
    poets = load_json(input_path / 'cleaned_poets.json')
    tags = load_json(input_path / 'cleaned_tags.json')
    dynasties = load_json(input_path / 'dynasties.json')

    print(f"Loaded {len(poems)} poems, {len(poets)} poets, {len(tags)} tags, {len(dynasties)} dynasties")

    # Convert to dictionaries for easy lookup
    poets_dict = {p['objectId']: p for p in poets}
    tags_dict = {t['objectId']: t for t in tags}
    # Dynasties are just strings, create a set for faster lookup
    dynasties_set = set(dynasties)

    # Sort poems by star count (descending)
    print(f"\nSorting poems by star count...")
    poems_sorted = sorted(poems, key=lambda x: x.get('star', 0), reverse=True)

    # Take top N poems
    top_poems = poems_sorted[:top_n]

    print(f"Selected top {len(top_poems)} poems")
    print(f"Star range: {top_poems[0].get('star', 0)} to {top_poems[-1].get('star', 0)}")

    # Collect related entities
    used_poet_ids = set()
    used_tag_ids = set()
    used_dynasty_names = set()

    print("\nCollecting related entities...")
    for poem in top_poems:
        # Collect poet
        poet_ref = poem.get('poet')
        if isinstance(poet_ref, dict):
            poet_id = poet_ref.get('objectId')
            if poet_id:
                used_poet_ids.add(poet_id)

        # Collect tags
        poem_tags = poem.get('tags', [])
        for tag in poem_tags:
            tag_id = tag.get('objectId') if isinstance(tag, dict) else tag
            if tag_id:
                used_tag_ids.add(tag_id)

        # Collect dynasty (from poet)
        poet_ref = poem.get('poet')
        if isinstance(poet_ref, dict):
            poet_id = poet_ref.get('objectId')
            if poet_id and poet_id in poets_dict:
                poet_data = poets_dict[poet_id]
                dynasty_name = poet_data.get('dynasty')
                if dynasty_name and dynasty_name in dynasties_set:
                    used_dynasty_names.add(dynasty_name)

    # Filter entities to only those used
    subset_poets = [p for p in poets if p['objectId'] in used_poet_ids]
    subset_tags = [t for t in tags if t['objectId'] in used_tag_ids]
    subset_dynasties = [d for d in dynasties if d in used_dynasty_names]

    print(f"\nSubset statistics:")
    print(f"  Poems: {len(top_poems)}")
    print(f"  Poets: {len(subset_poets)}")
    print(f"  Tags: {len(subset_tags)}")
    print(f"  Dynasties: {len(subset_dynasties)}")

    # Calculate some stats
    poems_with_tags = sum(1 for p in top_poems if p.get('tags'))
    avg_stars = sum(p.get('star', 0) for p in top_poems) / len(top_poems)

    print(f"\nData quality:")
    print(f"  Poems with tags: {poems_with_tags} ({poems_with_tags/len(top_poems)*100:.1f}%)")
    print(f"  Average stars: {avg_stars:.1f}")

    # Save subset
    print(f"\nSaving subset to {output_dir}...")
    save_json(top_poems, output_path / 'dev_poems.json')
    save_json(subset_poets, output_path / 'dev_poets.json')
    save_json(subset_tags, output_path / 'dev_tags.json')
    save_json(subset_dynasties, output_path / 'dev_dynasties.json')

    # Save metadata
    metadata = {
        'total_poems': len(top_poems),
        'total_poets': len(subset_poets),
        'total_tags': len(subset_tags),
        'total_dynasties': len(subset_dynasties),
        'star_range': {
            'max': top_poems[0].get('star', 0),
            'min': top_poems[-1].get('star', 0),
            'average': avg_stars
        },
        'poems_with_tags': poems_with_tags,
        'poems_with_tags_percentage': round(poems_with_tags/len(top_poems)*100, 1)
    }
    save_json(metadata, output_path / 'dev_metadata.json')

    # Print top 10 poems for verification
    print("\nTop 10 poems by stars:")
    print("-" * 80)
    for i, poem in enumerate(top_poems[:10], 1):
        poet_ref = poem.get('poet')
        poet_name = 'Unknown'
        if isinstance(poet_ref, dict):
            poet_id = poet_ref.get('objectId')
            if poet_id and poet_id in poets_dict:
                poet_name = poets_dict[poet_id].get('name', 'Unknown')

        print(f"{i:2d}. {poem.get('name', 'Untitled'):30s} by {poet_name:10s} (⭐ {poem.get('star', 0)})")

    print("\n✅ Development subset created successfully!")
    print(f"   Files saved to: {output_dir}/")

if __name__ == '__main__':
    # Paths
    cleaned_dir = 'prisma/data/cleaned'
    dev_dir = 'prisma/data/dev'

    # Create subset
    create_dev_subset(cleaned_dir, dev_dir, top_n=5000)
