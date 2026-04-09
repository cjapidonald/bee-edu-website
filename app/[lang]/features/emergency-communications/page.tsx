import { AlertTriangle, Bell, MessageSquare, Users, Smartphone, Mail, Shield } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { FeaturePageTemplate } from "@/components/pages/FeaturePageTemplate";
import { ChatMockup } from "@/components/beaver-mockups";

const texts = {
  en: {
    badge: "Communication",
    title: "Emergency Communications",
    highlight: "Instant, reliable, everywhere",
    description:
      "Mass notification for drills, closures, and urgent updates — across SMS, push, email, and in-app. Target by role, school, or class. Track delivery and read receipts in real time.",
    trustIndicator1: "Multi-channel delivery",
    trustIndicator2: "Real-time read receipts",
    trustIndicator3: "Drill mode for practice",
    features: [
      { icon: Bell, title: "Instant mass alerts", description: "Push to every parent, student, and staff member in seconds." },
      { icon: Smartphone, title: "SMS + Push + Email", description: "Reach everyone via the channel they prefer — automatically." },
      { icon: Users, title: "Targeted delivery", description: "Send to a single class, a whole school, or every family at once." },
      { icon: Shield, title: "Drill mode", description: "Run practice drills without alarming parents — test your system safely." },
      { icon: MessageSquare, title: "Read receipts", description: "See who received and acknowledged each alert in real time." },
      { icon: AlertTriangle, title: "Severity levels", description: "Info, advisory, warning, emergency — the right tone for the right moment." },
    ],
    howItWorks: [
      { step: 1, title: "Pick audience", description: "Select roles, schools, or classes to notify." },
      { step: 2, title: "Choose channels", description: "SMS, push, email — or all at once." },
      { step: 3, title: "Send & track", description: "One tap to send, real-time delivery tracking." },
    ],
  },
  "zh-HK": {
    badge: "溝通",
    title: "緊急通訊",
    highlight: "即時、可靠、無處不在",
    description:
      "針對演習、停課與緊急情況即時發送大規模通知——跨 SMS、推播、電郵與應用內。按角色、學校或班級目標投放。即時追蹤送達與已讀回條。",
    trustIndicator1: "多渠道送達",
    trustIndicator2: "即時已讀回條",
    trustIndicator3: "演習模式",
    features: [
      { icon: Bell, title: "即時大規模警示", description: "秒速推送至每位家長、學生與教職員。" },
      { icon: Smartphone, title: "SMS + 推播 + 電郵", description: "透過每個人喜好的渠道自動送達。" },
      { icon: Users, title: "目標投放", description: "發送給單一班級、整間學校或所有家庭。" },
      { icon: Shield, title: "演習模式", description: "不驚動家長進行演習——安全測試系統。" },
      { icon: MessageSquare, title: "已讀回條", description: "即時查看誰收到並確認每則警示。" },
      { icon: AlertTriangle, title: "嚴重程度分級", description: "資訊、建議、警告、緊急——適切的語調配對情境。" },
    ],
    howItWorks: [
      { step: 1, title: "選擇受眾", description: "選擇要通知的角色、學校或班級。" },
      { step: 2, title: "選擇渠道", description: "SMS、推播、電郵——或全部。" },
      { step: 3, title: "發送與追蹤", description: "一鍵發送，即時送達追蹤。" },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const rawLang = (await params).lang;
  const lang = rawLang === "zh-HK" ? "zh-HK" : "en";
  const t = texts[lang] ?? texts.en;
  return buildPageMetadata({
    lang,
    path: "/features/emergency-communications",
    title: `${t.title} — ${t.highlight} | Elementals`,
    description: t.description,
  });
}

export default async function EmergencyCommunicationsPage({ params }: { params: Promise<{ lang: string }> }) {
  const rawLang = (await params).lang;
  const lang: Locale = rawLang === "zh-HK" ? "zh-HK" : rawLang === "vi" ? "vi" : "en";
  const contentLang = lang === "zh-HK" ? "zh-HK" : "en";
  const t = texts[contentLang] ?? texts.en;

  return (
    <FeaturePageTemplate
      badge={t.badge}
      badgeIcon={AlertTriangle}
      title={t.title}
      highlight={t.highlight}
      description={t.description}
      features={t.features}
      howItWorks={t.howItWorks}
      trustIndicators={[t.trustIndicator1, t.trustIndicator2, t.trustIndicator3]}
      lang={lang}
      mockup={<ChatMockup lang={lang} />}
    />
  );
}
