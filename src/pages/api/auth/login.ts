export const prerender = false;

import type { APIRoute } from 'astro';
import { createHash, timingSafeEqual } from 'node:crypto';
import {
  createSessionToken,
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
} from '../../../lib/session';
import { requireEnv } from '../../../lib/env';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const submitted = String(form.get('password') ?? '');

  // Hashing both sides yields equal-length buffers so timingSafeEqual applies.
  const submittedHash = createHash('sha256').update(submitted).digest();
  const expectedHash = createHash('sha256')
    .update(requireEnv('TAILOR_PASSWORD'))
    .digest();

  if (!timingSafeEqual(submittedHash, expectedHash)) {
    // Slow down brute-force attempts a little; no server state for a real lockout.
    await new Promise((resolve) => setTimeout(resolve, 500));
    return redirect('/tailor/login?error=1');
  }

  cookies.set(SESSION_COOKIE, createSessionToken(requireEnv('SESSION_SECRET')), {
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return redirect('/tailor');
};
