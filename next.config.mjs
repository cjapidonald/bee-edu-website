/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // Image optimization settings
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // Experimental features
  experimental: {
    // Enable server actions
    serverActions: {
      bodySizeLimit: '2mb',
    },
    // Tree-shake heavy icon/component libraries for smaller bundles
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // Headers for security and caching
  async headers() {
    const securityHeaders = [
      {
        key: 'X-DNS-Prefetch-Control',
        value: 'on',
      },
      {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin',
      },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=31536000; includeSubDomains; preload',
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
      },
      {
        key: 'X-Permitted-Cross-Domain-Policies',
        value: 'none',
      },
      {
        key: 'Cross-Origin-Opener-Policy',
        value: 'same-origin',
      },
      {
        key: 'Cross-Origin-Resource-Policy',
        value: 'same-origin',
      },
    ];

    // CSP header is set dynamically in middleware.ts (with per-request nonces)

    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },

  // Redirects for legacy URLs
  async redirects() {
    const localizeDestination = (locale, destination) => {
      if (destination.startsWith('http')) return destination;
      if (locale === 'en') return destination;
      if (destination === '/') return `/${locale}`;
      return `/${locale}${destination}`;
    };

    const withLocaleVariants = (redirect) => {
      const { source, destination, permanent = true } = redirect;

      return [
        {
          source,
          destination: localizeDestination('en', destination),
          permanent,
        },
        {
          source: `/en${source}`,
          destination: localizeDestination('en', destination),
          permanent,
        },
        {
          source: `/zh-HK${source}`,
          destination: localizeDestination('zh-HK', destination),
          permanent,
        },
      ];
    };

    const legacyRedirects = [
      // Old home routes
      { source: '/home', destination: '/' },

      // Old sitemap page route
      { source: '/sitemap', destination: '/sitemap-page' },

      // Legacy feature slugs (Vite/React)
      { source: '/features/qa', destination: '/features/qa-accreditation' },
      { source: '/features/kpi', destination: '/features/teacher-kpi' },
      { source: '/features/surveys', destination: '/features/survey' },
      { source: '/features/news', destination: '/features/school-news' },
      { source: '/features/booking', destination: '/features/resource-booking' },
      { source: '/features/professional-development', destination: '/features/professional-dev' },
      { source: '/features/pilots', destination: '/features/pilot-projects' },
      { source: '/features/policies', destination: '/features/policy-management' },
      { source: '/features/sales', destination: '/features/sales-admin' },
      { source: '/features/teaching-assistant', destination: '/features/teaching-assistants' },
      { source: '/features/classdojo', destination: '/features/classspark' },

      // Legacy app-like routes (now on app.elementals.com)
      { source: '/auth', destination: 'https://app.elementals.com/login' },
      { source: '/account/:path*', destination: 'https://app.elementals.com/login' },
      { source: '/teacher/:path*', destination: 'https://app.elementals.com/login' },
      { source: '/student/:path*', destination: 'https://app.elementals.com/login' },
      { source: '/dashboard/:path*', destination: 'https://app.elementals.com/login' },
      { source: '/lesson-builder/:path*', destination: 'https://app.elementals.com/login' },
      { source: '/my-profile', destination: 'https://app.elementals.com/login' },
      { source: '/profile', destination: 'https://app.elementals.com/login' },

      // Legacy marketing routes that were removed
      { source: '/events', destination: '/blog' },
      { source: '/events/:path*', destination: '/blog' },
      { source: '/blog/composer', destination: '/blog' },
    ];

    return legacyRedirects.flatMap(withLocaleVariants);
  },
};

export default nextConfig;
