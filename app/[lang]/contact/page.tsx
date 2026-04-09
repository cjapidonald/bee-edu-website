import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { buildPageMetadata } from "@/lib/seo/metadata";
import ContactPageClient from "./ContactPageClient";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : (await params).lang === "vi" ? "vi" : "en";

  const titles: Record<string, string> = {
    en: "Contact | KiwiBee",
    "zh-HK": "聯絡我們 | KiwiBee",
  };

  const descriptions: Record<string, string> = {
    en: "Talk to KiwiBee. Email hello@kiwibee.io or WhatsApp +852 94954912.",
    "zh-HK": "聯絡 KiwiBee。電郵 hello@kiwibee.io 或 WhatsApp +852 94954912。",
  };

  return buildPageMetadata({
    lang,
    path: "/contact",
    title: titles[lang] ?? titles.en,
    description: descriptions[lang] ?? descriptions.en,
  });
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  return <ContactPageClient params={resolvedParams} />;
}
