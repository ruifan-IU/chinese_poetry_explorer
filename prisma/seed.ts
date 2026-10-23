import 'dotenv/config';
import { prisma } from '../lib/prisma.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import type { PoemType } from '../lib/prisma-client/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface DevTag {
  name: string;
  objectId: string;
}

interface DevPoet {
  poetId: number;
  objectId: string;
  star: number;
  name: string;
  image: string | null;
  dynasty: string;
  desc: string | null;
}

interface DevPointer {
  objectId: string;
}

interface DevPoem {
  poetryId: number;
  star: number;
  name: string;
  dynasty: string;
  content: string;
  poet?: DevPointer;
  tags?: DevPointer[];
}

// Postgres has a ~65535 bind-parameter limit per statement; createMany() on
// thousands of poems needs to be chunked to stay under it.
const POEM_INSERT_BATCH_SIZE = 2000;

function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

function computeContentHash(content: string): string {
  return crypto.createHash('sha256').update(content, 'utf8').digest('hex');
}

/**
 * The dev dataset has no shi/ci/wen label on poems, so we have to infer it
 * from the title and tags. Ci titles conventionally follow a "词牌名·标题"
 * pattern (e.g. "水调歌头·明月几时有"), and the 婉约/豪放 tags are ci-specific
 * stylistic labels. Neither signal is perfect (元曲 titles use "·" too, and
 * most poems have no tags at all), so this is a heuristic, not ground truth.
 */
function inferPoemType(title: string, tagNames: string[]): PoemType {
  // TODO(human): implement the shi/ci/wen heuristic described above.
  // Fallback for now: everything is classified as 'shi'.
  return 'shi';
}

async function main() {
  console.log('Starting database seed...\n');

  const dataDir = path.resolve(__dirname, './data/dev');

  console.log('Loading dev data files...');
  const dynastiesData: string[] = JSON.parse(
    fs.readFileSync(path.join(dataDir, 'dev_dynasties.json'), 'utf8')
  );
  const poetsData: DevPoet[] = JSON.parse(
    fs.readFileSync(path.join(dataDir, 'dev_poets.json'), 'utf8')
  );
  const poemsData: DevPoem[] = JSON.parse(
    fs.readFileSync(path.join(dataDir, 'dev_poems.json'), 'utf8')
  );
  const tagsData: DevTag[] = JSON.parse(
    fs.readFileSync(path.join(dataDir, 'dev_tags.json'), 'utf8')
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
    data: tagsData.map((t) => ({ name: t.name })),
    skipDuplicates: true,
  });
  const tagRecords = await prisma.tag.findMany({
    where: { name: { in: tagsData.map((t) => t.name) } },
  });
  const tagIdMap = Object.fromEntries(tagRecords.map((t) => [t.name, t.id]));
  // Poems reference tags by Parse-style objectId pointers, not names.
  const tagObjectIdToName = Object.fromEntries(
    tagsData.map((t) => [t.objectId, t.name])
  );
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
        introduction: poet.desc,
        image: poet.image || null,
        stars: poet.star,
        dynastyId: dynastyIdMap[poet.dynasty] ?? null,
      },
    });
    poetRecords.push(record);
  }
  const poetIdByName = Object.fromEntries(poetRecords.map((p) => [p.name, p.id]));
  // Poems reference poets by Parse-style objectId pointers, not names.
  const poetObjectIdToId = Object.fromEntries(
    poetsData.map((p) => [p.objectId, poetIdByName[p.name]])
  );
  console.log(`  Created ${poetRecords.length} poets\n`);

  // 4. Poems - skip the ~10% of the dev set with no poet reference at all
  // (no pointer, no author name), since poetId is required by the schema.
  const poemsWithPoet = poemsData.filter((p) => p.poet);
  const skippedOrphans = poemsData.length - poemsWithPoet.length;
  console.log('Seeding poems...');
  if (skippedOrphans > 0) {
    console.log(`  Skipping ${skippedOrphans} poems with no poet reference`);
  }

  const poemBatches = chunk(poemsWithPoet, POEM_INSERT_BATCH_SIZE);
  let poemsCreated = 0;

  for (const batch of poemBatches) {
    const result = await prisma.poem.createMany({
      skipDuplicates: true,
      data: batch.map((poem) => {
        const tagNames = (poem.tags ?? []).map((t) => tagObjectIdToName[t.objectId]);
        return {
          title: poem.name,
          content: poem.content,
          contentHash: computeContentHash(poem.content),
          type: inferPoemType(poem.name, tagNames),
          stars: poem.star,
          poetId: poetObjectIdToId[poem.poet!.objectId],
          dynastyId: dynastyIdMap[poem.dynasty],
        };
      }),
    });
    poemsCreated += result.count;
    console.log(`  Inserted ${poemsCreated} / ${poemsWithPoet.length} poems...`);
  }
  console.log(`  Created ${poemsCreated} poems\n`);

  // 5. Attach tags - only the subset of poems that actually have any.
  console.log('Linking tags...');
  const poemsWithTags = poemsWithPoet.filter((p) => (p.tags ?? []).length > 0);
  const hashesWithTags = poemsWithTags.map((p) => computeContentHash(p.content));

  const insertedPoems = await prisma.poem.findMany({
    where: { contentHash: { in: hashesWithTags } },
    select: { id: true, contentHash: true },
  });
  const poemIdByHash = Object.fromEntries(
    insertedPoems.map((p) => [p.contentHash, p.id])
  );

  let tagsLinked = 0;
  for (const poem of poemsWithTags) {
    const poemId = poemIdByHash[computeContentHash(poem.content)];
    if (!poemId) continue;

    const tagNames = (poem.tags ?? []).map((t) => tagObjectIdToName[t.objectId]);
    await prisma.poem.update({
      where: { id: poemId },
      data: {
        tags: {
          connect: tagNames.map((name) => ({ id: tagIdMap[name] })),
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
