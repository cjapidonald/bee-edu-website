"use client";

import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import {
  BrainCircuit,
  Calendar,
  ClipboardCheck,
  FolderOpen,
  Gamepad2,
  GraduationCap,
  Handshake,
  LineChart,
  NotebookPen,
  Shield,
  Users,
  Wallet,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useInView } from "@/hooks/useInView";

type FeatureLink = {
  title: string;
  description: string;
  path: string;
  icon: typeof BrainCircuit;
  colorIndex: number;
};

const FEATURE_SETS: Record<string, FeatureLink[]> = {
  en: [
    {
      title: "TeacherLab & AI",
      description: "TeacherLab workspace with Presentation Lab, Homework Lab, Reports Lab, and more—all powered by multiple AI models.",
      path: "/features/ai",
      icon: BrainCircuit,
      colorIndex: 0,
    },
    {
      title: "SparkSpace",
      description: "AI-powered learning spaces where teachers create tailored AI tutoring environments for students.",
      path: "/features/ai",
      icon: BrainCircuit,
      colorIndex: 1,
    },
    {
      title: "Teaching Assistant",
      description: "A teacher-first AI co-pilot for faster planning, differentiation, and student support.",
      path: "/features/teaching-assistants",
      icon: GraduationCap,
      colorIndex: 2,
    },
    {
      title: "Curriculum & Skills",
      description: "Plan curriculum, map skills, and align learning objectives with classroom execution.",
      path: "/features/curriculum",
      icon: NotebookPen,
      colorIndex: 2,
    },
    {
      title: "Exams & Marking",
      description: "Create exams, deliver online assessments, and streamline marking with AI assistance.",
      path: "/features/exams",
      icon: ClipboardCheck,
      colorIndex: 3,
    },
    {
      title: "Skills Gradebook",
      description: "Skills-based tracking with visual heatmaps and powerful progress insights.",
      path: "/features/gradebook",
      icon: LineChart,
      colorIndex: 4,
    },
    {
      title: "Scheduling",
      description: "Magnetic timetable planning with conflict checks and workload balancing.",
      path: "/features/scheduling",
      icon: Calendar,
      colorIndex: 5,
    },
    {
      title: "Behavior Tracking",
      description: "Free ClassSpark behavior tracking with gamified avatars and parent sharing.",
      path: "/features/classspark",
      icon: Users,
      colorIndex: 0,
    },
    {
      title: "Integrations & API",
      description: "Connect your existing tools with enterprise integrations, webhooks, and API access.",
      path: "/features/integrations",
      icon: Handshake,
      colorIndex: 1,
    },
    {
      title: "Finance",
      description: "School finance workflows and visibility across payments and administrative operations.",
      path: "/features/finance",
      icon: Wallet,
      colorIndex: 2,
    },
    {
      title: "Student Affairs",
      description: "Student lifecycle workflows, pastoral operations, and the school-wide experience.",
      path: "/features/student-affairs",
      icon: Users,
      colorIndex: 3,
    },
    {
      title: "HR",
      description: "Leave requests, coverage, staff tracking, and school HR workflows in one place.",
      path: "/features/hr",
      icon: CheckCircle2,
      colorIndex: 4,
    },
    {
      title: "QA & Accreditation",
      description: "Track evidence, observations, and compliance workflows for accreditation readiness.",
      path: "/features/qa-accreditation",
      icon: Shield,
      colorIndex: 5,
    },
    {
      title: "KPIs & Analytics",
      description: "Track performance KPIs across teams with connected dashboards and reporting.",
      path: "/features/teacher-kpi",
      icon: LineChart,
      colorIndex: 0,
    },
    {
      title: "Surveys",
      description: "Collect feedback from parents, students, and staff with built-in surveys.",
      path: "/features/survey",
      icon: ClipboardCheck,
      colorIndex: 1,
    },
    {
      title: "Library & ShelfSpark",
      description: "Manage books, loans, and catalogs with ShelfSpark AI reading recommendations that match students with the right books.",
      path: "/features/library",
      icon: FolderOpen,
      colorIndex: 2,
    },
    {
      title: "School News",
      description: "Publish announcements and updates in a centralized news hub for your community.",
      path: "/features/school-news",
      icon: NotebookPen,
      colorIndex: 3,
    },
    {
      title: "Resource Booking",
      description: "Book rooms and shared resources with conflict detection and approvals.",
      path: "/features/resource-booking",
      icon: Calendar,
      colorIndex: 4,
    },
    {
      title: "Year Migration",
      description: "Smooth academic year transitions with guided setup and validated migration flows.",
      path: "/features/year-migration",
      icon: CheckCircle2,
      colorIndex: 5,
    },
    {
      title: "Professional Development",
      description: "Track PD activities, certifications, and learning pathways connected to outcomes.",
      path: "/features/professional-dev",
      icon: GraduationCap,
      colorIndex: 0,
    },
    {
      title: "Marketing Dashboard",
      description: "Admissions CRM workflows with school-ready marketing analytics and pipelines.",
      path: "/features/marketing",
      icon: LineChart,
      colorIndex: 1,
    },
    {
      title: "Pilot Projects",
      description: "Run structured pilots, track progress, and scale what works across your school.",
      path: "/features/pilot-projects",
      icon: CheckCircle2,
      colorIndex: 2,
    },
    {
      title: "Policies",
      description: "Store, manage, and distribute policies with controlled access and updates.",
      path: "/features/policy-management",
      icon: Shield,
      colorIndex: 3,
    },
    {
      title: "Sales Admin",
      description: "Manage sales operations and admin workflows across your rollout and onboarding.",
      path: "/features/sales-admin",
      icon: Wallet,
      colorIndex: 4,
    },
    {
      title: "Gamification",
      description: "Motivate students with rewards, progress, and classroom-friendly gamification.",
      path: "/features/gamification",
      icon: Gamepad2,
      colorIndex: 5,
    },
  ],
  "zh-HK": [
    {
      title: "TeacherLab & AI",
      description: "TeacherLab 工作空間，包含簡報實驗室、功課實驗室、報告實驗室等——全部由多個 AI 模型驅動。",
      path: "/features/ai",
      icon: BrainCircuit,
      colorIndex: 0,
    },
    {
      title: "SparkSpace",
      description: "AI 驅動的學習空間，教師可為學生打造個人化 AI 輔導環境。",
      path: "/features/ai",
      icon: BrainCircuit,
      colorIndex: 1,
    },
    {
      title: "教學助理",
      description: "以教師為先的 AI 副駕，支援更快備課、差異化教學與學生支援。",
      path: "/features/teaching-assistants",
      icon: GraduationCap,
      colorIndex: 2,
    },
    {
      title: "課程與技能",
      description: "規劃課程、建立技能地圖，並把學習目標落實到課堂教學。",
      path: "/features/curriculum",
      icon: NotebookPen,
      colorIndex: 2,
    },
    {
      title: "考試與批改",
      description: "建立考試、提供線上評估，並以 AI 協助簡化批改流程。",
      path: "/features/exams",
      icon: ClipboardCheck,
      colorIndex: 3,
    },
    {
      title: "技能成績冊",
      description: "以技能為本的追蹤，配合彩色熱圖與強大的進度洞察。",
      path: "/features/gradebook",
      icon: LineChart,
      colorIndex: 4,
    },
    {
      title: "排課",
      description: "磁性時間表規劃、衝突檢查與工作量平衡。",
      path: "/features/scheduling",
      icon: Calendar,
      colorIndex: 5,
    },
    {
      title: "行為追蹤",
      description: "免費 ClassSpark 行為追蹤，配合遊戲化頭像與家長分享。",
      path: "/features/classspark",
      icon: Users,
      colorIndex: 0,
    },
    {
      title: "整合與 API",
      description: "以企業級整合、Webhook 與 API 連接現有工具。",
      path: "/features/integrations",
      icon: Handshake,
      colorIndex: 1,
    },
    {
      title: "財務",
      description: "涵蓋支付與行政營運的學校財務流程與可視化。",
      path: "/features/finance",
      icon: Wallet,
      colorIndex: 2,
    },
    {
      title: "學生事務",
      description: "學生全生命周期流程、輔導／關懷運作與全校體驗。",
      path: "/features/student-affairs",
      icon: Users,
      colorIndex: 3,
    },
    {
      title: "人力資源",
      description: "請假、代課、員工追蹤與 HR 流程一站式管理。",
      path: "/features/hr",
      icon: CheckCircle2,
      colorIndex: 4,
    },
    {
      title: "質量保證與認證",
      description: "追蹤證據、觀課與合規流程，全年保持認證準備狀態。",
      path: "/features/qa-accreditation",
      icon: Shield,
      colorIndex: 5,
    },
    {
      title: "KPI 與分析",
      description: "以儀表板與報告追蹤團隊 KPI 表現。",
      path: "/features/teacher-kpi",
      icon: LineChart,
      colorIndex: 0,
    },
    {
      title: "問卷",
      description: "用內建問卷收集家長、學生與教職員回饋。",
      path: "/features/survey",
      icon: ClipboardCheck,
      colorIndex: 1,
    },
    {
      title: "圖書館 & ShelfSpark",
      description: "以 ShelfSpark AI 閱讀推薦管理書籍、借閱與館藏，為學生配對最合適的書籍。",
      path: "/features/library",
      icon: FolderOpen,
      colorIndex: 2,
    },
    {
      title: "學校新聞",
      description: "在集中式新聞中心發佈公告與更新。",
      path: "/features/school-news",
      icon: NotebookPen,
      colorIndex: 3,
    },
    {
      title: "資源預訂",
      description: "預訂課室與共用資源，支援衝突檢測與審批。",
      path: "/features/resource-booking",
      icon: Calendar,
      colorIndex: 4,
    },
    {
      title: "學年遷移",
      description: "以引導式設定與驗證流程，順暢完成學年交接。",
      path: "/features/year-migration",
      icon: CheckCircle2,
      colorIndex: 5,
    },
    {
      title: "專業發展",
      description: "追蹤 PD 活動、證書與學習路徑，並連結到教學成效。",
      path: "/features/professional-dev",
      icon: GraduationCap,
      colorIndex: 0,
    },
    {
      title: "市場推廣儀表板",
      description: "招生 CRM 流程與學校可用的市場分析和管道管理。",
      path: "/features/marketing",
      icon: LineChart,
      colorIndex: 1,
    },
    {
      title: "試點項目",
      description: "以結構化方式運行試點、追蹤進度，並擴大有效做法。",
      path: "/features/pilot-projects",
      icon: CheckCircle2,
      colorIndex: 2,
    },
    {
      title: "政策管理",
      description: "以受控權限與更新流程儲存、管理及發佈政策。",
      path: "/features/policy-management",
      icon: Shield,
      colorIndex: 3,
    },
    {
      title: "銷售管理",
      description: "管理部署與導入期間的銷售營運與行政流程。",
      path: "/features/sales-admin",
      icon: Wallet,
      colorIndex: 4,
    },
    {
      title: "遊戲化",
      description: "以獎勵、進度與課堂友善的遊戲化提升學生動機。",
      path: "/features/gamification",
      icon: Gamepad2,
      colorIndex: 5,
    },
  ],
};

