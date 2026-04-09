import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { buildPageMetadata } from "@/lib/seo/metadata";


interface TermsPageProps {
  params: Promise<{ lang: string }>;
}

const contactEmail = "hello@elementals.com";

const texts = {
  en: {
    badge: "Legal",
    title: "Terms of service",
    description:
      "These terms describe how you may use the KiwiBee platform and what to expect from the service.",
    lastUpdatedLabel: "Last updated",
    primaryCta: "Privacy policy",
    secondaryCta: "Contact",
    sections: {
      agreement: {
        title: "Agreement",
        body:
          "By accessing or using KiwiBee, you agree to these terms. If you do not agree, do not use the service.",
      },
      accounts: {
        title: "Accounts",
        items: [
          "You are responsible for maintaining the confidentiality of your login credentials.",
          "You must provide accurate information when creating an account.",
          "School administrators are responsible for managing school user access where applicable.",
        ],
      },
      acceptableUse: {
        title: "Acceptable use",
        items: [
          "Do not attempt to interfere with service availability or security.",
          "Do not upload content you do not have rights to use.",
          "Do not use the service for unlawful, harmful, or abusive purposes.",
        ],
      },
      availability: {
        title: "Availability & changes",
        body:
          "We continuously improve the platform and may update features, pricing, or availability over time. We may update these terms periodically and will post the updated version on this page.",
      },
      contact: {
        title: "Contact",
        body: "Questions about these terms? Email",
        contactCta: "Contact form",
        homeCta: "Back to home",
      },
    },
  },
  "zh-HK": {
    badge: "法律",
    title: "服務條款",
    description: "以下條款說明你可如何使用 KiwiBee 平台，以及服務內容。",
    lastUpdatedLabel: "最後更新",
    primaryCta: "私隱政策",
    secondaryCta: "聯絡我們",
    sections: {
      agreement: {
        title: "同意",
        body:
          "使用 KiwiBee即表示你同意本條款。如不同意，請勿使用本服務。",
      },
      accounts: {
        title: "帳戶",
        items: [
          "你需要對登入憑證保密並負責。",
          "建立帳戶時必須提供準確資料。",
          "在適用情況下，學校管理員負責管理學校用戶存取權限。",
        ],
      },
      acceptableUse: {
        title: "可接受使用",
        items: [
          "請勿嘗試干擾服務可用性或安全。",
          "請勿上傳你無權使用的內容。",
          "請勿將服務用於非法、有害或具濫用性的用途。",
        ],
      },
      availability: {
        title: "服務可用性與變更",
        body:
          "我們會持續改進平台，並可能調整功能、收費或可用性。我們亦可能不時更新本條款，並於本頁公布最新版本。",
      },
      contact: {
        title: "聯絡我們",
        body: "如對本條款有疑問，請電郵",
        contactCta: "聯絡表單",
        homeCta: "返回首頁",
      },
    },
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : "en";
  const isZh = lang === "zh-HK";
  const title = isZh ? "服務條款 | KiwiBee" : "Terms of Service | KiwiBee";
  const t = texts[lang as keyof typeof texts] || texts.en;
  return buildPageMetadata({
    lang,
    path: "/terms",
    title,
    description: t.description,
  });
}

export default async function TermsPage({ params }: TermsPageProps) {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : "en";
  const t = texts[lang as keyof typeof texts] || texts.en;
  const lastUpdated = new Date().toISOString().split("T")[0];

  const getLocalizedPath = (path: string) => {
    if (lang === "en") return path;
    return `/${lang}${path}`;
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container px-4 py-12">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="space-y-2 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">{t.badge}</p>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">{t.title}</h1>
            <p className="text-sm text-gray-400">{t.description}</p>
            <div className="mt-4 flex flex-col items-center justify-center gap-2 sm:flex-row">
              <Button asChild variant="outline" className="rounded-xl border-[#16a34a]">
                <Link href={getLocalizedPath("/privacy")}>{t.primaryCta}</Link>
              </Button>
              <Button asChild variant="ghost" className="rounded-xl">
                <Link href={getLocalizedPath("/contact")}>{t.secondaryCta}</Link>
              </Button>
            </div>
          </div>

          <Card className="rounded-2xl border-gray-800 bg-gray-900">
            <div className="p-6 sm:p-8">
              <p className="text-xs text-slate-500">
                {t.lastUpdatedLabel}: {lastUpdated}
              </p>
              <h2 className="mt-3 text-xl font-semibold text-[#0B1F3A]">{t.sections.agreement.title}</h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{t.sections.agreement.body}</p>
            </div>
          </Card>

          <Card className="rounded-2xl border-gray-800 bg-gray-900">
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-[#0B1F3A]">{t.sections.accounts.title}</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600 list-disc pl-5">
                {t.sections.accounts.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </Card>

          <Card className="rounded-2xl border-gray-800 bg-gray-900">
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-[#0B1F3A]">{t.sections.acceptableUse.title}</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600 list-disc pl-5">
                {t.sections.acceptableUse.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </Card>

          <Card className="rounded-2xl border-gray-800 bg-gray-900">
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-[#0B1F3A]">{t.sections.availability.title}</h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{t.sections.availability.body}</p>
            </div>
          </Card>

          <Card className="rounded-2xl border-gray-800 bg-gray-900">
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
                  <Link href={getLocalizedPath("/")}>{t.sections.contact.homeCta}</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
