import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { buildPageMetadata } from "@/lib/seo/metadata";


interface PrivacyPageProps {
  params: Promise<{ lang: string }>;
}

const contactEmail = "hello@elementals.com";

const texts = {
  en: {
    badge: "Privacy & Data Protection",
    title: "Privacy policy",
    description:
      "We take privacy seriously. This page explains what we collect, why we collect it, and how you can manage your preferences.",
    lastUpdatedLabel: "Last updated",
    sections: {
      overview: {
        title: "Overview",
        body:
          "KiwiBee provides a web-based platform for schools, teachers, students, and families. We collect and process limited information to operate the service, improve the experience, and provide support.",
      },
      data: {
        title: "Data we collect",
        items: [
          "Account information you provide (e.g., email address, name, role).",
          "Usage data (e.g., pages visited, feature interactions) to improve reliability and UX.",
          "Device and browser data (e.g., user agent) for security and troubleshooting.",
          "Optional marketing consent preferences (if you choose to opt in).",
        ],
      },
      usage: {
        title: "How we use data",
        items: [
          "Provide and maintain core platform features.",
          "Authenticate users and protect accounts.",
          "Improve performance, reliability, and product quality.",
          "Respond to support requests and operational inquiries.",
        ],
      },
      cookies: {
        title: "Cookies",
        body: "You can manage cookie categories at any time. If you need help, contact our team.",
      },
      ai: {
        title: "AI & content processing",
        body:
          "The platform may use AI features to help educators draft lesson content, generate materials, and reduce administrative work. Where applicable, we apply access controls so users only see information they are authorized to access.",
      },
      contact: {
        title: "Contact",
        body: "For privacy requests or questions, contact us at",
        contactCta: "Contact form",
        termsCta: "Terms of service",
      },
    },
  },
  "zh-HK": {
    badge: "私隱與資料保護",
    title: "私隱政策",
    description: "我們重視私隱。本頁說明我們收集什麼、為何收集，以及如何管理你的偏好。",
    lastUpdatedLabel: "最後更新",
    sections: {
      overview: {
        title: "概覽",
        body:
          "KiwiBee為學校、教師、學生及家庭提供網上平台。我們只收集及處理營運服務、改善體驗及提供支援所需的有限資料。",
      },
      data: {
        title: "我們收集的資料",
        items: [
          "你提供的帳戶資料（例如電郵、姓名、身分/角色）。",
          "使用資料（例如瀏覽頁面、功能互動）以改善穩定性與體驗。",
          "裝置與瀏覽器資料（例如 user agent）用於安全與疑難排解。",
          "可選的行銷同意偏好（如你選擇加入）。",
        ],
      },
      usage: {
        title: "我們如何使用資料",
        items: [
          "提供及維持核心平台功能。",
          "驗證用戶並保護帳戶。",
          "提升效能、穩定性與產品品質。",
          "回應支援及營運查詢。",
        ],
      },
      cookies: {
        title: "Cookies",
        body: "你可隨時管理 Cookie 類別。如需協助，請聯絡我們。",
      },
      ai: {
        title: "AI 與內容處理",
        body:
          "平台可能使用 AI 功能協助教師草擬課程內容、生成教材並減少行政工作。在適用情況下，我們會套用存取控制，確保用戶只能看到其有權存取的資訊。",
      },
      contact: {
        title: "聯絡我們",
        body: "如有私隱請求或問題，請電郵至",
        contactCta: "聯絡表單",
        termsCta: "服務條款",
      },
    },
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : "en";
  const isZh = lang === "zh-HK";
  const title = isZh ? "私隱政策 | KiwiBee" : "Privacy Policy | KiwiBee";
  const t = texts[lang as keyof typeof texts] || texts.en;
  return buildPageMetadata({
    lang,
    path: "/privacy",
    title,
    description: t.description,
  });
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : "en";
  const t = texts[lang as keyof typeof texts] || texts.en;
  const lastUpdated = new Date().toISOString().split("T")[0];

  const getLocalizedPath = (path: string) => {
    if (lang === "en") return path;
    return `/${lang}${path}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container px-4 py-12">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="space-y-2 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">{t.badge}</p>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{t.title}</h1>
            <p className="text-sm text-gray-600">{t.description}</p>
          </div>

          <Card className="rounded-2xl border-[#D9E2EF] bg-white">
            <div className="p-6 sm:p-8">
              <p className="text-xs text-slate-500">
                {t.lastUpdatedLabel}: {lastUpdated}
              </p>
              <h2 className="mt-3 text-xl font-semibold text-[#0B1F3A]">{t.sections.overview.title}</h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{t.sections.overview.body}</p>
            </div>
          </Card>

          <Card className="rounded-2xl border-[#D9E2EF] bg-white">
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-[#0B1F3A]">{t.sections.data.title}</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600 list-disc pl-5">
                {t.sections.data.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </Card>

          <Card className="rounded-2xl border-[#D9E2EF] bg-white">
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-[#0B1F3A]">{t.sections.usage.title}</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600 list-disc pl-5">
                {t.sections.usage.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </Card>

          <Card id="cookie-settings" className="rounded-2xl border-[#D9E2EF] bg-white">
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-[#0B1F3A]">{t.sections.cookies.title}</h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{t.sections.cookies.body}</p>
            </div>
          </Card>

          <Card className="rounded-2xl border-[#D9E2EF] bg-white">
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-[#0B1F3A]">{t.sections.ai.title}</h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{t.sections.ai.body}</p>
            </div>
          </Card>

          <Card className="rounded-2xl border-[#D9E2EF] bg-white">
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-[#0B1F3A]">{t.sections.contact.title}</h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {t.sections.contact.body} {" "}
                <a className="text-[#16a34a] hover:underline" href={`mailto:${contactEmail}`}>
                  {contactEmail}
                </a>
                .
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <Button asChild variant="outline" className="rounded-xl border-[#16a34a]">
                  <Link href={getLocalizedPath("/contact")}>{t.sections.contact.contactCta}</Link>
                </Button>
                <Button asChild variant="ghost" className="rounded-xl">
                  <Link href={getLocalizedPath("/terms")}>{t.sections.contact.termsCta}</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
