import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const i18n = {
  defaultLocale: 'vi' as const,
  locales: ['vi', 'en', 'zh-HK'] as const,
};

type Locale = (typeof i18n)['locales'][number];

const WRITE_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

const isProd = process.env.NODE_ENV === 'production';

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

function getLocale(request: NextRequest): Locale {
  // Check for locale in cookie (user preference from manual language switch)
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value as Locale | undefined;
  if (cookieLocale && i18n.locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // Default to English globally — users can switch to Chinese manually
  return i18n.defaultLocale;
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
  if (WRITE_METHODS.has(method)) {
    const candidate = getOriginCandidate(request);
    if (candidate === 'null' || candidate === null) {
      return new NextResponse('Forbidden', { status: 403 });
    }
    if (candidate !== request.nextUrl.origin) {
      return new NextResponse('Forbidden', { status: 403 });
    }
  }

  const isReportOnly = !isProd;
  const cspHeader = buildCspHeader(isReportOnly);
  const cspHeaderName = isReportOnly
    ? 'Content-Security-Policy-Report-Only'
    : 'Content-Security-Policy';

  // Skip locale logic for static files, API routes, and Next.js internals
  // (CSRF check above still applies to /api routes)
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') // Files with extensions
  ) {
    const response = NextResponse.next();
    response.headers.set(cspHeaderName, cspHeader);
    return response;
  }

  // Helper: apply CSP header to a response
  function withCsp(response: NextResponse): NextResponse {
    response.headers.set(cspHeaderName, cspHeader);
    return response;
  }

  // Check if the pathname already has a locale
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    if (pathname === `/${i18n.defaultLocale}` || pathname.startsWith(`/${i18n.defaultLocale}/`)) {
      if (!isSafeMethod) {
        return withCsp(NextResponse.next());
      }
      const url = request.nextUrl.clone();
      const withoutLocale = pathname.replace(new RegExp(`^/${i18n.defaultLocale}(?=/|$)`), "") || "/";
      url.pathname = withoutLocale;
      return withCsp(NextResponse.redirect(url, 308));
    }

    return withCsp(NextResponse.next());
  }

  // Redirect to locale-prefixed path
  const locale = getLocale(request);

  // For default locale (en), don't add prefix to URL
  // This keeps English URLs clean: / instead of /en
  if (locale === i18n.defaultLocale) {
    // Rewrite internally to include locale in the path for routing
    const url = new URL(`/${locale}${pathname}`, request.url);
    url.search = request.nextUrl.search;
    return withCsp(NextResponse.rewrite(url));
  }

  // For other locales, redirect to locale-prefixed path
  const url = new URL(`/${locale}${pathname}`, request.url);
  url.search = request.nextUrl.search;
  if (!isSafeMethod) {
    return withCsp(NextResponse.rewrite(url));
  }
  return withCsp(NextResponse.redirect(url));
}

export const config = {
  matcher: [
    // Match all pathnames except for Next.js internals and static files
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
};
