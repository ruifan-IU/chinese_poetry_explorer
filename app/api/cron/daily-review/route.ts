import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getDegradedMasteryLevel } from '@/lib/spaced-repetition';
import { sendReviewReminderEmail } from '@/lib/email';

export async function GET(request: NextRequest) {
  // Verify the request is from our scheduler, not a random visitor
  const authHeader = request.headers.get('Authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Step 2: Degrade mastery levels for overdue items
  const degradationResult = await degradeMasteryLevels();

  // Step 3: Send reminder emails to users with due reviews
  const emailResult = await sendReminderEmails();

  return NextResponse.json({ success: true, degradationResult, emailResult });
}

async function degradeMasteryLevels() {
  // Fetch all overdue memorizations that aren't already at the floor level
  const overdueItems = await prisma.userMemorization.findMany({
    where: {
      nextReviewAt: { lt: new Date() },
      masteryLevel: { not: 'NEW' }, // NEW is the floor, nothing to degrade to
    },
    select: {
      id: true,
      masteryLevel: true,
      interval: true,
      nextReviewAt: true,
    },
  });

  // Calculate which items actually need a level change
  const itemsToUpdate = overdueItems.flatMap((item) => {
    const newLevel = getDegradedMasteryLevel(
      item.masteryLevel,
      item.interval,
      item.nextReviewAt!
    );
    return newLevel !== item.masteryLevel ? [{ id: item.id, newLevel }] : [];
  });

  // Write all updates in parallel
  await Promise.all(
    itemsToUpdate.map((item) =>
      prisma.userMemorization.update({
        where: { id: item.id },
        data: { masteryLevel: item.newLevel },
      })
    )
  );

  return { checked: overdueItems.length, degraded: itemsToUpdate.length };
}

async function sendReminderEmails() {
  // Fetch all due memorizations, including the user and poem details needed for the email
  const dueItems = await prisma.userMemorization.findMany({
    where: {
      nextReviewAt: { lte: new Date() },
      user: { emailVerified: true }, // Only send to verified emails
    },
    select: {
      user: { select: { id: true, email: true, name: true } },
      poem: { select: { title: true, poet: { select: { name: true } } } },
    },
  });

  // Group due poems by user
  const byUser = new Map<number, { email: string; name: string | null; poems: Array<{ title: string; poet: string }> }>();

  for (const item of dueItems) {
    const existing = byUser.get(item.user.id);
    const poem = { title: item.poem.title, poet: item.poem.poet.name };

    if (existing) {
      existing.poems.push(poem);
    } else {
      byUser.set(item.user.id, { email: item.user.email, name: item.user.name, poems: [poem] });
    }
  }

  // Send one email per user, collecting results
  const results = await Promise.allSettled(
    Array.from(byUser.values()).map((user) =>
      sendReviewReminderEmail(user.email, user.name, user.poems)
    )
  );

  const succeeded = results.filter((r) => r.status === 'fulfilled').length;
  const failed = results.filter((r) => r.status === 'rejected').length;

  return { usersNotified: succeeded, failed };
}
