import { jwtVerify } from 'jose';

export const SESSION_COOKIE = 'xu_admin_session';
export const MAX_AGE_SECONDS = 60 * 60 * 8;

/**
 * Edge-safe half of the auth module: `jose` only, no `next/headers`.
 * Middleware runs on the edge runtime and cannot import server-only APIs,
 * so anything it needs lives here.
 */
export function sessionSecret() {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value) throw new Error('ADMIN_SESSION_SECRET is not set');
  return new TextEncoder().encode(value);
}

export async function verifySessionToken(token: string | undefined) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, sessionSecret(), { algorithms: ['HS256'] });
    return payload.role === 'admin' ? payload : null;
  } catch {
    return null;
  }
}
