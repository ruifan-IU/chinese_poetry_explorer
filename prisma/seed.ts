import 'dotenv/config';
import { prisma } from '../lib/prisma.ts';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import getDynasties from './data/getData/getDynasties.js';
import getTypes from './data/getData/getTypes.js';
import getAuthorDynasty from './data/getData/getAuthorDynasty.js';
import getAuthorInfo from './data/getData/getAuthorInfo.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  // 1. Seed Dynasties
  const dynasties: string[] = await getDynasties();
  const dynastyRecords = await Promise.all(
    dynasties.map((name) =>
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

  // 2. Seed Types
  const types: string[] = await getTypes();
  const typeRecords = await Promise.all(
    types.map((name) =>
      prisma.type.upsert({
        where: { name },
        update: {},
        create: { name },
      })
    )
  );
  const typeIdMap = Object.fromEntries(typeRecords.map((t) => [t.name, t.id]));

  // 3. Seed Authors
  const authorDynastyMap = (await getAuthorDynasty()) as Record<string, string>;
  const authorInfoMap = (await getAuthorInfo()) as Record<
    string,
    string | null
  >;
  const authorRecords = await Promise.all(
    Object.keys(authorDynastyMap).map((name) =>
      prisma.author.upsert({
        where: { name },
        update: {},
        create: {
          name,
          dynastyId: dynastyIdMap[authorDynastyMap[name]],
          introduction: authorInfoMap[name] || null,
        },
      })
    )
  );
  const authorIdMap = Object.fromEntries(
    authorRecords.map((a) => [a.name, a.id])
  );

  // 4. Seed Texts
  const textsPath = path.resolve(__dirname, './data/texts.json');
  const textsData = JSON.parse(fs.readFileSync(textsPath, 'utf8'));
  const textRecords = await Promise.all(
    textsData.map((text: any) =>
      prisma.text.create({
        data: {
          title: text.title,
          authorId: authorIdMap[text.author],
          dynastyId: dynastyIdMap[text.dynasty],
          content: text.content,
          contentHash: crypto
            .createHash('sha256')
            .update(text.content)
            .digest('hex'),
        },
      })
    )
  );
  const textIdMap = Object.fromEntries(
    textRecords.map((t) => [t.content, t.id])
  );

  // 5. Seed TextTypes (many-to-many)
  for (const text of textsData) {
    if (text.types && text.types.length > 0) {
      for (const typeName of text.types) {
        await prisma.textType.create({
          data: {
            textId: textIdMap[text.content],
            typeId: typeIdMap[typeName],
          },
        });
      }
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
