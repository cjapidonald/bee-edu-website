import { AlertTriangle, ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const texts = {
  en: {
    badge: "Coming Soon",
    title: "Emergency Communications",
    highlight: "Rapid School-Wide Alerts",
    description: "Instant communication system for emergencies, drills, and urgent announcements. Reach parents, staff, and students through multiple channels simultaneously with delivery confirmation.",
    feature1: "Multi-channel alerts (SMS, email, push, in-app)",
    feature2: "Pre-built emergency templates",
    feature3: "Delivery tracking and read receipts",
    feature4: "Drill mode for practice scenarios",
    cta: "Contact Us to Learn More",
    backToFeatures: "Back to Features",
  },
  "zh-HK": {
    badge: "即將推出",
    title: "緊急通訊",
    highlight: "快速全校警報",
    description: "用於緊急情況、演習和緊急公告的即時通訊系統。通過多個渠道同時聯繫家長、員工和學生，並確認送達。",
    feature1: "多渠道警報（短信、電郵、推送、應用內）",
    feature2: "預建緊急模板",
    feature3: "送達追蹤和已讀回執",
    feature4: "演習模式用於練習場景",
    cta: "聯絡我們了解更多",
    backToFeatures: "返回功能頁面",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : "en";
  const t = texts[lang] ?? texts.en;
  return buildPageMetadata({
    lang,
    path: "/features/emergency-communications",
    title: `${t.title} - ${t.highlight} | Bee Education AI`,
    description: t.description,
  });
}

export default async function EmergencyCommunicationsPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : "en";
  const t = texts[lang] ?? texts.en;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
          <AlertTriangle className="h-4 w-4" />
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
