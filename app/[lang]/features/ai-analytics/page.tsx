import { Brain, LineChart, Sparkles, AlertCircle, TrendingUp, Database, BarChart3 } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { FeaturePageTemplate } from "@/components/pages/FeaturePageTemplate";
import { DataScientistMockup } from "@/components/beaver-mockups";

const texts = {
  en: {
    badge: "Analytics & Insights",
    title: "Data Scientist AI",
    highlight: "Ask anything about your data",
    description:
      "Natural-language analytics grounded in your school's real data. Ask questions in plain English, get charts, insights, and recommendations in seconds — without writing a single query.",
    trustIndicator1: "Grounded in school data",
    trustIndicator2: "Fast, Balanced, Deep modes",
    trustIndicator3: "Zero SQL required",
    features: [
      { icon: Brain, title: "Natural language queries", description: "Ask 'Which grade has the biggest drop in attendance?' and get a chart instantly." },
      { icon: Database, title: "Grounded in your data", description: "Every answer comes from your live school data — no hallucinations, full auditability." },
      { icon: AlertCircle, title: "Risk detection", description: "Proactive alerts for attendance drops, grade slides, and wellbeing concerns." },
      { icon: TrendingUp, title: "Student 360", description: "Complete view of every student's academic journey, behavior patterns, and early warning indicators." },
      { icon: BarChart3, title: "Cross-module insights", description: "Correlate grades, behavior, attendance, and homework in one view." },
      { icon: Sparkles, title: "Suggested prompts", description: "One-click insights: top performers, at-risk students, revenue trends, and more." },
    ],
    howItWorks: [
      { step: 1, title: "Ask a question", description: "Type a plain-English question about any aspect of your school." },
      { step: 2, title: "AI generates the answer", description: "Charts, tables, and insights grounded in real data — in seconds." },
      { step: 3, title: "Act on insights", description: "Export to PDF, set alerts, or share with team." },
    ],
  },
  "zh-HK": {
    badge: "分析與洞察",
    title: "數據科學家 AI",
    highlight: "以自然語言查詢你的資料",
    description:
      "以自然語言為基礎的分析，建基於你學校的真實資料。以淺白英語提問，秒速獲取圖表、洞察與建議——無須撰寫任何查詢。",
    trustIndicator1: "以學校資料為基礎",
    trustIndicator2: "快速、平衡、深度三種模式",
    trustIndicator3: "無須 SQL",
    features: [
      { icon: Brain, title: "自然語言查詢", description: "問「哪個年級出勤率下降最多？」即時獲取圖表。" },
      { icon: Database, title: "以你的資料為基礎", description: "每個答案都來自你的即時學校資料——無幻覺、完全可審計。" },
      { icon: AlertCircle, title: "風險檢測", description: "主動警示出勤下降、成績滑落與身心健康問題。" },
      { icon: TrendingUp, title: "學生 360 度檔案", description: "全面掌握每位學生的學業歷程、行為模式與預警指標。" },
      { icon: BarChart3, title: "跨模組洞察", description: "在同一視圖中關聯成績、行為、出勤與功課。" },
      { icon: Sparkles, title: "建議提問", description: "一鍵洞察：頂尖學生、風險學生、收入趨勢等。" },
    ],
    howItWorks: [
      { step: 1, title: "提問", description: "以淺白語言提問學校任何方面。" },
      { step: 2, title: "AI 生成答案", description: "圖表、表格與洞察，建基於真實資料——秒速完成。" },
      { step: 3, title: "依洞察行動", description: "匯出 PDF、設定警示或分享給團隊。" },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const rawLang = (await params).lang;
  const lang = rawLang === "zh-HK" ? "zh-HK" : "en";
  const t = texts[lang] ?? texts.en;
  return buildPageMetadata({
    lang,
    path: "/features/ai-analytics",
    title: `${t.title} — ${t.highlight} | Elementals`,
    description: t.description,
  });
}

export default async function AIAnalyticsPage({ params }: { params: Promise<{ lang: string }> }) {
  const rawLang = (await params).lang;
  const lang: Locale = rawLang === "zh-HK" ? "zh-HK" : rawLang === "vi" ? "vi" : "en";
  const contentLang = lang === "zh-HK" ? "zh-HK" : "en";
  const t = texts[contentLang] ?? texts.en;

  return (
    <FeaturePageTemplate
      badge={t.badge}
      badgeIcon={Brain}
      title={t.title}
      highlight={t.highlight}
      description={t.description}
      features={t.features}
      howItWorks={t.howItWorks}
      trustIndicators={[t.trustIndicator1, t.trustIndicator2, t.trustIndicator3]}
      lang={lang}
      mockup={<DataScientistMockup lang={lang} />}
    />
  );
}
