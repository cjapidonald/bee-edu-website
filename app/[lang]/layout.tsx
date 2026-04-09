import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Fraunces, IBM_Plex_Sans } from 'next/font/google';
import { i18n, type Locale, htmlLangMap } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import DeferredChatbot from '@/components/Chatbot/DeferredChatbot';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : (await params).lang === "vi" ? "vi" : "en";

  const titles: Record<string, string> = {
    en: 'KiwiBee - AI-Native School Management Platform',
    vi: 'KiwiBee - Nền tảng Quản lý Trường học AI',
  };

  const descriptions: Record<string, string> = {
    en: 'Transform education with KiwiBee. One platform for curriculum, scheduling, behavior tracking, gradebook, and AI-powered insights.',
    vi: 'Chuyển đổi giáo dục với KiwiBee. Một nền tảng cho chương trình, lịch học, theo dõi hành vi, sổ điểm và phân tích AI.',
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : (await params).lang === "vi" ? "vi" : "en";
  const htmlLang = htmlLangMap[lang];
  const dict = await getDictionary(lang);

  return (
    <html
      lang={htmlLang}
      className={`${ibmPlexSans.variable} ${fraunces.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-gray-950 text-gray-100 font-body antialiased">
        <Suspense fallback={null}>
          <Header lang={lang} dict={dict} />
        </Suspense>
        <main id="main-content">
          {children}
        </main>
        <Footer lang={lang} dict={dict} />
        <DeferredChatbot />
      </body>
    </html>
  );
}
