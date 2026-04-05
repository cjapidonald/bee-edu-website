"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { Search, Sparkles, Calendar, Clock, Bookmark, Tag, X, ArrowLeft, Share2, Check, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_LABELS_BY_LANG, normalizeCategory } from "@/lib/blog/categories";
import { safeImageUrl } from "@/lib/blog/safe-image-url";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  author?: { name?: string | null; job_title?: string | null; user_id?: string | null } | string | null;
  author_name?: string | null;
  author_image?: string | null;
  author_job_title?: string | null;
  published_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  read_time?: number | null;
  time_required?: string | null;
  view_count?: number | null;
  is_published?: boolean;
  is_pinned?: boolean | null;
  language?: string | null;
  content?: ContentBlock[] | null;
  content_md?: string | null;
}

type SupportedLang = "en" | "zh-HK";

const getSupportedLang = (lang: string): SupportedLang => (lang === "zh-HK" ? "zh-HK" : "en");

const UI_TEXTS: Record<SupportedLang, {
  badge: string;
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  emptyTitle: string;
  emptySubtitle: string;
  featured: string;
  latestTitle: string;
  latestSubtitle: string;
  pinned: string;
  topics: string;
  allTopics: string;
  popularTags: string;
  popularPosts: string;
  noPopularPosts: string;
  draft: string;
  defaultAuthor: string;
  formatPostCount: (count: number) => string;
  formatReadTime: (minutes: number) => string;
}> = {
  en: {
    badge: "Educator Community",
    title: "Community for Educators",
    subtitle: "Ideas, research, teaching techniques, and resources for K-12 educators.",
    searchPlaceholder: "Search articles...",
    emptyTitle: "No posts found",
    emptySubtitle: "Try adjusting your search or category filter.",
    featured: "Featured",
    latestTitle: "Latest Posts",
    latestSubtitle: "Fresh classroom reflections and practical resources.",
    pinned: "Pinned",
    topics: "Topics",
    allTopics: "All",
    popularTags: "Popular Tags",
    popularPosts: "Popular Posts",
    noPopularPosts: "No posts yet. Publish your first entry to get the blog moving.",
    draft: "Draft",
    defaultAuthor: "Bee Education Team",
    formatPostCount: (count) => `${count} ${count === 1 ? "post" : "posts"}`,
    formatReadTime: (minutes) => `${minutes} min read`,
  },
  "zh-HK": {
    badge: "教育社群",
    title: "教育工作者社群",
    subtitle: "面向 K-12 教育者的理念、研究、教學技巧與資源。",
    searchPlaceholder: "搜尋文章…",
    emptyTitle: "找不到文章",
    emptySubtitle: "請嘗試調整搜尋或分類篩選。",
    featured: "精選",
    latestTitle: "最新文章",
    latestSubtitle: "最新教學分享、反思與實用資源。",
    pinned: "置頂",
    topics: "分類",
    allTopics: "全部",
    popularTags: "熱門標籤",
    popularPosts: "熱門文章",
    noPopularPosts: "目前還沒有熱門文章。發佈第一篇文章，開始建立你的博客內容。",
    draft: "草稿",
    defaultAuthor: "Bee Education 團隊",
    formatPostCount: (count) => `${count} 篇文章`,
    formatReadTime: (minutes) => `${minutes} 分鐘閱讀`,
  },
};

