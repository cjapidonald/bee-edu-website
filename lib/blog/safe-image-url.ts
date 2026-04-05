/**
 * Allowlist of hostnames permitted for blog images.
 * URLs from the database (featured_image, author_image, content block src)
 * are validated against this list before rendering with <img>.
 */
const TRUSTED_IMAGE_HOSTS = new Set([
  "images.unsplash.com",
]);

const TRUSTED_IMAGE_SUFFIXES = [
  ".supabase.co",
];

function isAllowedHost(hostname: string): boolean {
  if (TRUSTED_IMAGE_HOSTS.has(hostname)) return true;
  return TRUSTED_IMAGE_SUFFIXES.some((suffix) => hostname.endsWith(suffix));
}

/**
 * Returns the URL string if it points to a trusted image host, or `null`
 * otherwise. Relative paths (`/foo.png`) and data URIs (`data:image/...`)
 * are allowed through — they cannot trigger cross-origin requests.
 */
export function safeImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  // Allow relative paths (served from own origin)
  if (trimmed.startsWith("/")) return trimmed;

  // Allow inline data URIs for safe raster image types only.
  // SVG data URIs are blocked because they can embed JavaScript.
  const SAFE_DATA_PREFIXES = [
    "data:image/png",
    "data:image/jpeg",
    "data:image/gif",
    "data:image/webp",
    "data:image/avif",
  ];
  if (SAFE_DATA_PREFIXES.some((p) => trimmed.startsWith(p))) return trimmed;

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== "https:") return null;
    if (isAllowedHost(parsed.hostname)) return trimmed;
  } catch {
    // Malformed URL
  }

  return null;
}
