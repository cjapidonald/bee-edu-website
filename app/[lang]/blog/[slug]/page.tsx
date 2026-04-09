import type { Metadata } from "next";
import { ogLocaleMap, type Locale } from "@/lib/i18n/config";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  User,
} from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { formatCategoryLabel } from "@/lib/blog/categories";
import { safeImageUrl } from "@/lib/blog/safe-image-url";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SAMPLE_BLOG_POSTS } from "@/data/sampleBlogPosts";
import ShareButton from "./ShareButton";

export const revalidate = 300;

interface ContentBlock {
  type: "paragraph" | "heading" | "image" | "youtube";
  level?: number;
  children?: { text: string; bold?: boolean }[];
  src?: string;
  alt?: string;
  caption?: string;
  videoId?: string;
}

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
  featured_image_caption?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  author?: { name?: string | null; job_title?: string | null } | string | null;
  author_name?: string | null;
  author_image?: string | null;
  author_job_title?: string | null;
  published_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  read_time?: number | null;
  time_required?: string | null;
  is_published?: boolean;
  content?: ContentBlock[] | null;
  content_md?: string | null;
  language?: string | null;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.kiwibee.io";
const includeSampleContent = true;

const getLocalizedPath = (lang: string, path: string) => {
  if (lang === "en") return path;
  return `/${lang}${path}`;
};

type SupportedLang = "en" | "zh-HK";

const getSupportedLang = (lang: string): SupportedLang => (lang === "zh-HK" ? "zh-HK" : "en");

const normalizePostLanguage = (value: string | null | undefined): SupportedLang | "other" | null => {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const lower = trimmed.toLowerCase();

  if (lower === "en" || lower.startsWith("en-")) return "en";
  if (lower === "zh-hk" || lower === "zh_hk" || lower.startsWith("zh")) return "zh-HK";

  return "other";
};

const stripZhHkSuffix = (value: string): string => value.replace(/-zh-hk$/i, "");

const uniqueValues = (values: string[]) => {
  const seen = new Set<string>();
  const unique: string[] = [];
  for (const raw of values) {
    const trimmed = raw.trim();
    if (!trimmed) continue;
    const key = trimmed.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(trimmed);
  }
  return unique;
};

const getPostTimestamp = (post: BlogPost) => {
  const raw = post.published_at ?? post.created_at ?? post.updated_at;
  if (!raw) return 0;
  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
};

const pickBestLocalizedPost = (posts: BlogPost[], lang: string): BlogPost | null => {
  if (!posts || posts.length === 0) return null;
  const requested = getSupportedLang(lang);

  const scoreLanguage = (post: BlogPost): number => {
    const normalized = normalizePostLanguage(post.language);
    if (normalized === requested) return 3;
    if (normalized === null) return 2;
    if (normalized === "en") return 1;
    return 0;
  };

  return [...posts].sort((a, b) => {
    const scoreDiff = scoreLanguage(b) - scoreLanguage(a);
    if (scoreDiff !== 0) return scoreDiff;
    return getPostTimestamp(b) - getPostTimestamp(a);
  })[0];
};

const sanitizeAuthorName = (value: string): string | null => {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const normalized = trimmed.toLowerCase();
  if (/(^|\s)(undefined|null)(\s|$)/.test(normalized)) return null;
  return trimmed;
};

const extractTags = (tags: string[] | string | null | undefined): string[] => {
  if (Array.isArray(tags)) return tags;
  if (typeof tags === "string") {
    return tags.split(",").map(tag => tag.trim()).filter(Boolean);
  }
  return [];
};

const hasLocalizedSlugVariant = cache(async (lang: SupportedLang, slug: string): Promise<boolean> => {
  const matchesSample = includeSampleContent && (SAMPLE_BLOG_POSTS as BlogPost[]).some((post) => {
    const identifier = post.slug?.trim() || post.id;
    if (identifier !== slug) return false;
    const normalized = normalizePostLanguage(post.language);
    if (lang === "zh-HK") return normalized === "zh-HK";
    return normalized !== "zh-HK";
  });

  if (matchesSample) return true;
  if (!isSupabaseConfigured()) return false;

  try {
    const supabase = createClient();

    const fetchSchema = async (schema: "hub" | "public") => {
      const scoped = schema === "public" ? supabase.schema("public") : supabase;
      const result = await scoped
        .from("blogs")
        .select("id, slug, language")
        .eq("slug", slug)
        .eq("is_published", true)
        .limit(10);

      if (result.error) {
        console.warn(`Failed to check ${schema}.blogs slug variant`, result.error);
        return [];
      }

      return (result.data ?? []) as { id: string; slug: string | null; language?: string | null }[];
    };

    const [hubRows, publicRows] = await Promise.all([fetchSchema("hub"), fetchSchema("public")]);
    const rows = [...hubRows, ...publicRows];

    return rows.some((row) => {
      const normalized = normalizePostLanguage(row.language ?? null);
      if (lang === "zh-HK") return normalized === "zh-HK";
      return normalized !== "zh-HK";
    });
  } catch (err) {
    console.error("Failed to check blog slug variant", err);
    return false;
  }
});

