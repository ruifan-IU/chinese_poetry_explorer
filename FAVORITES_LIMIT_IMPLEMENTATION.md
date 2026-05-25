# Soft Limit Implementation for Favorites

## Overview

We've implemented a soft limit system for user favorites that encourages email verification without blocking new users.

## Configuration

**Limit for Unverified Users:** 5 favorites

This can be easily changed by updating the `MAX_FAVORITES_UNVERIFIED` constant in:
- [app/api/favorites/route.ts:85](app/api/favorites/route.ts#L85)
- [app/favorites/page.tsx:20](app/favorites/page.tsx#L20)

## How It Works

### 1. **Backend Enforcement** ([app/api/favorites/route.ts:84-103](app/api/favorites/route.ts#L84-L103))

When an unverified user tries to add a favorite:
1. Check current favorite count
2. If count >= 5, return error with:
   - Clear error message
   - `requiresVerification: true` flag
   - Current count and max count

```typescript
if (!user.emailVerified) {
  const favoriteCount = await prisma.userFavorite.count({
    where: { userId: user.userId },
  });

  if (favoriteCount >= MAX_FAVORITES_UNVERIFIED) {
    return NextResponse.json({
      error: `Please verify your email to save more than ${MAX_FAVORITES_UNVERIFIED} favorites`,
      requiresVerification: true,
      currentCount: favoriteCount,
      maxCount: MAX_FAVORITES_UNVERIFIED,
    }, { status: 403 });
  }
}
```

### 2. **Frontend Handling** ([app/components/FavoriteButton.tsx:54-68](app/components/FavoriteButton.tsx#L54-L68))

When the limit is reached:
1. Detect the `requiresVerification` flag
2. Show a confirmation dialog with:
   - Current count and limit
   - Clear explanation
   - Option to verify
3. If user confirms, scroll to top to show verification banner

```typescript
if (data.requiresVerification) {
  const shouldVerify = confirm(
    `您已收藏 ${data.currentCount} 首诗词（未验证用户上限：${data.maxCount} 首）\n\n${data.error}\n\n是否前往验证邮箱？`
  );

  if (shouldVerify) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  return;
}
```

### 3. **Visual Warnings** ([app/favorites/page.tsx:20-52](app/favorites/page.tsx#L20-L52))

On the favorites page:
- Shows limit badge next to count for unverified users
- Warning banner appears when user has 4+ favorites
- Clear messaging about benefits of verification

```
您已收藏 4 首诗词 （未验证用户上限：5 首）

⚠️ 即将达到收藏上限
您还可以收藏 1 首诗词。验证邮箱即可解锁无限收藏！
```

## User Flow Examples

### Scenario 1: New User Tries Feature
1. User signs up (unverified)
2. Favorites 1-5 poems → Works perfectly ✅
3. Tries to favorite 6th poem → Shows limit dialog
4. User verifies email
5. Can now favorite unlimited poems ✅

### Scenario 2: User Hits Limit
1. User has 5 favorites (unverified)
2. Clicks favorite on 6th poem
3. See dialog: "您已收藏 5 首诗词（未验证用户上限：5 首）\n\nPlease verify your email to save more than 5 favorites\n\n是否前往验证邮箱？"
4. Clicks "OK" → Scrolls to verification banner
5. User can click "重新发送" to get verification email

### Scenario 3: Proactive Warning
1. User has 4 favorites (unverified)
2. Visits `/favorites` page
3. Sees warning banner: "即将达到收藏上限"
4. User verifies before hitting limit
5. Seamless experience ✅

## Benefits

### For Users
✅ **Try before commit** - Can test the feature (5 poems)
✅ **Clear communication** - Know exactly what the limit is
✅ **Easy upgrade path** - One click to start verification
✅ **No data loss** - Existing favorites are safe

### For the App
✅ **Spam prevention** - Limits prevent abuse
✅ **Email verification incentive** - Natural conversion funnel
✅ **Better data quality** - Verified users are more engaged
✅ **Scalable** - Easy to adjust limit if needed

## Customization

### Change the Limit

To change the limit (e.g., from 5 to 10):

1. Update `app/api/favorites/route.ts`:
   ```typescript
   const MAX_FAVORITES_UNVERIFIED = 10;
   ```

2. Update `app/favorites/page.tsx`:
   ```typescript
   const MAX_FAVORITES_UNVERIFIED = 10;
   ```

### Make It Stricter (Require Verification)

Remove the soft limit and require verification:

```typescript
// In app/api/favorites/route.ts
if (!user.emailVerified) {
  return NextResponse.json({
    error: 'Please verify your email to save favorites',
    requiresVerification: true,
  }, { status: 403 });
}
```

### Remove the Limit Entirely

Simply delete the limit check from `app/api/favorites/route.ts` (lines 84-103).

## Future Enhancements

### Potential Improvements
1. **Progressive limits** - 5 favorites for unverified, 50 for verified, unlimited for premium
2. **Email reminder** - Send email when user reaches 4/5 favorites
3. **Analytics** - Track conversion rate (users who verify after hitting limit)
4. **A/B testing** - Test different limit numbers (3, 5, 10) to optimize conversion

### For Memorization Feature
This same pattern can be used for:
- Memorization lists (unverified: 3 poems, verified: unlimited)
- Email reminders (unverified: disabled, verified: enabled)
- Export features (unverified: limited, verified: full access)

## Testing

### Test Cases

1. **Unverified user adds 1-5 favorites** → Should work
2. **Unverified user tries to add 6th favorite** → Should show limit dialog
3. **Verified user adds unlimited favorites** → Should work
4. **User verifies after hitting limit** → Can immediately add more
5. **Favorites page shows correct count and limit** → Visual feedback works

### Manual Testing Steps

1. Sign up with unverified account
2. Favorite 5 poems
3. Try to favorite 6th → Confirm dialog appears
4. Go to `/favorites` → See warning banner (at 4-5 favorites)
5. Verify email
6. Favorite more poems → No limit
7. Check `/favorites` → No warning banner

## Security Notes

- Limit is enforced server-side (can't be bypassed)
- Frontend UI is just for UX (provides feedback)
- Count is checked on every POST request
- Verified status comes from JWT (tamper-proof)

## Metrics to Track

Consider tracking:
- % of users who hit the limit
- % of users who verify after hitting limit
- Average favorites before verification
- Conversion rate by limit number (if A/B testing)
