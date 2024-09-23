import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

// middleware will run only on these matches
export const config = {
  matcher: ['/category/:path*', '/login', '/signup', '/', '/verify/:path*'],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // if token is present and user is on auth pages then redirect to dahsboard
  if (
    token && (url.pathname === '/login') ){
    return NextResponse.redirect(new URL('/', request.url));
  }
//  if token is not present and user is on dashboard page then redirect to login page
  if (!token && (url.pathname === "/" || url.pathname.includes("category"))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}