const sanitizeAuthorName = (value: string): string | null => {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const normalized = trimmed.toLowerCase();
  if (/(^|\s)(undefined|null)(\s|$)/.test(normalized)) return null;
  return trimmed;
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

const getAuthorInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const toValueArray = (input: unknown): string[] => {
  if (!input && input !== 0) return [];
  if (Array.isArray(input)) return input.flatMap((item) => toValueArray(item));
  if (typeof input === "number") return [String(input)];
  if (typeof input === "string") {
    return input
      .split(/[;,/]/)
      .map((value) => value.trim())
      .filter(Boolean);
  }
  return [];
};

const sortPosts = (posts: BlogPost[]): BlogPost[] => {
  const isInternal = (post: BlogPost) => {
    const author = post.author;
    if (author && typeof author === "object" && "user_id" in author) {
      return typeof (author as { user_id?: string }).user_id === "string";
    }
    return false;
  };

  const getTimestamp = (post: BlogPost) => {
    const raw = post.published_at ?? post.created_at;
    const date = raw ? new Date(raw) : null;
    return date && !Number.isNaN(date.getTime()) ? date.getTime() : 0;
  };

  return [...posts].sort((a, b) => {
    const pinnedDiff = Number(Boolean(b.is_pinned)) - Number(Boolean(a.is_pinned));
    if (pinnedDiff !== 0) return pinnedDiff;

    const internalDiff = Number(isInternal(b)) - Number(isInternal(a));
    if (internalDiff !== 0) return internalDiff;

    return getTimestamp(b) - getTimestamp(a);
  });
};

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(" ");

const convertMarkdownToContent = (markdown: string): ContentBlock[] => {
  if (!markdown) return [];
  const blocks: ContentBlock[] = [];
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  let paragraphLines: string[] = [];

  const flushParagraph = () => {
    if (paragraphLines.length === 0) return;
    const text = paragraphLines.join(" ").replace(/\s+/g, " ").trim();
    if (text) blocks.push({ type: "paragraph", children: [{ text }] });
    paragraphLines = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) { flushParagraph(); continue; }
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      const level = Math.min(Math.max(headingMatch[1].length, 2), 4);
      const text = headingMatch[2].trim();
      if (text) blocks.push({ type: "heading", level, children: [{ text }] });
      continue;
    }
    if (/^[-*+]\s+/.test(trimmed)) {
      flushParagraph();
      const bulletText = trimmed.replace(/^[-*+]\s+/, "").trim();
      if (bulletText) blocks.push({ type: "paragraph", children: [{ text: `• ${bulletText}` }] });
      continue;
    }
    paragraphLines.push(trimmed);
  }
  flushParagraph();
  return blocks;
};

const resolveContent = (post: BlogPost): ContentBlock[] | null => {
  if (post.content && Array.isArray(post.content)) return post.content;
  if (post.content_md && typeof post.content_md === "string") return convertMarkdownToContent(post.content_md);
  return null;
};

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
              <img src={safeImageUrl(block.src)!} alt={block.alt || ""} className="w-full rounded-lg" />
              {block.caption && (
                <figcaption className="text-center text-sm text-gray-500 mt-2">{block.caption}</figcaption>
              )}
            </figure>
          );
        }
        return null;
      })}
    </div>
  );
}

