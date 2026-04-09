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
  MessageSquare,
  Heart,
  Target,
  FileText,
  Briefcase,
  Award,
  Brain,
  Store,
  Bell,
  UserPlus,
  DollarSign,
  HelpCircle,
  BookOpen,
  Megaphone,
  AlertTriangle,
  FolderKanban,
  Building2,
  Rocket,
  TrendingUp,
  UserCog,
  Library,
  ArchiveRestore,
  ClipboardList,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useInView } from "@/hooks/useInView";

// ===== Types =====
type CategoryKey =
  | "teaching"
  | "operations"
  | "communication"
  | "hr"
  | "finance"
  | "analytics"
  | "compliance";

type FeatureLink = {
  title: string;
  description: string;
  path: string;
  icon: LucideIcon;
  category: CategoryKey;
  isNew?: boolean;
};

type CategoryMeta = {
  key: CategoryKey;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  accent: string; // hex for accent dot
  bg: string;     // tailwind bg class for icon pill
  text: string;   // tailwind text class for icon
  border: string; // tailwind hover border class
};

// ===== Category metadata (bilingual) =====
const CATEGORY_META: Record<string, CategoryMeta[]> = {
  en: [
    {
      key: "teaching",
      title: "Teaching & Learning",
      subtitle: "The classroom stack: planning, delivery, assessment, and student engagement.",
      icon: GraduationCap,
      accent: "#FDB714",
      bg: "bg-[#FDB714]/15",
      text: "text-[#a16207]",
      border: "hover:border-[#FDB714]/40",
    },
    {
      key: "operations",
      title: "School Operations",
      subtitle: "The backbone: scheduling, integrations, rooms, stories, and academic year lifecycle.",
      icon: Calendar,
      accent: "#8b5cf6",
      bg: "bg-violet-100",
      text: "text-violet-700",
      border: "hover:border-violet-300",
    },
    {
      key: "communication",
      title: "Communication & Parents",
      subtitle: "How teachers, parents, and students stay connected every day.",
      icon: MessageSquare,
      accent: "#E83B5E",
      bg: "bg-rose-100",
      text: "text-rose-700",
      border: "hover:border-rose-300",
    },
    {
      key: "hr",
      title: "People & HR",
      subtitle: "From recruitment to professional growth — the full staff journey.",
      icon: Users,
      accent: "#10b981",
      bg: "bg-emerald-100",
      text: "text-emerald-700",
      border: "hover:border-emerald-300",
    },
    {
      key: "finance",
      title: "Finance & Admissions",
      subtitle: "Billing, enrollment, admissions pipelines, and customer success.",
      icon: Wallet,
      accent: "#3b82f6",
      bg: "bg-sky-100",
      text: "text-sky-700",
      border: "hover:border-sky-300",
    },
    {
      key: "analytics",
      title: "Analytics & Insights",
      subtitle: "Ask questions in plain English. Get answers grounded in your school's data.",
      icon: LineChart,
      accent: "#f59e0b",
      bg: "bg-amber-100",
      text: "text-amber-700",
      border: "hover:border-amber-300",
    },
    {
      key: "compliance",
      title: "Compliance & Wellbeing",
      subtitle: "Policies, student affairs, and structured rollouts — without the paperwork pain.",
      icon: Shield,
      accent: "#f43f5e",
      bg: "bg-rose-100",
      text: "text-rose-700",
      border: "hover:border-rose-300",
    },
  ],
  "zh-HK": [
    {
      key: "teaching",
      title: "教學與學習",
      subtitle: "課堂的核心：備課、授課、評估與學生參與。",
      icon: GraduationCap,
      accent: "#FDB714",
      bg: "bg-[#FDB714]/15",
      text: "text-[#a16207]",
      border: "hover:border-[#FDB714]/40",
    },
    {
      key: "operations",
      title: "學校營運",
      subtitle: "營運支柱：排課、整合、場地、班級動態與學年流程。",
      icon: Calendar,
      accent: "#8b5cf6",
      bg: "bg-violet-100",
      text: "text-violet-700",
      border: "hover:border-violet-300",
    },
    {
      key: "communication",
      title: "溝通與家長",
      subtitle: "教師、家長與學生每天的連結方式。",
      icon: MessageSquare,
      accent: "#E83B5E",
      bg: "bg-rose-100",
      text: "text-rose-700",
      border: "hover:border-rose-300",
    },
    {
      key: "hr",
      title: "人員與人力資源",
      subtitle: "從招聘到專業發展——完整的教職員旅程。",
      icon: Users,
      accent: "#10b981",
      bg: "bg-emerald-100",
      text: "text-emerald-700",
      border: "hover:border-emerald-300",
    },
    {
      key: "finance",
      title: "財務與招生",
      subtitle: "帳單、入學、招生流程與客戶成功。",
      icon: Wallet,
      accent: "#3b82f6",
      bg: "bg-sky-100",
      text: "text-sky-700",
      border: "hover:border-sky-300",
    },
    {
      key: "analytics",
      title: "分析與洞察",
      subtitle: "以自然語言提問。獲得以學校資料為基礎的答案。",
      icon: LineChart,
      accent: "#f59e0b",
      bg: "bg-amber-100",
      text: "text-amber-700",
      border: "hover:border-amber-300",
    },
    {
      key: "compliance",
      title: "合規與學生事務",
      subtitle: "政策、學生事務與有序推行——無須繁瑣文書。",
      icon: Shield,
      accent: "#f43f5e",
      bg: "bg-rose-100",
      text: "text-rose-700",
      border: "hover:border-rose-300",
    },
  ],
};

