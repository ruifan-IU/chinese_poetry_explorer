import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { calculateNextReview, getNextReviewDate, mapUserResponseToQuality } from '@/lib/spaced-repetition';

/**
 * POST /api/memorization/review
 * Submit a review result and update the spaced repetition schedule
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

    const { poemId, response, notes } = await request.json();

    // Validate input
    if (!poemId || typeof poemId !== 'number') {
      return NextResponse.json(
        { error: 'Invalid poem ID' },
        { status: 400 }
      );
    }

    if (!response || !['again', 'hard', 'good', 'easy'].includes(response)) {
      return NextResponse.json(
        { error: 'Invalid response. Must be: again, hard, good, or easy' },
        { status: 400 }
      );
    }

    // Get current memorization record
    const memorization = await prisma.userMemorization.findUnique({
      where: {
        userId_poemId: {
          userId: user.userId,
          poemId,
        },
      },
    });

    if (!memorization) {
      return NextResponse.json(
        { error: 'Poem not in memorization list' },
        { status: 404 }
      );
    }

    // Convert user response to quality score (0-5)
    const quality = mapUserResponseToQuality(response);

    // Calculate next review parameters using SM-2 algorithm
    const {
      newEaseFactor,
      newInterval,
      newRepetitions,
      newMasteryLevel,
    } = calculateNextReview(
      quality,
      memorization.easeFactor,
      memorization.interval,
      memorization.repetitions
    );

    // Calculate next review date
    const nextReviewAt = getNextReviewDate(newInterval);
    const now = new Date();

    // Update memorization record
    const updated = await prisma.userMemorization.update({
      where: {
        userId_poemId: {
          userId: user.userId,
          poemId,
        },
      },
      data: {
        masteryLevel: newMasteryLevel,
        easeFactor: newEaseFactor,
        interval: newInterval,
        repetitions: newRepetitions,
        lastReviewedAt: now,
        nextReviewAt,
        totalReviews: memorization.totalReviews + 1,
        correctReviews: quality >= 3 ? memorization.correctReviews + 1 : memorization.correctReviews,
        notes: notes !== undefined ? notes : memorization.notes,
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

    return NextResponse.json({
      success: true,
      memorization: updated,
      reviewResult: {
        quality,
        response,
        nextReviewAt,
        daysUntilNextReview: newInterval,
        masteryLevel: newMasteryLevel,
        wasCorrect: quality >= 3,
      },
    });
  } catch (error) {
    console.error('Submit review error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/memorization/review
 * Get the next poem due for review
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

    // Find the next poem due for review (most overdue first)
    const nextReview = await prisma.userMemorization.findFirst({
      where: {
        userId: user.userId,
        nextReviewAt: {
          lte: new Date(),
        },
      },
      include: {
        poem: {
          include: {
            poet: true,
            dynasty: true,
          },
        },
      },
      orderBy: {
        nextReviewAt: 'asc',
      },
    });

    if (!nextReview) {
      return NextResponse.json({
        message: 'No reviews due',
        nextReview: null,
      });
    }

    return NextResponse.json({
      nextReview,
    });
  } catch (error) {
    console.error('Get next review error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
