import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactRequestBody = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  school?: unknown;
  topic?: unknown;
  message?: unknown;
  bookingType?: unknown;
  slotId?: unknown;
  preferredDate?: unknown;
  preferredTime?: unknown;
  website?: unknown; // honeypot
  timeTakenMs?: unknown;
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
const MAX_CONTENT_LENGTH = 50 * 1024; // 50 KB

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

  const body = rawBody as ContactRequestBody;

  const website = getString(body.website, 200);
  if (website) {
    // Honeypot hit: pretend success but do nothing.
    return NextResponse.json({ ok: true }, { status: 200, headers: API_HEADERS });
  }

  const timeTakenMs = typeof body.timeTakenMs === "number" ? body.timeTakenMs : null;
  if (typeof timeTakenMs === "number" && timeTakenMs > 0 && timeTakenMs < 1000) {
    // Likely bot (direct API call). Pretend success to not teach bots.
    return NextResponse.json({ ok: true }, { status: 200, headers: API_HEADERS });
  }

  const name = getString(body.name, 200);
  const email = getString(body.email, 254).toLowerCase();
  const phone = getString(body.phone, 50);
  const school = getString(body.school, 200);
  const topic = getString(body.topic, 80);
  const message = getString(body.message, 5_000);

  if (!name) {
    return NextResponse.json({ code: "validation_error", error: "Name is required" }, { status: 400, headers: API_HEADERS });
  }

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ code: "validation_error", error: "Valid email is required" }, { status: 400, headers: API_HEADERS });
  }

  const bookingTypeRaw = getString(body.bookingType, 50);
  const bookingType = bookingTypeRaw === "consultation" ? "consultation" : "demo";

  const slotIdRaw = getString(body.slotId, 50);
  const slotId = slotIdRaw && UUID_RE.test(slotIdRaw) ? slotIdRaw : null;

  const preferredDateRaw = getString(body.preferredDate, 20);
  let preferredDate = "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(preferredDateRaw)) {
    // Validate that the date string represents an actual calendar date
    const parsed = new Date(`${preferredDateRaw}T00:00:00`);
    if (!Number.isNaN(parsed.getTime()) && parsed.toISOString().startsWith(preferredDateRaw)) {
      preferredDate = preferredDateRaw;
    }
  }
  const preferredTime = getString(body.preferredTime, 32);

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });

  const insertPayload: Record<string, unknown> = {
    full_name: name,
    email,
    source: "website",
    status: "new",
  };

  if (phone) insertPayload.phone = phone;
  if (school) insertPayload.school_name = school;
  if (topic) insertPayload.role = topic;
  if (message) insertPayload.message = message;

  // Append demo booking info to the message so sales can see it
  if (bookingType === "demo" && preferredDate) {
    const demoInfo = `[Demo Booking] Date: ${preferredDate}${preferredTime ? `, Time: ${preferredTime}` : ""}`;
    insertPayload.message = insertPayload.message
      ? `${insertPayload.message}\n\n${demoInfo}`
      : demoInfo;
    insertPayload.status = "demo_booked";
  }

  const { data, error } = await supabase
    .from("contact_sales_leads")
    .insert(insertPayload)
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ code: "server_error", error: "Failed to submit contact form" }, { status: 500, headers: API_HEADERS });
  }

  // If a specific consultation slot was selected, increment its booking count
  if (slotId) {
    // Fetch current count and increment
    const { data: slot } = await supabase
      .from("consultation_slots")
      .select("current_bookings, max_bookings")
      .eq("id", slotId)
      .single();

    if (slot) {
      const newCount = (slot.current_bookings || 0) + 1;
      const isFull = newCount >= (slot.max_bookings || 1);

      await supabase
        .from("consultation_slots")
        .update({
          current_bookings: newCount,
          is_available: !isFull,
        })
        .eq("id", slotId);
    }
  }

  return NextResponse.json({ ok: true, id: data?.id ?? null }, { status: 200, headers: API_HEADERS });
}

