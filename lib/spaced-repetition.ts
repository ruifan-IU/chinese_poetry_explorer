/**
 * Spaced Repetition Algorithm (SM-2)
 * Based on SuperMemo/Anki principles
 */

import { MasteryLevel } from '@/lib/prisma-client';

export interface ReviewResult {
  newEaseFactor: number;
  newInterval: number;
  newRepetitions: number;
  newMasteryLevel: MasteryLevel;
}

/**
 * Calculate next review parameters based on user's performance
 * @param quality - User performance rating (0-5)
 *   0 = Complete failure
 *   1 = Incorrect, but recognized
 *   2 = Incorrect, but almost correct
 *   3 = Correct with difficulty
 *   4 = Correct with hesitation
 *   5 = Perfect recall
 * @param easeFactor - Current ease factor (default 2.5)
 * @param interval - Current interval in days
 * @param repetitions - Number of consecutive successful reviews
 */
export function calculateNextReview(
  quality: number,
  easeFactor: number,
  interval: number,
  repetitions: number
): ReviewResult {
  // Validate quality score
  if (quality < 0 || quality > 5) {
    throw new Error('Quality must be between 0 and 5');
  }

  // Update ease factor based on performance
  let newEaseFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

  // Ensure ease factor stays within reasonable bounds
  newEaseFactor = Math.max(1.3, newEaseFactor);

  let newInterval: number;
  let newRepetitions: number;

  if (quality < 3) {
    // Failed review - restart from beginning
    newRepetitions = 0;
    newInterval = 1; // Review again tomorrow
  } else {
    // Successful review
    newRepetitions = repetitions + 1;

    if (repetitions === 0) {
      // First successful review
      newInterval = 1;
    } else if (repetitions === 1) {
      // Second successful review
      newInterval = 6;
    } else {
      // Subsequent reviews - use ease factor
      newInterval = Math.round(interval * newEaseFactor);
    }
  }

  // Calculate mastery level based on interval and repetitions
  const newMasteryLevel = getMasteryLevel(newInterval, newRepetitions);

  return {
    newEaseFactor,
    newInterval,
    newRepetitions,
    newMasteryLevel,
  };
}

/**
 * Determine mastery level based on interval and repetitions
 */
export function getMasteryLevel(interval: number, repetitions: number): MasteryLevel {
  if (repetitions === 0) return 'NEW';
  if (interval < 3) return 'LEARNING';
  if (interval < 7) return 'YOUNG';
  if (interval < 30) return 'MATURE';
  return 'MASTERED';
}

/**
 * Calculate the next review date
 */
export function getNextReviewDate(intervalDays: number): Date {
  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + intervalDays);
  nextReview.setHours(0, 0, 0, 0); // Set to start of day
  return nextReview;
}

/**
 * Check if a review is due
 */
export function isReviewDue(nextReviewAt: Date | null): boolean {
  if (!nextReviewAt) return true;
  return new Date() >= nextReviewAt;
}

/**
 * Get quality score from user input (simplified version)
 * In the UI, you might have buttons like "Again", "Hard", "Good", "Easy"
 */
export function mapUserResponseToQuality(response: 'again' | 'hard' | 'good' | 'easy'): number {
  const mapping = {
    again: 0,  // Complete failure
    hard: 3,   // Correct with difficulty
    good: 4,   // Correct with hesitation
    easy: 5,   // Perfect recall
  };
  return mapping[response];
}

const MASTERY_LEVELS: MasteryLevel[] = ['NEW', 'LEARNING', 'YOUNG', 'MATURE', 'MASTERED'];

/**
 * Calculate the degraded mastery level for an overdue memorization.
 *
 * Drops one level for each full interval that has elapsed since the review was due.
 * For example: if the interval was 10 days and the item is 25 days overdue,
 * that's 2 full intervals elapsed → drop 2 levels.
 *
 * Items at NEW are never degraded further (already the floor).
 */
export function getDegradedMasteryLevel(
  currentLevel: MasteryLevel,
  interval: number,
  nextReviewAt: Date
): MasteryLevel {
  const daysOverdue = Math.floor(
    (Date.now() - nextReviewAt.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysOverdue <= 0) return currentLevel;

  // How many full intervals have elapsed since the due date
  const levelsToDrop = Math.floor(daysOverdue / Math.max(interval, 1));

  const currentIndex = MASTERY_LEVELS.indexOf(currentLevel);
  const newIndex = Math.max(0, currentIndex - levelsToDrop);

  return MASTERY_LEVELS[newIndex];
}
