import type { Metadata } from "next";
import { cache } from "react";
import { ogLocaleMap, type Locale } from "@/lib/i18n/config";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { SAMPLE_BLOG_POSTS } from "@/data/sampleBlogPosts";
import BlogPageClient from "./BlogPageClient";

export const revalidate = 300;

interface BlogPost {
  id: string;
  title: string;
  subtitle?: string | null;
  slug: string | null;
  excerpt?: string | null;
  category?: string | null;
  tags?: string[] | string | null;
  keywords?: string[] | string | null;
  featured_image?: string | null;
  author?: { name?: string | null; job_title?: string | null; user_id?: string | null } | string | null;
  author_name?: string | null;
  published_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  read_time?: number | null;
  time_required?: string | null;
  view_count?: number | null;
  is_published?: boolean;
  is_pinned?: boolean | null;
  language?: string | null;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kiwibee.io";
const includeSampleContent = true;

const getLocalizedPath = (lang: string, path: string) => {
  const slug = lang === "vi" ? "vn" : "en";
  return `/${slug}${path === "/" ? "" : path}`;
};

type SupportedLang = "en" | "vi";

const getSupportedLang = (lang: string): SupportedLang => (lang === "vi" ? "vi" : "en");

const normalizePostLanguage = (value: string | null | undefined): SupportedLang | "other" | null => {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const lower = trimmed.toLowerCase();

  if (lower === "en" || lower.startsWith("en-")) return "en";
  if (lower === "vi" || lower.startsWith("vi-")) return "vi";

  return "other";
};

const getPostLangKey = (language: string | null | undefined): SupportedLang =>
  normalizePostLanguage(language) === "vi" ? "vi" : "en";

const dedupePosts = (posts: BlogPost[]) => {
  const seen = new Set<string>();
  const unique: BlogPost[] = [];

  for (const post of posts) {
    const identifier = post.slug?.trim() || post.id || "";
    const key = identifier ? `${getPostLangKey(post.language)}:${identifier}` : "";
    if (!key || seen.has(key)) continue;
    seen.add(key);
    unique.push(post);
  }

  return unique;
};

const filterPostsForLang = (posts: BlogPost[], lang: string): BlogPost[] => {
  const supportedLang = getSupportedLang(lang);
  if (supportedLang === "vi") {
    return posts.filter((post) => normalizePostLanguage(post.language) === "vi");
  }

  return posts.filter((post) => normalizePostLanguage(post.language) !== "vi");
};

// Filter out test/garbage posts with placeholder content
const isValidPost = (post: BlogPost): boolean => {
  const title = post.title?.toLowerCase().trim() || "";
  const slug = post.slug?.toLowerCase().trim() || "";

  // List of known garbage/test post patterns
  const garbagePatterns = [
    /^(asdasd|sdasd|test|asd|qwerty|lorem)$/i,
    /^[a-z]{3,6}$/i, // Short random strings like "asd", "qwerty"
  ];

  // Check if title or slug matches garbage patterns
  for (const pattern of garbagePatterns) {
    if (pattern.test(title) || pattern.test(slug)) {
      return false;
    }
  }

  // Must have a meaningful title (at least 5 chars)
  if (title.length < 5) return false;

  return true;
};

const fetchPosts = cache(async (_lang: string): Promise<BlogPost[]> => {
  const samplePosts = includeSampleContent ? (SAMPLE_BLOG_POSTS as BlogPost[]).filter(isValidPost) : [];
  if (!isSupabaseConfigured()) {
    return filterPostsForLang(samplePosts, _lang);
  }

  try {
    const supabase = createClient();

    const hubQuery = supabase
      .from("blogs")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(100);

    const publicQuery = supabase
      .schema("public")
      .from("blogs")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(100);

    const [hubResult, publicResult] = await Promise.all([hubQuery, publicQuery]);

    const hubPosts = hubResult.error ? [] : (hubResult.data ?? []);
    const publicPosts = publicResult.error ? [] : (publicResult.data ?? []);

    if (hubResult.error) console.warn("Failed to fetch hub.blogs:", hubResult.error);
    if (publicResult.error) console.warn("Failed to fetch public.blogs:", publicResult.error);

    // Merge and dedupe, then filter out garbage/test posts
    const merged = dedupePosts([...hubPosts, ...publicPosts, ...samplePosts]).filter(isValidPost);

    return filterPostsForLang(merged, _lang);
  } catch (err) {
    console.error("Failed to load blog posts", err);
    return filterPostsForLang(samplePosts, _lang);
  }
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : (await params).lang === "vi" ? "vi" : "en";
  const locale: Locale = lang === "vi" ? "vi" : "en";
  const isVi = locale === "vi";
  const title = isVi ? "KiwiBee Blog" : "KiwiBee Blog";
  const description = isVi
    ? "Ý tưởng, nghiên cứu, kỹ thuật giảng dạy và tài nguyên cho giáo viên K-12."
    : "Ideas, research, teaching techniques, and resources for K-12 educators.";
  const ogImageUrl = new URL("/og-default.png", siteUrl);

  const canonicalPath = getLocalizedPath(lang, "/blog");
  const canonicalUrl = new URL(canonicalPath, siteUrl);

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: "/en/blog",
        vi: "/vn/blog",
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      locale: ogLocaleMap[locale],
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

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : (await params).lang === "vi" ? "vi" : "en";
  const posts = await fetchPosts(lang);

  return <BlogPageClient lang={lang} posts={posts} />;
}
