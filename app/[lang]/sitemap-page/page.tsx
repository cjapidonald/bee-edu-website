import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { buildPageMetadata } from "@/lib/seo/metadata";
import SitemapPageClient from "./SitemapPageClient";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : "en";

  const titles: Record<string, string> = {
    en: "Sitemap | Bee Education AI",
    "zh-HK": "網站地圖 | Bee Education AI",
  };

  const descriptions: Record<string, string> = {
    en: "Browse all pages and sections of Bee Education AI.",
    "zh-HK": "瀏覽 Bee Education AI 的所有頁面與分類。",
  };

  return buildPageMetadata({
    lang,
    path: "/sitemap-page",
    title: titles[lang] ?? titles.en,
    description: descriptions[lang] ?? descriptions.en,
  });
}

export default async function SitemapPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  return <SitemapPageClient params={resolvedParams} />;
}
