import type { Metadata, Viewport } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kiwibee.io';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'KiwiBee - AI-Native School Management Platform',
  description: 'Transform education with KiwiBee. One platform for curriculum, scheduling, behavior tracking, gradebook, and AI-powered insights.',
  keywords: 'KiwiBee, KiwiBee, school management, AI education, curriculum planning, gradebook, ClassSpark behavior tracking',
  manifest: '/manifest.json',
  verification: {
    google: 'BQkRrgKoFbYF3Eyds0sD-R_oVJZ-Z9U_aMbINcYXtw8',
  },
};

export const viewport: Viewport = {
  themeColor: '#16a34a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The actual html/body tags are in the [lang]/layout.tsx
  // This is just a passthrough wrapper for Next.js App Router
  return children;
}