function BlogOverlay({
  post,
  lang,
  onClose,
  blogBasePath,
}: {
  post: BlogPost;
  lang: string;
  onClose: () => void;
  blogBasePath: string;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const supportedLang: SupportedLang = lang === "zh-HK" ? "zh-HK" : "en";
  const t = UI_TEXTS[supportedLang];

  const authorName = getAuthorName(post, t.defaultAuthor);
  const authorJobTitle =
    post.author && typeof post.author === "object" && "job_title" in post.author
      ? post.author.job_title
      : post.author_job_title;
  const tags = toValueArray(post.tags);
  const resolvedContent = resolveContent(post);
  const readTime =
    typeof post.read_time === "number" && post.read_time > 0
      ? t.formatReadTime(post.read_time)
      : post.time_required || null;
  const categoryLabel = post.category
    ? post.category
        .replace(/[-_]/g, " ")
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, (char) => char.toUpperCase())
    : null;

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString(supportedLang === "zh-HK" ? "zh-HK" : "en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: post.title, url }); } catch {}
      return;
    }
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      } catch {}
    }
  };

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => onClose(), 400);
  }, [onClose]);

  // Trigger entrance animation
  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsVisible(true));
    });
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const backdropClass = isClosing
    ? "opacity-0"
    : isVisible
      ? "opacity-100"
      : "opacity-0";

  const panelClass = isClosing
    ? "scale-90 opacity-0 translate-y-8"
    : isVisible
      ? "scale-100 opacity-100 translate-y-0"
      : "scale-75 opacity-0 translate-y-12";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-500 ease-out ${backdropClass}`}
        onClick={handleClose}
      />

      {/* Centered panel with Netflix scale-up effect */}
      <div
        ref={overlayRef}
        className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 ${panelClass}`}
        style={{
          transformOrigin: "center center",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Close button - floating top right */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-all duration-200 backdrop-blur-sm"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Featured image as hero banner */}
        {safeImageUrl(post.featured_image) && (
          <div className="relative w-full overflow-hidden rounded-t-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={safeImageUrl(post.featured_image)!}
              alt={post.title}
              className="w-full object-cover h-[280px] sm:h-[360px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            {/* Title overlay on image */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <div className="flex flex-wrap gap-2 mb-3">
                {categoryLabel && (
                  <Badge className="bg-white/20 text-white border-white/30 px-3 py-1 rounded-full backdrop-blur-sm">{categoryLabel}</Badge>
                )}
                {tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} className="bg-white/15 text-white/90 border-white/20 text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-white drop-shadow-lg">
                {post.title}
              </h1>
              {post.subtitle && (
                <p className="mt-2 text-base sm:text-lg text-white/80 line-clamp-2">{post.subtitle}</p>
              )}
            </div>
          </div>
        )}

        {/* Content area */}
        <div className="px-6 py-6 sm:px-10 sm:py-8">
          <div className="mx-auto max-w-3xl space-y-6">
            {/* If no featured image, show title here */}
            {!safeImageUrl(post.featured_image) && (
              <header className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {categoryLabel && (
                    <Badge className="bg-[#fc3c00]/10 text-[#fc3c00] px-3 py-1 rounded-full">{categoryLabel}</Badge>
                  )}
                  {tags.slice(0, 4).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5 rounded-full">{tag}</Badge>
                  ))}
                </div>
                <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">{post.title}</h1>
                {post.subtitle && <p className="text-xl text-gray-600">{post.subtitle}</p>}
              </header>
            )}

            {/* Author & meta bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100">
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  {safeImageUrl(post.author_image) ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={safeImageUrl(post.author_image)!}
                      alt={authorName}
                      className="h-10 w-10 rounded-full object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fc3c00]/10">
                      <User className="h-5 w-5 text-[#fc3c00]" />
                    </div>
                  )}
                  <div>
                    <span className="font-medium text-gray-900">{authorName}</span>
                    {authorJobTitle && (
                      <span className="ml-2 text-xs text-gray-500">• {authorJobTitle}</span>
                    )}
                  </div>
                </div>
                {post.published_at && (
                  <div className="flex items-center gap-1 text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.published_at)}</span>
                  </div>
                )}
                {readTime && (
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{readTime}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="gap-2 rounded-lg text-xs"
                >
                  {copied ? (
                    <><Check className="h-3.5 w-3.5 text-green-600" /><span className="text-green-600">{supportedLang === "zh-HK" ? "已複製" : "Copied!"}</span></>
                  ) : (
                    <><Share2 className="h-3.5 w-3.5" />{supportedLang === "zh-HK" ? "分享" : "Share"}</>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="gap-1.5 rounded-lg text-xs text-gray-500"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  {supportedLang === "zh-HK" ? "返回" : "Back"}
                </Button>
              </div>
            </div>

            {/* Article content */}
            <article>
              {resolvedContent && <RenderContent content={resolvedContent} />}
              {!resolvedContent && post.excerpt && (
                <p className="text-gray-700 leading-relaxed text-lg">{post.excerpt}</p>
              )}
            </article>

            {post.featured_image_caption && (
              <p className="text-sm text-gray-400 italic text-center">{post.featured_image_caption}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlogPageClient({
  lang,
  posts,
}: {
  lang: string;
  posts: BlogPost[];
}) {
  const supportedLang = getSupportedLang(lang);
  const t = UI_TEXTS[supportedLang];
  const categoryLabels = CATEGORY_LABELS_BY_LANG[supportedLang];

  const [searchValue, setSearchValue] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const blogBasePathRef = useRef("");

  const getLocalizedPath = useCallback(
    (path: string) => {
      if (lang === "en") return path;
      return `/${lang}${path}`;
    },
    [lang]
  );

  const formatDate = useCallback(
    (dateString: string | null | undefined) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      if (Number.isNaN(date.getTime())) return "";
      return date.toLocaleDateString(supportedLang === "zh-HK" ? "zh-HK" : "en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    },
    [supportedLang]
  );

  const formatCategoryLabel = useCallback(
    (raw: string) => {
      const normalized = normalizeCategory(raw);
      const key = normalized || raw;

      if (key && categoryLabels[key]) {
        return categoryLabels[key];
      }

      return raw
        .replace(/[-_]/g, " ")
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, (char) => char.toUpperCase());
    },
    [categoryLabels]
  );

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: posts.length };

    posts.forEach((post) => {
      const cat = normalizeCategory(post.category);
      if (cat) {
        counts[cat] = (counts[cat] || 0) + 1;
      }
    });

    return counts;
  }, [posts]);

  // Get category tabs (sorted by count)
  const categoryTabs = useMemo(() => {
    const entries = Object.entries(categoryLabels)
      .filter(([key]) => categoryCounts[key] !== undefined)
      .sort((a, b) => (categoryCounts[b[0]] || 0) - (categoryCounts[a[0]] || 0));

    return [["all", t.allTopics] as const, ...entries.map(([value, label]) => [value, label] as const)];
  }, [categoryCounts, categoryLabels, t.allTopics]);

  // Calculate popular tags
  const popularTags = useMemo(() => {
    const counts = new Map<string, { label: string; count: number }>();

    const registerTag = (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;
      const key = trimmed.toLowerCase();
      const existing = counts.get(key);
      if (existing) {
        existing.count += 1;
      } else {
        counts.set(key, { label: trimmed, count: 1 });
      }
    };

    posts.forEach((post) => {
      toValueArray(post.tags).forEach(registerTag);
      toValueArray(post.keywords).forEach(registerTag);
    });

    return Array.from(counts.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 8)
      .map((tag) => tag.label);
  }, [posts]);

  // Calculate popular posts (by view count)
  const popularPosts = useMemo(() => {
    return [...posts]
      .sort((a, b) => {
        const valueA = typeof a.view_count === "number" ? a.view_count : 0;
        const valueB = typeof b.view_count === "number" ? b.view_count : 0;
        return valueB - valueA;
      })
      .slice(0, 4);
  }, [posts]);

  // Filter posts by search and category
  const filteredPosts = useMemo(() => {
    const query = searchValue.trim().toLowerCase();

    return posts.filter((post) => {
      if (activeCategory !== "all") {
        const postCategory = normalizeCategory(post.category);
        if (postCategory !== activeCategory) return false;
      }

      if (query) {
        const haystack = [
          post.title,
          post.subtitle,
          post.excerpt,
          post.category,
          ...toValueArray(post.tags),
          ...toValueArray(post.keywords),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(query)) return false;
      }

      return true;
    });
  }, [posts, searchValue, activeCategory]);

  const sortedPosts = useMemo(() => sortPosts(filteredPosts), [filteredPosts]);
  const featuredPost = sortedPosts[0] ?? null;
  const listPosts = featuredPost ? sortedPosts.slice(1) : sortedPosts;

  const buildPostUrl = useCallback(
    (post: BlogPost) => {
      const slug = post.slug?.trim();
      const identifier = slug && slug.length > 0 ? slug : post.id;
      return getLocalizedPath(`/blog/${identifier}`);
    },
    [getLocalizedPath]
  );

  // Store blog base path
  useEffect(() => {
    blogBasePathRef.current = getLocalizedPath("/blog");
  }, [getLocalizedPath]);

  // Open a post in the overlay and update URL
  const openPost = useCallback(
    (post: BlogPost) => {
      setSelectedPost(post);
      const url = buildPostUrl(post);
      window.history.pushState({ blogOverlay: true, postId: post.id }, "", url);
    },
    [buildPostUrl]
  );

  // Close the overlay and restore URL
  const closePost = useCallback(() => {
    setSelectedPost(null);
    const blogPath = getLocalizedPath("/blog");
    window.history.pushState({}, "", blogPath);
  }, [getLocalizedPath]);

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state?.blogOverlay && e.state?.postId) {
        const post = posts.find((p) => p.id === e.state.postId);
        if (post) { setSelectedPost(post); return; }
      }
      setSelectedPost(null);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [posts]);

  // Check if URL points to a specific post on mount (for shared links)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const path = window.location.pathname;
    const blogPath = getLocalizedPath("/blog");
    if (path !== blogPath && path.startsWith(blogPath + "/")) {
      const slug = path.replace(blogPath + "/", "");
      const post = posts.find((p) => (p.slug?.trim() || p.id) === slug);
      if (post) {
        setSelectedPost(post);
        window.history.replaceState({ blogOverlay: true, postId: post.id }, "");
      }
    }
  }, [posts, getLocalizedPath]);

  const handleCategoryClick = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
        <div className="space-y-8">
          {/* Hero/Search Section */}
          <section className="relative overflow-hidden rounded-2xl border border-[#D9E2EF] bg-white p-6 shadow-sm md:p-8">
            <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-[#ffd5c4]/70 blur-3xl" />
            <div className="absolute -left-20 bottom-0 h-32 w-32 rounded-full bg-[#E3F8FF]/60 blur-2xl" />
            <div className="relative space-y-6">
              <div className="space-y-2">
                <Badge variant="outline" className="w-fit uppercase tracking-[0.2em] text-[10px]">
                  {t.badge}
                </Badge>
                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{t.title}</h1>
                <p className="text-sm text-slate-600 max-w-2xl">{t.subtitle}</p>
              </div>
              <div className="relative max-w-xl">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="h-11 rounded-xl border-[#D9E2EF] bg-[#F5F8FF] pl-9 text-sm focus-visible:ring-primary/40"
                />
              </div>
            </div>
          </section>

          {sortedPosts.length === 0 ? (
            <Card className="rounded-2xl border-dashed border-slate-300 bg-white">
              <CardContent className="py-16 text-center">
                <Bookmark className="mx-auto h-10 w-10 text-slate-400" />
                <h2 className="mt-4 text-xl font-semibold text-slate-900">{t.emptyTitle}</h2>
                <p className="mt-2 text-sm text-slate-600">{t.emptySubtitle}</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
              {/* Main Content */}
              <div className="space-y-8">
                {/* Featured Post */}
                {featuredPost && (
                  <button type="button" onClick={() => openPost(featuredPost)} className="group block w-full text-left">
                    <Card className="overflow-hidden rounded-2xl border-[#D9E2EF] bg-white shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg cursor-pointer">
                      <div className="grid md:grid-cols-[1.3fr_1fr]">
                        <div className="relative h-56 md:h-full">
                          {safeImageUrl(featuredPost.featured_image) ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              src={safeImageUrl(featuredPost.featured_image)!}
                              alt={featuredPost.title}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-slate-100 text-4xl">📝</div>
                          )}
                        </div>
                        <div className="flex flex-col gap-4 p-6">
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <Badge variant="outline" className="bg-[#fc3c00]/10 text-[#fc3c00]">
                              {t.featured}
                            </Badge>
                            {featuredPost.category && (
                              <Badge variant="secondary">{formatCategoryLabel(featuredPost.category)}</Badge>
                            )}
                          </div>
                          <h2 className="text-2xl font-semibold font-serif leading-snug line-clamp-2">
                            {featuredPost.title}
                          </h2>
                          {featuredPost.excerpt && (
                            <p className="text-sm text-slate-600 line-clamp-3">{featuredPost.excerpt}</p>
                          )}
                          <div className="mt-auto flex flex-wrap items-center gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-2">
                              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-[10px] font-semibold">
                                {getAuthorInitials(getAuthorName(featuredPost, t.defaultAuthor))}
                              </span>
                              {getAuthorName(featuredPost, t.defaultAuthor)}
                            </span>
                            {featuredPost.published_at && <span>{formatDate(featuredPost.published_at)}</span>}
                            {typeof featuredPost.read_time === "number" && featuredPost.read_time > 0 && (
                              <span>{t.formatReadTime(featuredPost.read_time)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </button>
                )}

                {/* Latest Posts */}
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">{t.latestTitle}</h2>
                      <p className="text-sm text-slate-500">{t.latestSubtitle}</p>
                    </div>
                    <span className="text-xs text-slate-500">{t.formatPostCount(listPosts.length)}</span>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {listPosts.map((post) => {
                      const authorName = getAuthorName(post, t.defaultAuthor);
                      const tags = toValueArray(post.tags);
                      const readTime =
                        typeof post.read_time === "number" && post.read_time > 0
                          ? t.formatReadTime(post.read_time)
                          : post.time_required || null;

                      return (
                        <article key={post.id}>
                          <button type="button" onClick={() => openPost(post)} className="group block h-full w-full text-left">
                            <Card className="h-full overflow-hidden rounded-xl border-[#D9E2EF] bg-white shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md cursor-pointer">
                              {safeImageUrl(post.featured_image) && (
                                <div className="relative h-48 overflow-hidden">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={safeImageUrl(post.featured_image)!}
                                    alt={post.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  />
                                </div>
                              )}
                              <CardHeader className="space-y-3">
                                <div className="flex flex-wrap gap-2">
                                  {post.is_pinned && (
                                    <Badge variant="secondary" className="text-xs">
                                      <Sparkles className="mr-1 h-3 w-3" />
                                      {t.pinned}
                                    </Badge>
                                  )}
                                  {post.category && (
                                    <Badge variant="outline" className="text-xs">
                                      {formatCategoryLabel(post.category)}
                                    </Badge>
                                  )}
                                </div>
                                <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-[#fc3c00] transition-colors">
                                  {post.title}
                                </h3>
                                {post.excerpt && <p className="text-sm text-slate-600 line-clamp-3">{post.excerpt}</p>}
                                {tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1">
                                    {tags.slice(0, 3).map((tag) => (
                                      <Badge key={tag} variant="secondary" className="text-[11px]">
                                        {tag}
                                      </Badge>
                                    ))}
                                    {tags.length > 3 && (
                                      <Badge variant="secondary" className="text-[11px]">
                                        +{tags.length - 3}
                                      </Badge>
                                    )}
                                  </div>
                                )}
                                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                                  <span className="flex items-center gap-2">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-[10px] font-semibold">
                                      {getAuthorInitials(authorName)}
                                    </span>
                                    {authorName}
                                  </span>
                                  {post.published_at && (
                                    <span className="flex items-center gap-1">
                                      <Calendar className="h-3.5 w-3.5" />
                                      {formatDate(post.published_at)}
                                    </span>
                                  )}
                                  {readTime && (
                                    <span className="flex items-center gap-1">
                                      <Clock className="h-3.5 w-3.5" />
                                      {readTime}
                                    </span>
                                  )}
                                </div>
                              </CardHeader>
                            </Card>
                          </button>
                        </article>
                      );
                    })}
                  </div>
                </section>
              </div>

              {/* Sidebar */}
              <aside className="space-y-6">
                {/* Topics */}
                <Card className="rounded-2xl border-[#D9E2EF] bg-white shadow-sm">
                  <CardContent className="space-y-3 p-5">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">{t.topics}</h3>
                    <div className="space-y-2">
                      {categoryTabs.map(([value, label]) => (
                        <button
                          key={value}
                          type="button"
                          className={cn(
                            "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                            activeCategory === value
                              ? "bg-[#fc3c00]/10 text-[#fc3c00]"
                              : "text-slate-500 hover:bg-slate-100"
                          )}
                          onClick={() => handleCategoryClick(value)}
                        >
                          <span>{label}</span>
                          <span className="text-xs text-slate-400">{categoryCounts[value] || 0}</span>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Popular Tags */}
                {popularTags.length > 0 && (
                  <Card className="rounded-2xl border-[#D9E2EF] bg-white shadow-sm">
                    <CardContent className="space-y-3 p-5">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">{t.popularTags}</h3>
                      <div className="flex flex-wrap gap-2">
                        {popularTags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            <Tag className="mr-1 h-3 w-3" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Popular Posts */}
                <Card className="rounded-2xl border-[#D9E2EF] bg-white shadow-sm">
                  <CardContent className="space-y-3 p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">{t.popularPosts}</h3>
                      <span className="text-xs text-slate-400">{popularPosts.length}</span>
                    </div>
                    {popularPosts.length === 0 ? (
                      <p className="text-sm text-slate-500">{t.noPopularPosts}</p>
                    ) : (
                      <div className="space-y-2">
                        {popularPosts.map((post) => {
                          const publishedLabel = post.published_at ? formatDate(post.published_at) : t.draft;
                          return (
                            <button
                              type="button"
                              key={post.id}
                              onClick={() => openPost(post)}
                              className="block w-full text-left rounded-lg border border-[#D9E2EF] px-3 py-2 transition-colors hover:bg-[#F5F8FF] cursor-pointer"
                            >
                              <p className="text-sm font-medium line-clamp-2">{post.title}</p>
                              <p className="mt-1 text-xs text-slate-500">
                                {getAuthorName(post, t.defaultAuthor)} · {publishedLabel}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </aside>
            </div>
          )}
        </div>
      </div>

      {/* Netflix-style overlay */}
      {selectedPost && (
        <BlogOverlay
          post={selectedPost}
          lang={lang}
          onClose={closePost}
          blogBasePath={getLocalizedPath("/blog")}
        />
      )}
    </div>
  );
}