const pageText: Record<
  string,
  {
    badge: string;
    heroTitle: string;
    heroHighlight: string;
    heroSubtitle: string;
    seePricing: string;
    contactSales: string;
    highlights: [string, string, string];
    exploreTitle: string;
    exploreSubtitle: string;
    guidedTitle: string;
    requestDemo: string;
    structuredName: string;
    structuredDescription: string;
  }
> = {
  en: {
    badge: "Platform Overview",
    heroTitle: "Everything your school needs",
    heroHighlight: "in one platform",
    heroSubtitle:
      "Discover the complete Bee Education AI feature set—built to reduce admin load, improve teaching quality, and give school leaders full operational visibility.",
    seePricing: "See Pricing",
    contactSales: "Contact Sales",
    highlights: [
      "AI-first workflows for teachers",
      "School operations in one system",
      "Built for modern school networks",
    ],
    exploreTitle: "Explore Features",
    exploreSubtitle: "Choose a module to learn more and see real workflows.",
    guidedTitle: "Want a guided walkthrough tailored to your school?",
    requestDemo: "Request a demo",
    structuredName: "Bee Education AI Features",
    structuredDescription: "Complete list of Bee Education AI platform features for school management",
  },
  "zh-HK": {
    badge: "平台總覽",
    heroTitle: "學校所需的一切",
    heroHighlight: "盡在同一平台",
    heroSubtitle:
      "探索 Bee Education AI 的完整功能組合——為減少行政負擔、提升教學質素，並讓學校領導者獲得全面營運可視性而打造。",
    seePricing: "查看價格",
    contactSales: "聯絡銷售",
    highlights: ["為教師而設的 AI 工作流程", "學校營運一套系統整合", "為現代學校網絡而設"],
    exploreTitle: "探索功能",
    exploreSubtitle: "選擇模組了解更多並查看實際工作流程。",
    guidedTitle: "想要為你的學校量身訂做的導覽示範？",
    requestDemo: "申請示範",
    structuredName: "Bee Education AI 功能",
    structuredDescription: "Bee Education AI 平台的完整功能列表（學校管理）",
  },
};

