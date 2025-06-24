// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_ONLY_PATHS = ['/login', '/sign-up'];
const PROTECTED_EXACT_MATCHES: RegExp[] = [/^\/vote\/[^/]+\/[^/]+\/aggregate$/, /^\/vote\/[^/]+\/(?!list$)[^/]+$/];

/**
 * Edge 런타임에서는 http 외부 fetch가 막히므로
 * refreshToken 쿠키 존재만으로 로그인 여부를 판단.
 */
function isLoggedIn(req: NextRequest): boolean {
  return Boolean(req.cookies.get('refreshToken')?.value);
}

function matchesProtectedPath(pathname: string): boolean {
  return PROTECTED_EXACT_MATCHES.some((regex) => regex.test(pathname));
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const loggedIn = isLoggedIn(req);

  if (matchesProtectedPath(pathname) && !loggedIn) {
    return NextResponse.redirect(new URL('/vote/list', req.url));
  }

  if (PUBLIC_ONLY_PATHS.includes(pathname) && loggedIn) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/sign-up', '/vote/:voteType/:castType', '/vote/:voteType/:castType/aggregate'],
};
