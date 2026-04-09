import { LineChart, Building2, TrendingUp, DollarSign, Users, FileText, Sparkles } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { FeaturePageTemplate } from "@/components/pages/FeaturePageTemplate";
import { AdminDashboardMockup } from "@/components/beaver-mockups";

const texts = {
  en: {
    badge: "Analytics & Insights",
    title: "School Insights",
    highlight: "Executive dashboards for every role",
    description:
      "Pre-built dashboards showing enrollment, attendance, grades, finance, and wellbeing KPIs — filtered for each role. Board-ready reports exportable as PDF.",
    trustIndicator1: "Role-filtered views",
    trustIndicator2: "Board-ready PDFs",
    trustIndicator3: "Live KPIs",
    features: [
      { icon: Building2, title: "Executive overview", description: "Single-page summary of every school KPI — enrollment, attendance, grades, finance, wellbeing." },
      { icon: TrendingUp, title: "Trend analysis", description: "Compare this term vs last, this year vs last year — spot patterns early." },
      { icon: DollarSign, title: "Financial health", description: "Revenue, outstanding balances, payroll, and margin — updated daily." },
      { icon: Users, title: "Enrollment pipeline", description: "Current enrollment, projected intake, and churn indicators." },
      { icon: FileText, title: "Board reports", description: "Export board-ready PDF reports with charts, commentary, and appendices." },
      { icon: Sparkles, title: "AI commentary", description: "AI generates plain-English summaries of what the numbers mean for decision-makers." },
    ],
    howItWorks: [
      { step: 1, title: "Log in as admin", description: "Insights dashboard is the default home for admins and team leaders." },
      { step: 2, title: "Drill into KPIs", description: "Click any metric to see the underlying data and trends." },
      { step: 3, title: "Share with board", description: "One-click export to PDF — ready for board meetings." },
    ],
  },
  "zh-HK": {
    badge: "分析與洞察",
    title: "學校洞察",
    highlight: "為每個角色而設的執行儀表板",
    description:
      "預建儀表板顯示入學、出勤、成績、財務與身心健康 KPI——按角色過濾。可匯出為董事會級 PDF 報告。",
    trustIndicator1: "角色過濾視圖",
    trustIndicator2: "董事會 PDF",
    trustIndicator3: "即時 KPI",
    features: [
      { icon: Building2, title: "行政總覽", description: "單頁摘要涵蓋每個學校 KPI——入學、出勤、成績、財務、身心健康。" },
      { icon: TrendingUp, title: "趨勢分析", description: "比較本學期與上學期、本年與上年——及早發現模式。" },
      { icon: DollarSign, title: "財務健康", description: "收入、未付結餘、薪資與利潤——每日更新。" },
      { icon: Users, title: "入學管線", description: "目前入學、預計入學與流失指標。" },
      { icon: FileText, title: "董事會報告", description: "匯出董事會級 PDF 報告，包含圖表、評論與附錄。" },
      { icon: Sparkles, title: "AI 評論", description: "AI 以淺白英語生成數字對決策者的意義摘要。" },
    ],
    howItWorks: [
      { step: 1, title: "以行政身份登入", description: "洞察儀表板是行政與團隊主管的預設首頁。" },
      { step: 2, title: "深入 KPI", description: "點擊任何指標查看底層資料與趨勢。" },
      { step: 3, title: "與董事會分享", description: "一鍵匯出 PDF——適合董事會會議。" },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const rawLang = (await params).lang;
  const lang = rawLang === "zh-HK" ? "zh-HK" : "en";
  const t = texts[lang] ?? texts.en;
  return buildPageMetadata({
    lang,
    path: "/features/insights",
    title: `${t.title} — ${t.highlight} | Elementals`,
    description: t.description,
  });
}

export default async function InsightsPage({ params }: { params: Promise<{ lang: string }> }) {
  const rawLang = (await params).lang;
  const lang: Locale = rawLang === "zh-HK" ? "zh-HK" : rawLang === "vi" ? "vi" : "en";
  const contentLang = lang === "zh-HK" ? "zh-HK" : "en";
  const t = texts[contentLang] ?? texts.en;

  return (
    <FeaturePageTemplate
      badge={t.badge}
      badgeIcon={LineChart}
      title={t.title}
      highlight={t.highlight}
      description={t.description}
      features={t.features}
      howItWorks={t.howItWorks}
      trustIndicators={[t.trustIndicator1, t.trustIndicator2, t.trustIndicator3]}
      lang={lang}
      mockup={<AdminDashboardMockup lang={lang} />}
    />
  );
}
