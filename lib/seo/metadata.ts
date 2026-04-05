import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { ogLocaleMap } from "@/lib/i18n/config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://beeeducation.com";
const defaultOgImage = "/og-default.png";

export function toLocalizedPath(lang: Locale, path: string) {
  if (lang === "en") return path;
  if (path === "/") return `/${lang}`;
  return `/${lang}${path}`;
}

export function buildPageMetadata({
  lang,
  path,
  title,
  description,
}: {
  lang: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const canonicalPath = toLocalizedPath(lang, path);
  const canonicalUrl = new URL(canonicalPath, siteUrl);
  const ogImageUrl = new URL(defaultOgImage, siteUrl);

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: path,
        "zh-HK": toLocalizedPath("zh-HK", path),
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      locale: ogLocaleMap[lang],
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
