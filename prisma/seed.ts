import { prisma } from '../lib/prisma';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

async function loadJson<T = any>(p: string): Promise<T> {
  const raw = await fs.readFile(p, 'utf8');
  return JSON.parse(raw) as T;
}

function hashContent(s: string) {
  return crypto
    .createHash('sha256')
    .update(s || '')
    .digest('hex');
}

async function main() {
  const dataDir = path.join(__dirname, 'data');
  const authorsPath = path.join(dataDir, 'authors.json');
  const textsPath = path.join(dataDir, 'texts.json');

  const authorsData = await loadJson<Array<any>>(authorsPath);
  const textsData = await loadJson<Array<any>>(textsPath);

  // collect dynasty names we can see in data
  const dynastyNames = new Set<string>();
  for (const a of authorsData)
    if (a.dynasty) dynastyNames.add(String(a.dynasty));
  for (const t of textsData) if (t.dynasty) dynastyNames.add(String(t.dynasty));

  // ensure an "Unknown" dynasty exists for missing references
  dynastyNames.add('Unknown');

  const dynastyMap = new Map<string, number>();
  for (const name of dynastyNames) {
    const d = await prisma.dynasty.upsert({
      where: { name },
      create: { name },
      update: {},
    });
    dynastyMap.set(name, d.id);
  }

  // upsert authors
  const authorMap = new Map<string, number>();
  for (const a of authorsData) {
    // assume incoming objects have at least `name` and optional `introduction` and `dynasty`
    const name = String(
      a.name ?? a.fullName ?? a.title ?? 'Unknown Author'
    ).trim();
    const introduction = a.introduction ?? a.bio ?? a.description ?? null;
    const dynastyName = (a.dynasty && String(a.dynasty)) || 'Unknown';
    const dynastyId = dynastyMap.get(dynastyName) ?? dynastyMap.get('Unknown')!;

    const au = await prisma.author.upsert({
      where: { name },
      create: {
        name,
        introduction,
        dynastyId,
      },
      update: {
        introduction,
        dynastyId,
      },
    });
    authorMap.set(name, au.id);
  }

  // ensure there's an Unknown author if any text lacks an author
  if (!authorMap.has('Unknown')) {
    const u = await prisma.author.upsert({
      where: { name: 'Unknown' },
      create: {
        name: 'Unknown',
        introduction: 'Imported placeholder',
        dynastyId: dynastyMap.get('Unknown')!,
      },
      update: {},
    });
    authorMap.set('Unknown', u.id);
  }

  let created = 0;
  for (const t of textsData) {
    const title = t.title ?? t.name ?? 'Untitled';
    const content = t.content ?? t.translation ?? '';
    const contentHash = hashContent(content + (title || ''));
    const annotation = t.annotation ?? null;
    const comments = t.comments ?? null;
    const translation = t.translation ?? null;

    const dynastyName = (t.dynasty && String(t.dynasty)) || 'Unknown';
    const dynastyId = dynastyMap.get(dynastyName) ?? dynastyMap.get('Unknown')!;

    const authorName =
      t.authorName || t.author || t.by
        ? String(t.authorName ?? t.author ?? t.by)
        : null;
    const authorId = authorName ? authorMap.get(authorName) ?? null : null;
    const resolvedAuthorId = authorId ?? authorMap.get('Unknown')!;

    try {
      // upsert by contentHash (unique)
      const existing = await prisma.text.findUnique({ where: { contentHash } });
      if (existing) {
        // optionally update fields
        await prisma.text.update({
          where: { id: existing.id },
          data: {
            title,
            content,
            annotation,
            comments,
            translation,
            authorId: resolvedAuthorId,
            dynastyId,
          },
        });
      } else {
        const createdText = await prisma.text.create({
          data: {
            title,
            content,
            contentHash,
            annotation,
            comments,
            translation,
            author: { connect: { id: resolvedAuthorId } },
            dynasty: { connect: { id: dynastyId } },
          },
        });

        // handle types/tags if present (array of strings)
        const types = Array.isArray(t.types)
          ? t.types.map(String)
          : Array.isArray(t.tags)
          ? t.tags.map(String)
          : [];
        for (const typeNameRaw of types) {
          const typeName = typeNameRaw.trim();
          if (!typeName) continue;
          const ty = await prisma.type.upsert({
            where: { name: typeName },
            create: { name: typeName },
            update: {},
          });
          // create join row; ignore unique-constraint errors
          try {
            await prisma.textType.create({
              data: {
                textId: createdText.id,
                typeId: ty.id,
              },
            });
          } catch (err) {
            // ignore duplicates
          }
        }
        created++;
      }
    } catch (err) {
      console.error('Failed to upsert text:', title, err);
    }
  }

  console.log(`Seed finished. texts created: ${created}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
