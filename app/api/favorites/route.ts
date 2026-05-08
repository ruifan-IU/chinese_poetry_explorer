import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

/**
 * GET /api/favorites
 * Get all favorite poems for the current user
 */
export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const favorites = await prisma.userFavorite.findMany({
      where: { userId: user.userId },
      include: {
        poem: {
          include: {
            poet: true,
            dynasty: true,
            tags: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      favorites: favorites.map((f) => f.poem),
    });
  } catch (error) {
    console.error('Get favorites error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/favorites
 * Add a poem to favorites (and increment its star count)
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { poemId } = body;

    if (!poemId || typeof poemId !== 'number') {
      return NextResponse.json(
        { error: 'Invalid poem ID' },
        { status: 400 }
      );
    }

    // Check if already favorited
    const existing = await prisma.userFavorite.findUnique({
      where: {
        userId_poemId: {
          userId: user.userId,
          poemId,
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Poem already in favorites' },
        { status: 400 }
      );
    }

    // Create favorite and increment star count in a transaction
    const [favorite] = await prisma.$transaction([
      prisma.userFavorite.create({
        data: {
          userId: user.userId,
          poemId,
        },
      }),
      prisma.poem.update({
        where: { id: poemId },
        data: { stars: { increment: 1 } },
      }),
    ]);

    return NextResponse.json({ favorite });
  } catch (error) {
    console.error('Add favorite error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/favorites
 * Remove a poem from favorites (and decrement its star count)
 */
export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const poemId = Number(searchParams.get('poemId'));

    if (!poemId) {
      return NextResponse.json(
        { error: 'Invalid poem ID' },
        { status: 400 }
      );
    }

    // Check if favorited
    const existing = await prisma.userFavorite.findUnique({
      where: {
        userId_poemId: {
          userId: user.userId,
          poemId,
        },
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: 'Poem not in favorites' },
        { status: 400 }
      );
    }

    // Delete favorite and decrement star count in a transaction
    await prisma.$transaction([
      prisma.userFavorite.delete({
        where: {
          userId_poemId: {
            userId: user.userId,
            poemId,
          },
        },
      }),
      prisma.poem.update({
        where: { id: poemId },
        data: { stars: { decrement: 1 } },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Remove favorite error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
