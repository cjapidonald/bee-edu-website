import { LayoutGrid, ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const texts = {
  en: {
    badge: "Coming Soon",
    title: "Wordwall",
    highlight: "Interactive Learning Games",
    description: "Create engaging interactive activities and games for your classroom. Quizzes, matching games, word searches, and more—all integrated with your curriculum and gradebook.",
    feature1: "Multiple game templates and formats",
    feature2: "Auto-generate from lesson content",
    feature3: "Real-time multiplayer classroom games",
    feature4: "Results sync to gradebook automatically",
    cta: "Contact Us to Learn More",
    backToFeatures: "Back to Features",
  },
  "zh-HK": {
    badge: "即將推出",
    title: "Wordwall",
    highlight: "互動學習遊戲",
    description: "為您的課堂創建引人入勝的互動活動和遊戲。測驗、配對遊戲、文字搜索等——全部與您的課程和成績冊整合。",
    feature1: "多種遊戲模板和格式",
    feature2: "從課程內容自動生成",
    feature3: "即時多人課堂遊戲",
    feature4: "結果自動同步到成績冊",
    cta: "聯絡我們了解更多",
    backToFeatures: "返回功能頁面",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : "en";
  const t = texts[lang] ?? texts.en;
  return buildPageMetadata({
    lang,
    path: "/features/wordwall",
    title: `${t.title} - ${t.highlight} | Bee Education AI`,
    description: t.description,
  });
}

export default async function WordwallPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : "en";
  const t = texts[lang] ?? texts.en;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff0eb] to-white">
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#fc3c00]/10 text-[#fc3c00] rounded-full text-sm font-medium mb-6">
          <LayoutGrid className="h-4 w-4" />
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
