import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// URL slugs visible in the browser (vn, en)
const urlSlugs = ['vn', 'en'];
// Map URL slug → internal locale used by [lang] folder
const slugToLocale: Record<string, string> = { vn: 'vi', en: 'en' };
// Legacy prefixes that need redirects
const legacySlugs: Record<string, string> = { vi: 'vn', 'zh-HK': 'en' };
const defaultSlug = 'en';

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

function getPreferredSlug(request: NextRequest): string {
  const cookieSlug = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieSlug && urlSlugs.indexOf(cookieSlug) !== -1) {
    return cookieSlug;
  }
  return defaultSlug;
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

function getSlugFromPath(pathname: string): string | null {
  for (const slug of urlSlugs) {
    if (pathname === '/' + slug || pathname.startsWith('/' + slug + '/')) {
      return slug;
    }
  }
  return null;
}

function getLegacySlugFromPath(pathname: string): { oldSlug: string; newSlug: string } | null {
  for (const [old, replacement] of Object.entries(legacySlugs)) {
    if (pathname === '/' + old || pathname.startsWith('/' + old + '/')) {
      return { oldSlug: old, newSlug: replacement };
    }
  }
  return null;
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

  // --- Handle legacy locale prefixes (/vi → /vn, /zh-HK → /en) ---
  const legacy = getLegacySlugFromPath(pathname);
  if (legacy && isSafeMethod) {
    const url = request.nextUrl.clone();
    const rest = pathname === '/' + legacy.oldSlug
      ? ''
      : pathname.substring(legacy.oldSlug.length + 1);
    url.pathname = '/' + legacy.newSlug + rest;
    return withCsp(NextResponse.redirect(url, 308));
  }

  // --- Handle known URL slugs (/vn/..., /en/...) ---
  const slug = getSlugFromPath(pathname);
  if (slug) {
    const locale = slugToLocale[slug];
    if (locale !== slug) {
      // Rewrite /vn/... → /vi/... internally (URL stays /vn/...)
      const url = request.nextUrl.clone();
      const rest = pathname === '/' + slug
        ? ''
        : pathname.substring(slug.length + 1);
      url.pathname = '/' + locale + rest;
      return withCsp(NextResponse.rewrite(url));
    }
    // /en/... → [lang]=en, no rewrite needed
    return withCsp(NextResponse.next());
  }

  // --- No locale slug in path: redirect to preferred slug ---
  const preferred = getPreferredSlug(request);
  const url = new URL('/' + preferred + pathname, request.url);
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
