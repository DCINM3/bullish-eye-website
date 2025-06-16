import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protect /admin routes
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only run for /admin routes (but not /admin/login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // Check for session cookie (set this on login)
    const session = request.cookies.get('admin-session');
    if (!session) {
      // Redirect to login if not authenticated
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
