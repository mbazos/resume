/**
 * Stateless session tokens for the /tailor login: `<expiresMs>.<hmac>` signed
 * with SESSION_SECRET. No server-side session storage needed.
 */
import { createHmac, timingSafeEqual } from 'node:crypto';

export const SESSION_COOKIE = 'tailor_session';
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 14; // 14 days

function sign(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

export function createSessionToken(secret: string): string {
  const expires = String(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);
  return `${expires}.${sign(expires, secret)}`;
}

export function verifySessionToken(
  token: string | undefined,
  secret: string
): boolean {
  if (!token) return false;
  const [expires, signature] = token.split('.');
  if (!expires || !signature) return false;
  const expected = Buffer.from(sign(expires, secret));
  const actual = Buffer.from(signature);
  if (expected.length !== actual.length) return false;
  if (!timingSafeEqual(expected, actual)) return false;
  return Number(expires) > Date.now();
}
