import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const defaultLocale = 'vi';
const locales = ['vi', 'en', 'zh-HK'];

const WRITE_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE'];

function buildCspHeader(reportOnly: boolean): string {
  const scriptSrc = reportOnly
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
    : "script-src 'self' 'unsafe-inline'";

  const directives = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'self'",
    "frame-src 'none'",
    "form-action 'self'",
    "img-src 'self' data: https:",
    "font-src 'self' data: https:",
    "connect-src 'self' https://zdikbcmwkimctkywbidr.supabase.co wss://zdikbcmwkimctkywbidr.supabase.co",
    scriptSrc,
    "script-src-attr 'none'",
    "style-src 'self' 'unsafe-inline'",
  ];
  if (!reportOnly) {
    directives.push('upgrade-insecure-requests');
  }
  return directives.join('; ');
}

function getLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.indexOf(cookieLocale) !== -1) {
    return cookieLocale;
  }
  return defaultLocale;
}

function getOriginCandidate(request: NextRequest): string | null {
  const origin = request.headers.get('origin');
  if (origin) return origin;

  const referer = request.headers.get('referer');
  if (!referer) return null;

  try {
    return new URL(referer).origin;
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method.toUpperCase();
  const isSafeMethod = method === 'GET' || method === 'HEAD' || method === 'OPTIONS';

  // Basic CSRF mitigation: enforce same-origin on state-changing requests
  if (WRITE_METHODS.indexOf(method) !== -1) {
    const candidate = getOriginCandidate(request);
    if (candidate === 'null' || candidate === null) {
      return new NextResponse('Forbidden', { status: 403 });
    }
    if (candidate !== request.nextUrl.origin) {
      return new NextResponse('Forbidden', { status: 403 });
    }
  }

  const isProd = process.env.NODE_ENV === 'production';
  const isReportOnly = !isProd;
  const cspHeader = buildCspHeader(isReportOnly);
  const cspHeaderName = isReportOnly
    ? 'Content-Security-Policy-Report-Only'
    : 'Content-Security-Policy';

  // Skip locale logic for static files, API routes, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    const response = NextResponse.next();
    response.headers.set(cspHeaderName, cspHeader);
    return response;
  }

  function withCsp(response: NextResponse): NextResponse {
    response.headers.set(cspHeaderName, cspHeader);
    return response;
  }

  // Check if the pathname already has a locale
  let pathnameHasLocale = false;
  for (let i = 0; i < locales.length; i++) {
    const loc = locales[i];
    if (pathname === '/' + loc || pathname.startsWith('/' + loc + '/')) {
      pathnameHasLocale = true;
      break;
    }
  }

  if (pathnameHasLocale) {
    if (pathname === '/' + defaultLocale || pathname.startsWith('/' + defaultLocale + '/')) {
      if (!isSafeMethod) {
        return withCsp(NextResponse.next());
      }
      const url = request.nextUrl.clone();
      let withoutLocale = pathname;
      if (pathname === '/' + defaultLocale) {
        withoutLocale = '/';
      } else {
        withoutLocale = pathname.substring(defaultLocale.length + 1);
      }
      url.pathname = withoutLocale || '/';
      return withCsp(NextResponse.redirect(url, 308));
    }

    return withCsp(NextResponse.next());
  }

  // Redirect to locale-prefixed path
  const locale = getLocale(request);

  if (locale === defaultLocale) {
    const url = new URL('/' + locale + pathname, request.url);
    url.search = request.nextUrl.search;
    return withCsp(NextResponse.rewrite(url));
  }

  const url = new URL('/' + locale + pathname, request.url);
  url.search = request.nextUrl.search;
  if (!isSafeMethod) {
    return withCsp(NextResponse.rewrite(url));
  }
  return withCsp(NextResponse.redirect(url));
}

export const config = {
  matcher: [
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
};
