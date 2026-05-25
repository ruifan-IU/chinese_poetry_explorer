import { prisma } from './prisma';

/**
 * Get all poems in the user's memorization list with full details
 */
export async function getUserMemorizations(userId: number) {
  return prisma.userMemorization.findMany({
    where: { userId },
    include: {
      poem: {
        include: {
          poet: true,
          dynasty: true,
          tags: true,
        },
      },
    },
    orderBy: [
      { nextReviewAt: 'asc' },
      { addedAt: 'desc' },
    ],
  });
}

/**
 * Get just the poem IDs that the user is memorizing (for quick lookups)
 */
export async function getUserMemorizingPoemIds(userId: number): Promise<number[]> {
  const memorizations = await prisma.userMemorization.findMany({
    where: { userId },
    select: { poemId: true },
  });

  return memorizations.map((m) => m.poemId);
}

/**
 * Check if a user is memorizing a specific poem
 */
export async function isUserMemorizing(userId: number, poemId: number): Promise<boolean> {
  const memorization = await prisma.userMemorization.findUnique({
    where: {
      userId_poemId: {
        userId,
        poemId,
      },
    },
  });

  return !!memorization;
}

/**
 * Get poems due for review
 */
export async function getDueReviews(userId: number) {
  return prisma.userMemorization.findMany({
    where: {
      userId,
      nextReviewAt: {
        lte: new Date(),
      },
    },
    include: {
      poem: {
        include: {
          poet: true,
          dynasty: true,
          tags: true,
        },
      },
    },
    orderBy: {
      nextReviewAt: 'asc', // Most overdue first
    },
  });
}

/**
 * Get memorization statistics for a user
 */
export async function getMemorizationStats(userId: number) {
  const stats = await prisma.userMemorization.groupBy({
    by: ['masteryLevel'],
    where: { userId },
    _count: true,
  });

  const dueCount = await prisma.userMemorization.count({
    where: {
      userId,
      nextReviewAt: {
        lte: new Date(),
      },
    },
  });

  const totalCount = await prisma.userMemorization.count({
    where: { userId },
  });

  return {
    byMasteryLevel: stats.reduce((acc, stat) => {
      acc[stat.masteryLevel] = stat._count;
      return acc;
    }, {} as Record<string, number>),
    dueCount,
    totalCount,
  };
}
