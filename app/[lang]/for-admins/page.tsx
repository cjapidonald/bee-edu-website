import { Building2, Users, BarChart3, Settings, Shield, FileText } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { RolePageTemplate } from "@/components/pages/RolePageTemplate";
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
      icon: typeof Building2;
      title: string;
      description: string;
      badge?: string;
      badgeColor?: string;
    }[];
  }
> = {
  en: {
    badge: "For Admins",
    title: "Your School,",
    highlight: "One Dashboard",
    description:
      "See everything happening across your school at a glance. Real-time data, automated reports, and tools to support your teachers.",
    trustIndicators: ["Real-time insights", "One-click reports", "Full audit trail"],
    painPoints: [
      {
        title: "Scattered Data Sources",
        problem: "Information spread across multiple systems and spreadsheets",
        solution: "Single dashboard for all school data",
      },
      {
        title: "Manual Reporting",
        problem: "Hours compiling data for board meetings and compliance",
        solution: "Auto-generated reports with real-time data",
      },
      {
        title: "Teacher Oversight Challenges",
        problem: "Hard to monitor teaching quality across departments",
        solution: "KPI tracking and teaching insights dashboard",
      },
      {
        title: "Communication Gaps",
        problem: "Important updates lost in email chains",
        solution: "Centralized announcements and notifications",
      },
    ],
    features: [
      {
        icon: BarChart3,
        title: "School Analytics Dashboard",
        description:
          "Real-time insights on academic performance, attendance, behavior, and operations across the entire school.",
        badge: "Popular",
        badgeColor: "bg-[#fc3c00]/10 text-[#fc3c00]",
      },
      {
        icon: Users,
        title: "Staff Management",
        description:
          "Track teacher performance, manage professional development, and handle leave requests in one place.",
      },
      {
        icon: FileText,
        title: "Compliance Reports",
        description:
          "Generate accreditation reports, QA documentation, and board presentations with one click.",
      },
      {
        icon: Settings,
        title: "School Configuration",
        description:
          "Customize the platform for your school's structure, terms, grading policies, and workflows.",
      },
      {
        icon: Shield,
        title: "Access Control",
        description:
          "Fine-grained permissions ensure the right people see the right data. Full audit logging.",
      },
      {
        icon: Building2,
        title: "Multi-Campus Support",
        description:
          "Manage multiple campuses from a single dashboard with roll-up reporting and cross-campus insights.",
      },
    ],
  },
  "zh-HK": {
    badge: "行政人員專區",
    title: "你的學校，",
    highlight: "一個儀表板",
    description:
      "一目了然掌握全校動態。即時數據、自動化報告與支援教師的管理工具，全部集於一處。",
    trustIndicators: ["即時洞察", "一鍵報告", "完整審計記錄"],
    painPoints: [
      {
        title: "數據分散",
        problem: "資訊分散於多個系統與試算表",
        solution: "以單一儀表板統一呈現所有學校數據",
      },
      {
        title: "報告手動整理",
        problem: "為董事會與合規需求整理資料耗費大量時間",
        solution: "以即時數據自動生成報告",
      },
      {
        title: "教學監督困難",
        problem: "難以跨部門監察教學質素與成效",
        solution: "以 KPI 追蹤與教學洞察儀表板支援管理",
      },
      {
        title: "溝通斷層",
        problem: "重要更新在電郵往來中容易遺漏",
        solution: "集中式公告與通知",
      },
    ],
    features: [
      {
        icon: BarChart3,
        title: "學校分析儀表板",
        description: "即時洞察全校學業表現、出席、行為與營運狀況。",
        badge: "熱門",
        badgeColor: "bg-[#fc3c00]/10 text-[#fc3c00]",
      },
      {
        icon: Users,
        title: "教職員管理",
        description: "追蹤教師表現、管理專業發展，並在同一處處理請假申請。",
      },
      {
        icon: FileText,
        title: "合規報告",
        description: "一鍵生成認證報告、QA 文件與董事會簡報。",
      },
      {
        icon: Settings,
        title: "學校設定",
        description: "按學校架構、學期安排、評分政策與工作流程自定平台設定。",
      },
      {
        icon: Shield,
        title: "權限控制",
        description: "精細權限確保合適的人看到合適的數據，並具備完整審計記錄。",
      },
      {
        icon: Building2,
        title: "多校區支援",
        description: "以單一儀表板管理多個校區，提供彙總報告與跨校洞察。",
      },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : "en";
  const t = contentByLang[lang] ?? contentByLang.en;
  const title = `${t.badge}: ${t.title} ${t.highlight} | Elementals`;
  const description = t.description;
  return buildPageMetadata({ lang, path: "/for-admins", title, description });
}

export default async function ForAdminsPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : "en";
  const t = contentByLang[lang] ?? contentByLang.en;

  return (
    <RolePageTemplate
      badge={t.badge}
      badgeIcon={Building2}
      title={t.title}
      highlight={t.highlight}
      description={t.description}
      painPoints={t.painPoints}
      features={t.features}
      trustIndicators={t.trustIndicators}
      lang={lang}
    />
  );
}
