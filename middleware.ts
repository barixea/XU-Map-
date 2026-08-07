import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth-edge';

export async function middleware(request: NextRequest) {
  const session = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
  if (session) return NextResponse.next();

  if (request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const loginUrl = new URL('/admin/login', request.url);
  loginUrl.searchParams.set('next', request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

/**
 * Coarse gate only — every admin route handler re-checks the session itself.
 * `/admin/login` and `/api/admin/login` are deliberately excluded so the
 * unauthenticated flow can reach them.
 */
export const config = {
  matcher: ['/admin/photos/:path*', '/api/admin/photos/:path*'],
};
