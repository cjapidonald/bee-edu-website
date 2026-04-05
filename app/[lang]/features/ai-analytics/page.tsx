import { LineChart, ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const texts = {
  en: {
    badge: "Coming Soon",
    title: "AI Analytics Hub",
    highlight: "Student 360 & Insights",
    description: "Unified analytics dashboard with Student 360 profiles, risk detection, and AI-powered oversight. Get a complete view of every student's academic journey, behavior patterns, and early warning indicators.",
    feature1: "Student 360 profiles with complete history",
    feature2: "AI-powered risk detection and alerts",
    feature3: "Cross-module insights and correlations",
    feature4: "Customizable analytics dashboards",
    cta: "Contact Us to Learn More",
    backToFeatures: "Back to Features",
  },
  "zh-HK": {
    badge: "即將推出",
    title: "AI 分析中心",
    highlight: "學生全方位檢視與洞察",
    description: "統一分析儀表板，包含學生 360 度檔案、風險檢測和 AI 驅動的監督功能。全面了解每位學生的學業歷程、行為模式和預警指標。",
    feature1: "學生 360 度檔案及完整歷史",
    feature2: "AI 驅動的風險檢測和預警",
    feature3: "跨模組洞察和關聯分析",
    feature4: "可自訂分析儀表板",
    cta: "聯絡我們了解更多",
    backToFeatures: "返回功能頁面",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : "en";
  const t = texts[lang] ?? texts.en;
  return buildPageMetadata({
    lang,
    path: "/features/ai-analytics",
    title: `${t.title} - ${t.highlight} | Bee Education AI`,
    description: t.description,
  });
}

export default async function AIAnalyticsPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : "en";
  const t = texts[lang] ?? texts.en;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
          <LineChart className="h-4 w-4" />
          {t.badge}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {t.title} <span className="text-blue-600">{t.highlight}</span>
        </h1>

        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          {t.description}
        </p>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <ul className="text-left space-y-4">
            {[t.feature1, t.feature2, t.feature3, t.feature4].map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-bold">{i + 1}</span>
                </div>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/${lang}/contact`}>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
              {t.cta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href={`/${lang}/features`}>
            <Button size="lg" variant="outline" className="px-8">
              {t.backToFeatures}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
