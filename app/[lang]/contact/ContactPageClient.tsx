"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Calendar,
  MessageSquare,
  Loader2,
  Check,
  Clock,
  Globe,
  Sparkles,
  Video,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import { supabase as supabaseClient, isSupabaseConfigured } from "@/lib/supabase/client";

type PageTab = "talk-to-sales" | "book-demo";

const texts = {
  en: {
    badge: "Get in Touch",
    heroTitle1: "Let's Talk About Your",
    heroTitle2: "School's Future",
    heroSubtitle: "Whether you're a teacher looking to save time or a school leader exploring AI solutions, we're here to help.",
    tabTalkToSales: "Chat with Our Team",
    tabBookDemo: "Schedule a Walkthrough",
    tabTalkDesc: "Reach out and we'll get back to you shortly",
    tabDemoDesc: "See KiwiBee in action with our team",
    quickContact: "Quick Contact",
    email: "Email",
    whatsApp: "WhatsApp",
    address: "Address",
    addressValue: "721-725 Nathan Road, Belgian Bank Building, Mongkok, Hong Kong",
    officeHours: "Office Hours",
    mondayFriday: "Monday - Friday",
    saturday: "Saturday",
    sunday: "Sunday",
    closed: "Closed",
    responseTime: "Response Time",
    avgResponse: "Average response time",
    under4Hours: "Under 4 hours",
    bookDemo: "Schedule a Walkthrough",
    demoSubtitle: "See KiwiBee in action with a personalized walkthrough",
    thirtyMin: "30 min session",
    formTitle: "Send us a message",
    formSubtitle: "Fill out the form below and we'll get back to you within 24 hours.",
    demoFormTitle: "Schedule Your Demo",
    demoFormSubtitle: "Pick a time that works for you and we'll show you KiwiBee in action.",
    yourName: "Your Name",
    emailAddress: "Email Address",
    phoneNumber: "Phone Number",
    schoolOrg: "School / Organization",
    howCanWeHelp: "How can we help?",
    selectTopic: "Select a topic",
    topicDemo: "Request a Demo",
    topicPricing: "Pricing Information",
    topicSupport: "Technical Support",
    topicPartnership: "Partnership Inquiry",
    topicOther: "Other",
    selectTimeSlot: "Select a Time Slot",
    loadingSlots: "Loading available slots...",
    noSlotsAvailable: "No slots available right now. Send us a message and we'll arrange a time.",
    spot: "spot",
    spots: "spots",
    left: "left",
    booked: "Booked",
    available: "Available",
    noSlots: "No slots",
    thisWeek: "This Week",
    timezoneNote: "All times shown in Hong Kong Time (HKT)",
    message: "Message",
    messagePlaceholder: "Tell us more about your needs...",
    demoMessagePlaceholder: "Anything specific you'd like to see in the demo?",
    sending: "Sending...",
    sendMessage: "Reach Out",
    bookDemoBtn: "Schedule Walkthrough",
    messageSent: "Message Sent!",
    demoBooked: "Demo Booked!",
    successMessage: "We'll get back to you within 24 hours.",
    demoSuccessMessage: "You'll receive a confirmation email with meeting details shortly.",
    submitError: "Something went wrong. Please try again.",
    slotUnavailable: "That time slot is no longer available. Please choose another.",
    ctaTitle: "Ready to get started?",
    ctaSubtitle: "Need school pricing details? Contact sales for a custom quote and rollout plan.",
    startFreeTrial: "Get Custom Quote",
    nameRequired: "Name is required",
    emailRequired: "Email is required",
    invalidEmail: "Please enter a valid email address",
    invalidPhone: "Please enter a valid phone number",
    slotRequired: "Please select a time slot for your demo",
    namePlaceholder: "John Smith",
    emailPlaceholder: "john@school.edu",
    phonePlaceholder: "+852 94954912",
    schoolPlaceholder: "Springfield Elementary",
  },
  "zh-HK": {
    badge: "聯絡我們",
    heroTitle1: "讓我們談談您",
    heroTitle2: "學校的未來",
    heroSubtitle: "無論您是想節省時間的教師，還是探索 AI 解決方案的學校領導，我們都在這裡幫助您。",
    tabTalkToSales: "與我們團隊聊聊",
    tabBookDemo: "預約導覽",
    tabTalkDesc: "聯繫我們，我們會盡快回覆",
    tabDemoDesc: "與我們的團隊一起體驗 KiwiBee",
    quickContact: "快速聯絡",
    email: "電郵",
    whatsApp: "WhatsApp",
    address: "地址",
    addressValue: "香港旺角彌敦道721-725號華比銀行大廈",
    officeHours: "辦公時間",
    mondayFriday: "週一至週五",
    saturday: "週六",
    sunday: "週日",
    closed: "休息",
    responseTime: "回覆時間",
    avgResponse: "平均回覆時間",
    under4Hours: "4 小時內",
    bookDemo: "預約導覽",
    demoSubtitle: "透過個人化導覽體驗 KiwiBee",
    thirtyMin: "30 分鐘課程",
    formTitle: "發送訊息給我們",
    formSubtitle: "填寫以下表格，我們將在 24 小時內回覆您。",
    demoFormTitle: "預約您的演示",
    demoFormSubtitle: "選擇適合您的時間，我們將為您展示 KiwiBee。",
    yourName: "您的姓名",
    emailAddress: "電郵地址",
    phoneNumber: "電話號碼",
    schoolOrg: "學校 / 機構",
    howCanWeHelp: "我們如何幫助您？",
    selectTopic: "選擇主題",
    topicDemo: "請求演示",
    topicPricing: "價格資訊",
    topicSupport: "技術支援",
    topicPartnership: "合作查詢",
    topicOther: "其他",
    selectTimeSlot: "選擇時段",
    loadingSlots: "正在載入可用時段...",
    noSlotsAvailable: "暫時沒有可用時段。請先發送訊息，我們會跟進安排時間。",
    spot: "個名額",
    spots: "個名額",
    left: "剩餘",
    booked: "已預訂",
    available: "可預約",
    noSlots: "無時段",
    thisWeek: "本週",
    timezoneNote: "所有時間均為香港時間（HKT）",
    message: "訊息",
    messagePlaceholder: "告訴我們更多關於您的需求...",
    demoMessagePlaceholder: "您希望在演示中看到什麼具體內容？",
    sending: "發送中...",
    sendMessage: "聯繫我們",
    bookDemoBtn: "預約導覽",
    messageSent: "訊息已發送！",
    demoBooked: "演示已預約！",
    successMessage: "我們將在 24 小時內回覆您。",
    demoSuccessMessage: "您將很快收到一封包含會議詳情的確認電郵。",
    submitError: "發送失敗，請稍後再試。",
    slotUnavailable: "該時段已被預訂，請選擇其他時段。",
    ctaTitle: "準備好開始了嗎？",
    ctaSubtitle: "如需學校定價詳情，請聯絡銷售團隊索取定制報價與導入方案。",
    startFreeTrial: "索取定制報價",
    nameRequired: "請輸入姓名",
    emailRequired: "請輸入電郵地址",
    invalidEmail: "請輸入有效的電郵地址",
    invalidPhone: "請輸入有效的電話號碼",
    slotRequired: "請為您的演示選擇時段",
    namePlaceholder: "陳大文",
    emailPlaceholder: "john@school.edu",
    phonePlaceholder: "+852 94954912",
    schoolPlaceholder: "春田小學",
  },
};

