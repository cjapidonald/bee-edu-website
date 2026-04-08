import type { Metadata } from "next";
import { cache } from "react";

import type { Locale } from "@/lib/i18n/config";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { SAMPLE_FAQS } from "@/data/sampleFaqs";

import FAQPageClient from "./FAQPageClient";

export const revalidate = 300;

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string | null;
  display_order: number;
  language?: string | null;
}

const fetchFaqs = cache(async (lang: Locale): Promise<FAQItem[]> => {
  const sample = SAMPLE_FAQS[lang] ?? SAMPLE_FAQS.en;

  if (!isSupabaseConfigured()) {
    return sample;
  }

  try {
    const supabase = createClient();

    const fetchFromSchema = async (schema: "hub" | "public"): Promise<FAQItem[] | null> => {
      const scoped = schema === "public" ? supabase.schema("public") : supabase;

      const withLanguage = await scoped
        .from("faq")
        .select("*")
        .eq("language", lang)
        .order("display_order");

      if (!withLanguage.error && (withLanguage.data?.length ?? 0) > 0) {
        return withLanguage.data as FAQItem[];
      }

      const withoutLanguage = await scoped
        .from("faq")
        .select("*")
        .order("display_order");

      if (!withoutLanguage.error && (withoutLanguage.data?.length ?? 0) > 0) {
        const filtered = (withoutLanguage.data as any[]).filter((row) => !row.language || row.language === lang);
        return (filtered.length > 0 ? filtered : withoutLanguage.data) as FAQItem[];
      }

      return null;
    };

    const hubFaqs = await fetchFromSchema("hub");
    if (hubFaqs) return hubFaqs;

    const publicFaqs = await fetchFromSchema("public");
    if (publicFaqs) return publicFaqs;

    return sample;
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return sample;
  }
});

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : "en";

  const titles: Record<string, string> = {
    en: "FAQ | Elementals",
    "zh-HK": "常見問題 | Elementals",
  };

  const descriptions: Record<string, string> = {
    en: "Answers to common questions about Elementals—features, pricing, implementation, and support.",
    "zh-HK": "Elementals 常見問題解答——功能、價格、導入與支援。",
  };

  return buildPageMetadata({
    lang,
    path: "/faq",
    title: titles[lang] ?? titles.en,
    description: descriptions[lang] ?? descriptions.en,
  });
}

export default async function FAQPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : "en";
  const faqs = await fetchFaqs(lang);

  return <FAQPageClient lang={lang} faqs={faqs} />;
}
