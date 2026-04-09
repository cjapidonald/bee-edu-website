import { HelpCircle, MessageSquare, RefreshCcw, Star, TrendingUp, CheckCircle2, Clock } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { FeaturePageTemplate } from "@/components/pages/FeaturePageTemplate";
import { CustomerServiceMockup } from "@/components/mockups";

const texts = {
  en: {
    badge: "Finance & Admissions",
    title: "Customer Service",
    highlight: "Happy families, renewed contracts",
    description:
      "Ticket queue, renewal tracking, and satisfaction monitoring for customer success teams. Turn families into advocates and prevent churn before it happens.",
    trustIndicator1: "Ticket queue",
    trustIndicator2: "Renewal tracking",
    trustIndicator3: "NPS monitoring",
    features: [
      { icon: HelpCircle, title: "Ticket queue", description: "Triage, assign, and resolve parent issues with priority levels and SLA tracking." },
      { icon: RefreshCcw, title: "Renewal tracking", description: "See every upcoming renewal with risk indicators — act before families leave." },
      { icon: Star, title: "Satisfaction surveys", description: "NPS and satisfaction surveys at key moments in the family journey." },
      { icon: MessageSquare, title: "Chat integration", description: "Pulls directly from the in-app chat — no context switching." },
      { icon: TrendingUp, title: "Analytics", description: "Trend reports on resolution time, satisfaction, and churn risk." },
      { icon: CheckCircle2, title: "Resolution workflows", description: "Standard playbooks for common issues — billing, grades, behavior, scheduling." },
    ],
    howItWorks: [
      { step: 1, title: "Ticket opens", description: "Parent raises an issue via chat, email, or web form." },
      { step: 2, title: "Triage & assign", description: "Auto-prioritized by severity and assigned to the right team." },
      { step: 3, title: "Resolve & measure", description: "Close the ticket, request feedback, track NPS." },
    ],
  },
  "zh-HK": {
    badge: "財務與招生",
    title: "客戶服務",
    highlight: "快樂的家庭、續約的合約",
    description:
      "工單佇列、續約追蹤與滿意度監控，為客戶成功團隊而設。把家庭變成擁護者，在流失前預防。",
    trustIndicator1: "工單佇列",
    trustIndicator2: "續約追蹤",
    trustIndicator3: "NPS 監控",
    features: [
      { icon: HelpCircle, title: "工單佇列", description: "以優先級與 SLA 追蹤分流、指派並解決家長問題。" },
      { icon: RefreshCcw, title: "續約追蹤", description: "查看每個即將續約，附風險指標——在家庭離開前行動。" },
      { icon: Star, title: "滿意度問卷", description: "於家庭旅程關鍵時刻進行 NPS 與滿意度問卷。" },
      { icon: MessageSquare, title: "聊天整合", description: "直接從應用內聊天拉取——無須切換上下文。" },
      { icon: TrendingUp, title: "分析", description: "解決時間、滿意度與流失風險的趨勢報告。" },
      { icon: CheckCircle2, title: "解決工作流程", description: "常見問題的標準劇本——帳單、成績、行為、排課。" },
    ],
    howItWorks: [
      { step: 1, title: "工單開啟", description: "家長透過聊天、電郵或網頁表單提出問題。" },
      { step: 2, title: "分流與指派", description: "按嚴重程度自動優先並指派給合適團隊。" },
      { step: 3, title: "解決與評量", description: "關閉工單、要求意見、追蹤 NPS。" },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const rawLang = (await params).lang;
  const lang = rawLang === "vi" ? "vi" : "en";
  const t = texts[lang as keyof typeof texts] ?? texts.en;
  return buildPageMetadata({
    lang,
    path: "/features/customer-service",
    title: `${t.title} — ${t.highlight} | KiwiBee`,
    description: t.description,
  });
}

export default async function CustomerServicePage({ params }: { params: Promise<{ lang: string }> }) {
  const rawLang = (await params).lang;
  const lang: Locale = rawLang === "vi" ? "vi" : "en";
  const contentLang = lang === "vi" ? "vi" : "en";
  const t = texts[contentLang as keyof typeof texts] ?? texts.en;

  return (
    <FeaturePageTemplate
      badge={t.badge}
      badgeIcon={HelpCircle}
      title={t.title}
      highlight={t.highlight}
      description={t.description}
      features={t.features}
      howItWorks={t.howItWorks}
      trustIndicators={[t.trustIndicator1, t.trustIndicator2, t.trustIndicator3]}
      lang={lang}
      mockup={<CustomerServiceMockup lang={lang} />}
    />
  );
}
