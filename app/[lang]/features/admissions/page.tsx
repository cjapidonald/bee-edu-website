import { Building2, FileCheck, Calendar, Users, Mail, CheckCircle2, TrendingUp } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { FeaturePageTemplate } from "@/components/pages/FeaturePageTemplate";
import { AdmissionsMockup } from "@/components/mockups";

const texts = {
  en: {
    badge: "Finance & Admissions",
    title: "Admissions",
    highlight: "Turn inquiries into enrollments",
    description:
      "Complete admissions pipeline — from first inquiry to signed enrollment contract. Track applications, manage documents, schedule interviews, and automate follow-ups with families.",
    trustIndicator1: "Conversion funnel",
    trustIndicator2: "Document checklists",
    trustIndicator3: "Auto follow-ups",
    features: [
      { icon: Building2, title: "Application funnel", description: "Visualize every step from inquiry to enrollment with conversion rates at each stage." },
      { icon: FileCheck, title: "Document checklists", description: "Track required documents per applicant — birth certificates, transcripts, medical records." },
      { icon: Calendar, title: "Interview scheduling", description: "Book family interviews, entrance tests, and campus tours with automated reminders." },
      { icon: Mail, title: "Automated follow-ups", description: "Nurture families who stall in the funnel with gentle, personalized email sequences." },
      { icon: Users, title: "Sibling linking", description: "Automatically match siblings and apply priority rules for enrollment." },
      { icon: TrendingUp, title: "Funnel analytics", description: "Understand where you lose candidates and which sources bring the best families." },
    ],
    howItWorks: [
      { step: 1, title: "Inquiry captured", description: "Web form, email, or walk-in — all inquiries land in the same pipeline." },
      { step: 2, title: "Application & documents", description: "Family completes the application; system tracks missing documents." },
      { step: 3, title: "Interview & offer", description: "Schedule interview, make offer, sign enrollment contract." },
    ],
  },
  "zh-HK": {
    badge: "財務與招生",
    title: "招生",
    highlight: "把查詢變成入學",
    description:
      "完整招生管線——從首次查詢到簽署入學合約。追蹤申請、管理文件、安排面試並自動跟進家庭。",
    trustIndicator1: "轉換漏斗",
    trustIndicator2: "文件清單",
    trustIndicator3: "自動跟進",
    features: [
      { icon: Building2, title: "申請漏斗", description: "可視化從查詢到入學的每一步，附各階段轉換率。" },
      { icon: FileCheck, title: "文件清單", description: "追蹤每位申請者所需文件——出生證、成績單、醫療記錄。" },
      { icon: Calendar, title: "面試安排", description: "預訂家庭面試、入學測試與校園導覽，配合自動提醒。" },
      { icon: Mail, title: "自動跟進", description: "以溫和、個人化的電郵序列培育停滯在漏斗的家庭。" },
      { icon: Users, title: "兄弟姊妹連結", description: "自動配對兄弟姊妹並套用入學優先規則。" },
      { icon: TrendingUp, title: "漏斗分析", description: "了解在哪裡流失候選人以及哪些來源帶來最佳家庭。" },
    ],
    howItWorks: [
      { step: 1, title: "擷取查詢", description: "網頁表單、電郵或親臨——所有查詢進入同一管線。" },
      { step: 2, title: "申請與文件", description: "家庭填寫申請；系統追蹤缺失文件。" },
      { step: 3, title: "面試與聘書", description: "安排面試、發出聘書、簽署入學合約。" },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const rawLang = (await params).lang;
  const lang = rawLang === "vi" ? "vi" : "en";
  const t = texts[lang as keyof typeof texts] ?? texts.en;
  return buildPageMetadata({
    lang,
    path: "/features/admissions",
    title: `${t.title} — ${t.highlight} | KiwiBee`,
    description: t.description,
  });
}

export default async function AdmissionsPage({ params }: { params: Promise<{ lang: string }> }) {
  const rawLang = (await params).lang;
  const lang: Locale = rawLang === "vi" ? "vi" : "en";
  const contentLang = lang === "vi" ? "vi" : "en";
  const t = texts[contentLang as keyof typeof texts] ?? texts.en;

  return (
    <FeaturePageTemplate
      badge={t.badge}
      badgeIcon={Building2}
      title={t.title}
      highlight={t.highlight}
      description={t.description}
      features={t.features}
      howItWorks={t.howItWorks}
      trustIndicators={[t.trustIndicator1, t.trustIndicator2, t.trustIndicator3]}
      lang={lang}
      mockup={<AdmissionsMockup lang={lang} />}
    />
  );
}
