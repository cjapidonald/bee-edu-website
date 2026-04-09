import { UserPlus, Briefcase, Calendar, FileText, MessageSquare, CheckCircle2, Send } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { FeaturePageTemplate } from "@/components/pages/FeaturePageTemplate";
import { RecruitmentMockup } from "@/components/beaver-mockups";

const texts = {
  en: {
    badge: "People & HR",
    title: "Recruitment",
    highlight: "From job posting to signed offer",
    description:
      "Post jobs, track applications, schedule interviews, and send offers — all inside your school's HR system. No more spreadsheets, no more lost candidates.",
    trustIndicator1: "Kanban pipeline",
    trustIndicator2: "Email templates",
    trustIndicator3: "Interview scorecards",
    features: [
      { icon: Briefcase, title: "Job postings", description: "Create and publish job postings with rich descriptions, benefits, and application forms." },
      { icon: UserPlus, title: "Kanban pipeline", description: "Drag candidates between stages: Applied, Screen, Interview, Offer, Hired." },
      { icon: Calendar, title: "Interview scheduling", description: "Send interview invites with auto-generated calendar events and reminders." },
      { icon: FileText, title: "Application tracking", description: "Resume, cover letter, and custom questions stored against each candidate." },
      { icon: CheckCircle2, title: "Scorecards", description: "Structured interviewer feedback with rubric scoring and pass/fail recommendations." },
      { icon: Send, title: "Offer letters", description: "Generate and e-sign offer letters directly from the candidate profile." },
    ],
    howItWorks: [
      { step: 1, title: "Post the job", description: "Create a job posting in minutes with templates for common roles." },
      { step: 2, title: "Track candidates", description: "Drag candidates through your pipeline from application to hire." },
      { step: 3, title: "Hire & onboard", description: "Send the offer, sign, and automatically create the employee record." },
    ],
  },
  "zh-HK": {
    badge: "人員與人力資源",
    title: "招聘",
    highlight: "從職位發佈到簽約",
    description:
      "發佈職位、追蹤申請、安排面試與發送聘書——全部在學校 HR 系統內完成。無須試算表，不再遺失候選人。",
    trustIndicator1: "看板式管線",
    trustIndicator2: "電郵範本",
    trustIndicator3: "面試評分表",
    features: [
      { icon: Briefcase, title: "職位發佈", description: "以豐富的描述、福利與申請表建立並發佈職位。" },
      { icon: UserPlus, title: "看板管線", description: "拖動候選人於不同階段：申請、篩選、面試、聘書、已錄用。" },
      { icon: Calendar, title: "面試安排", description: "發送面試邀請，自動生成日曆活動與提醒。" },
      { icon: FileText, title: "申請追蹤", description: "履歷、求職信與自訂問題儲存於每位候選人。" },
      { icon: CheckCircle2, title: "評分表", description: "結構化面試官意見，配合評分準則與錄用建議。" },
      { icon: Send, title: "聘書", description: "直接從候選人檔案生成並電子簽署聘書。" },
    ],
    howItWorks: [
      { step: 1, title: "發佈職位", description: "以常見角色範本數分鐘內建立職位。" },
      { step: 2, title: "追蹤候選人", description: "從申請到錄用，拖動候選人穿越管線。" },
      { step: 3, title: "錄用與入職", description: "發送聘書、簽署並自動建立員工記錄。" },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const rawLang = (await params).lang;
  const lang = rawLang === "zh-HK" ? "zh-HK" : "en";
  const t = texts[lang] ?? texts.en;
  return buildPageMetadata({
    lang,
    path: "/features/recruitment",
    title: `${t.title} — ${t.highlight} | Elementals`,
    description: t.description,
  });
}

export default async function RecruitmentPage({ params }: { params: Promise<{ lang: string }> }) {
  const rawLang = (await params).lang;
  const lang: Locale = rawLang === "zh-HK" ? "zh-HK" : rawLang === "vi" ? "vi" : "en";
  const contentLang = lang === "zh-HK" ? "zh-HK" : "en";
  const t = texts[contentLang] ?? texts.en;

  return (
    <FeaturePageTemplate
      badge={t.badge}
      badgeIcon={UserPlus}
      title={t.title}
      highlight={t.highlight}
      description={t.description}
      features={t.features}
      howItWorks={t.howItWorks}
      trustIndicators={[t.trustIndicator1, t.trustIndicator2, t.trustIndicator3]}
      lang={lang}
      mockup={<RecruitmentMockup lang={lang} />}
    />
  );
}
