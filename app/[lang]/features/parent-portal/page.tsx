import { Heart, GraduationCap, Bell, MessageSquare, Calendar, FileText, Users } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { FeaturePageTemplate } from "@/components/pages/FeaturePageTemplate";
import { ParentDashboardMockup } from "@/components/beaver-mockups";

const texts = {
  en: {
    badge: "Communication",
    title: "Parent Portal",
    highlight: "Every family, every detail, one place",
    description:
      "Parents see their child's grades, attendance, behavior, homework, ClassSpark gems, and messages — all in one place. Real-time updates, no more chasing teachers for information.",
    trustIndicator1: "Real-time updates",
    trustIndicator2: "Multi-child support",
    trustIndicator3: "Mobile-friendly",
    features: [
      { icon: GraduationCap, title: "Live grades", description: "See grades across subjects the moment teachers publish them — no more waiting for report cards." },
      { icon: Heart, title: "Child wellbeing", description: "Behavior trends, ClassSpark gems, and wellbeing indicators in one view." },
      { icon: Bell, title: "Smart notifications", description: "Opt-in alerts for absences, low grades, upcoming tests, and meeting invites." },
      { icon: MessageSquare, title: "Direct chat", description: "Message teachers, receive daily reports, and send voice notes." },
      { icon: Calendar, title: "School calendar", description: "Upcoming events, parent-teacher meetings, and deadlines in one calendar." },
      { icon: FileText, title: "Report cards", description: "Download term reports as PDF — formatted for printing and sharing." },
    ],
    howItWorks: [
      { step: 1, title: "Sign in", description: "Parents receive an invitation from the school and set a password." },
      { step: 2, title: "See everything", description: "All linked children, all data, one dashboard." },
      { step: 3, title: "Stay in the loop", description: "Notifications keep parents engaged without overwhelming them." },
    ],
  },
  "zh-HK": {
    badge: "溝通",
    title: "家長門戶",
    highlight: "每個家庭、每個細節、一站式",
    description:
      "家長在同一地方查看孩子的成績、出勤、行為、功課、ClassSpark 寶石與訊息。即時更新，無須再向教師追問資訊。",
    trustIndicator1: "即時更新",
    trustIndicator2: "多孩支援",
    trustIndicator3: "行動友好",
    features: [
      { icon: GraduationCap, title: "即時成績", description: "教師發佈的那一刻即可看到跨科成績——無須再等成績單。" },
      { icon: Heart, title: "孩子身心健康", description: "行為趨勢、ClassSpark 寶石與身心健康指標一目了然。" },
      { icon: Bell, title: "智能通知", description: "可選通知：缺席、成績下滑、考試、會議邀請。" },
      { icon: MessageSquare, title: "直接聊天", description: "訊息教師、接收每日報告、發送語音訊息。" },
      { icon: Calendar, title: "學校日曆", description: "即將活動、家長會與截止日期集中顯示。" },
      { icon: FileText, title: "成績單", description: "下載學期報告為 PDF——可列印與分享。" },
    ],
    howItWorks: [
      { step: 1, title: "登入", description: "家長收到學校邀請並設定密碼。" },
      { step: 2, title: "查看所有資訊", description: "所有連結的孩子、所有資料、一個儀表板。" },
      { step: 3, title: "保持同步", description: "通知讓家長保持參與而不會過度打擾。" },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const rawLang = (await params).lang;
  const lang = rawLang === "zh-HK" ? "zh-HK" : "en";
  const t = texts[lang] ?? texts.en;
  return buildPageMetadata({
    lang,
    path: "/features/parent-portal",
    title: `${t.title} — ${t.highlight} | Elementals`,
    description: t.description,
  });
}

export default async function ParentPortalPage({ params }: { params: Promise<{ lang: string }> }) {
  const rawLang = (await params).lang;
  const lang: Locale = rawLang === "zh-HK" ? "zh-HK" : rawLang === "vi" ? "vi" : "en";
  const contentLang = lang === "zh-HK" ? "zh-HK" : "en";
  const t = texts[contentLang] ?? texts.en;

  return (
    <FeaturePageTemplate
      badge={t.badge}
      badgeIcon={Heart}
      title={t.title}
      highlight={t.highlight}
      description={t.description}
      features={t.features}
      howItWorks={t.howItWorks}
      trustIndicators={[t.trustIndicator1, t.trustIndicator2, t.trustIndicator3]}
      lang={lang}
      mockup={<ParentDashboardMockup lang={lang} />}
    />
  );
}
