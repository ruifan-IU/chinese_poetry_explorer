import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { getNextReviewDate } from '@/lib/spaced-repetition';

/**
 * GET /api/memorization
 * Get all memorization items for the current user
 */
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const filter = searchParams.get('filter'); // 'all', 'due', 'new', or specific mastery level

    let whereClause: any = {
      userId: user.userId,
    };

    // Apply filters
    if (filter === 'due') {
      whereClause.nextReviewAt = {
        lte: new Date(),
      };
    } else if (filter === 'new') {
      whereClause.masteryLevel = 'NEW';
    } else if (filter && ['LEARNING', 'YOUNG', 'MATURE', 'MASTERED'].includes(filter)) {
      whereClause.masteryLevel = filter;
    }

    const memorizations = await prisma.userMemorization.findMany({
      where: whereClause,
      include: {
        poem: {
          include: {
            poet: true,
            dynasty: true,
          },
        },
      },
      orderBy: [
        { nextReviewAt: 'asc' },
        { addedAt: 'desc' },
      ],
    });

    // Get statistics
    const stats = await prisma.userMemorization.groupBy({
      by: ['masteryLevel'],
      where: { userId: user.userId },
      _count: true,
    });

    // Count due reviews
    const dueCount = await prisma.userMemorization.count({
      where: {
        userId: user.userId,
        nextReviewAt: {
          lte: new Date(),
        },
      },
    });

    return NextResponse.json({
      memorizations,
      stats: stats.reduce((acc, stat) => {
        acc[stat.masteryLevel] = stat._count;
        return acc;
      }, {} as Record<string, number>),
      dueCount,
    });
  } catch (error) {
    console.error('Get memorizations error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/memorization
 * Add a poem to the user's memorization list
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { poemId } = await request.json();

    if (!poemId || typeof poemId !== 'number') {
      return NextResponse.json(
        { error: 'Invalid poem ID' },
        { status: 400 }
      );
    }

    // Check if poem exists
    const poemExists = await prisma.poem.findUnique({
      where: { id: poemId },
    });

    if (!poemExists) {
      return NextResponse.json(
        { error: 'Poem not found' },
        { status: 404 }
      );
    }

    // Check if already memorizing this poem
    const existing = await prisma.userMemorization.findUnique({
      where: {
        userId_poemId: {
          userId: user.userId,
          poemId,
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Poem already in memorization list' },
        { status: 400 }
      );
    }

    // Soft limit: Unverified users can only memorize 3 poems
    const MAX_MEMORIZATIONS_UNVERIFIED = 3;

    if (!user.emailVerified) {
      const memorizationCount = await prisma.userMemorization.count({
        where: { userId: user.userId },
      });

      if (memorizationCount >= MAX_MEMORIZATIONS_UNVERIFIED) {
        return NextResponse.json(
          {
            error: `Please verify your email to memorize more than ${MAX_MEMORIZATIONS_UNVERIFIED} poems`,
            requiresVerification: true,
            currentCount: memorizationCount,
            maxCount: MAX_MEMORIZATIONS_UNVERIFIED,
          },
          { status: 403 }
        );
      }
    }

    // Create memorization entry
    // New items start with masteryLevel=NEW and are immediately due for first review
    const memorization = await prisma.userMemorization.create({
      data: {
        userId: user.userId,
        poemId,
        masteryLevel: 'NEW',
        easeFactor: 2.5,
        interval: 0,
        repetitions: 0,
        nextReviewAt: new Date(), // Due immediately for first review
      },
      include: {
        poem: {
          include: {
            poet: true,
            dynasty: true,
          },
        },
      },
    });

    return NextResponse.json(memorization, { status: 201 });
  } catch (error) {
    console.error('Add memorization error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/memorization?poemId=123
 * Remove a poem from the user's memorization list
 */
export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const poemId = parseInt(searchParams.get('poemId') || '');

    if (!poemId || isNaN(poemId)) {
      return NextResponse.json(
        { error: 'Invalid poem ID' },
        { status: 400 }
      );
    }

    // Check if memorization exists
    const existing = await prisma.userMemorization.findUnique({
      where: {
        userId_poemId: {
          userId: user.userId,
          poemId,
        },
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: 'Poem not in memorization list' },
        { status: 404 }
      );
    }

    // Delete memorization
    await prisma.userMemorization.delete({
      where: {
        userId_poemId: {
          userId: user.userId,
          poemId,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Remove memorization error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
