import { NextRequest, NextResponse } from 'next/server';

export function isProtectedRoute(pathname: string): boolean {
  const protectedRoutes = ['/admin', '/admin/dashboard', '/admin/applications', '/admin/users', '/admin/export'];
  return protectedRoutes.some(route => pathname.startsWith(route));
}

export function authMiddleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  if (isProtectedRoute(pathname) && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}
