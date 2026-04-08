import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { buildPageMetadata } from "@/lib/seo/metadata";
import PricingPageClient from "./PricingPageClient";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : "en";

  const titles: Record<string, string> = {
    en: "Pricing | Elementals",
    "zh-HK": "價格 | Elementals",
  };

  const descriptions: Record<string, string> = {
    en: "School All-in-One pricing with custom annual quotes. Contact sales for package details, rollout scope, and implementation timeline.",
    "zh-HK": "School All-in-One 學校方案定制定價。請聯絡銷售了解方案內容、導入範圍及時間表。",
  };

  return buildPageMetadata({
    lang,
    path: "/pricing",
    title: titles[lang] ?? titles.en,
    description: descriptions[lang] ?? descriptions.en,
  });
}

export default async function PricingPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  return <PricingPageClient params={resolvedParams} />;
}
