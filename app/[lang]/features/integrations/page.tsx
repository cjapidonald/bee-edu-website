import type { Metadata } from "next";
import { Plug, RefreshCw, Shield, Zap, Code, Database } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { FeaturePageTemplate } from "@/components/pages/FeaturePageTemplate";
import { IntegrationsMockup } from "@/components/beaver-mockups";

const contentByLang: Record<
  string,
  {
    seoTitle: string;
    seoDescription: string;
    badge: string;
    title: string;
    highlight: string;
    description: string;
    trustIndicators: string[];
    features: {
      icon: typeof Plug;
      title: string;
      description: string;
      badge?: string;
      badgeColor?: string;
    }[];
    howItWorks: { step: number; title: string; description: string }[];
    comparison: { before: string; after: string }[];
  }
> = {
  en: {
    seoTitle: "Integrations & API | Elementals",
    seoDescription:
      "Connect Elementals with your existing tools using integrations, webhooks, and a secure API. Designed for schools and modern education operations.",
    badge: "Integrations & API",
    title: "Connect Your",
    highlight: "School Stack",
    description:
      "Connect Elementals with the tools you already use. Integrations, webhooks, and a secure API keep data flowing—without manual spreadsheets.",
    trustIndicators: ["Secure by design", "Webhooks + API", "Works with existing tools"],
    features: [
      {
        icon: Zap,
        title: "Ready-Made Integrations",
        description:
          "Connect common school tools faster with pre-built connectors and guided setup.",
        badge: "Popular",
        badgeColor: "bg-[#fc3c00]/10 text-[#fc3c00]",
      },
      {
        icon: Database,
        title: "Data Sync",
        description:
          "Keep rosters, classes, and key records aligned across systems with consistent data rules.",
      },
      {
        icon: RefreshCw,
        title: "Webhooks",
        description:
          "Push real-time events to your systems—attendance, assessments, behavior, and more.",
      },
      {
        icon: Shield,
        title: "Security & Permissions",
        description:
          "Granular access controls, audit trails, and safe integration defaults for schools.",
      },
      {
        icon: Code,
        title: "Open API",
        description:
          "Build custom workflows with a documented API and predictable, versioned endpoints.",
      },
      {
        icon: Plug,
        title: "Custom Integrations",
        description:
          "Need something specific? We help map requirements and deliver enterprise-ready integrations.",
      },
    ],
    howItWorks: [
      { step: 1, title: "Choose an integration", description: "Pick a connector or define what you need to sync." },
      { step: 2, title: "Configure access", description: "Set permissions and scopes so the right data flows." },
      { step: 3, title: "Test & validate", description: "Run a test sync and confirm data rules and mappings." },
      { step: 4, title: "Monitor & iterate", description: "Use logs and alerts to keep integrations healthy over time." },
    ],
    comparison: [
      { before: "Manual exports and imports", after: "Automated sync and integrations" },
      { before: "Data mismatches across tools", after: "Consistent, governed records" },
      { before: "Delayed updates", after: "Real-time webhooks" },
      { before: "Risky access sharing", after: "Scoped permissions and audit trails" },
      { before: "One-off custom scripts", after: "Maintainable APIs and monitoring" },
    ],
  },
  "zh-HK": {
    seoTitle: "整合與 API | Elementals",
    seoDescription:
      "透過整合、Webhook 與安全 API 連接 Elementals 與你現有的工具。專為學校與現代教育營運而設。",
    badge: "整合與 API",
    title: "連接你的",
    highlight: "學校系統",
    description:
      "把 Elementals 與現有工具無縫連接。整合、Webhook 與安全 API 讓數據自動流動——不再依賴手動試算表。",
    trustIndicators: ["安全為先", "Webhook + API", "兼容現有工具"],
    features: [
      {
        icon: Zap,
        title: "現成整合",
        description: "透過預設連接器與引導式設定，更快連接常用校園工具。",
        badge: "熱門",
        badgeColor: "bg-[#fc3c00]/10 text-[#fc3c00]",
      },
      {
        icon: Database,
        title: "數據同步",
        description: "以一致的數據規則保持名單、班級與關鍵資料在多系統之間一致。",
      },
      {
        icon: RefreshCw,
        title: "Webhook",
        description: "把出席、評估、行為等事件即時推送到你的系統。",
      },
      {
        icon: Shield,
        title: "安全與權限",
        description: "精細權限、審計記錄與學校友善的安全預設。",
      },
      {
        icon: Code,
        title: "開放 API",
        description: "使用清晰文件與版本化端點建立自訂工作流程。",
      },
      {
        icon: Plug,
        title: "自訂整合",
        description: "如需特定需求，我們可協助梳理需求並交付企業級整合方案。",
      },
    ],
    howItWorks: [
      { step: 1, title: "選擇整合", description: "選擇連接器或定義需要同步的內容。" },
      { step: 2, title: "設定存取", description: "配置權限與範圍，確保正確數據流動。" },
      { step: 3, title: "測試與驗證", description: "執行測試同步並確認映射與規則。" },
      { step: 4, title: "監控與優化", description: "透過記錄與提醒維持整合長期穩定。" },
    ],
    comparison: [
      { before: "手動匯出/匯入", after: "自動同步與整合" },
      { before: "系統之間資料不一致", after: "一致且可治理的資料" },
      { before: "更新延遲", after: "即時 Webhook" },
      { before: "存取共享風險高", after: "可控範圍權限與審計記錄" },
      { before: "一次性腳本難維護", after: "可維護 API 與監控" },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const rawLang = (await params).lang;
  const lang = rawLang === "zh-HK" ? "zh-HK" : "en";
  const t = contentByLang[lang] ?? contentByLang.en;

  return buildPageMetadata({
    lang,
    path: "/features/integrations",
    title: t.seoTitle,
    description: t.seoDescription,
  });
}

export default async function IntegrationsPage({ params }: { params: Promise<{ lang: string }> }) {
  const rawLang = (await params).lang;
  const lang: Locale = rawLang === "zh-HK" ? "zh-HK" : rawLang === "vi" ? "vi" : "en";
  const contentLang = lang === "zh-HK" ? "zh-HK" : "en";
  const t = contentByLang[contentLang] ?? contentByLang.en;

  return (
    <FeaturePageTemplate
      badge={t.badge}
      badgeIcon={Plug}
      title={t.title}
      highlight={t.highlight}
      description={t.description}
      features={t.features}
      howItWorks={t.howItWorks}
      comparison={t.comparison}
      trustIndicators={t.trustIndicators}
      lang={lang}
      mockup={<IntegrationsMockup lang={lang} />}
    />
  );
}
