import type { Metadata } from "next";
import { cache } from "react";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import LandingPageClient from "./LandingPageClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kiwibee.io";

const getLocalizedPath = (lang: Locale, path: string) => {
  if (lang === "en") return path;
  return `/${lang}${path}`;
};

const loadDictionary = cache(async (lang: Locale) => getDictionary(lang));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : "en";

  const title =
    lang === "zh-HK"
      ? "KiwiBee- AI 原生學校管理平台"
      : "KiwiBee - AI-Native School Management Platform";
  const description =
    lang === "zh-HK"
      ? "KiwiBee提供一站式學校管理：課程、排課、行為追蹤、成績冊與 AI 智能分析。"
      : "KiwiBee is an AI-native school management platform for curriculum, scheduling, behavior tracking, gradebook, and AI-powered insights.";
  const canonical = getLocalizedPath(lang, "/");
  const ogImageUrl = new URL("/og-default.png", siteUrl);
  const keywords =
    lang === "zh-HK"
      ? [
          "KiwiBee",
          "KiwiBee",
          "KiwiBee",
          "學校管理系統",
          "SIS",
          "LMS",
          "AI 學校管理",
        ]
      : [
          "KiwiBee",
          "KiwiBee",
          "KiwiBee",
          "school management system",
          "SIS",
          "LMS",
          "AI school management",
        ];

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: {
        en: "/",
        "zh-HK": "/zh-HK",
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "KiwiBee",
      type: "website",
      images: [{ url: ogImageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl.toString()],
    },
  };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : "en";
  const dict = await loadDictionary(lang);
  const localizedHomeUrl = new URL(getLocalizedPath(lang, "/"), siteUrl).toString();
  const orgDescription =
    lang === "zh-HK"
      ? "KiwiBee是一個 AI 原生學校管理平台。"
      : "KiwiBee is an AI-native school management platform.";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}#organization`,
        name: "KiwiBee",
        alternateName: ["KiwiBee", "KiwiBee"],
        url: siteUrl,
        logo: `${siteUrl}/logo.svg`,
        description: orgDescription,
        sameAs: [
          "https://www.facebook.com/profile.php?id=61578235291840",
          "https://www.instagram.com/elementals/",
          "https://www.linkedin.com/company/elementals",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        name: "KiwiBee",
        alternateName: ["KiwiBee", "KiwiBee"],
        url: siteUrl,
        inLanguage: lang,
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${localizedHomeUrl}#software`,
        name: "KiwiBee",
        alternateName: "KiwiBee",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web, iOS, Android",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        url: localizedHomeUrl,
        publisher: {
          "@id": `${siteUrl}#organization`,
        },
      },
    ],
  };

  const structuredDataJson = JSON.stringify(structuredData).replace(/</g, "\\u003c");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredDataJson }} />
      <LandingPageClient lang={lang} dict={dict} />
    </>
  );
}
