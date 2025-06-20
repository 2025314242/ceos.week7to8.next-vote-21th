// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_PATHS = ['/vote'];
const PUBLIC_ONLY_PATHS = ['/login', '/sign-up'];

/**
 * Edge 런타임에서는 http 외부 fetch가 막히므로
 * refreshToken 쿠키 존재만으로 로그인 여부를 판단.
 */
function isLoggedIn(req: NextRequest): boolean {
  return Boolean(req.cookies.get('refreshToken')?.value);
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const loggedIn = isLoggedIn(req);

  if (PROTECTED_PATHS.some((p) => pathname.startsWith(p)) && !loggedIn) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (PUBLIC_ONLY_PATHS.includes(pathname) && loggedIn) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/vote/:path*', '/login', '/sign-up'],
};
