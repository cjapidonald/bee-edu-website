import type { Metadata } from "next";
import { cache } from "react";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import LandingPageClient from "./LandingPageClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://beeeducation.com";

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
      ? "Bee Education AI（Bee Education）- AI 原生學校管理平台"
      : "Bee Education AI (Bee Education) - AI-Native School Management Platform";
  const description =
    lang === "zh-HK"
      ? "Bee Education AI（亦稱 Bee Education）提供一站式學校管理：課程、排課、行為追蹤、成績冊與 AI 智能分析。"
      : "Bee Education AI (also searched as Bee Education) is an AI-native school management platform for curriculum, scheduling, behavior tracking, gradebook, and AI-powered insights.";
  const canonical = getLocalizedPath(lang, "/");
  const ogImageUrl = new URL("/og-default.png", siteUrl);
  const keywords =
    lang === "zh-HK"
      ? [
          "Bee Education",
          "Bee Education",
          "Bee Education AI",
          "學校管理系統",
          "SIS",
          "LMS",
          "AI 學校管理",
        ]
      : [
          "Bee Education",
          "Bee Education",
          "Bee Education AI",
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
      siteName: "Bee Education AI",
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
      ? "Bee Education AI（亦稱 Bee Education）是一個 AI 原生學校管理平台。"
      : "Bee Education AI (also known as Bee Education) is an AI-native school management platform.";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}#organization`,
        name: "Bee Education AI",
        alternateName: ["Bee Education", "Bee Education"],
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        description: orgDescription,
        sameAs: [
          "https://www.facebook.com/profile.php?id=61578235291840",
          "https://www.instagram.com/beeeducation/",
          "https://www.linkedin.com/company/beeeducation",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        name: "Bee Education AI",
        alternateName: ["Bee Education", "Bee Education"],
        url: siteUrl,
        inLanguage: lang,
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${localizedHomeUrl}#software`,
        name: "Bee Education AI",
        alternateName: "Bee Education",
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