const getReadTimeLabel = (
  lang: string,
  readTime?: number | string | null,
  timeRequired?: string | null
): string | null => {
  const isZh = lang === "zh-HK";
  const formatMinutes = (minutes: number) => (isZh ? `${minutes} 分鐘閱讀` : `${minutes} min read`);

  if (readTime !== null && readTime !== undefined && readTime !== "") {
    const parsed = typeof readTime === "number" ? readTime : parseInt(String(readTime), 10);
    if (!Number.isNaN(parsed) && parsed > 0) {
      return formatMinutes(parsed);
    }
  }

  if (timeRequired) {
    const normalized = String(timeRequired).trim();
    if (normalized.length === 0) return null;

    const minutesMatch = normalized.match(/(\d+)/);
    if (minutesMatch && /min|minute/i.test(normalized)) {
      const parsed = parseInt(minutesMatch[1], 10);
      if (!Number.isNaN(parsed) && parsed > 0) {
        return formatMinutes(parsed);
      }
    }

    if (!isZh) {
      return normalized.toLowerCase().includes("read") ? normalized : `${normalized} read`;
    }

    return normalized;
  }

  return null;
};

const getAuthorName = (post: BlogPost, fallback: string): string => {
  const { author, author_name } = post;
  if (author && typeof author === "object") {
    if ("name" in author && typeof author.name === "string") {
      const candidate = sanitizeAuthorName(author.name);
      if (candidate) return candidate;
    }

    const record = author as Record<string, unknown>;
    const firstName = typeof record.first_name === "string" ? record.first_name : null;
    const lastName = typeof record.last_name === "string" ? record.last_name : null;
    const combined = [firstName, lastName].filter(Boolean).join(" ");
    if (combined) {
      const candidate = sanitizeAuthorName(combined);
      if (candidate) return candidate;
    }
  }

  if (typeof author_name === "string") {
    const candidate = sanitizeAuthorName(author_name);
    if (candidate) return candidate;
  }

  if (typeof author === "string") {
    const candidate = sanitizeAuthorName(author);
    if (candidate) return candidate;
  }

  return fallback;
};

const formatDate = (lang: string, dateString: string | null | undefined) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(lang === "zh-HK" ? "zh-HK" : "en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const convertMarkdownToContent = (markdown: string): ContentBlock[] => {
  if (!markdown) return [];

  const blocks: ContentBlock[] = [];
  const normalized = markdown.replace(/\r\n/g, "\n");
  const lines = normalized.split("\n");
  let paragraphLines: string[] = [];

  const flushParagraph = () => {
    if (paragraphLines.length === 0) return;
    const text = paragraphLines.join(" ").replace(/\s+/g, " ").trim();
    if (text) {
      blocks.push({
        type: "paragraph",
        children: [{ text }],
      });
    }
    paragraphLines = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      continue;
    }

    const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      const [, hashes, headingText] = headingMatch;
      const level = Math.min(Math.max(hashes.length, 2), 4);
      const text = headingText.trim();
      if (text) {
        blocks.push({
          type: "heading",
          level,
          children: [{ text }],
        });
      }
      continue;
    }

    if (/^[-*+]\s+/.test(trimmed)) {
      flushParagraph();
      const bulletText = trimmed.replace(/^[-*+]\s+/, "").trim();
      if (bulletText) {
        blocks.push({
          type: "paragraph",
          children: [{ text: `• ${bulletText}` }],
        });
      }
      continue;
    }

    paragraphLines.push(trimmed);
  }

  flushParagraph();
  return blocks;
};

const resolveContent = (post: BlogPost): ContentBlock[] | null => {
  if (post.content && Array.isArray(post.content)) {
    return post.content;
  }

  if (post.content_md && typeof post.content_md === "string") {
    return convertMarkdownToContent(post.content_md);
  }

  return null;
};