type SlotData = {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  spotsLeft: number;
  timezone: string;
  booked: boolean;
};

type ScheduleSlotRecord = {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  timezone: string | null;
  max_bookings: number | null;
  current_bookings: number | null;
  is_available: boolean | null;
};

const formatSlotDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const mapSlotRecords = (records: ScheduleSlotRecord[]): SlotData[] =>
  records
    .map((slot) => {
      const maxBookings = slot.max_bookings ?? 1;
      const currentBookings = slot.current_bookings ?? 0;
      const spotsLeft = Math.max(0, maxBookings - currentBookings);
      const timezone = slot.timezone?.includes("Hong_Kong") ? "HKT" : (slot.timezone || "HKT");

      return {
        id: slot.id,
        date: slot.date,
        startTime: slot.start_time?.slice(0, 5) || "",
        endTime: slot.end_time?.slice(0, 5) || "",
        spotsLeft,
        timezone,
        booked: spotsLeft <= 0,
      } satisfies SlotData;
    })
    .filter((slot) => Boolean(slot.startTime && slot.endTime));

const groupSlotsByDate = (slots: SlotData[]) => {
  return slots.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = [];
    }
    acc[slot.date].push(slot);
    return acc;
  }, {} as Record<string, SlotData[]>);
};

/** Get the Monday of the week containing the given date */
const getWeekStart = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day; // Monday = 1
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

