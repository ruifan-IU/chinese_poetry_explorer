# Email Verification Setup Guide

## What We Built

We've implemented a complete email verification system for your Chinese Poetry Explorer app using Resend. Here's what was added:

### 1. Database Changes
- Added `emailVerified` (boolean), `verificationToken`, and `tokenExpiry` fields to User model
- **ACTION REQUIRED**: Run the migration with `npx prisma migrate dev --name add_email_verification`

### 2. Email Service (Resend)
- Installed Resend package
- Created email utility functions in `lib/email.ts`
- **ACTION REQUIRED**: Get your Resend API key and add it to `.env`

### 3. New API Endpoints
- `/api/auth/verify-email` - Verifies email when user clicks link
- `/api/auth/resend-verification` - Resends verification email

### 4. New Pages & Components
- `/verify-email` - Landing page for email verification
- `VerificationBanner` - Shows banner when email not verified
- Updated Navbar to show banner for unverified users

### 5. Updated Existing Code
- Signup now generates token and sends verification email
- Login includes `emailVerified` in JWT payload
- Auth token now includes verification status

## Setup Instructions

### Step 1: Run Database Migration

```bash
npx prisma migrate dev --name add_email_verification
```

This will create the new database fields and update your Prisma client.

### Step 2: Get Resend API Key

1. Go to [resend.com](https://resend.com) and sign up
2. Verify your email with Resend
3. Create an API key in the dashboard
4. Copy the API key (starts with `re_...`)

### Step 3: Update Environment Variables

Open your `.env` file and replace:

```env
RESEND_API_KEY=your_resend_api_key_here
```

With your actual Resend API key:

```env
RESEND_API_KEY=re_abc123xyz...
```

### Step 4: Configure Email Sender

**For Development/Testing:**
- Use `onboarding@resend.dev` (already set in `.env`)
- Emails can only be sent to the email you signed up with on Resend
- No domain verification needed

**For Production:**
1. Add your domain in Resend dashboard
2. Add the DNS records to your domain
3. Wait for verification (usually a few minutes)
4. Update `FROM_EMAIL` in `.env` to your domain email:
   ```env
   FROM_EMAIL=noreply@yourdomain.com
   ```

### Step 5: Test the Flow

1. Start your dev server: `npm run dev`
2. Sign up for a new account
3. Check your email for the verification link
4. Click the link to verify
5. You should see a success page and the banner should disappear

## How It Works

### Signup Flow
1. User signs up → Account created with `emailVerified: false`
2. Random verification token generated (32-byte hex string)
3. Token saved to database with 24-hour expiry
4. Verification email sent with link: `http://localhost:3000/verify-email?token=abc123...`
5. User logs in immediately (but sees verification banner)

### Verification Flow
1. User clicks link in email
2. Browser opens `/verify-email?token=abc123...`
3. Page calls `/api/auth/verify-email?token=abc123...`
4. API validates token and checks expiry
5. If valid: Sets `emailVerified: true`, clears token
6. Redirects to home page

### Resend Verification
1. User clicks "Resend" in banner
2. New token generated, old one replaced
3. New email sent
4. Process repeats

## Files Created/Modified

### New Files
- `lib/email.ts` - Email sending functions
- `lib/tokens.ts` - Token generation utilities
- `app/api/auth/verify-email/route.ts` - Verification endpoint
- `app/api/auth/resend-verification/route.ts` - Resend endpoint
- `app/verify-email/page.tsx` - Verification page
- `app/components/VerificationBanner.tsx` - Banner component

### Modified Files
- `prisma/schema.prisma` - Added User fields
- `.env` - Added Resend config
- `lib/auth.ts` - Added `emailVerified` to JWT
- `app/api/auth/signup/route.ts` - Generate token, send email
- `app/api/auth/login/route.ts` - Include verification status
- `app/components/Navbar.tsx` - Show verification banner

## Future Enhancements (Optional)

### Require Verification for Features
You can optionally require email verification for certain actions:

```typescript
// In any API route
const user = await getCurrentUser();
if (!user.emailVerified) {
  return NextResponse.json(
    { error: 'Please verify your email first' },
    { status: 403 }
  );
}
```

### Add to Favorites (Example)
```typescript
// In app/api/favorites/route.ts
if (!user.emailVerified) {
  return NextResponse.json(
    { error: 'Please verify your email to save favorites' },
    { status: 403 }
  );
}
```

### Password Reset
The `sendPasswordResetEmail` function is already implemented in `lib/email.ts`. You just need to create the password reset flow.

### Email Preferences
For your memorization reminder feature, you can add:
- `emailNotifications` boolean field
- Email frequency preferences
- Unsubscribe link in emails

## Troubleshooting

### Email Not Sending
- Check that `RESEND_API_KEY` is correct in `.env`
- Check server logs for error messages
- Verify you're using `onboarding@resend.dev` for testing
- Make sure you're sending to the email you signed up with on Resend

### Token Expired
- Tokens expire after 24 hours
- User can click "Resend" to get a new token
- Old tokens are automatically replaced

### Already Verified
- Once verified, clicking the link again shows "Email already verified"
- Banner disappears after verification

## Security Notes

- Tokens are cryptographically random (32 bytes)
- Tokens are unique per user
- Tokens expire after 24 hours
- Tokens are deleted after verification
- User existence is not revealed in resend endpoint
- All emails sent over HTTPS

## Cost

### Resend Free Tier
- 3,000 emails/month
- 100 emails/day
- Perfect for development and small apps

### Production
- $20/month for 50,000 emails
- More than enough for most applications
