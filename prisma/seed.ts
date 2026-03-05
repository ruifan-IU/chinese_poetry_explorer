import 'dotenv/config';
import { prisma } from '../lib/prisma.js';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Type definitions for the JSON data
interface PoetData {
  objectId: string;
  name: string;
  star: number;
  dynasty: string;
  image?: string;
  desc?: string;
  content?: string;
}

interface TagData {
  objectId: string;
  name: string;
}

interface PoemData {
  objectId: string;
  name: string;
  star: number;
  dynasty: string;
  content: string;
  fanyi?: string;
  shangxi?: string;
  about?: string;
  author?: string;
  poet?: {
    __type: string;
    className: string;
    objectId: string;
  };
  tags?: Array<{
    __type: string;
    className: string;
    objectId: string;
  }>;
}

async function main() {
  console.log('🌱 Starting database seed...\n');

  const dataDir = path.resolve(__dirname, './data/dev');

  // 1. Load all data files
  console.log('📂 Loading data files...');
  const dynastiesData: string[] = JSON.parse(
    fs.readFileSync(path.join(dataDir, 'dev_dynasties.json'), 'utf8')
  );
  const poetsData: PoetData[] = JSON.parse(
    fs.readFileSync(path.join(dataDir, 'dev_poets.json'), 'utf8')
  );
  const tagsData: TagData[] = JSON.parse(
    fs.readFileSync(path.join(dataDir, 'dev_tags.json'), 'utf8')
  );
  const poemsData: PoemData[] = JSON.parse(
    fs.readFileSync(path.join(dataDir, 'dev_poems.json'), 'utf8')
  );

  console.log(`  ✓ Loaded ${dynastiesData.length} dynasties`);
  console.log(`  ✓ Loaded ${poetsData.length} poets`);
  console.log(`  ✓ Loaded ${tagsData.length} tags`);
  console.log(`  ✓ Loaded ${poemsData.length} poems\n`);

  // 2. Seed Dynasties
  console.log('👑 Seeding dynasties...');
  const dynastyRecords = await Promise.all(
    dynastiesData.map((name) =>
      prisma.dynasty.upsert({
        where: { name },
        update: {},
        create: { name },
      })
    )
  );
  const dynastyIdMap = Object.fromEntries(
    dynastyRecords.map((d) => [d.name, d.id])
  );
  console.log(`  ✓ Created ${dynastyRecords.length} dynasties\n`);

  // 3. Seed Tags
  console.log('🏷️  Seeding tags...');
  const tagRecords = await Promise.all(
    tagsData.map((tag) =>
      prisma.tag.upsert({
        where: { name: tag.name },
        update: {},
        create: { name: tag.name },
      })
    )
  );
  const tagIdMap = Object.fromEntries(tagRecords.map((t) => [t.name, t.id]));
  // Also create objectId -> tag name mapping for poems
  const tagObjectIdToName = Object.fromEntries(
    tagsData.map((t) => [t.objectId, t.name])
  );
  console.log(`  ✓ Created ${tagRecords.length} tags\n`);

  // 4. Seed Poets
  console.log('✍️  Seeding poets...');
  const poetObjectIdMap: Record<string, number> = {};

  for (const poet of poetsData) {
    const dynastyId = poet.dynasty ? dynastyIdMap[poet.dynasty] : null;

    const poetRecord = await prisma.poet.upsert({
      where: { name: poet.name },
      update: {},
      create: {
        name: poet.name,
        stars: poet.star || 0,
        summary: poet.desc || null,
        introduction: poet.content || null,
        image: poet.image || null,
        dynastyId: dynastyId || null,
      },
    });

    poetObjectIdMap[poet.objectId] = poetRecord.id;
  }
  console.log(`  ✓ Created ${poetsData.length} poets\n`);

  // 5. Seed Poems
  console.log('📜 Seeding poems...');
  let poemsCreated = 0;
  let poemsSkipped = 0;

  for (const poem of poemsData) {
    // Get poet ID
    const poetRef = poem.poet;
    let poetId: number | null = null;

    if (poetRef && typeof poetRef === 'object' && poetRef.objectId) {
      poetId = poetObjectIdMap[poetRef.objectId];
    }

    // Skip poems without a poet (required field)
    if (!poetId) {
      poemsSkipped++;
      console.warn(`  ⚠️  Skipping poem "${poem.name}" - no poet found`);
      continue;
    }

    // Get dynasty ID
    const dynastyId = poem.dynasty ? dynastyIdMap[poem.dynasty] : null;

    if (!dynastyId) {
      poemsSkipped++;
      console.warn(`  ⚠️  Skipping poem "${poem.name}" - no dynasty found`);
      continue;
    }

    // Create content hash
    const contentHash = crypto
      .createHash('sha256')
      .update(poem.content)
      .digest('hex');

    // Collect tag IDs
    const tagIds: number[] = [];
    if (poem.tags && Array.isArray(poem.tags)) {
      for (const tag of poem.tags) {
        const tagObjectId = typeof tag === 'object' ? tag.objectId : tag;
        const tagName = tagObjectIdToName[tagObjectId];
        if (tagName && tagIdMap[tagName]) {
          tagIds.push(tagIdMap[tagName]);
        }
      }
    }

    try {
      // Create poem with tags relationship
      await prisma.poem.create({
        data: {
          title: poem.name,
          content: poem.content,
          contentHash,
          stars: poem.star || 0,
          translation: poem.fanyi || null,
          comments: poem.shangxi || null,
          background: poem.about || null,
          poetId,
          dynastyId,
          tags: {
            connect: tagIds.map((id) => ({ id })),
          },
        },
      });

      poemsCreated++;

      // Progress indicator every 100 poems
      if (poemsCreated % 100 === 0) {
        console.log(`  📝 Created ${poemsCreated} poems...`);
      }
    } catch (error) {
      poemsSkipped++;
      console.error(`  ❌ Error creating poem "${poem.name}":`, error);
    }
  }

  console.log(`  ✓ Created ${poemsCreated} poems`);
  if (poemsSkipped > 0) {
    console.log(`  ⚠️  Skipped ${poemsSkipped} poems\n`);
  } else {
    console.log('');
  }

  // 6. Summary
  console.log('📊 Seeding Summary:');
  console.log('━'.repeat(50));

  const counts = await Promise.all([
    prisma.dynasty.count(),
    prisma.poet.count(),
    prisma.tag.count(),
    prisma.poem.count(),
  ]);

  console.log(`  Dynasties: ${counts[0]}`);
  console.log(`  Poets:     ${counts[1]}`);
  console.log(`  Tags:      ${counts[2]}`);
  console.log(`  Poems:     ${counts[3]}`);
  console.log('━'.repeat(50));

  // Get some sample data
  const topPoems = await prisma.poem.findMany({
    take: 5,
    orderBy: { stars: 'desc' },
    include: { poet: true },
  });

  console.log('\n🌟 Top 5 poems by stars:');
  topPoems.forEach((poem, i) => {
    console.log(`  ${i + 1}. ${poem.title} by ${poem.poet.name} (⭐ ${poem.stars})`);
  });

  console.log('\n✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('\n❌ Error seeding database:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
