import type { Metadata, Viewport } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://beeeducation.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Bee Education AI (Bee Education) - AI-Native School Management Platform',
  description: 'Transform education with Bee Education AI (also searched as Bee Education). One platform for curriculum, scheduling, behavior tracking, gradebook, and AI-powered insights.',
  keywords: 'Bee Education, Bee Education, school management, AI education, curriculum planning, gradebook, ClassSpark behavior tracking',
  manifest: '/manifest.json',
  verification: {
    google: 'BQkRrgKoFbYF3Eyds0sD-R_oVJZ-Z9U_aMbINcYXtw8',
  },
};

export const viewport: Viewport = {
  themeColor: '#2866F0',
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
