#!/usr/bin/env python3
"""
Data cleaning and analysis script for Chinese Poetry Explorer

This script:
1. Loads raw poetry data from JSON files
2. Removes duplicates based on content
3. Validates all relationships (poets, dynasties, tags)
4. Collects comprehensive statistics
5. Outputs cleaned data files
"""

import json
import os
from pathlib import Path
from collections import defaultdict, Counter
from typing import Dict, List, Set, Any
import hashlib


class PoetryDataCleaner:
    def __init__(self, raw_data_dir: str):
        self.raw_data_dir = Path(raw_data_dir)
        self.poets: Dict[str, Any] = {}
        self.tags: Dict[str, Any] = {}
        self.poems: List[Any] = []

        # Tracking data
        self.dynasties: Set[str] = set()
        self.duplicate_poems: List[Any] = []
        self.invalid_refs: Dict[str, List[str]] = defaultdict(list)
        self.stats: Dict[str, Any] = {}

    def load_raw_data(self):
        """Load all raw JSON data files"""
        print("Loading raw data...")

        # Load poets
        poet_file = self.raw_data_dir / "LCPoet.json"
        if poet_file.exists():
            with open(poet_file, 'r', encoding='utf-8') as f:
                poets_data = json.load(f)
                for poet in poets_data:
                    self.poets[poet['objectId']] = poet
                    if poet.get('dynasty'):
                        self.dynasties.add(poet['dynasty'])

        # Load tags
        tag_file = self.raw_data_dir / "LCTag.json"
        if tag_file.exists():
            with open(tag_file, 'r', encoding='utf-8') as f:
                tags_data = json.load(f)
                for tag in tags_data:
                    self.tags[tag['objectId']] = tag

        # Load all poetry files
        poetry_files = [
            f for f in self.raw_data_dir.glob("LCPoetry*.json")
        ]

        all_poems = []
        for poetry_file in sorted(poetry_files):
            print(f"  Loading {poetry_file.name}...")
            with open(poetry_file, 'r', encoding='utf-8') as f:
                poems = json.load(f)
                all_poems.extend(poems)

        self.poems = all_poems

        print(f"Loaded {len(self.poets)} poets, {len(self.tags)} tags, {len(all_poems)} poems")

    def compute_content_hash(self, content: str) -> str:
        """Compute SHA256 hash of content for duplicate detection"""
        return hashlib.sha256(content.encode('utf-8')).hexdigest()

    def remove_duplicates(self):
        """Remove duplicate poems based on content hash"""
        print("\nRemoving duplicates...")

        seen_hashes: Dict[str, Any] = {}
        unique_poems = []
        duplicates = []

        for poem in self.poems:
            content = poem.get('content', '')
            content_hash = self.compute_content_hash(content)

            if content_hash in seen_hashes:
                duplicates.append({
                    'original': seen_hashes[content_hash],
                    'duplicate': poem
                })
            else:
                seen_hashes[content_hash] = poem
                unique_poems.append(poem)

        self.duplicate_poems = duplicates
        self.poems = unique_poems

        print(f"  Found {len(duplicates)} duplicate poems")
        print(f"  Kept {len(unique_poems)} unique poems")

    def validate_relationships(self):
        """Validate all relationships between poems, poets, dynasties, and tags"""
        print("\nValidating relationships...")

        # Track invalid references
        missing_poets = []
        missing_tags = []
        missing_dynasties = []

        for i, poem in enumerate(self.poems):
            # Validate poet reference (if exists)
            # The poet info is stored in the 'poet' field as a pointer object
            poet_ref = poem.get('poet')
            author_id = None
            if isinstance(poet_ref, dict):
                author_id = poet_ref.get('objectId')

            if author_id and author_id not in self.poets:
                missing_poets.append({
                    'poem_index': i,
                    'poem_name': poem.get('name', 'Unknown'),
                    'author_id': author_id
                })

            # Validate tags
            tags = poem.get('tags', [])
            for tag in tags:
                tag_id = tag.get('objectId') if isinstance(tag, dict) else tag
                if tag_id and tag_id not in self.tags:
                    missing_tags.append({
                        'poem_index': i,
                        'poem_name': poem.get('name', 'Unknown'),
                        'tag_id': tag_id
                    })

            # Check dynasty
            dynasty = poem.get('dynasty')
            if dynasty and dynasty not in self.dynasties:
                missing_dynasties.append({
                    'poem_index': i,
                    'poem_name': poem.get('name', 'Unknown'),
                    'dynasty': dynasty
                })
                # Add to dynasties set for reference
                self.dynasties.add(dynasty)

        self.invalid_refs['missing_poets'] = missing_poets
        self.invalid_refs['missing_tags'] = missing_tags
        self.invalid_refs['missing_dynasties'] = missing_dynasties

        print(f"  Missing poet references: {len(missing_poets)}")
        print(f"  Missing tag references: {len(missing_tags)}")
        print(f"  Missing dynasty references: {len(missing_dynasties)}")

    def collect_statistics(self):
        """Collect comprehensive statistics about the data"""
        print("\nCollecting statistics...")

        stats = {
            'total_poems': len(self.poems),
            'total_poets': len(self.poets),
            'total_tags': len(self.tags),
            'total_dynasties': len(self.dynasties),
            'duplicates_found': len(self.duplicate_poems),
            'poems_by_dynasty': Counter(),
            'poems_by_tag': Counter(),
            'poems_by_poet': Counter(),
            'poem_length_stats': {
                'min': float('inf'),
                'max': 0,
                'avg': 0,
                'total_chars': 0
            },
            'poets_by_dynasty': Counter(),
            'poems_with_tags': 0,
            'poems_without_tags': 0,
            'poems_with_author': 0,
            'poems_without_author': 0,
        }

        total_length = 0

        for poem in self.poems:
            # Dynasty stats
            dynasty = poem.get('dynasty', 'Unknown')
            stats['poems_by_dynasty'][dynasty] += 1

            # Tag stats
            tags = poem.get('tags', [])
            if tags:
                stats['poems_with_tags'] += 1
                for tag in tags:
                    tag_id = tag.get('objectId') if isinstance(tag, dict) else tag
                    if tag_id in self.tags:
                        tag_name = self.tags[tag_id].get('name', tag_id)
                        stats['poems_by_tag'][tag_name] += 1
            else:
                stats['poems_without_tags'] += 1

            # Poet stats
            # The poet info is stored in the 'poet' field as a pointer object
            poet_ref = poem.get('poet')
            author_id = None
            if isinstance(poet_ref, dict):
                author_id = poet_ref.get('objectId')

            if author_id:
                stats['poems_with_author'] += 1
                if author_id in self.poets:
                    poet_name = self.poets[author_id].get('name', author_id)
                    stats['poems_by_poet'][poet_name] += 1
            else:
                stats['poems_without_author'] += 1

            # Length stats
            content = poem.get('content', '')
            length = len(content)
            total_length += length
            stats['poem_length_stats']['min'] = min(stats['poem_length_stats']['min'], length)
            stats['poem_length_stats']['max'] = max(stats['poem_length_stats']['max'], length)
            stats['poem_length_stats']['total_chars'] += length

        # Calculate average
        if stats['total_poems'] > 0:
            stats['poem_length_stats']['avg'] = stats['poem_length_stats']['total_chars'] / stats['total_poems']

        # Poet by dynasty stats
        for poet_id, poet in self.poets.items():
            dynasty = poet.get('dynasty', 'Unknown')
            stats['poets_by_dynasty'][dynasty] += 1

        self.stats = stats

    def print_statistics(self):
        """Print detailed statistics"""
        print("\n" + "="*80)
        print("DATA STATISTICS")
        print("="*80)

        print(f"\nOverview:")
        print(f"  Total Poems: {self.stats['total_poems']:,}")
        print(f"  Total Poets: {self.stats['total_poets']:,}")
        print(f"  Total Tags: {self.stats['total_tags']:,}")
        print(f"  Total Dynasties: {self.stats['total_dynasties']:,}")
        print(f"  Duplicates Found: {self.stats['duplicates_found']:,}")

        print(f"\nPoem Length Statistics:")
        print(f"  Minimum: {self.stats['poem_length_stats']['min']:,} characters")
        print(f"  Maximum: {self.stats['poem_length_stats']['max']:,} characters")
        print(f"  Average: {self.stats['poem_length_stats']['avg']:.1f} characters")
        print(f"  Total: {self.stats['poem_length_stats']['total_chars']:,} characters")

        print(f"\nPoem Coverage:")
        print(f"  Poems with author: {self.stats['poems_with_author']:,} ({100*self.stats['poems_with_author']/self.stats['total_poems']:.1f}%)")
        print(f"  Poems without author: {self.stats['poems_without_author']:,}")
        print(f"  Poems with tags: {self.stats['poems_with_tags']:,} ({100*self.stats['poems_with_tags']/self.stats['total_poems']:.1f}%)")
        print(f"  Poems without tags: {self.stats['poems_without_tags']:,}")

        print(f"\nTop 10 Dynasties by Poem Count:")
        for dynasty, count in self.stats['poems_by_dynasty'].most_common(10):
            print(f"  {dynasty}: {count:,}")

        print(f"\nTop 10 Poets by Poem Count:")
        for poet, count in self.stats['poems_by_poet'].most_common(10):
            print(f"  {poet}: {count:,}")

        print(f"\nTop 10 Tags by Poem Count:")
        for tag, count in self.stats['poems_by_tag'].most_common(10):
            print(f"  {tag}: {count:,}")

        print(f"\nPoets by Dynasty:")
        for dynasty, count in sorted(self.stats['poets_by_dynasty'].items(), key=lambda x: -x[1])[:10]:
            print(f"  {dynasty}: {count:,}")

    def save_cleaned_data(self, output_dir: str):
        """Save cleaned data to output directory"""
        output_path = Path(output_dir)
        output_path.mkdir(parents=True, exist_ok=True)

        print(f"\nSaving cleaned data to {output_dir}...")

        # Save cleaned poems
        with open(output_path / 'cleaned_poems.json', 'w', encoding='utf-8') as f:
            json.dump(self.poems, f, ensure_ascii=False, indent=2)

        # Save poets
        with open(output_path / 'cleaned_poets.json', 'w', encoding='utf-8') as f:
            json.dump(list(self.poets.values()), f, ensure_ascii=False, indent=2)

        # Save tags
        with open(output_path / 'cleaned_tags.json', 'w', encoding='utf-8') as f:
            json.dump(list(self.tags.values()), f, ensure_ascii=False, indent=2)

        # Save dynasties
        dynasties_list = sorted(list(self.dynasties))
        with open(output_path / 'dynasties.json', 'w', encoding='utf-8') as f:
            json.dump(dynasties_list, f, ensure_ascii=False, indent=2)

        # Save statistics
        stats_serializable = {
            k: (dict(v) if isinstance(v, Counter) else v)
            for k, v in self.stats.items()
        }
        with open(output_path / 'statistics.json', 'w', encoding='utf-8') as f:
            json.dump(stats_serializable, f, ensure_ascii=False, indent=2)

        # Save duplicate report
        if self.duplicate_poems:
            with open(output_path / 'duplicates_report.json', 'w', encoding='utf-8') as f:
                json.dump(self.duplicate_poems, f, ensure_ascii=False, indent=2)

        # Save invalid references report
        if any(self.invalid_refs.values()):
            with open(output_path / 'invalid_references_report.json', 'w', encoding='utf-8') as f:
                json.dump(dict(self.invalid_refs), f, ensure_ascii=False, indent=2)

        print(f"  Saved {len(self.poems):,} cleaned poems")
        print(f"  Saved {len(self.poets):,} poets")
        print(f"  Saved {len(self.tags):,} tags")
        print(f"  Saved {len(dynasties_list):,} dynasties")
        print(f"  Saved statistics report")
        if self.duplicate_poems:
            print(f"  Saved duplicates report ({len(self.duplicate_poems)} duplicates)")
        if any(self.invalid_refs.values()):
            print(f"  Saved invalid references report")

    def save_summary_report(self, output_dir: str):
        """Save a human-readable summary report"""
        output_path = Path(output_dir)
        report_file = output_path / 'SUMMARY_REPORT.txt'

        with open(report_file, 'w', encoding='utf-8') as f:
            f.write("="*80 + "\n")
            f.write("CHINESE POETRY DATA CLEANING SUMMARY REPORT\n")
            f.write("="*80 + "\n\n")

            f.write("OVERVIEW\n")
            f.write("-"*80 + "\n")
            f.write(f"Total Poems: {self.stats['total_poems']:,}\n")
            f.write(f"Total Poets: {self.stats['total_poets']:,}\n")
            f.write(f"Total Tags: {self.stats['total_tags']:,}\n")
            f.write(f"Total Dynasties: {self.stats['total_dynasties']:,}\n")
            f.write(f"Duplicates Found and Removed: {self.stats['duplicates_found']:,}\n\n")

            f.write("DATA QUALITY\n")
            f.write("-"*80 + "\n")
            f.write(f"Poems with author: {self.stats['poems_with_author']:,} ")
            f.write(f"({100*self.stats['poems_with_author']/self.stats['total_poems']:.1f}%)\n")
            f.write(f"Poems without author: {self.stats['poems_without_author']:,}\n")
            f.write(f"Poems with tags: {self.stats['poems_with_tags']:,} ")
            f.write(f"({100*self.stats['poems_with_tags']/self.stats['total_poems']:.1f}%)\n")
            f.write(f"Poems without tags: {self.stats['poems_without_tags']:,}\n\n")

            f.write("VALIDATION ISSUES\n")
            f.write("-"*80 + "\n")
            f.write(f"Missing poet references: {len(self.invalid_refs['missing_poets']):,}\n")
            f.write(f"Missing tag references: {len(self.invalid_refs['missing_tags']):,}\n")
            f.write(f"Missing dynasty references: {len(self.invalid_refs['missing_dynasties']):,}\n\n")

            f.write("POEM LENGTH STATISTICS\n")
            f.write("-"*80 + "\n")
            f.write(f"Minimum: {self.stats['poem_length_stats']['min']:,} characters\n")
            f.write(f"Maximum: {self.stats['poem_length_stats']['max']:,} characters\n")
            f.write(f"Average: {self.stats['poem_length_stats']['avg']:.1f} characters\n")
            f.write(f"Total: {self.stats['poem_length_stats']['total_chars']:,} characters\n\n")

            f.write("TOP 10 DYNASTIES BY POEM COUNT\n")
            f.write("-"*80 + "\n")
            for dynasty, count in self.stats['poems_by_dynasty'].most_common(10):
                f.write(f"{dynasty:20s}: {count:,}\n")
            f.write("\n")

            f.write("TOP 20 POETS BY POEM COUNT\n")
            f.write("-"*80 + "\n")
            for poet, count in self.stats['poems_by_poet'].most_common(20):
                f.write(f"{poet:30s}: {count:,}\n")
            f.write("\n")

            f.write("TOP 20 TAGS BY POEM COUNT\n")
            f.write("-"*80 + "\n")
            for tag, count in self.stats['poems_by_tag'].most_common(20):
                f.write(f"{tag:30s}: {count:,}\n")
            f.write("\n")

            f.write("POETS BY DYNASTY\n")
            f.write("-"*80 + "\n")
            for dynasty, count in sorted(self.stats['poets_by_dynasty'].items(), key=lambda x: -x[1]):
                f.write(f"{dynasty:20s}: {count:,}\n")

        print(f"  Saved summary report to {report_file}")


def main():
    # Set up paths
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    raw_data_dir = project_root / 'prisma' / 'data' / 'raw'
    output_dir = project_root / 'prisma' / 'data' / 'cleaned'

    print("Chinese Poetry Data Cleaner")
    print("="*80)
    print(f"Raw data directory: {raw_data_dir}")
    print(f"Output directory: {output_dir}")
    print()

    # Create cleaner instance
    cleaner = PoetryDataCleaner(str(raw_data_dir))

    # Run cleaning pipeline
    cleaner.load_raw_data()
    cleaner.remove_duplicates()
    cleaner.validate_relationships()
    cleaner.collect_statistics()
    cleaner.print_statistics()

    # Save results
    cleaner.save_cleaned_data(str(output_dir))
    cleaner.save_summary_report(str(output_dir))

    print("\n" + "="*80)
    print("Data cleaning complete!")
    print("="*80)


if __name__ == '__main__':
    main()
