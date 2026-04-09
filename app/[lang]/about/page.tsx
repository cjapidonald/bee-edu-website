import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Target,
  Heart,
  Lightbulb,
  Users,
  Layers,
  CheckCircle,
  GraduationCap,
  BarChart3,
  Calendar,
  FileText,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";
import { buildPageMetadata } from "@/lib/seo/metadata";

interface AboutPageProps {
  params: Promise<{ lang: string }>;
}

const coreModuleIcons = [Target, BarChart3, Calendar, FileText, BookOpen, Users, Layers, CheckCircle, GraduationCap, Heart];
const coreModuleColors = ["primary", "secondary", "accent", "primary", "accent", "secondary", "primary", "accent", "secondary", "accent"];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : "en";
  const titles: Record<string, string> = {
    en: "About KiwiBee | KiwiBee",
    "zh-HK": "關於 KiwiBee | KiwiBee",
  };
  const descriptions: Record<string, string> = {
    en: "Learn about KiwiBee—our mission, values, and how we help schools run smarter with AI.",
    "zh-HK": "了解 KiwiBee 的使命與價值，以及我們如何以 AI 協助學校更高效運作。",
  };
  return buildPageMetadata({
    lang,
    path: "/about",
    title: titles[lang] ?? titles.en,
    description: descriptions[lang] ?? descriptions.en,
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : "en";

  const getLocalizedPath = (path: string) => {
    if (lang === "en") return path;
    return `/${lang}${path}`;
  };

  const texts = {
    en: {
      story: {
        title: "Our Story",
        paragraphs: [
          "KiwiBee was founded on a simple yet powerful belief: that every educator deserves tools that work as hard as they do.",
          "What started as a passion project to help teachers manage their classrooms more effectively has grown into a comprehensive platform serving schools around the world.",
        ],
        mission: {
          title: "Our Mission",
          description: "We are committed to green, sustainable AI that transforms how schools operate. Our mission is to digitalize school management, streamline operations, and bring institutions into the next phase of education—where efficiency meets innovation, and technology serves both people and the planet.",
        },
      },
      platform: {
        title: "Complete School Management",
        subtitle: "One unified platform serving every role in your school ecosystem.",
        todayText: "Today, KiwiBee has evolved into a comprehensive multi-tenant school management platform, serving schools with",
        rolesHighlight: "16+ integrated user roles",
        andText: "and",
        modulesHighlight: "20+ integrated modules",
        coverText: "that cover every aspect of school operations.",
        modulesTitle: "Selected Platform Modules",
        rolesTitle: "16+ Integrated User Roles",
      },
      coreModules: [
        { name: "ClassSpark", description: "Behavior tracking with gamification" },
        { name: "Gradebook", description: "Skills-based assessment tracking" },
        { name: "Scheduling", description: "AI-powered timetable management" },
        { name: "Exams", description: "Complete exam lifecycle platform" },
        { name: "Curriculum", description: "Standards-aligned planning" },
        { name: "Attendance", description: "Real-time attendance tracking" },
        { name: "Homework", description: "17+ interactive activities" },
        { name: "Reports", description: "AI-generated term reports" },
        { name: "Parent Portal", description: "Family engagement tools" },
        { name: "Communication", description: "Built-in messaging & video" },
      ],
      userRoles: [
        "Sales Admin",
        "School Admin",
        "Team Leader",
        "Teacher",
        "Teaching Assistant",
        "Student",
        "Parent",
        "Finance Manager",
        "Scheduler",
        "Academics",
        "Librarian",
        "Student Affairs",
        "Customer Service",
        "HR Manager",
        "Marketing",
        "IT Manager",
      ],
      values: {
        title: "Our Values",
        subtitle: "The principles that guide everything we build",
        items: [
          {
            title: "Teacher-Centric Design",
            description: "Every feature is designed with teachers in mind, reducing administrative burden and freeing time for what matters most—teaching.",
          },
          {
            title: "Data-Driven Insights",
            description: "We believe in the power of data to transform education, providing actionable insights while maintaining the highest privacy standards.",
          },
          {
            title: "Continuous Innovation",
            description: "Education evolves, and so do we. We're committed to staying at the forefront of educational technology and AI advancements.",
          },
        ],
      },
      ctaSection: {
        title: "Ready to Transform Your School?",
        description: "Explore the platform with a demo and learn about early access for schools.",
        primaryButton: "Contact Sales",
        secondaryButton: "School Pricing",
      },
      ceo: {
        title: "Donald Cjapi",
        signature: "Chief Executive Officer",
        message: "As a software engineer with a passion for education, I founded KiwiBee to bridge the gap between powerful technology and everyday classroom needs. We are committed to green, sustainable AI—building tools that digitalize school management, make institutions more efficient, and take them into the next phase of education. Our platform represents years of collaboration with educators to build something truly transformative.",
      },
    },
    "zh-HK": {
      story: {
        title: "我們的故事",
        paragraphs: [
          "KiwiBee 的創立基於一個簡單而有力的信念：每位教育者都值得擁有與他們同樣努力工作的工具。",
          "最初只是一個幫助教師更有效管理課堂的熱情項目，如今已發展成為服務全球學校的綜合平台。",
        ],
        mission: {
          title: "我們的使命",
          description: "我們致力於綠色可持續的 AI，改變學校的運營方式。我們的使命是將學校管理數碼化，精簡營運流程，帶領教育機構邁入下一階段——效率與創新並重，科技服務人類與地球。",
        },
      },
      platform: {
        title: "全方位學校管理",
        subtitle: "一個統一的平台服務學校生態系統中的每個角色。",
        todayText: "如今，KiwiBee 已發展成為綜合性的多租戶學校管理平台，為學校提供",
        rolesHighlight: "16+ 個整合用戶角色",
        andText: "和",
        modulesHighlight: "20+ 個整合模組",
        coverText: "涵蓋學校運營的各個方面。",
        modulesTitle: "精選平台模組",
        rolesTitle: "16+ 個整合用戶角色",
      },
      coreModules: [
        { name: "ClassSpark", description: "遊戲化行為追蹤" },
        { name: "成績冊", description: "技能評估追蹤" },
        { name: "排課系統", description: "AI 驅動的時間表管理" },
        { name: "考試平台", description: "完整的考試生命週期平台" },
        { name: "課程規劃", description: "符合標準的規劃" },
        { name: "出勤追蹤", description: "實時出勤追蹤" },
        { name: "作業系統", description: "17+ 種互動活動" },
        { name: "報告生成", description: "AI 生成的學期報告" },
        { name: "家長入口", description: "家庭互動工具" },
        { name: "通訊系統", description: "內建訊息和視訊" },
      ],
      userRoles: [
        "銷售管理員",
        "學校管理員",
        "團隊領導",
        "教師",
        "教學助理",
        "學生",
        "家長",
        "財務經理",
        "排課人員",
        "學術部門",
        "圖書館員",
        "學生事務",
        "質量保證與認證",
        "人力資源經理",
        "市場推廣",
        "資訊科技經理",
      ],
      values: {
        title: "我們的價值觀",
        subtitle: "指導我們一切建設的原則",
        items: [
          {
            title: "以教師為中心的設計",
            description: "每個功能都以教師為考量，減少行政負擔，為最重要的事情——教學——騰出時間。",
          },
          {
            title: "數據驅動的洞察",
            description: "我們相信數據改變教育的力量，在保持最高隱私標準的同時提供可操作的洞察。",
          },
          {
            title: "持續創新",
            description: "教育在發展，我們也在發展。我們致力於站在教育技術和 AI 進步的前沿。",
          },
        ],
      },
      ctaSection: {
        title: "準備好改變您的學校了嗎？",
        description: "透過演示探索平台，了解學校的早期訪問機會。",
        primaryButton: "聯絡銷售",
        secondaryButton: "學校方案",
      },
      ceo: {
        title: "Donald Cjapi",
        signature: "首席執行官",
        message: "作為一名對教育充滿熱情的軟體工程師，我創立了 KiwiBee，以彌合強大技術與日常課堂需求之間的差距。我們致力於綠色可持續的 AI——構建工具將學校管理數碼化，使機構更高效，帶領它們邁入教育的下一階段。我們的平台代表了多年與教育者合作構建真正具有變革性事物的成果。",
      },
    },
  };

  const t = texts[lang as keyof typeof texts] || texts.en;
  const missionIcons = [Target, Heart, Lightbulb];
  const missionColors = ["primary", "secondary", "accent"];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900 text-white">
      {/* Subtle gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-950 to-gray-950" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-yellow-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-[-8rem] h-64 w-64 rounded-full bg-gray-900/50 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 py-24 md:px-8">
        {/* Story Section */}
        <section className="relative overflow-hidden rounded-[2.5rem] border border-gray-800 bg-gradient-to-b from-gray-900 to-gray-950 p-10 shadow-lg md:p-14">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gray-900/60 rounded-full blur-3xl -z-10" />
          <div className="relative z-10 space-y-10">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">{t.story.title}</h1>
              <div className="space-y-4 text-lg text-gray-400">
                {t.story.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                <p>
                  {t.platform.todayText}
                  {" "}<strong className="text-white">{t.platform.rolesHighlight}</strong>{" "}
                  {t.platform.andText}
                  <strong className="text-white"> {t.platform.modulesHighlight}</strong>{" "}
                  {t.platform.coverText}
                </p>
              </div>
            </div>

            {/* Leadership */}
            <div className="space-y-6">
              <div className="flex flex-col gap-6 rounded-2xl border border-gray-800 bg-[#fff5f0] p-8 text-gray-400 md:flex-row md:items-start">
                <div className="flex items-center gap-5 md:w-56 md:flex-col md:items-start md:gap-4">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-full border border-gray-800 bg-gray-900 shadow-lg">
                    <Image
                      src="/lovable-uploads/96483919-4154-4163-b949-8ebebd6fb820.png"
                      alt="Donald Cjapi - Chief Executive Officer"
                      className="h-full w-full object-cover"
                      width={96}
                      height={96}
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">{t.ceo.title}</h2>
                    <p className="font-medium text-gray-300 text-sm mt-1">{t.ceo.signature}</p>
                  </div>
                </div>
                <p className="leading-relaxed text-base md:text-[17px]">{t.ceo.message}</p>
              </div>
            </div>

            {/* Mission */}
            <div className="rounded-2xl border border-gray-800 bg-[#fff5f0] p-8 text-gray-400">
              <h2 className="text-2xl font-semibold text-white">{t.story.mission.title}</h2>
              <p className="mt-3 leading-relaxed">{t.story.mission.description}</p>
            </div>
          </div>
        </section>

        {/* Platform Overview */}
        <section className="rounded-2xl border border-gray-800 bg-gray-900 p-10 shadow-lg">
          <div className="mx-auto max-w-3xl text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#16a34a]/10 mb-4">
              <Layers className="h-8 w-8 text-[#16a34a]" />
            </div>
            <h2 className="text-3xl font-bold text-white">{t.platform.title}</h2>
            <p className="mt-3 text-base text-gray-400">{t.platform.subtitle}</p>
          </div>

          {/* Core Modules */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-white mb-6 text-center">{t.platform.modulesTitle}</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {t.coreModules.map((module, index) => {
                const IconComponent = coreModuleIcons[index] ?? Target;
                const color = coreModuleColors[index] ?? "primary";
                return (
                  <Card key={index} className="p-4 text-center border border-gray-800 bg-gray-900 hover:border-primary/30 hover:shadow-md transition-all rounded-xl">
                    <div className="space-y-3">
                      <div className={cn(
                        "mx-auto flex h-12 w-12 items-center justify-center rounded-xl",
                        color === "primary" && "bg-[#16a34a]/10",
                        color === "secondary" && "bg-secondary/15",
                        color === "accent" && "bg-accent/10",
                      )}>
                        <IconComponent className={cn(
                          "h-6 w-6",
                          color === "primary" && "text-[#16a34a]",
                          color === "secondary" && "text-secondary",
                          color === "accent" && "text-accent",
                        )} />
                      </div>
                      <h4 className="text-sm font-medium text-white">{module.name}</h4>
                      <p className="text-xs text-gray-500">{module.description}</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* 13 User Roles */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6 text-center">{t.platform.rolesTitle}</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {t.userRoles.map((role, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-[#fff5f0] rounded-full text-sm text-gray-300 border border-gray-800 hover:border-primary/30 hover:bg-[#16a34a]/10 transition-colors"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="rounded-2xl border border-gray-800 bg-gray-900 p-10 shadow-lg">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-white">{t.values.title}</h2>
            {t.values.subtitle && <p className="mt-3 text-base text-gray-400">{t.values.subtitle}</p>}
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {t.values.items.map((item, index) => {
              const IconComponent = missionIcons[index] ?? Target;
              const color = missionColors[index] ?? "primary";
              return (
                <Card key={index} className="p-6 text-center border border-gray-800 bg-gray-900 hover:border-primary/30 hover:shadow-md transition-all rounded-xl">
                  <div className="space-y-4">
                    <div className={cn(
                      "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl",
                      color === "primary" && "bg-[#16a34a]/10",
                      color === "secondary" && "bg-secondary/15",
                      color === "accent" && "bg-accent/10",
                    )}>
                      <IconComponent className={cn(
                        "h-6 w-6",
                        color === "primary" && "text-[#16a34a]",
                        color === "secondary" && "text-secondary",
                        color === "accent" && "text-accent",
                      )} />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="rounded-2xl bg-gradient-to-r from-[#16a34a] via-[#15803d] to-[#166534] p-10 text-center shadow-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-900/20 mb-6">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">{t.ctaSection.title}</h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">{t.ctaSection.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gray-900 text-[#16a34a] hover:bg-gray-800 rounded-xl" asChild>
              <Link href={getLocalizedPath("/contact")}>
                {t.ctaSection.primaryButton}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white bg-gray-900/20 text-white hover:bg-gray-900/30 rounded-xl" asChild>
              <Link href={getLocalizedPath("/pricing")}>{t.ctaSection.secondaryButton}</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
