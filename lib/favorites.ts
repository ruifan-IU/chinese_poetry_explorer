import { prisma } from './prisma';

/**
 * Check if a user has favorited a poem
 */
export async function isPoemFavorited(
  userId: number,
  poemId: number
): Promise<boolean> {
  const favorite = await prisma.userFavorite.findUnique({
    where: {
      userId_poemId: {
        userId,
        poemId,
      },
    },
  });

  return !!favorite;
}

/**
 * Get all favorited poem IDs for a user
 */
export async function getUserFavoritedPoemIds(
  userId: number
): Promise<number[]> {
  const favorites = await prisma.userFavorite.findMany({
    where: { userId },
    select: { poemId: true },
  });

  return favorites.map((f) => f.poemId);
}
