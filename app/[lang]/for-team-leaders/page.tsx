import { Target, Users, BarChart3, FileText, Eye, CheckCircle, MessageSquare } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { RolePageTemplate } from "@/components/pages/RolePageTemplate";
import { TeamLeaderDashboardMockup } from "@/components/beaver-mockups";
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
      icon: typeof Eye;
      title: string;
      description: string;
      badge?: string;
      badgeColor?: string;
    }[];
    workflow: { time: string; task: string; icon: typeof Eye }[];
  }
> = {
  en: {
    badge: "For Team Leaders",
    title: "Lead Your Team",
    highlight: "With Clarity",
    description:
      "See everything your department is doing. Review lesson plans, track performance, and ensure curriculum alignment—all from one dashboard.",
    trustIndicators: ["Full team visibility", "Lesson plan approval", "Performance analytics"],
    painPoints: [
      {
        title: "Chasing Lesson Plans",
        problem: "Endless email follow-ups to get lesson plans from your team",
        solution: "All plans visible in one dashboard with approval workflow",
      },
      {
        title: "No Curriculum Visibility",
        problem: "Manual spreadsheets to track what's being taught",
        solution: "Automatic coverage tracking with visual progress bars",
      },
      {
        title: "Inconsistent Quality",
        problem: "Hard to ensure teaching standards across the team",
        solution: "Template sharing and quality assurance tools",
      },
      {
        title: "Late Problem Detection",
        problem: "Find out teachers are struggling too late to help",
        solution: "AI alerts when teachers may need support",
      },
    ],
    features: [
      {
        icon: Eye,
        title: "Department Oversight",
        description:
          "See all lesson plans, assessments, and student progress across your entire team. Identify who needs support.",
        badge: "Popular",
        badgeColor: "bg-[#fc3c00]/10 text-[#fc3c00]",
      },
      {
        icon: CheckCircle,
        title: "Lesson Plan Reviews",
        description:
          "Review and approve team lesson plans before they go live. Leave feedback and track revisions.",
      },
      {
        icon: BarChart3,
        title: "Team Analytics",
        description:
          "Compare performance across teachers and classes. Identify best practices and areas for professional development.",
      },
      {
        icon: FileText,
        title: "Curriculum Coordination",
        description:
          "Ensure curriculum coverage across all classes. Identify gaps and overlaps in teaching.",
      },
      {
        icon: MessageSquare,
        title: "Team Communication",
        description:
          "Dedicated channels for department discussions. Share resources and coordinate assessments.",
      },
      {
        icon: Users,
        title: "Meeting Management",
        description:
          "Schedule and document department meetings. Track action items and follow-ups.",
      },
    ],
    workflow: [
      { time: "8:00 AM", task: "Check team dashboard for alerts and pending approvals", icon: Eye },
      { time: "9:00 AM", task: "Review and approve submitted lesson plans", icon: CheckCircle },
      { time: "11:00 AM", task: "Drop into lessons with live classroom data", icon: Users },
      { time: "2:00 PM", task: "Provide feedback to teachers on observations", icon: MessageSquare },
      { time: "4:00 PM", task: "Review team analytics and plan support", icon: BarChart3 },
    ],
  },
  "zh-HK": {
    badge: "組長專區",
    title: "帶領團隊",
    highlight: "更清晰",
    description:
      "一目了然掌握部門的教學安排。審閱教案、追蹤表現、確保課程對齊——全部在同一個儀表板完成。",
    trustIndicators: ["全面團隊可視性", "教案審批流程", "績效分析"],
    painPoints: [
      {
        title: "追討教案",
        problem: "不斷透過電郵追討團隊的教案",
        solution: "所有教案集中於儀表板並支援審批流程",
      },
      {
        title: "缺乏課程覆蓋可視性",
        problem: "用試算表手動追蹤正在教授的內容",
        solution: "自動追蹤覆蓋度並以進度條清晰呈現",
      },
      {
        title: "教學質素不一致",
        problem: "難以確保團隊教學標準一致",
        solution: "模板分享與質量保證工具",
      },
      {
        title: "問題發現太遲",
        problem: "發現教師遇到困難時已太遲介入支援",
        solution: "AI 在教師可能需要支援時發出提醒",
      },
    ],
    features: [
      {
        icon: Eye,
        title: "部門總覽",
        description: "查看整個團隊的教案、評估與學生進度，快速識別需要支援的地方。",
        badge: "熱門",
        badgeColor: "bg-[#fc3c00]/10 text-[#fc3c00]",
      },
      {
        icon: CheckCircle,
        title: "教案審閱",
        description: "在教案發佈前先審閱並批准。提供回饋並追蹤修訂紀錄。",
      },
      {
        icon: BarChart3,
        title: "團隊分析",
        description: "比較不同教師與班級的表現，找出最佳做法與專業發展方向。",
      },
      {
        icon: FileText,
        title: "課程協調",
        description: "確保各班課程覆蓋一致，找出教學中的缺口與重疊。",
      },
      {
        icon: MessageSquare,
        title: "團隊溝通",
        description: "部門討論專用頻道，分享資源並協調評估安排。",
      },
      {
        icon: Users,
        title: "會議管理",
        description: "安排並記錄部門會議，追蹤待辦事項與跟進進度。",
      },
    ],
    workflow: [
      { time: "8:00 AM", task: "查看團隊儀表板的提醒與待審批項目", icon: Eye },
      { time: "9:00 AM", task: "審閱並批准提交的教案", icon: CheckCircle },
      { time: "11:00 AM", task: "透過即時課堂數據觀課與支援", icon: Users },
      { time: "2:00 PM", task: "就觀課結果向教師提供回饋", icon: MessageSquare },
      { time: "4:00 PM", task: "查看團隊分析並規劃支援", icon: BarChart3 },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const rawLang = (await params).lang;
  const lang = rawLang === "zh-HK" ? "zh-HK" : "en";
  const t = contentByLang[lang] ?? contentByLang.en;
  const title = `${t.badge}: ${t.title} ${t.highlight} | Elementals`;
  const description = t.description;
  return buildPageMetadata({ lang, path: "/for-team-leaders", title, description });
}

export default async function ForTeamLeadersPage({ params }: { params: Promise<{ lang: string }> }) {
  const rawLang = (await params).lang;
  const lang: Locale = rawLang === "zh-HK" ? "zh-HK" : rawLang === "vi" ? "vi" : "en";
  const contentLang = lang === "zh-HK" ? "zh-HK" : "en";
  const t = contentByLang[contentLang] ?? contentByLang.en;

  return (
    <RolePageTemplate
      badge={t.badge}
      badgeIcon={Target}
      title={t.title}
      highlight={t.highlight}
      description={t.description}
      painPoints={t.painPoints}
      features={t.features}
      workflow={t.workflow}
      trustIndicators={t.trustIndicators}
      lang={lang}
      mockup={<TeamLeaderDashboardMockup lang={lang} />}
    />
  );
}
