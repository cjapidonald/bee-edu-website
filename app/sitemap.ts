import type { MetadataRoute } from "next";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { SAMPLE_BLOG_POSTS } from "@/data/sampleBlogPosts";

interface BlogSitemapEntry {
  id: string;
  slug?: string | null;
  updated_at?: string | null;
  published_at?: string | null;
  language?: string | null;
}

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://elementals.com").trim();
const includeSampleContent = process.env.NODE_ENV !== "production";

const baseRoutes = [
  "",
  "/about",
  "/pricing",
  "/blog",
  "/contact",
  "/faq",
  "/services",
  "/features",
  "/sitemap-page",
  "/for-teachers",
  "/for-team-leaders",
  "/for-schedulers",
  "/for-students",
  "/for-parents",
  "/for-admins",
  "/for-organizations",
  "/privacy",
  "/terms",
  "/cookies",
];

const featureRoutes = [
  "/features/gradebook",
  "/features/curriculum",
  "/features/exams",
  "/features/classspark",
  "/features/ai",
  "/features/gamification",
  "/features/scheduling",
  "/features/resource-booking",
  "/features/year-migration",
  "/features/library",
  "/features/pilot-projects",
  "/features/integrations",
  "/features/hr",
  "/features/professional-dev",
  "/features/teacher-kpi",
  "/features/teaching-assistants",
  "/features/finance",
  "/features/sales-admin",
  "/features/marketing",
  "/features/policy-management",
  "/features/survey",
  "/features/student-affairs",
  "/features/school-news",
  "/features/wordwall",
  "/features/portfolios",
  "/features/emergency-communications",
  "/features/ai-analytics",
];

const locales = ["en", "zh-HK"] as const;

type SupportedLang = (typeof locales)[number];

const normalizePostLanguage = (value: string | null | undefined): SupportedLang | "other" | null => {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const lower = trimmed.toLowerCase();

  if (lower === "en" || lower.startsWith("en-")) return "en";
  if (lower === "zh-hk" || lower === "zh_hk" || lower.startsWith("zh")) return "zh-HK";

  return "other";
};

const getPostLangKey = (language: string | null | undefined): SupportedLang =>
  normalizePostLanguage(language) === "zh-HK" ? "zh-HK" : "en";

const toLocalizedUrl = (lang: (typeof locales)[number], path: string) => {
  if (lang === "en") return `${siteUrl}${path}`;
  return `${siteUrl}/${lang}${path}`;
};

const dedupeEntries = (posts: BlogSitemapEntry[]) => {
  const seen = new Set<string>();
  const unique: BlogSitemapEntry[] = [];

  for (const post of posts) {
    const identifier = post.slug?.trim() || post.id || "";
    const key = identifier ? `${getPostLangKey(post.language)}:${identifier}` : "";
    if (!key || seen.has(key)) continue;
    seen.add(key);
    unique.push(post);
  }

  return unique;
};

const fetchBlogEntries = async (): Promise<BlogSitemapEntry[]> => {
  const samplePosts = includeSampleContent ? (SAMPLE_BLOG_POSTS as BlogSitemapEntry[]) : [];

  if (!isSupabaseConfigured()) {
    return samplePosts;
  }

  try {
    const supabase = createClient();

    const hubQuery = supabase
      .from("blogs")
      .select("id, slug, updated_at, published_at, language")
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(200);

    const publicQuery = supabase
      .schema("public")
      .from("blogs")
      .select("id, slug, updated_at, published_at, language")
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(200);

    const [hubResult, publicResult] = await Promise.all([hubQuery, publicQuery]);

    const hubPosts = hubResult.error ? [] : (hubResult.data ?? []);
    const publicPosts = publicResult.error ? [] : (publicResult.data ?? []);

    if (hubResult.error) console.warn("Failed to fetch hub.blogs for sitemap:", hubResult.error);
    if (publicResult.error) console.warn("Failed to fetch public.blogs for sitemap:", publicResult.error);

    return dedupeEntries([...hubPosts, ...publicPosts, ...samplePosts]);
  } catch (err) {
    console.error("Failed to load blog sitemap entries", err);
    return samplePosts;
  }
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticPaths = [...baseRoutes, ...featureRoutes];

  const staticEntries = locales.flatMap((lang) =>
    staticPaths.map((path) => ({
      url: toLocalizedUrl(lang, path),
      lastModified: now,
    }))
  );

  const blogEntries = await fetchBlogEntries();
  const blogUrls = blogEntries.flatMap((post) => {
    const identifier = post.slug || post.id;
    if (!identifier) return [];

    const lastModified = post.updated_at || post.published_at || now.toISOString();

    if (getPostLangKey(post.language) === "zh-HK") {
      return [
        {
          url: toLocalizedUrl("zh-HK", `/blog/${identifier}`),
          lastModified,
        },
      ];
    }

    return [
      {
        url: toLocalizedUrl("en", `/blog/${identifier}`),
        lastModified,
      },
    ];
  });

  return [...staticEntries, ...blogUrls];
}
