import { prisma } from './prisma';
import { PoemType } from './prisma-client';

// ========== Poems ==========

/**
 * Get recommended poems for the landing page.
 * Returns random selection of high-quality poems (stars >= 500).
 */
export async function getRecommendedPoems(limit = 20, type?: PoemType) {
  // Get poems with at least 500 stars
  const poems = await prisma.poem.findMany({
    where: {
      stars: { gte: 500 },
      ...(type && { type }),
    },
    include: {
      poet: true,
      tags: true,
      dynasty: true,
    },
  });

  // Shuffle and return limited results
  return poems.sort(() => Math.random() - 0.5).slice(0, limit);
}

/**
 * Get poems filtered by poet, tags, dynasty, and/or type.
 */
export async function getFilteredPoems({
  poetId,
  tagIds,
  dynastyId,
  type,
  limit = 20,
}: {
  poetId?: number;
  tagIds?: number[];
  dynastyId?: number;
  type?: PoemType;
  limit?: number;
}) {
  return prisma.poem.findMany({
    where: {
      ...(poetId && { poetId }),
      ...(dynastyId && { dynastyId }),
      ...(type && { type }),
      ...(tagIds &&
        tagIds.length > 0 && {
          tags: {
            some: {
              id: { in: tagIds },
            },
          },
        }),
    },
    include: {
      poet: true,
      tags: true,
      dynasty: true,
    },
    orderBy: {
      stars: 'desc',
    },
    take: limit,
  });
}

/**
 * Get a single poem by ID with all relations.
 */
export async function getPoemById(id: number) {
  return prisma.poem.findUnique({
    where: { id },
    include: {
      poet: true,
      tags: true,
      dynasty: true,
    },
  });
}

/**
 * Search poems by title, poet, or content.
 */
export async function searchPoems(query: string, limit = 20, type?: PoemType) {
  return prisma.poem.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { poet: { name: { contains: query, mode: 'insensitive' } } },
        { content: { contains: query, mode: 'insensitive' } },
      ],
      ...(type && { type }),
    },
    include: {
      poet: true,
      tags: true,
      dynasty: true,
    },
    orderBy: {
      stars: 'desc',
    },
    take: limit,
  });
}

// ========== Poets ==========

/**
 * Get all poets ordered by name.
 * Useful for filter sidebar.
 */
export async function getAllPoets() {
  return prisma.poet.findMany({
    orderBy: {
      name: 'asc',
    },
    include: {
      dynasty: true,
      _count: {
        select: { poems: true },
      },
    },
  });
}

/**
 * Get a single poet by ID with their poems.
 */
export async function getPoetById(id: number) {
  return prisma.poet.findUnique({
    where: { id },
    include: {
      dynasty: true,
      poems: {
        orderBy: { stars: 'desc' },
        take: 10,
      },
    },
  });
}

/**
 * Get poets filtered by dynasty.
 */
export async function getPoetsByDynasty(dynastyId: number) {
  return prisma.poet.findMany({
    where: { dynastyId },
    orderBy: { name: 'asc' },
    include: {
      dynasty: true,
      _count: {
        select: { poems: true },
      },
    },
  });
}

// ========== Tags ==========

/**
 * Get all tags ordered by name.
 * Useful for filter sidebar.
 */
export async function getAllTags() {
  return prisma.tag.findMany({
    orderBy: {
      name: 'asc',
    },
    include: {
      _count: {
        select: { poems: true },
      },
    },
  });
}

/**
 * Get a single tag by ID with its poems.
 */
export async function getTagById(id: number) {
  return prisma.tag.findUnique({
    where: { id },
    include: {
      poems: {
        include: {
          poet: true,
          dynasty: true,
        },
        orderBy: { stars: 'desc' },
        take: 20,
      },
    },
  });
}

// ========== Dynasties ==========

/**
 * Get all dynasties ordered by name.
 * Useful for filter sidebar.
 */
export async function getAllDynasties() {
  return prisma.dynasty.findMany({
    orderBy: {
      name: 'asc',
    },
    include: {
      _count: {
        select: { poems: true, poets: true },
      },
    },
  });
}

/**
 * Get a single dynasty by ID with its poets and poems.
 */
export async function getDynastyById(id: number) {
  return prisma.dynasty.findUnique({
    where: { id },
    include: {
      poets: {
        orderBy: { stars: 'desc' },
        take: 10,
      },
      poems: {
        include: {
          poet: true,
        },
        orderBy: { stars: 'desc' },
        take: 20,
      },
    },
  });
}