const fetchPost = cache(async (lang: string, slug: string): Promise<BlogPost | null> => {
  if (includeSampleContent) {
    const sampleMatches = SAMPLE_BLOG_POSTS.filter((p) => p.slug === slug || p.id === slug) as unknown as BlogPost[];
    const samplePost = pickBestLocalizedPost(sampleMatches, lang);
    if (samplePost) return samplePost;
  }

  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const supabase = createClient();

    const fetchFromSchema = async (schema: "hub" | "public") => {
      const scoped = schema === "public" ? supabase.schema("public") : supabase;

      const bySlug = await scoped
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .limit(10);

      if (bySlug.error) {
        console.warn(`Failed to fetch ${schema}.blogs by slug`, bySlug.error);
      }

      const bySlugBest = pickBestLocalizedPost((bySlug.data ?? []) as BlogPost[], lang);
      if (bySlugBest) return bySlugBest;

      const byId = await scoped
        .from("blogs")
        .select("*")
        .eq("id", slug)
        .eq("is_published", true)
        .limit(1);

      if (byId.error) {
        console.warn(`Failed to fetch ${schema}.blogs by id`, byId.error);
      }

      return pickBestLocalizedPost((byId.data ?? []) as BlogPost[], lang);
    };

    const hubPost = await fetchFromSchema("hub");
    if (hubPost) return hubPost;

    const publicPost = await fetchFromSchema("public");
    if (publicPost) return publicPost;
  } catch (err) {
    console.error("Failed to fetch blog post", err);
  }

  return null;
});

const labels = {
  en: {
    back: "Back to Blog",
    share: "Share",
    copied: "Copied!",
    defaultAuthor: "Elementals Team",
  },
  "zh-HK": {
    back: "返回博客",
    share: "分享",
    copied: "已複製！",
    defaultAuthor: "Elementals 團隊",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : "en";
  const post = await fetchPost(lang, (await params).slug);

  if (!post) {
    return {
      metadataBase: new URL(siteUrl),
      title: "Blog Post",
      robots: { index: false, follow: false },
    };
  }

  const locale: Locale = lang === "zh-HK" ? "zh-HK" : "en";

  const identifier = post.slug?.trim() || post.id;
  const canonicalPath = getLocalizedPath(lang, `/blog/${identifier}`);
  const canonicalUrl = new URL(canonicalPath, siteUrl);
  const title = post.meta_title?.trim() || post.title;
  const description = post.meta_description?.trim() || post.excerpt || post.subtitle || "Elementals Blog";

  const keywordValues = uniqueValues([...extractTags(post.tags), ...extractTags(post.keywords)]);

  const canonicalSlug = post.slug?.trim() || null;
  const baseSlug = canonicalSlug ? stripZhHkSuffix(canonicalSlug) : null;

  const alternatesLanguages: Record<string, string> = {};
  if (baseSlug) {
    const enSlug = baseSlug;
    const zhSlugWithSuffix = `${baseSlug}-zh-hk`;

    const [hasEn, hasZhSuffix, hasZhBase] = await Promise.all([
      hasLocalizedSlugVariant("en", enSlug),
      hasLocalizedSlugVariant("zh-HK", zhSlugWithSuffix),
      hasLocalizedSlugVariant("zh-HK", baseSlug),
    ]);

    if (hasEn) alternatesLanguages.en = `/blog/${enSlug}`;
    if (hasZhSuffix) {
      alternatesLanguages["zh-HK"] = `/zh-HK/blog/${zhSlugWithSuffix}`;
    } else if (hasZhBase) {
      alternatesLanguages["zh-HK"] = `/zh-HK/blog/${baseSlug}`;
    }
  }

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      ...(Object.keys(alternatesLanguages).length > 0 ? { languages: alternatesLanguages } : {}),
    },
    ...(keywordValues.length > 0 ? { keywords: keywordValues } : {}),
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      locale: ogLocaleMap[locale],
      type: "article",
      images: post.featured_image ? [{ url: post.featured_image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.featured_image ? [post.featured_image] : undefined,
    },
  };
}