/** Generate array of 7 dates (Mon-Sun) for a week starting at weekStart */
const getWeekDays = (weekStart: Date): Date[] => {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });
};

const DAY_NAMES_EN = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DAY_NAMES_ZH = ["一", "二", "三", "四", "五", "六", "日"];

const MONTH_NAMES_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTH_NAMES_ZH = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

/**
 * Try fetching slots from multiple possible table names and schemas.
 * The sales admin may store them as `consultation_slots` or `schedule_slots`
 * in either the `public` or `hub` schema.
 */
const fetchSlotsFromSupabase = async (): Promise<SlotData[]> => {
  const supabase = supabaseClient;
  const today = formatSlotDate(new Date());

  const selectCols = "id,date,start_time,end_time,timezone,max_bookings,current_bookings,is_available";

  // All tables live in the public schema — query directly without .schema()
  const tables = ["consultation_slots", "schedule_slots"];

  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select(selectCols)
        .gte("date", today)
        .order("date", { ascending: true })
        .order("start_time", { ascending: true })
        .limit(100);

      if (error) {
        console.warn(`Slots query failed for ${table}:`, error.message);
        continue;
      }

      if (data && data.length > 0) {
        console.info(`Loaded ${data.length} slots from ${table}`);
        return mapSlotRecords(data as ScheduleSlotRecord[]);
      }

      console.info(`${table} exists but returned 0 future slots`);
    } catch {
      continue;
    }
  }

  return [];
};

