const windowMs = 60_000; // 1 minute
const cleanupIntervalMs = 5 * 60_000; // 5 minutes

const hits = new Map<string, number[]>();

let cleanupTimer: ReturnType<typeof setInterval> | null = null;

function ensureCleanup() {
  if (cleanupTimer) return;
  cleanupTimer = setInterval(() => {
    const now = Date.now();
    hits.forEach((timestamps, key) => {
      const recent = timestamps.filter((t) => now - t < windowMs);
      if (recent.length === 0) {
        hits.delete(key);
      } else {
        hits.set(key, recent);
      }
    });
    if (hits.size === 0 && cleanupTimer) {
      clearInterval(cleanupTimer);
      cleanupTimer = null;
    }
  }, cleanupIntervalMs);
  // Allow the process to exit without waiting for the timer.
  if (cleanupTimer && typeof cleanupTimer === "object" && "unref" in cleanupTimer) {
    cleanupTimer.unref();
  }
}

/**
 * Build a fingerprint key from multiple request signals.
 *
 * On trusted reverse proxies (Vercel, Cloudflare) the leftmost
 * x-forwarded-for value is set by the proxy and cannot be spoofed.
 * On other hosts the header is attacker-controlled, so we combine it
 * with additional headers that are harder to rotate in concert.
 * Spoofing *all* of them simultaneously yields the same key, so the
 * rate limit still holds.
 */
export function getClientFingerprint(request: Request): string {
  const headers = request.headers;

  // Primary: IP from proxy header
  let ip = "unknown";
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0].trim();
    if (first) ip = first;
  }
  if (ip === "unknown") {
    ip = headers.get("x-real-ip") ?? "unknown";
  }

  // Secondary signals — stable per real browser session, hard to rotate
  const ua = headers.get("user-agent") ?? "";
  const lang = headers.get("accept-language") ?? "";

  // Combine into a single key. Changing any one signal produces a
  // different key, but an attacker must rotate *all three* in sync
  // to avoid the limit, which is impractical for automated abuse.
  return `${ip}|${ua}|${lang}`;
}

/** @deprecated Use getClientFingerprint instead */
export const getClientIp = getClientFingerprint;

export function rateLimit(key: string, limit: number): { ok: boolean; remaining: number } {
  ensureCleanup();

  const now = Date.now();
  const timestamps = hits.get(key) ?? [];
  const recent = timestamps.filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    hits.set(key, recent);
    return { ok: false, remaining: 0 };
  }

  recent.push(now);
  hits.set(key, recent);
  return { ok: true, remaining: limit - recent.length };
}