const colorClasses = [
  { bg: "bg-[#fc3c00]/10", text: "text-[#fc3c00]", border: "hover:border-primary/30" },
  { bg: "bg-[#fff0eb]", text: "text-[#fc3c00]", border: "hover:border-[#fc3c00]/30" },
  { bg: "bg-[#fff0eb]", text: "text-[#fc3c00]", border: "hover:border-[#fc3c00]/30" },
  { bg: "bg-[#fff0eb]", text: "text-[#fc3c00]", border: "hover:border-[#fc3c00]/30" },
  { bg: "bg-[#fff0eb]", text: "text-[#fc3c00]", border: "hover:border-[#fc3c00]/30" },
  { bg: "bg-[#fc3c00]/10", text: "text-[#fc3c00]", border: "hover:border-primary/30" },
];

export default function FeaturesPage({ params }: { params: { lang: Locale } }) {
  const lang = params.lang || "en";
  const { ref: heroRef, isInView: heroInView } = useInView<HTMLDivElement>({ threshold: 0.1, once: true });
  const { ref: gridRef, isInView: gridInView } = useInView<HTMLDivElement>({ threshold: 0.05, once: true });

  const t = pageText[lang] ?? pageText.en;
  const features = FEATURE_SETS[lang] ?? FEATURE_SETS.en;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://beeeducation.com";

  const getLocalizedPath = (path: string) => {
    if (lang === "en") return path;
    return `/${lang}${path}`;
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.structuredName,
    description: t.structuredDescription,
    itemListElement: features.map((feature, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "WebPage",
        name: feature.title,
        description: feature.description,
        url: `${siteUrl}${getLocalizedPath(feature.path)}`,
      },
    })),
  };
  const structuredDataJson = JSON.stringify(structuredData).replace(/</g, "\\u003c");

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredDataJson }} />

      <section className="relative pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fff0eb]/50 via-white to-white" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#ffe0d4]/60 rounded-full blur-3xl hidden sm:block" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#ffd5c4]/60 rounded-full blur-3xl hidden sm:block" />

        <div
          ref={heroRef}
          className="container px-4 relative z-10"
          style={{
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
          }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-[#fc3c00]/10 text-[#fc3c00] rounded-full text-sm font-medium">
              <BrainCircuit className="h-4 w-4" />
              <span>{t.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t.heroTitle}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fc3c00] via-[#ff6b35] to-[#ff8c5a]">
                {t.heroHighlight}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">{t.heroSubtitle}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href={getLocalizedPath("/pricing")}>
                <Button
                  size="lg"
                  className="bg-[#fc3c00] hover:bg-[#e03500] text-white px-8 py-6 text-lg rounded-xl shadow-lg"
                >
                  {t.seePricing}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href={getLocalizedPath("/contact")}>
                <Button size="lg" variant="outline" className="border-gray-300 px-8 py-6 text-lg rounded-xl">
                  {t.contactSales}
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
              {t.highlights.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#fc3c00]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white/80">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{t.exploreTitle}</h2>
            <p className="text-gray-600">{t.exploreSubtitle}</p>
          </div>

          <div ref={gridRef} className="grid gap-5 sm:gap-6 md:gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const colors = colorClasses[feature.colorIndex];
              return (
                <Link key={feature.path} href={getLocalizedPath(feature.path)} className="block h-full">
                  <Card
                    className={`group h-full p-6 bg-white border border-gray-200 rounded-2xl ${colors.border} hover:shadow-lg transition-all duration-300`}
                    style={{
                      opacity: gridInView ? 1 : 0,
                      transform: gridInView ? "translateY(0)" : "translateY(30px)",
                      transition: `opacity 0.5s ease-out ${index * 50}ms, transform 0.5s ease-out ${index * 50}ms`,
                    }}
                  >
                    <div className={`p-3 ${colors.bg} rounded-xl w-fit mb-4`}>
                      <feature.icon className={`h-6 w-6 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#fc3c00] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">{t.guidedTitle}</p>
            <Link href={getLocalizedPath("/contact")}>
              <Button size="lg" className="bg-[#fc3c00] hover:bg-[#e03500] text-white rounded-xl">
                {t.requestDemo}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