export default function ContactPage({
  params,
}: {
  params: { lang: string };
}) {
  const lang = params.lang || "en";
  const [activeTab, setActiveTab] = useState<PageTab>("book-demo");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [slots, setSlots] = useState<SlotData[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [weekOffset, setWeekOffset] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    school: "",
    topic: "",
    message: "",
  });

  // Security: Honeypot field ref (hidden from users, bots fill it)
  const honeypotRef = useRef<HTMLInputElement>(null);
  // Security: Track form start time (submissions < 3s are likely bots)
  const formStartTime = useRef<number>(Date.now());

  const { ref: heroRef, isInView: heroInView } = useInView<HTMLDivElement>({ threshold: 0.1, once: true });

  useEffect(() => {
    formStartTime.current = Date.now();
  }, [params.lang]);

  useEffect(() => {
    let active = true;

    const loadSlots = async () => {
      setSlotsLoading(true);

      if (!isSupabaseConfigured()) {
        if (active) {
          setSlots([]);
          setSlotsLoading(false);
        }
        return;
      }

      try {
        const result = await fetchSlotsFromSupabase();
        if (active) {
          setSlots(result);
          setSlotsLoading(false);
        }
      } catch (err) {
        console.error("Failed to load schedule slots", err);
        if (active) {
          setSlots([]);
          setSlotsLoading(false);
        }
      }
    };

    loadSlots();

    return () => {
      active = false;
    };
  }, []);

  const t = texts[lang as keyof typeof texts] || texts.en;
  const isZh = lang === "zh-HK";
  const dayNames = isZh ? DAY_NAMES_ZH : DAY_NAMES_EN;
  const monthNames = isZh ? MONTH_NAMES_ZH : MONTH_NAMES_EN;

  const slotsByDate = useMemo(() => groupSlotsByDate(slots), [slots]);

  const calendarData = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentWeekStart = getWeekStart(today);
    const viewWeekStart = new Date(currentWeekStart);
    viewWeekStart.setDate(viewWeekStart.getDate() + weekOffset * 7);
    const weekDays = getWeekDays(viewWeekStart);

    // Determine the month label for the header
    const firstDay = weekDays[0];
    const lastDay = weekDays[6];
    let monthLabel: string;
    if (firstDay.getMonth() === lastDay.getMonth()) {
      monthLabel = `${monthNames[firstDay.getMonth()]} ${firstDay.getFullYear()}`;
    } else if (firstDay.getFullYear() === lastDay.getFullYear()) {
      monthLabel = `${monthNames[firstDay.getMonth()]} - ${monthNames[lastDay.getMonth()]} ${firstDay.getFullYear()}`;
    } else {
      monthLabel = `${monthNames[firstDay.getMonth()]} ${firstDay.getFullYear()} - ${monthNames[lastDay.getMonth()]} ${lastDay.getFullYear()}`;
    }

    return { today, weekDays, monthLabel, viewWeekStart };
  }, [weekOffset, monthNames]);

  // Check if there are slots in future weeks (for "next" button)
  const hasNextWeekSlots = useMemo(() => {
    const nextWeekStart = new Date(calendarData.viewWeekStart);
    nextWeekStart.setDate(nextWeekStart.getDate() + 7);
    const nextWeekEnd = new Date(nextWeekStart);
    nextWeekEnd.setDate(nextWeekEnd.getDate() + 6);
    const nextStartStr = formatSlotDate(nextWeekStart);
    const nextEndStr = formatSlotDate(nextWeekEnd);
    return slots.some((s) => s.date >= nextStartStr && s.date <= nextEndStr);
  }, [slots, calendarData.viewWeekStart]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = t.nameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.invalidEmail;
    }

    if (formData.phone && !/^(\+?[0-9().\s-]{7,20})$/.test(formData.phone)) {
      newErrors.phone = t.invalidPhone;
    }

    // Require time slot for demo tab
    if (activeTab === "book-demo" && !selectedSlotId && slots.length > 0) {
      newErrors.slot = t.slotRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Security: Check honeypot field
    if (honeypotRef.current?.value) {
      setSubmitSuccess(true);
      return;
    }

    // Security: Check submission time
    const timeTakenMs = Date.now() - formStartTime.current;
    if (timeTakenMs < 3000) {
      setSubmitSuccess(true);
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const selectedSlot = selectedSlotId ? slots.find((slot) => slot.id === selectedSlotId) : null;
    const isDemo = activeTab === "book-demo";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          topic: isDemo ? "demo" : formData.topic,
          bookingType: isDemo ? "demo" : "contact",
          slotId: isDemo ? selectedSlotId : undefined,
          preferredDate: selectedSlot?.date,
          preferredTime: selectedSlot ? `${selectedSlot.startTime} - ${selectedSlot.endTime}` : undefined,
          website: honeypotRef.current?.value || "",
          timeTakenMs,
          lang,
        }),
      });

      const body = (await response.json().catch(() => null)) as { code?: string; error?: string } | null;

      if (!response.ok) {
        if (body?.code === "slot_unavailable") {
          setSubmitError(t.slotUnavailable);
        } else {
          setSubmitError(t.submitError);
        }
        return;
      }

      setSubmitSuccess(true);

      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          school: "",
          topic: "",
          message: "",
        });
        setSelectedSlotId(null);
        setSubmitSuccess(false);
        formStartTime.current = Date.now();
      }, 3000);
    } catch (err) {
      console.error("Contact form submission failed", err);
      setSubmitError(t.submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative pt-16 sm:pt-20 md:pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-gray-950 to-gray-950" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl hidden sm:block" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl hidden sm:block" />

        <div
          ref={heroRef}
          className="container px-4 relative z-10"
          style={{
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
          }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-[#16a34a]/10 text-[#16a34a] rounded-full text-sm font-medium">
              <MessageSquare className="h-4 w-4" />
              <span>{t.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {t.heroTitle1}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16a34a] via-[#facc15] to-[#facc15]">
                {t.heroTitle2}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              {t.heroSubtitle}
            </p>

            <p className="text-sm text-gray-500 mt-3">
              {t.tabDemoDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-gray-900">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contact Info Cards */}
              <div className="space-y-6">
                {/* Quick Contact */}
                <Card className="p-6 rounded-2xl border border-gray-700 hover:shadow-lg transition-all">
                  <h3 className="font-semibold text-white mb-4">{t.quickContact}</h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-[#16a34a]/10 rounded-lg">
                        <Mail className="h-5 w-5 text-[#16a34a]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t.email}</p>
                        <a href="mailto:hello@elementals.com" className="text-[#16a34a] font-medium hover:underline">
                          hello@elementals.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gray-900 rounded-lg">
                        <Phone className="h-5 w-5 text-[#16a34a]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t.whatsApp}</p>
                        <a
                          href="https://wa.me/85294954912"
                          className="text-white font-medium hover:underline"
                        >
                          +852 94954912
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gray-900 rounded-lg">
                        <MapPin className="h-5 w-5 text-[#16a34a]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t.address}</p>
                        <p className="text-white font-medium">
                          {t.addressValue}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Office Hours */}
                <Card className="p-6 rounded-2xl border border-gray-700 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gray-900 rounded-xl">
                      <Clock className="h-6 w-6 text-[#15803d]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">{t.officeHours}</h3>
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-400">{t.mondayFriday}: <span className="text-white font-medium">9:00 AM - 6:00 PM HKT</span></p>
                        <p className="text-gray-400">{t.saturday}: <span className="text-white font-medium">10:00 AM - 2:00 PM HKT</span></p>
                        <p className="text-gray-400">{t.sunday}: <span className="text-gray-500">{t.closed}</span></p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Response Time - shown on Talk to Sales tab */}
                {activeTab === "talk-to-sales" && (
                  <Card className="p-6 rounded-2xl border border-gray-700 hover:shadow-lg transition-all">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gray-900 rounded-xl">
                        <MessageSquare className="h-6 w-6 text-[#16a34a]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-1">{t.responseTime}</h3>
                        <p className="text-gray-400 text-sm mb-2">{t.avgResponse}</p>
                        <p className="text-white font-medium">{t.under4Hours}</p>
                      </div>
                    </div>
                  </Card>
                )}

                {/* Book a Demo card - shown on Demo tab */}
                {activeTab === "book-demo" && (
                  <Card className="p-6 rounded-2xl border border-gray-700 hover:shadow-lg transition-all bg-gradient-to-br from-primary/5 to-primary/10">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#16a34a]/20 rounded-xl">
                        <Calendar className="h-6 w-6 text-[#16a34a]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-1">{t.bookDemo}</h3>
                        <p className="text-gray-400 text-sm mb-3">{t.demoSubtitle}</p>
                        <Badge className="bg-[#16a34a]/10 text-[#16a34a]">{t.thirtyMin}</Badge>
                      </div>
                    </div>
                  </Card>
                )}
              </div>

              {/* Form Area */}
              <div className="lg:col-span-2">
                <Card className="p-8 rounded-2xl border border-gray-700 shadow-lg">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {activeTab === "talk-to-sales" ? t.formTitle : t.demoFormTitle}
                  </h2>
                  <p className="text-gray-400 mb-6">
                    {activeTab === "talk-to-sales" ? t.formSubtitle : t.demoFormSubtitle}
                  </p>

                  {submitSuccess ? (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-full mb-4">
                        <Check className="h-8 w-8 text-[#16a34a]" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {activeTab === "talk-to-sales" ? t.messageSent : t.demoBooked}
                      </h3>
                      <p className="text-gray-400">
                        {activeTab === "talk-to-sales" ? t.successMessage : t.demoSuccessMessage}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Honeypot field */}
                      <div className="hidden" aria-hidden="true">
                        <label htmlFor="website">Website</label>
                        <input
                          ref={honeypotRef}
                          type="text"
                          id="website"
                          name="website"
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                            {t.yourName} *
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={t.namePlaceholder}
                            autoComplete="name"
                            className={cn("py-3 rounded-xl", errors.name && "border-red-500")}
                          />
                          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                            {t.emailAddress} *
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder={t.emailPlaceholder}
                            autoComplete="email"
                            className={cn("py-3 rounded-xl", errors.email && "border-red-500")}
                          />
                          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                            {t.phoneNumber}
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder={t.phonePlaceholder}
                            autoComplete="tel"
                            className={cn("py-3 rounded-xl", errors.phone && "border-red-500")}
                          />
                          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>
                        <div>
                          <label htmlFor="school" className="block text-sm font-medium text-gray-300 mb-2">
                            {t.schoolOrg}
                          </label>
                          <Input
                            id="school"
                            name="school"
                            value={formData.school}
                            onChange={handleChange}
                            placeholder={t.schoolPlaceholder}
                            autoComplete="organization"
                            className="py-3 rounded-xl"
                          />
                        </div>
                      </div>

                      {/* Topic selector - only on Talk to Sales */}
                      {activeTab === "talk-to-sales" && (
                        <div>
                          <label htmlFor="topic" className="block text-sm font-medium text-gray-300 mb-2">
                            {t.howCanWeHelp}
                          </label>
                          <select
                            id="topic"
                            name="topic"
                            value={formData.topic}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-700 rounded-xl bg-gray-900 text-gray-300"
                          >
                            <option value="">{t.selectTopic}</option>
                            <option value="pricing">{t.topicPricing}</option>
                            <option value="support">{t.topicSupport}</option>
                            <option value="partnership">{t.topicPartnership}</option>
                            <option value="other">{t.topicOther}</option>
                          </select>
                        </div>
                      )}

                      {/* Calendar Slot Selection - only on Book Demo */}
                      {activeTab === "book-demo" && (
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">
                            {t.selectTimeSlot} *
                          </label>

                          {slotsLoading ? (
                            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 py-8">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              {t.loadingSlots}
                            </div>
                          ) : slots.length === 0 ? (
                            <p className="text-sm text-gray-500 py-4">{t.noSlotsAvailable}</p>
                          ) : (
                            <div className="border border-gray-700 rounded-xl overflow-hidden">
                              {/* Calendar Header - month + navigation */}
                              <div className="flex items-center justify-between px-4 py-3 bg-gray-800/50 border-b border-gray-700">
                                <button
                                  type="button"
                                  onClick={() => setWeekOffset((w) => Math.max(0, w - 1))}
                                  disabled={weekOffset === 0}
                                  className={cn(
                                    "p-1.5 rounded-lg transition-colors",
                                    weekOffset === 0
                                      ? "text-gray-300 cursor-not-allowed"
                                      : "text-gray-400 hover:bg-gray-700"
                                  )}
                                >
                                  <ChevronLeft className="h-4 w-4" />
                                </button>
                                <span className="text-sm font-semibold text-gray-100">
                                  {calendarData.monthLabel}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setWeekOffset((w) => w + 1)}
                                  disabled={!hasNextWeekSlots}
                                  className={cn(
                                    "p-1.5 rounded-lg transition-colors",
                                    !hasNextWeekSlots
                                      ? "text-gray-300 cursor-not-allowed"
                                      : "text-gray-400 hover:bg-gray-700"
                                  )}
                                >
                                  <ChevronRight className="h-4 w-4" />
                                </button>
                              </div>

                              {/* Week Grid */}
                              <div className="grid grid-cols-7 divide-x divide-gray-100">
                                {calendarData.weekDays.map((day, dayIdx) => {
                                  const dateStr = formatSlotDate(day);
                                  const daySlots = slotsByDate[dateStr] || [];
                                  const isToday = day.getTime() === calendarData.today.getTime();
                                  const isPast = day < calendarData.today;

                                  return (
                                    <div key={dateStr} className="min-h-[120px]">
                                      {/* Day Header */}
                                      <div
                                        className={cn(
                                          "px-1 py-2 text-center border-b border-gray-800",
                                          isToday && "bg-[#16a34a]/5"
                                        )}
                                      >
                                        <div className="text-[10px] font-medium text-gray-400 uppercase">
                                          {dayNames[dayIdx]}
                                        </div>
                                        <div
                                          className={cn(
                                            "text-sm font-semibold mt-0.5 w-7 h-7 mx-auto flex items-center justify-center rounded-full",
                                            isToday && "bg-[#16a34a] text-white",
                                            isPast && !isToday && "text-gray-300",
                                            !isToday && !isPast && "text-gray-300"
                                          )}
                                        >
                                          {day.getDate()}
                                        </div>
                                      </div>

                                      {/* Slots for this day */}
                                      <div className="p-1 space-y-1">
                                        {isPast && daySlots.length === 0 ? null : daySlots.length === 0 ? (
                                          <div className="text-[9px] text-gray-300 text-center py-2">
                                            {t.noSlots}
                                          </div>
                                        ) : (
                                          daySlots.map((slot) => {
                                            const isSelected = selectedSlotId === slot.id;
                                            const isBooked = slot.booked;

                                            return (
                                              <button
                                                key={slot.id}
                                                type="button"
                                                disabled={isBooked}
                                                onClick={() => {
                                                  if (!isBooked) {
                                                    setSelectedSlotId(isSelected ? null : slot.id);
                                                    if (errors.slot) setErrors((prev) => ({ ...prev, slot: "" }));
                                                  }
                                                }}
                                                className={cn(
                                                  "w-full text-left px-1.5 py-1.5 rounded-md text-[11px] leading-tight transition-all",
                                                  isBooked && "bg-gray-800 text-gray-400 cursor-not-allowed line-through",
                                                  !isBooked && !isSelected && "bg-gray-900 text-[#15803d] hover:bg-kiwi cursor-pointer border border-[#16a34a]/20",
                                                  isSelected && "bg-[#16a34a] text-white border border-[#16a34a] shadow-sm"
                                                )}
                                                title={isBooked ? t.booked : `${slot.startTime} - ${slot.endTime}`}
                                              >
                                                <div className="font-semibold truncate">
                                                  {slot.startTime}
                                                </div>
                                                <div className={cn(
                                                  "text-[9px] truncate",
                                                  isSelected ? "text-white/80" : isBooked ? "text-gray-400" : "text-[#16a34a]"
                                                )}>
                                                  {isBooked
                                                    ? t.booked
                                                    : `${slot.spotsLeft} ${t.left}`
                                                  }
                                                </div>
                                              </button>
                                            );
                                          })
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* Selected slot summary */}
                          {selectedSlotId && (() => {
                            const sel = slots.find((s) => s.id === selectedSlotId);
                            if (!sel) return null;
                            const d = new Date(sel.date + "T00:00:00");
                            const dayLabel = d.toLocaleDateString(isZh ? "zh-HK" : "en-US", {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                            });
                            return (
                              <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-[#16a34a]/5 border border-[#16a34a]/20 rounded-lg">
                                <Check className="h-4 w-4 text-[#16a34a] flex-shrink-0" />
                                <span className="text-sm text-[#16a34a] font-medium">
                                  {dayLabel}, {sel.startTime} - {sel.endTime} HKT
                                </span>
                              </div>
                            );
                          })()}

                          {errors.slot && <p className="text-red-500 text-sm mt-2">{errors.slot}</p>}
                          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            {t.timezoneNote}
                          </p>
                        </div>
                      )}

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                          {t.message}
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder={activeTab === "talk-to-sales" ? t.messagePlaceholder : t.demoMessagePlaceholder}
                          rows={activeTab === "talk-to-sales" ? 5 : 3}
                          className="rounded-xl resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={cn(
                          "w-full py-6 text-lg font-semibold rounded-xl transition-all",
                          "bg-[#16a34a] hover:bg-[#15803d] text-white",
                          isSubmitting && "opacity-70 cursor-not-allowed"
                        )}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            {t.sending}
                          </>
                        ) : activeTab === "talk-to-sales" ? (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            {t.sendMessage}
                          </>
                        ) : (
                          <>
                            <Calendar className="mr-2 h-5 w-5" />
                            {t.bookDemoBtn}
                          </>
                        )}
                      </Button>

                      {submitError && (
                        <p role="alert" className="text-sm text-red-600">
                          {submitError}
                        </p>
                      )}
                    </form>
                  )}
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#16a34a] via-[#15803d] to-[#166534]">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              {t.ctaTitle}
            </h2>
            <p className="text-lg text-white/90 mb-8">
              {t.ctaSubtitle}
            </p>
            <a href="mailto:hello@elementals.com?subject=School%20Pricing%20Inquiry">
              <Button size="lg" className="bg-gray-900 text-[#16a34a] hover:bg-gray-800 px-8 py-6 text-lg rounded-xl">
                {t.startFreeTrial}
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
