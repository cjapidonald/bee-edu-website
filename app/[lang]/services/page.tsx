import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { buildPageMetadata } from "@/lib/seo/metadata";
import ServicesPageClient from "./ServicesPageClient";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : "en";

  const titles: Record<string, string> = {
    en: "Implementation & Support Services | KiwiBee",
    "zh-HK": "實施與支援服務 | KiwiBee",
  };

  const descriptions: Record<string, string> = {
    en: "Expert guidance to help you get the most out of KiwiBee—from setup and onboarding to ongoing optimization.",
    "zh-HK": "從設定與導入到持續優化，提供專業實施與支援服務，協助你充分發揮 KiwiBee。",
  };

  return buildPageMetadata({
    lang,
    path: "/services",
    title: titles[lang] ?? titles.en,
    description: descriptions[lang] ?? descriptions.en,
  });
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  return <ServicesPageClient params={resolvedParams} />;
}
