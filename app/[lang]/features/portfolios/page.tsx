import { Presentation, ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const texts = {
  en: {
    badge: "Coming Soon",
    title: "Digital Portfolios",
    highlight: "Showcase Student Work",
    description: "Beautiful, shareable digital portfolios that showcase student achievements, projects, and growth over time. Perfect for parent conferences, college applications, and celebrating student success.",
    feature1: "Public shareable portfolio links",
    feature2: "Curated work samples and projects",
    feature3: "Skills and achievement badges",
    feature4: "Timeline view of student growth",
    cta: "Contact Us to Learn More",
    backToFeatures: "Back to Features",
  },
  "zh-HK": {
    badge: "即將推出",
    title: "數碼作品集",
    highlight: "展示學生作品",
    description: "精美、可分享的數碼作品集，展示學生的成就、項目和成長歷程。非常適合家長會議、大學申請和慶祝學生成功。",
    feature1: "公開可分享的作品集連結",
    feature2: "精選作品樣本和項目",
    feature3: "技能和成就徽章",
    feature4: "學生成長時間軸視圖",
    cta: "聯絡我們了解更多",
    backToFeatures: "返回功能頁面",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : "en";
  const t = texts[lang] ?? texts.en;
  return buildPageMetadata({
    lang,
    path: "/features/portfolios",
    title: `${t.title} - ${t.highlight} | Elementals`,
    description: t.description,
  });
}

export default async function PortfoliosPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : "en";
  const t = texts[lang] ?? texts.en;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff0eb] to-white">
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#fc3c00]/10 text-[#fc3c00] rounded-full text-sm font-medium mb-6">
          <Presentation className="h-4 w-4" />
          {t.badge}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {t.title} <span className="text-[#fc3c00]">{t.highlight}</span>
        </h1>

        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          {t.description}
        </p>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <ul className="text-left space-y-4">
            {[t.feature1, t.feature2, t.feature3, t.feature4].map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#fc3c00]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#fc3c00] text-sm font-bold">{i + 1}</span>
                </div>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/${lang}/contact`}>
            <Button size="lg" className="bg-[#fc3c00] hover:bg-[#e03500] text-white px-8">
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
