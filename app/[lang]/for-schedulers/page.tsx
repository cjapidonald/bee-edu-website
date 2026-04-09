import { Calendar, Magnet, Clock, Users, AlertTriangle, RefreshCw } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { RolePageTemplate } from "@/components/pages/RolePageTemplate";
import { SchedulerDashboardMockup } from "@/components/beaver-mockups";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";


const contentByLang: Record<
  string,
  {
    badge: string;
    title: string;
    highlight: string;
    description: string;
    trustIndicators: string[];
    painPoints: { title: string; problem: string; solution: string }[];
    features: {
      icon: typeof Magnet;
      title: string;
      description: string;
      badge?: string;
      badgeColor?: string;
    }[];
    workflow: { time: string; task: string; icon: typeof Magnet }[];
  }
> = {
  en: {
    badge: "For Schedulers",
    title: "Scheduling Made",
    highlight: "Simple",
    description:
      "Create conflict-free timetables in hours, not weeks. Our magnetic scheduling system makes the complex simple.",
    trustIndicators: ["Save 20+ hours/week", "Zero conflicts", "AI-optimized"],
    painPoints: [
      {
        title: "Weeks of Manual Work",
        problem: "Creating timetables takes weeks of tedious spreadsheet work",
        solution: "Build complete schedules in hours with drag-and-drop",
      },
      {
        title: "Constant Conflicts",
        problem: "Double-bookings and clashes discovered too late",
        solution: "Real-time conflict detection as you schedule",
      },
      {
        title: "Teacher Complaints",
        problem: "Difficult to accommodate everyone's preferences",
        solution: "Built-in preference tracking and optimization",
      },
      {
        title: "Last-Minute Changes",
        problem: "Cover arrangements cause chaos",
        solution: "Instant substitution management with notifications",
      },
    ],
    features: [
      {
        icon: Magnet,
        title: "Magnetic Scheduling",
        description:
          "Drag and drop lessons that snap into valid slots. Constraints are automatically respected.",
        badge: "Popular",
        badgeColor: "bg-[#fc3c00]/10 text-[#fc3c00]",
      },
      {
        icon: AlertTriangle,
        title: "Conflict Detection",
        description: "Real-time alerts for double-bookings, teacher conflicts, and room clashes.",
      },
      {
        icon: Users,
        title: "Teacher Preferences",
        description: "Track and respect availability, preferred rooms, and time-off requests.",
      },
      {
        icon: RefreshCw,
        title: "AI Optimization",
        description: "Let AI suggest improvements to minimize gaps and balance workloads.",
        badge: "AI",
        badgeColor: "bg-[#fc3c00]/10 text-[#fc3c00]",
      },
      {
        icon: Clock,
        title: "Cover Management",
        description: "Handle teacher absences with automatic cover suggestions and notifications.",
      },
      {
        icon: Calendar,
        title: "Term Planning",
        description: "Plan entire terms, handle rotations, and manage special events and exams.",
      },
    ],
    workflow: [
      { time: "8:00 AM", task: "Check today's schedule and any conflicts", icon: AlertTriangle },
      { time: "8:30 AM", task: "Arrange covers for absent teachers", icon: Users },
      { time: "10:00 AM", task: "Work on next term's timetable", icon: Magnet },
      { time: "2:00 PM", task: "Review AI optimization suggestions", icon: RefreshCw },
      { time: "3:00 PM", task: "Publish updates to all staff", icon: Calendar },
    ],
  },
  "zh-HK": {
    badge: "排課人員專區",
    title: "排課變得",
    highlight: "更簡單",
    description:
      "在幾小時內建立無衝突時間表，而不是幾週。我們的磁性排課系統讓複雜變得簡單。",
    trustIndicators: ["每週節省 20+ 小時", "零衝突", "AI 優化"],
    painPoints: [
      {
        title: "數週的手動工作",
        problem: "用試算表做排課，繁瑣且耗時數週",
        solution: "拖放操作即可在數小時內完成",
      },
      {
        title: "衝突不斷",
        problem: "雙重預訂與衝突常在太晚時才發現",
        solution: "排課同時即時衝突檢測",
      },
      {
        title: "教師抱怨",
        problem: "難以同時照顧所有人的偏好與可用性",
        solution: "內建偏好追蹤與自動優化",
      },
      {
        title: "臨時變更",
        problem: "臨時代課安排容易造成混亂",
        solution: "即時代課管理並自動通知相關人員",
      },
    ],
    features: [
      {
        icon: Magnet,
        title: "磁性排課",
        description: "拖放課節會自動吸附到可用時段，系統會自動遵守所有約束條件。",
        badge: "熱門",
        badgeColor: "bg-[#fc3c00]/10 text-[#fc3c00]",
      },
      {
        icon: AlertTriangle,
        title: "衝突檢測",
        description: "即時提醒雙重預訂、教師時間衝突及場地衝突。",
      },
      {
        icon: Users,
        title: "教師偏好",
        description: "追蹤並尊重可用性、偏好場地與請假需求。",
      },
      {
        icon: RefreshCw,
        title: "AI 優化",
        description: "讓 AI 建議改進方案，減少空檔並平衡工作量。",
        badge: "AI",
        badgeColor: "bg-[#fc3c00]/10 text-[#fc3c00]",
      },
      {
        icon: Clock,
        title: "代課管理",
        description: "教師缺席時自動建議代課並通知相關人員。",
      },
      {
        icon: Calendar,
        title: "學期規劃",
        description: "規劃整個學期，處理輪換、特殊活動與考試安排。",
      },
    ],
    workflow: [
      { time: "8:00 AM", task: "查看今日時間表及任何衝突", icon: AlertTriangle },
      { time: "8:30 AM", task: "為缺席教師安排代課", icon: Users },
      { time: "10:00 AM", task: "處理下學期時間表", icon: Magnet },
      { time: "2:00 PM", task: "檢視 AI 優化建議", icon: RefreshCw },
      { time: "3:00 PM", task: "發佈更新給所有教職員", icon: Calendar },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const rawLang = (await params).lang;
  const lang = rawLang === "zh-HK" ? "zh-HK" : "en";
  const t = contentByLang[lang] ?? contentByLang.en;
  const title = `${t.badge}: ${t.title} ${t.highlight} | Elementals`;
  const description = t.description;
  return buildPageMetadata({ lang, path: "/for-schedulers", title, description });
}

export default async function ForSchedulersPage({ params }: { params: Promise<{ lang: string }> }) {
  const rawLang = (await params).lang;
  const lang: Locale = rawLang === "zh-HK" ? "zh-HK" : rawLang === "vi" ? "vi" : "en";
  const contentLang = lang === "zh-HK" ? "zh-HK" : "en";
  const t = contentByLang[contentLang] ?? contentByLang.en;

  return (
    <RolePageTemplate
      badge={t.badge}
      badgeIcon={Calendar}
      title={t.title}
      highlight={t.highlight}
      description={t.description}
      painPoints={t.painPoints}
      features={t.features}
      workflow={t.workflow}
      trustIndicators={t.trustIndicators}
      lang={lang}
      mockup={<SchedulerDashboardMockup lang={lang} />}
    />
  );
}
