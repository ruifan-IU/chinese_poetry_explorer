import crypto from 'crypto';

/**
 * Generate a secure random token for email verification
 * Returns a 32-byte hex string (64 characters)
 */
export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Generate token expiry time (24 hours from now)
 */
export function generateTokenExpiry(): Date {
  const expiry = new Date();
  expiry.setHours(expiry.getHours() + 24);
  return expiry;
}

/**
 * Check if a token has expired
 */
export function isTokenExpired(tokenExpiry: Date | null): boolean {
  if (!tokenExpiry) return true;
  return new Date() > tokenExpiry;
}