// ===== Feature lists (bilingual) =====
const FEATURE_SETS: Record<string, FeatureLink[]> = {
  en: [
    // Teaching & Learning
    { category: "teaching", title: "Skills Gradebook", description: "Skills-based tracking with visual heatmaps and mastery progress.", path: "/features/gradebook", icon: LineChart },
    { category: "teaching", title: "Curriculum Planning", description: "Plan units, map skills, and align learning objectives to classroom execution.", path: "/features/curriculum", icon: NotebookPen },
    { category: "teaching", title: "Exam Platform", description: "Create exams, deliver online assessments, and streamline marking with AI assistance.", path: "/features/exams", icon: ClipboardCheck },
    { category: "teaching", title: "ClassSpark Behavior", description: "Live gamified behavior tracking — gems, monster avatars, and parent updates in real time.", path: "/features/classspark", icon: Sparkles },
    { category: "teaching", title: "TeacherLab & AI", description: "Lesson planner, homework builder, rubric generator, exam marking — 10 AI tools, 3 thinking modes.", path: "/features/ai", icon: BrainCircuit },
    { category: "teaching", title: "Homework System", description: "3-panel Resources Factory — describe what you want to teach, AI drafts differentiated homework grounded in your curriculum.", path: "/features/homework", icon: FileText, isNew: true },
    { category: "teaching", title: "Student Portfolios", description: "Shareable portfolios with evidence artifacts — photos, audio, documents, and skill tags.", path: "/features/portfolios", icon: FolderOpen },
    { category: "teaching", title: "Gamification & Rewards", description: "Games Library, ClassShop, gem wallet, leaderboards, and monster avatars that motivate students.", path: "/features/gamification", icon: Gamepad2 },
    { category: "teaching", title: "Class Stories", description: "Social media-style updates for classes. Share photos, videos, and daily wins in a safe closed feed — parents get automatic notifications.", path: "/features/class-stories", icon: Megaphone, isNew: true },
    { category: "teaching", title: "Library & ShelfSpark", description: "Manage books, loans, and catalogs with ShelfSpark AI reading recommendations.", path: "/features/library", icon: Library },

    // School Operations
    { category: "operations", title: "Magnetic Scheduling", description: "AI-powered timetables with conflict detection, teacher workload balancing, and live conflict resolution.", path: "/features/scheduling", icon: Calendar },
    { category: "operations", title: "Integrations & API", description: "Connect Google Workspace, Canvas, Zoom, and more. Full REST API and webhooks for custom workflows.", path: "/features/integrations", icon: Handshake },
    { category: "operations", title: "Class Stories", description: "Capture classroom moments in a photo feed — teachers post, parents see them in real time.", path: "/features/school-news", icon: Megaphone },
    { category: "operations", title: "Resource Booking", description: "Book rooms, equipment, and shared resources with automated conflict detection.", path: "/features/resource-booking", icon: FolderKanban },
    { category: "operations", title: "Year Migration", description: "Guided academic year rollover — class promotions, teacher reassignments, validated data flows.", path: "/features/year-migration", icon: ArchiveRestore },

    // Communication & Parents
    { category: "communication", title: "Chat & Messaging", description: "Secure in-app messaging between teachers, parents, and students. Audio messages and file attachments.", path: "/features/chat", icon: MessageSquare, isNew: true },
    { category: "communication", title: "Parent Portal", description: "Parents see their child's grades, attendance, behavior, homework, and messages in one place.", path: "/features/parent-portal", icon: Heart, isNew: true },
    { category: "communication", title: "Emergency Communications", description: "Instant mass notifications for drills, closures, and urgent updates — across every channel.", path: "/features/emergency-communications", icon: AlertTriangle },
    { category: "communication", title: "Surveys", description: "Collect structured feedback from parents, students, and staff with built-in survey tools.", path: "/features/survey", icon: ClipboardList },

    // People & HR
    { category: "hr", title: "HR Management", description: "Staff directory, contracts, attendance, performance tracking, and employee self-service.", path: "/features/hr", icon: UserCog },
    { category: "hr", title: "Professional Development", description: "PD plans, classroom observations, certifications, and outcomes tied to student impact.", path: "/features/professional-dev", icon: Award },
    { category: "hr", title: "Teacher KPI & Evaluations", description: "Track performance KPIs across teams with connected dashboards and evaluation rubrics.", path: "/features/teacher-kpi", icon: TrendingUp },
    { category: "hr", title: "Recruitment", description: "Job postings, application tracking, interview scheduling, and offer workflows.", path: "/features/recruitment", icon: UserPlus, isNew: true },

    // Finance & Admissions
    { category: "finance", title: "Finance", description: "Invoices, fee structures, billing timelines, payroll, discounts, and penalties — all in one place.", path: "/features/finance", icon: DollarSign },
    { category: "finance", title: "Sales Admin", description: "Sales pipeline, organization management, and deal tracking for schools selling their programs.", path: "/features/sales-admin", icon: Briefcase },
    { category: "finance", title: "Admissions", description: "Application funnel, enrollment tracking, document checklists, and automated follow-ups.", path: "/features/admissions", icon: Building2, isNew: true },
    { category: "finance", title: "Customer Service", description: "Ticket queue, renewal tracking, and NPS satisfaction dashboards for customer success teams.", path: "/features/customer-service", icon: HelpCircle, isNew: true },
    { category: "finance", title: "Marketing Dashboard", description: "School-ready marketing analytics, content pipelines, and admissions CRM workflows.", path: "/features/marketing", icon: Megaphone },

    // Analytics & Insights
    { category: "analytics", title: "Data Scientist AI", description: "Ask questions about your school data in plain English. Get charts, insights, and recommendations instantly.", path: "/features/ai-analytics", icon: Brain },
    { category: "analytics", title: "School Insights", description: "Executive dashboards with enrollment, attendance, grades, and financial KPIs per role.", path: "/features/insights", icon: LineChart, isNew: true },

    // Compliance & Wellbeing
    { category: "compliance", title: "Policy Management", description: "Centralize policies, track versions, manage acknowledgments, and publish updates to staff.", path: "/features/policy-management", icon: Shield },
    { category: "compliance", title: "Student Affairs", description: "Incidents, behavior alerts, wellbeing indicators, and pastoral care workflows.", path: "/features/student-affairs", icon: Heart },
    { category: "compliance", title: "Pilot Projects", description: "Run structured feature pilots, track progress, and scale what works across your school.", path: "/features/pilot-projects", icon: Rocket },
  ],
  "zh-HK": [
    // Teaching & Learning
    { category: "teaching", title: "技能成績冊", description: "以技能為本的追蹤，配合熱圖與精通進度可視化。", path: "/features/gradebook", icon: LineChart },
    { category: "teaching", title: "課程規劃", description: "規劃單元、建立技能地圖，並把學習目標落實到課堂教學。", path: "/features/curriculum", icon: NotebookPen },
    { category: "teaching", title: "考試平台", description: "建立考試、提供線上評估，並以 AI 協助簡化批改流程。", path: "/features/exams", icon: ClipboardCheck },
    { category: "teaching", title: "ClassSpark 行為追蹤", description: "即時遊戲化行為追蹤——寶石、怪獸角色與家長同步更新。", path: "/features/classspark", icon: Sparkles },
    { category: "teaching", title: "TeacherLab 與 AI", description: "備課、功課、評分準則、考試批改——10 款 AI 工具，3 種思考模式。", path: "/features/ai", icon: BrainCircuit },
    { category: "teaching", title: "功課系統", description: "三欄式資源工廠——描述想教甚麼，AI 即時生成差異化功課並以課程為基礎。", path: "/features/homework", icon: FileText, isNew: true },
    { category: "teaching", title: "學生作品集", description: "可分享的作品集，配合證據檔案——照片、音訊、文件與技能標籤。", path: "/features/portfolios", icon: FolderOpen },
    { category: "teaching", title: "遊戲化與獎勵", description: "遊戲庫、ClassShop、寶石錢包、排行榜與怪獸角色，激勵學生學習。", path: "/features/gamification", icon: Gamepad2 },
    { category: "teaching", title: "班級動態", description: "為班級而設的社交式動態更新。在安全封閉的動態流中分享照片、影片與日常精彩——家長自動接收通知。", path: "/features/class-stories", icon: Megaphone, isNew: true },
    { category: "teaching", title: "圖書館與 ShelfSpark", description: "管理書籍、借閱與目錄，並以 ShelfSpark AI 推薦閱讀。", path: "/features/library", icon: Library },

    // School Operations
    { category: "operations", title: "Magnetic 排課", description: "AI 驅動的時間表，配合衝突檢測、教師工作量平衡與即時修正。", path: "/features/scheduling", icon: Calendar },
    { category: "operations", title: "整合與 API", description: "連接 Google Workspace、Canvas、Zoom 等。完整 REST API 與 webhook 支援自訂流程。", path: "/features/integrations", icon: Handshake },
    { category: "operations", title: "班級動態", description: "將課堂時刻記錄在照片動態流——教師發佈，家長即時看到。", path: "/features/school-news", icon: Megaphone },
    { category: "operations", title: "資源預訂", description: "預訂課室、器材與共用資源，並自動檢測衝突。", path: "/features/resource-booking", icon: FolderKanban },
    { category: "operations", title: "學年遷移", description: "引導式學年過渡——班級升班、教師分配與已驗證的資料流程。", path: "/features/year-migration", icon: ArchiveRestore },

    // Communication & Parents
    { category: "communication", title: "聊天與訊息", description: "教師、家長與學生之間的安全應用內訊息。支援語音訊息與附件。", path: "/features/chat", icon: MessageSquare, isNew: true },
    { category: "communication", title: "家長門戶", description: "家長在同一地方查看孩子的成績、出勤、行為、功課與訊息。", path: "/features/parent-portal", icon: Heart, isNew: true },
    { category: "communication", title: "緊急通訊", description: "針對演習、停課與緊急情況即時發送大規模通知——跨多個渠道。", path: "/features/emergency-communications", icon: AlertTriangle },
    { category: "communication", title: "問卷調查", description: "透過內建問卷工具收集家長、學生與教職員的結構化意見。", path: "/features/survey", icon: ClipboardList },

    // People & HR
    { category: "hr", title: "人力資源管理", description: "教職員名冊、合約、考勤、績效追蹤與員工自助服務。", path: "/features/hr", icon: UserCog },
    { category: "hr", title: "專業發展", description: "發展計劃、課堂觀察、資格認證，並與學生成效掛鈎。", path: "/features/professional-dev", icon: Award },
    { category: "hr", title: "教師 KPI 與評估", description: "以儀表板與評估準則追蹤團隊的 KPI 表現。", path: "/features/teacher-kpi", icon: TrendingUp },
    { category: "hr", title: "招聘", description: "職位發佈、申請追蹤、面試安排與聘用流程。", path: "/features/recruitment", icon: UserPlus, isNew: true },

    // Finance & Admissions
    { category: "finance", title: "財務", description: "發票、學費結構、帳單時間軸、薪資、折扣與罰款——一站式管理。", path: "/features/finance", icon: DollarSign },
    { category: "finance", title: "銷售管理", description: "銷售管線、機構管理與交易追蹤——適用於銷售課程的學校。", path: "/features/sales-admin", icon: Briefcase },
    { category: "finance", title: "招生", description: "申請漏斗、入學追蹤、文件清單與自動跟進。", path: "/features/admissions", icon: Building2, isNew: true },
    { category: "finance", title: "客戶服務", description: "工單佇列、續約追蹤與 NPS 滿意度儀表板。", path: "/features/customer-service", icon: HelpCircle, isNew: true },
    { category: "finance", title: "市場推廣儀表板", description: "學校級市場分析、內容管線與招生 CRM 流程。", path: "/features/marketing", icon: Megaphone },

    // Analytics & Insights
    { category: "analytics", title: "數據科學家 AI", description: "以自然語言查詢學校資料。即時獲取圖表、洞察與建議。", path: "/features/ai-analytics", icon: Brain },
    { category: "analytics", title: "學校洞察", description: "行政儀表板包含入學、出勤、成績與財務 KPI（按角色）。", path: "/features/insights", icon: LineChart, isNew: true },

    // Compliance & Wellbeing
    { category: "compliance", title: "政策管理", description: "集中管理政策、追蹤版本、記錄確認並向教職員發佈更新。", path: "/features/policy-management", icon: Shield },
    { category: "compliance", title: "學生事務", description: "事件、行為警報、身心健康指標與學生輔導流程。", path: "/features/student-affairs", icon: Heart },
    { category: "compliance", title: "試點項目", description: "推行結構化的功能試點、追蹤進度並擴展至全校。", path: "/features/pilot-projects", icon: Rocket },
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
    newBadge: string;
  }
> = {
  en: {
    badge: "Platform Overview",
    heroTitle: "Everything your school needs",
    heroHighlight: "in one platform",
    heroSubtitle:
      "32 integrated modules across 7 categories — built to reduce admin load, improve teaching quality, and give school leaders full operational visibility.",
    seePricing: "See Pricing",
    contactSales: "Contact Sales",
    highlights: [
      "AI-first workflows for teachers",
      "School operations in one system",
      "Built for modern school networks",
    ],
    exploreTitle: "Explore by Category",
    exploreSubtitle: "Pick a category to dive into the modules your team uses every day.",
    guidedTitle: "Want a guided walkthrough tailored to your school?",
    requestDemo: "Request a demo",
    structuredName: "KiwiBee Features",
    structuredDescription: "Complete list of KiwiBee platform features for school management",
    newBadge: "NEW",
  },
  "zh-HK": {
    badge: "平台總覽",
    heroTitle: "學校所需的一切",
    heroHighlight: "盡在同一平台",
    heroSubtitle:
      "32 個整合模組，分為 7 大類別——為減少行政負擔、提升教學質素，並讓學校領導者獲得全面營運可視性而打造。",
    seePricing: "查看價格",
    contactSales: "聯絡銷售",
    highlights: ["為教師而設的 AI 工作流程", "學校營運一套系統整合", "為現代學校網絡而設"],
    exploreTitle: "按類別探索",
    exploreSubtitle: "選擇類別，深入了解你的團隊每天使用的模組。",
    guidedTitle: "想要為你的學校量身訂做的導覽示範？",
    requestDemo: "申請示範",
    structuredName: "KiwiBee 功能",
    structuredDescription: "KiwiBee 平台的完整功能列表（學校管理）",
    newBadge: "新功能",
  },
};

export default function FeaturesPage({ params }: { params: { lang: Locale } }) {
  const lang = params.lang || "en";
  const { ref: heroRef, isInView: heroInView } = useInView<HTMLDivElement>({ threshold: 0.1, once: true });

  const t = pageText[lang] ?? pageText.en;
  const features = FEATURE_SETS[lang] ?? FEATURE_SETS.en;
  const categories = CATEGORY_META[lang] ?? CATEGORY_META.en;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kiwibee.io";

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
    <div className="min-h-screen bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredDataJson }} />

      {/* HERO */}
      <section className="relative pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-gray-950 to-gray-950" />
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
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-[#16a34a]/10 text-[#16a34a] rounded-full text-sm font-medium">
              <BrainCircuit className="h-4 w-4" />
              <span>{t.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              {t.heroTitle}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16a34a] via-[#facc15] to-[#facc15]">
                {t.heroHighlight}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">{t.heroSubtitle}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href={getLocalizedPath("/pricing")}>
                <Button
                  size="lg"
                  className="bg-[#16a34a] hover:bg-[#15803d] text-white px-8 py-6 text-lg rounded-xl shadow-lg"
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
                  <Sparkles className="h-4 w-4 text-[#16a34a]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-900/80">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">{t.exploreTitle}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">{t.exploreSubtitle}</p>
          </div>

          <div className="max-w-6xl mx-auto space-y-14">
            {categories.map((category) => {
              const categoryFeatures = features.filter((f) => f.category === category.key);
              if (categoryFeatures.length === 0) return null;
              return (
                <CategorySection
                  key={category.key}
                  category={category}
                  features={categoryFeatures}
                  getLocalizedPath={getLocalizedPath}
                  newBadgeText={t.newBadge}
                />
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-4">{t.guidedTitle}</p>
            <Link href={getLocalizedPath("/contact")}>
              <Button size="lg" className="bg-[#16a34a] hover:bg-[#15803d] text-white rounded-xl">
                {t.requestDemo}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// ===== Category Section Component =====
function CategorySection({
  category,
  features,
  getLocalizedPath,
  newBadgeText,
}: {
  category: CategoryMeta;
  features: FeatureLink[];
  getLocalizedPath: (p: string) => string;
  newBadgeText: string;
}) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.05, once: true });

  return (
    <div
      ref={ref}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      }}
    >
      {/* Category header */}
      <div className="flex items-start gap-4 mb-6">
        <div className={`p-3 ${category.bg} rounded-2xl shrink-0`}>
          <category.icon className={`h-6 w-6 ${category.text}`} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{category.title}</h3>
            <span
              className="hidden sm:inline-block text-xs font-bold px-2 py-0.5 rounded-full text-white"
              style={{ background: category.accent }}
            >
              {features.length}
            </span>
          </div>
          <p className="text-sm sm:text-base text-gray-400">{category.subtitle}</p>
        </div>
      </div>

      {/* Features grid */}
      <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Link key={feature.path} href={getLocalizedPath(feature.path)} className="block h-full">
            <Card
              className={`group relative h-full p-5 bg-gray-900 border border-gray-700 rounded-2xl ${category.border} hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300`}
            >
              {feature.isNew && (
                <span
                  className="absolute top-3 right-3 text-[10px] font-black px-1.5 py-0.5 rounded text-white"
                  style={{ background: category.accent }}
                >
                  {newBadgeText}
                </span>
              )}
              <div className={`p-2.5 ${category.bg} rounded-xl w-fit mb-3`}>
                <feature.icon className={`h-5 w-5 ${category.text}`} />
              </div>
              <h4 className="text-base font-bold text-white mb-1 group-hover:text-[#16a34a] transition-colors pr-8">
                {feature.title}
              </h4>
              <p className="text-gray-400 text-sm leading-snug">{feature.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
