import { defineMiddleware } from 'astro:middleware';
import { SESSION_COOKIE, verifySessionToken } from './lib/session';
import { requireEnv } from './lib/env';

const PUBLIC_PATHS = new Set(['/tailor/login', '/api/auth/login']);

export const onRequest = defineMiddleware((context, next) => {
  const pathname = context.url.pathname.replace(/\/+$/, '') || '/';
  const guarded =
    pathname === '/tailor' ||
    pathname.startsWith('/tailor/') ||
    pathname === '/api' ||
    pathname.startsWith('/api/');
  if (!guarded || PUBLIC_PATHS.has(pathname)) return next();

  const token = context.cookies.get(SESSION_COOKIE)?.value;
  if (verifySessionToken(token, requireEnv('SESSION_SECRET'))) return next();

  if (pathname.startsWith('/api')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return context.redirect('/tailor/login');
});
