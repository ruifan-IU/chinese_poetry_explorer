import 'dotenv/config';
import { prisma } from '../lib/prisma.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { PoemType } from '../lib/prisma-client/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface PoetData {
  name: string;
  introduction: string | null;
  dynasty: string;
}

interface PoemData {
  title: string;
  content: string;
  contentHash: string;
  poetName: string;
  dynasty: string;
  type: string;
  tags: string[];
  fame: number;
}

// Postgres has a ~65535 bind-parameter limit per statement; createMany() on
// 56k+ poems needs to be chunked to stay under it.
const POEM_INSERT_BATCH_SIZE = 2000;

function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

async function main() {
  console.log('Starting database seed...\n');

  const dataDir = path.resolve(__dirname, './data/cleaned/tang');

  console.log('Loading cleaned data files...');
  const dynastiesData: string[] = JSON.parse(
    fs.readFileSync(path.join(dataDir, 'dynasties.json'), 'utf8')
  );
  const poetsData: PoetData[] = JSON.parse(
    fs.readFileSync(path.join(dataDir, 'poets.json'), 'utf8')
  );
  const poemsData: PoemData[] = JSON.parse(
    fs.readFileSync(path.join(dataDir, 'poems.json'), 'utf8')
  );
  const tagsData: string[] = JSON.parse(
    fs.readFileSync(path.join(dataDir, 'tags.json'), 'utf8')
  );

  console.log(`  Loaded ${dynastiesData.length} dynasties`);
  console.log(`  Loaded ${poetsData.length} poets`);
  console.log(`  Loaded ${poemsData.length} poems`);
  console.log(`  Loaded ${tagsData.length} tags\n`);

  // 0. Clear the old dataset. This is a full replacement, not a merge --
  // deleting Poem first cascades to UserFavorite/UserMemorization/
  // PoemAnnotation and clears the Poem<->Tag join table automatically.
  console.log('Clearing existing data...');
  await prisma.poem.deleteMany({});
  await prisma.poet.deleteMany({});
  await prisma.tag.deleteMany({});
  await prisma.dynasty.deleteMany({});
  console.log('  Cleared\n');

  // 1. Dynasties
  console.log('Seeding dynasties...');
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
  console.log(`  Created ${dynastyRecords.length} dynasties\n`);

  // 2. Tags - createMany in one round trip rather than firing hundreds of
  // concurrent upserts, which was resetting the connection under load.
  console.log('Seeding tags...');
  await prisma.tag.createMany({
    data: tagsData.map((name) => ({ name })),
    skipDuplicates: true,
  });
  const tagRecords = await prisma.tag.findMany({
    where: { name: { in: tagsData } },
  });
  const tagIdMap = Object.fromEntries(tagRecords.map((t) => [t.name, t.id]));
  console.log(`  Created ${tagRecords.length} tags\n`);

  // 3. Poets
  console.log('Seeding poets...');
  const poetRecords = [];
  for (const poet of poetsData) {
    const record = await prisma.poet.upsert({
      where: { name: poet.name },
      update: {},
      create: {
        name: poet.name,
        introduction: poet.introduction,
        dynastyId: dynastyIdMap[poet.dynasty] ?? null,
      },
    });
    poetRecords.push(record);
  }
  const poetIdMap = Object.fromEntries(poetRecords.map((p) => [p.name, p.id]));
  console.log(`  Created ${poetRecords.length} poets\n`);

  // 4. Poems - bulk insert scalar fields first (fast, no relations)
  console.log('Seeding poems...');
  const poemBatches = chunk(poemsData, POEM_INSERT_BATCH_SIZE);
  let poemsCreated = 0;

  for (const batch of poemBatches) {
    const result = await prisma.poem.createMany({
      skipDuplicates: true,
      data: batch.map((poem) => ({
        title: poem.title,
        content: poem.content,
        contentHash: poem.contentHash,
        type: poem.type as PoemType,
        poetId: poetIdMap[poem.poetName],
        dynastyId: dynastyIdMap[poem.dynasty],
      })),
    });
    poemsCreated += result.count;
    console.log(`  Inserted ${poemsCreated} / ${poemsData.length} poems...`);
  }
  console.log(`  Created ${poemsCreated} poems\n`);

  // 5. Attach tags - only the small subset of poems that actually have any
  // (the 唐诗三百首 anthology tags), so this skips the vast majority of rows.
  console.log('Linking anthology tags...');
  const poemsWithTags = poemsData.filter((p) => p.tags.length > 0);
  const hashesWithTags = poemsWithTags.map((p) => p.contentHash);

  const insertedPoems = await prisma.poem.findMany({
    where: { contentHash: { in: hashesWithTags } },
    select: { id: true, contentHash: true },
  });
  const poemIdByHash = Object.fromEntries(
    insertedPoems.map((p) => [p.contentHash, p.id])
  );

  let tagsLinked = 0;
  for (const poem of poemsWithTags) {
    const poemId = poemIdByHash[poem.contentHash];
    if (!poemId) continue;

    await prisma.poem.update({
      where: { id: poemId },
      data: {
        tags: {
          connect: poem.tags.map((name) => ({ id: tagIdMap[name] })),
        },
      },
    });
    tagsLinked++;
  }
  console.log(`  Linked tags on ${tagsLinked} poems\n`);

  // 6. Summary
  console.log('Seeding Summary:');
  console.log('-'.repeat(50));

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
  console.log('-'.repeat(50));

  console.log('\nDatabase seeded successfully!');
}

main()
  .catch((e) => {
    console.error('\nError seeding database:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
