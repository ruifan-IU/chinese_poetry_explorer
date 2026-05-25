# Memorization Feature - Schema Design

## Overview

The memorization feature uses a **spaced repetition algorithm** based on SuperMemo/Anki principles to help users efficiently memorize Chinese poems.

## Database Schema

### UserMemorization Model

```prisma
model UserMemorization {
  id              Int          @id @default(autoincrement())
  userId          Int
  poemId          Int
  user            User         @relation(...)
  poem            Poem         @relation(...)

  // Spaced Repetition fields
  masteryLevel    MasteryLevel @default(NEW)
  easeFactor      Float        @default(2.5)
  interval        Int          @default(0)
  repetitions     Int          @default(0)

  // Review tracking
  lastReviewedAt  DateTime?
  nextReviewAt    DateTime?
  totalReviews    Int          @default(0)
  correctReviews  Int          @default(0)

  // Metadata
  notes           String?
  addedAt         DateTime     @default(now())
  updatedAt       DateTime     @updatedAt
}
```

### MasteryLevel Enum

```prisma
enum MasteryLevel {
  NEW        // Just added, never practiced
  LEARNING   // Currently learning (0-3 correct reviews)
  YOUNG      // Recently learned (3-7 days interval)
  MATURE     // Well learned (7+ days interval)
  MASTERED   // Fully mastered (30+ days interval)
}
```

## Field Explanations

### Spaced Repetition Fields

#### `masteryLevel` (MasteryLevel)
- **Purpose**: Visual representation of progress
- **Progression**:
  ```
  NEW → LEARNING → YOUNG → MATURE → MASTERED
  ```
- **Use case**: Display badges, filter poems by mastery

#### `easeFactor` (Float, default: 2.5)
- **Purpose**: Difficulty multiplier for this specific poem
- **Range**: 1.3 to 2.5+ (lower = harder)
- **Adjusts based on performance**:
  - Correct answer → increase slightly
  - Wrong answer → decrease
- **Formula**: `nextInterval = currentInterval × easeFactor`

#### `interval` (Int, default: 0)
- **Purpose**: Days until next review
- **Progression example**:
  ```
  0 → 1 → 3 → 7 → 14 → 30 → 60 → 120 → ...
  ```
- **Calculation**: Based on easeFactor and repetitions

#### `repetitions` (Int, default: 0)
- **Purpose**: Count of consecutive successful reviews
- **Resets to 0 on wrong answer**
- **Used to**: Calculate next interval

### Review Tracking Fields

#### `lastReviewedAt` (DateTime?)
- **Purpose**: Track when user last practiced
- **Use case**: Show "last practiced 3 days ago"

#### `nextReviewAt` (DateTime?)
- **Purpose**: When the poem should be reviewed next
- **Calculation**: `lastReviewedAt + interval days`
- **Use case**:
  - Show "due today" poems
  - Send email reminders
  - Sort by urgency

#### `totalReviews` (Int)
- **Purpose**: Total practice attempts (correct + incorrect)
- **Use case**: Show engagement statistics

#### `correctReviews` (Int)
- **Purpose**: Successful review count
- **Use case**: Calculate accuracy rate

### Metadata Fields

#### `notes` (String?)
- **Purpose**: User's personal notes about the poem
- **Use case**: "Remember: this was written in exile"

#### `addedAt` (DateTime)
- **Purpose**: When poem was added to memorization list
- **Use case**: Sort by "recently added"

#### `updatedAt` (DateTime)
- **Purpose**: Last update time
- **Use case**: Track activity

## Spaced Repetition Algorithm

### SM-2 Algorithm (Simplified)

```typescript
function calculateNextReview(
  quality: number,    // 0-5 (0=total fail, 5=perfect)
  easeFactor: number,
  interval: number,
  repetitions: number
): { newEaseFactor, newInterval, newRepetitions } {

  // Update ease factor
  let newEaseFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  newEaseFactor = Math.max(1.3, newEaseFactor); // Minimum 1.3

  let newInterval: number;
  let newRepetitions: number;

  if (quality < 3) {
    // Failed review - restart
    newRepetitions = 0;
    newInterval = 1;
  } else {
    // Successful review
    newRepetitions = repetitions + 1;

    if (repetitions === 0) {
      newInterval = 1;
    } else if (repetitions === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(interval * newEaseFactor);
    }
  }

  return { newEaseFactor, newInterval, newRepetitions };
}
```

### Mastery Level Progression

```typescript
function getMasteryLevel(interval: number, repetitions: number): MasteryLevel {
  if (repetitions === 0) return 'NEW';
  if (interval < 3) return 'LEARNING';
  if (interval < 7) return 'YOUNG';
  if (interval < 30) return 'MATURE';
  return 'MASTERED';
}
```

## Query Examples

### Get poems due for review

```typescript
const duePoems = await prisma.userMemorization.findMany({
  where: {
    userId: user.id,
    nextReviewAt: {
      lte: new Date(), // Due today or overdue
    },
  },
  include: {
    poem: {
      include: { poet: true, dynasty: true },
    },
  },
  orderBy: {
    nextReviewAt: 'asc', // Most overdue first
  },
});
```

### Get learning statistics

```typescript
const stats = await prisma.userMemorization.groupBy({
  by: ['masteryLevel'],
  where: { userId: user.id },
  _count: true,
});

// Result: { NEW: 5, LEARNING: 10, YOUNG: 8, MATURE: 15, MASTERED: 3 }
```

### Get poems by mastery level

```typescript
const masteredPoems = await prisma.userMemorization.findMany({
  where: {
    userId: user.id,
    masteryLevel: 'MASTERED',
  },
  include: { poem: true },
});
```

## Indexes

We've added indexes for optimal query performance:

1. `@@index([userId])` - Find all poems for a user
2. `@@index([poemId])` - Find all users memorizing a poem
3. `@@index([nextReviewAt])` - Find due reviews efficiently
4. `@@index([masteryLevel])` - Filter by mastery level

## Email Reminder Strategy

### When to send reminders

```typescript
// Daily cron job
const usersWithDueReviews = await prisma.user.findMany({
  where: {
    emailVerified: true,
    memorizations: {
      some: {
        nextReviewAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    },
  },
  include: {
    memorizations: {
      where: {
        nextReviewAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: { poem: true },
    },
  },
});

// Send email to each user
for (const user of usersWithDueReviews) {
  await sendReviewReminderEmail(user.email, user.memorizations);
}
```

## Future Enhancements

1. **Difficulty Presets**
   - Easy poems: higher initial easeFactor (2.8)
   - Hard poems: lower initial easeFactor (2.0)

2. **Study Sessions**
   - Track time spent reviewing
   - Gamification (streaks, points)

3. **Custom Scheduling**
   - User preferences for review frequency
   - "Intensive mode" vs "Relaxed mode"

4. **Analytics**
   - Retention rate curves
   - Optimal review time of day
   - Poem difficulty rankings

5. **Collaborative Features**
   - Share study decks
   - Compare progress with friends

## Migration Steps

1. Run migration:
   ```bash
   npx prisma migrate dev --name add_memorization_feature
   ```

2. Generate client:
   ```bash
   npx prisma generate
   ```

3. Test queries in Prisma Studio:
   ```bash
   npx prisma studio
   ```