// Simple content renderer
function RenderContent({ content }: { content: ContentBlock[] }) {
  return (
    <div className="prose prose-lg prose-gray max-w-none">
      {content.map((block, index) => {
        if (block.type === "heading") {
          const text = block.children?.map((c) => c.text).join("") || "";
          const level = Math.min(Math.max(block.level || 2, 2), 4);
          const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
          return (
            <HeadingTag key={index} className="text-gray-900 font-semibold mt-8 mb-4">
              {text}
            </HeadingTag>
          );
        }

        if (block.type === "paragraph") {
          const text = block.children?.map((c) => c.text).join("") || "";
          return (
            <p key={index} className="text-gray-700 leading-relaxed mb-4">
              {text}
            </p>
          );
        }

        if (block.type === "image" && safeImageUrl(block.src)) {
          return (
            <figure key={index} className="my-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={safeImageUrl(block.src)!}
                alt={block.alt || ""}
                className="w-full rounded-lg"
              />
              {block.caption && (
                <figcaption className="text-center text-sm text-gray-500 mt-2">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        return null;
      })}
    </div>
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : "en";
  const labelSet = labels[lang as keyof typeof labels] || labels.en;
  const post = await fetchPost(lang, (await params).slug);

  if (!post) {
    notFound();
  }

  const tags = extractTags(post.tags);
  const keywordValues = uniqueValues([...tags, ...extractTags(post.keywords)]);
  const readTimeLabel = getReadTimeLabel(lang, post.read_time, post.time_required);
  const authorName = getAuthorName(post, labelSet.defaultAuthor);
  const authorJobTitle = post.author && typeof post.author === "object" && "job_title" in post.author
    ? post.author.job_title
    : post.author_job_title;
  const resolvedContent = resolveContent(post);
  const categoryLabel = post.category ? formatCategoryLabel(getSupportedLang(lang), post.category) : null;

  const identifier = post.slug?.trim() || post.id;
  const canonicalPath = getLocalizedPath(lang, `/blog/${identifier}`);
  const canonicalUrl = new URL(canonicalPath, siteUrl).toString();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.meta_description?.trim() || post.excerpt || post.subtitle || "",
    inLanguage: lang === "zh-HK" ? "zh-Hant-HK" : "en",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    url: canonicalUrl,
    datePublished: post.published_at || post.created_at || undefined,
    dateModified: post.updated_at || post.published_at || post.created_at || undefined,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Elementals",
      url: siteUrl,
    },
    ...(post.featured_image ? { image: [post.featured_image] } : {}),
    ...(categoryLabel ? { articleSection: categoryLabel } : {}),
    ...(keywordValues.length > 0 ? { keywords: keywordValues.join(", ") } : {}),
  };
  const structuredDataJson = JSON.stringify(structuredData).replace(/</g, "\\u003c");

  return (
    <article className="relative min-h-screen overflow-hidden bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredDataJson }} />
      {/* Subtle gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f0fdf4]/70 via-white to-white" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#ffe0d4]/60 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#ffd5c4]/40 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 pt-8 pb-16">
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          {/* Back Button */}
          <Button
            asChild
            variant="ghost"
            className="w-fit rounded-xl border border-[#D9E2EF] bg-white px-4 text-gray-700 shadow-sm hover:bg-[#F5F8FF] hover:border-primary/30"
          >
            <Link href={getLocalizedPath(lang, "/blog")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {labelSet.back}
            </Link>
          </Button>

          <div className="relative overflow-hidden rounded-[2rem] border border-[#D9E2EF] bg-white p-6 shadow-xl sm:p-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E3F8FF]/60 rounded-full blur-3xl -z-10" />

            <div className="relative z-10 flex flex-col gap-8">
              {/* Featured Image */}
              {safeImageUrl(post.featured_image) && (
                <figure className="mx-auto flex w-full flex-col items-center gap-4 text-center">
                  <div className="relative w-full overflow-hidden rounded-2xl border border-[#D9E2EF] bg-[#F5F8FF] p-1.5 shadow-lg">
                    <div className="relative overflow-hidden rounded-xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={safeImageUrl(post.featured_image)!}
                        alt={post.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  {post.featured_image_caption && (
                    <figcaption className="text-sm text-gray-500">
                      {post.featured_image_caption}
                    </figcaption>
                  )}
                </figure>
              )}

              {/* Article Header */}
              <header className="flex flex-col gap-6 text-center">
                <div className="flex flex-wrap justify-center gap-2">
                  {categoryLabel && (
                    <Badge className="bg-[#16a34a]/10 text-[#16a34a] px-3 py-1 rounded-full">
                      {categoryLabel}
                    </Badge>
                  )}
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="flex items-center gap-1 bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-4">
                  <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">{post.title}</h1>

                  {post.subtitle && (
                    <p className="text-xl text-gray-600">{post.subtitle}</p>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    {safeImageUrl(post.author_image) ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={safeImageUrl(post.author_image)!}
                        alt={authorName}
                        className="h-10 w-10 rounded-full object-cover border border-[#D9E2EF]"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#16a34a]/10">
                        <User className="h-5 w-5 text-[#16a34a]" />
                      </div>
                    )}
                    <div className="text-left">
                      <span className="font-medium text-gray-900">{authorName}</span>
                      {authorJobTitle && (
                        <span className="ml-2 text-xs text-gray-500">• {authorJobTitle}</span>
                      )}
                    </div>
                  </div>
                  {post.published_at && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{formatDate(lang, post.published_at)}</span>
                    </div>
                  )}
                  {readTimeLabel && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{readTimeLabel}</span>
                    </div>
                  )}
                </div>

                <div className="mt-2 flex flex-wrap justify-center gap-3">
                  <ShareButton title={post.title} label={labelSet.share} copiedLabel={labelSet.copied} />
                </div>
              </header>

              {/* Article Content */}
              <div className="mx-auto max-w-none">
                {resolvedContent && <RenderContent content={resolvedContent} />}

                {!resolvedContent && post.excerpt && (
                  <p className="text-gray-700 leading-relaxed">{post.excerpt}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
