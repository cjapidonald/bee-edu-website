import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type NewsletterRequestBody = {
  email?: unknown;
  locale?: unknown;
};

const getString = (value: unknown, maxLength: number): string => {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
};

const getSupabaseConfig = () => {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  // Public-facing routes must use the anon key — never the service role key.
  // The service role key bypasses RLS, which these insert-only routes don't need.
  const key = process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

  return { url, key };
};

const API_HEADERS = { "X-Content-Type-Options": "nosniff" } as const;
const MAX_CONTENT_LENGTH = 1024; // 1 KB

export async function POST(request: Request) {
  const contentLength = parseInt(request.headers.get("content-length") ?? "0", 10);
  if (contentLength > MAX_CONTENT_LENGTH) {
    return NextResponse.json(
      { code: "payload_too_large", error: "Request body too large" },
      { status: 413, headers: API_HEADERS }
    );
  }

  const ip = getClientIp(request);
  const { ok: withinLimit } = rateLimit(ip, 10);
  if (!withinLimit) {
    return NextResponse.json(
      { code: "rate_limited", error: "Too many requests. Please try again later." },
      { status: 429, headers: { ...API_HEADERS, "Retry-After": "60" } }
    );
  }

  const { url, key } = getSupabaseConfig();
  if (!url || !key) {
    return NextResponse.json(
      { code: "service_unavailable", error: "Service temporarily unavailable" },
      { status: 503, headers: API_HEADERS }
    );
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ code: "invalid_request", error: "Invalid JSON" }, { status: 400, headers: API_HEADERS });
  }

  if (!rawBody || typeof rawBody !== "object") {
    return NextResponse.json({ code: "invalid_request", error: "Invalid request body" }, { status: 400, headers: API_HEADERS });
  }

  const body = rawBody as NewsletterRequestBody;
  const email = getString(body.email, 254).toLowerCase();
  const locale = getString(body.locale, 20);

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ code: "validation_error", error: "Valid email is required" }, { status: 400, headers: API_HEADERS });
  }

  const safeLocale = locale === "zh-HK" || locale === "en" ? locale : "";

  const supabase = createClient(url, key, {
    db: { schema: "hub" },
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });

  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email, locale: safeLocale || null, status: "active" })
    .select("id")
    .single();

  if (error) {
    // Treat duplicate subscriptions as success.
    if (error.code === "23505") {
      return NextResponse.json({ ok: true }, { status: 200, headers: API_HEADERS });
    }

    return NextResponse.json({ code: "server_error", error: "Failed to subscribe" }, { status: 500, headers: API_HEADERS });
  }

  return NextResponse.json({ ok: true, id: data?.id ?? null }, { status: 200, headers: API_HEADERS });
}

