import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { buildPageMetadata } from "@/lib/seo/metadata";
import FeaturesPageClient from "./FeaturesPageClient";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : "en";

  const titles: Record<string, string> = {
    en: "Bee Education AI Features | School Management Platform",
    "zh-HK": "Bee Education AI 功能 | 學校管理平台",
  };

  const descriptions: Record<string, string> = {
    en: "Explore every module in Bee Education AI—AI teaching tools, scheduling, gradebook, compliance, and more.",
    "zh-HK": "探索 Bee Education AI 的所有模組——AI 教學工具、排課、成績冊、合規與更多。",
  };

  return buildPageMetadata({
    lang,
    path: "/features",
    title: titles[lang] ?? titles.en,
    description: descriptions[lang] ?? descriptions.en,
  });
}

export default async function FeaturesPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : "en";
  return <FeaturesPageClient params={{ lang }} />;
}
