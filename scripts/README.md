# Chinese Poetry Data Cleaning Script

This Python script cleans and validates the raw poetry data from the GitHub repository, preparing it for use in the Chinese Poetry Explorer application.

## Features

- **Duplicate Detection**: Removes duplicate poems based on content hash (SHA256)
- **Relationship Validation**: Validates all references between poems, poets, dynasties, and tags
- **Statistical Analysis**: Collects comprehensive statistics about the dataset
- **Data Quality Reports**: Generates detailed reports on data quality and issues

## Requirements

- Python 3.6+
- No additional packages required (uses only Python standard library)

## Usage

```bash
cd /path/to/chinese_poetry_explorer
python3 scripts/clean_data.py
```

The script will:
1. Load all raw data from `prisma/data/raw/`
2. Clean and validate the data
3. Save cleaned data and reports to `prisma/data/cleaned/`

## Output Files

The script creates the following files in `prisma/data/cleaned/`:

### Data Files
- **cleaned_poems.json**: All unique poems (duplicates removed)
- **cleaned_poets.json**: All poet information
- **cleaned_tags.json**: All tag/category information
- **dynasties.json**: List of all dynasties

### Report Files
- **statistics.json**: Machine-readable statistics
- **SUMMARY_REPORT.txt**: Human-readable summary report
- **duplicates_report.json**: Details on all duplicates found
- **invalid_references_report.json**: Details on any invalid references

## Key Statistics from Latest Run

- **Total Poems**: 65,993 (after removing 6,424 duplicates)
- **Total Poets**: 3,154
- **Total Tags**: 45
- **Total Dynasties**: 15

### Dynasty Distribution
- Tang Dynasty (唐代): 42,378 poems
- Song Dynasty (宋代): 19,731 poems
- Yuan Dynasty (元代): 1,399 poems
- Qing Dynasty (清代): 674 poems
- Pre-Qin (先秦): 655 poems

### Top Tags
1. 写景 (Landscape): 1,274 poems
2. 抒情 (Lyrical): 698 poems
3. 婉约 (Graceful): 515 poems
4. 咏物 (Objects): 473 poems
5. 写人 (People): 418 poems

### Data Quality
- **Poems with tags**: 4,831 (7.3%)
- **Poems without tags**: 61,162 (92.7%)
- **Missing poet references**: 0 (all valid)
- **Missing tag references**: 0 (all valid)
- **Missing dynasty references**: 1

## Understanding the Data

### Duplicate Detection
The script uses SHA256 hashing of poem content to detect exact duplicates. This is important because the raw data comes from multiple JSON files that may contain overlapping data.

### Relationship Validation
The script checks:
- Poet references in poems exist in the poets data
- Tag references in poems exist in the tags data
- Dynasty references are consistent across poems and poets

### Known Issues
1. **No Author References**: The current poem data doesn't include direct author/poet references. This may need to be added manually or through additional data sources.
2. **Low Tag Coverage**: Only 7.3% of poems have tags, which may affect categorization features.
3. **One Missing Dynasty Reference**: There's one poem with an unrecognized dynasty that should be investigated.

## Next Steps

After running this script, you can:
1. Review the reports in `prisma/data/cleaned/`
2. Update the seed script to use the cleaned data
3. Investigate and fix any reported issues
4. Consider adding missing author references if needed

## Troubleshooting

If you encounter errors:
1. Ensure all raw data files exist in `prisma/data/raw/`
2. Check Python version (requires 3.6+)
3. Verify write permissions to `prisma/data/cleaned/`
4. Review the error message for specific issues

## Extending the Script

The script is modular and can be extended to:
- Add more validation rules
- Implement different duplicate detection strategies
- Generate additional statistics
- Export data in different formats
- Clean and normalize text fields
