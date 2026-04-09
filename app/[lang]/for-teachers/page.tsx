import { GraduationCap, Brain, FileText, BarChart3, Calendar, Target, Clock, Check, BookOpen } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { RolePageTemplate } from "@/components/pages/RolePageTemplate";
import { TeacherDashboardMockup } from "@/components/beaver-mockups";
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
      icon: typeof Brain;
      title: string;
      description: string;
      badge?: string;
      badgeColor?: string;
    }[];
    workflow: { time: string; task: string; icon: typeof Brain }[];
  }
> = {
  en: {
    badge: "For Teachers",
    title: "Teach More,",
    highlight: "Plan Less",
    description:
      "The AI-powered toolkit that gives you back your evenings. Generate lessons, grade assessments, and manage classrooms—all in one place.",
    trustIndicators: ["Save 10+ hours/week", "Free behavior tracking", "AI-assisted grading"],
    painPoints: [
      {
        title: "Hours on Lesson Planning",
        problem: "Spend your evenings and weekends creating materials from scratch",
        solution: "AI generates complete lesson plans in seconds",
      },
      {
        title: "Endless Grading Piles",
        problem: "Stack of papers that never seems to shrink",
        solution: "AI-assisted marking cuts grading time by 80%",
      },
      {
        title: "Report Writing Dread",
        problem: "Term-end crunch writing the same comments over and over",
        solution: "AI drafts personalized reports from student data",
      },
      {
        title: "Behavior Tracking Chaos",
        problem: "Sticky notes and mental tallies that get lost",
        solution: "Real-time digital tracking with parent sharing",
      },
    ],
    features: [
      {
        icon: Brain,
        title: "AI Lesson Planner",
        description:
          "Generate differentiated lesson plans aligned to your curriculum. Just describe what you want to teach.",
        badge: "AI",
        badgeColor: "bg-[#16a34a]/10 text-[#16a34a]",
      },
      {
        icon: FileText,
        title: "Homework Generator",
        description:
          "Create worksheets, practice problems, and assignments with answer keys. Differentiate for ability levels.",
      },
      {
        icon: BarChart3,
        title: "Skills Gradebook",
        description:
          "Track mastery of specific skills with color-coded heatmaps. See exactly what each student knows.",
        badge: "Popular",
        badgeColor: "bg-green-100 text-green-700",
      },
      {
        icon: Target,
        title: "ClassSpark Behavior",
        description:
          "Award points in real-time during lessons. Monster avatars keep students engaged and parents informed.",
        badge: "FREE",
        badgeColor: "bg-[#16a34a]/10 text-[#16a34a]",
      },
      {
        icon: Calendar,
        title: "Live Lesson Mode",
        description:
          "Random student selection, participation tracking, and instant feedback during class sessions.",
      },
      {
        icon: BookOpen,
        title: "Resource Library",
        description:
          "Access and contribute to a library of lesson plans, worksheets, and activities from other teachers.",
      },
      {
        icon: Brain,
        title: "SparkSpace",
        description:
          "Create AI-powered learning spaces where students get personalized tutoring tailored to your lesson objectives.",
        badge: "NEW",
        badgeColor: "bg-purple-100 text-purple-700",
      },
      {
        icon: BookOpen,
        title: "TeacherLab",
        description:
          "Your all-in-one workspace: Presentation Lab, Projects Lab, Homework Lab, Reports Lab, Resources Factory, and Data Scientist—all under one roof.",
        badge: "NEW",
        badgeColor: "bg-green-100 text-green-700",
      },
      {
        icon: Calendar,
        title: "Teaching Mode",
        description:
          "Project any TeacherLab artifact to the classroom with a clean, full-screen presentation view designed for live teaching.",
        badge: "NEW",
        badgeColor: "bg-amber-100 text-amber-700",
      },
    ],
    workflow: [
      { time: "7:30 AM", task: "Review AI-suggested lesson plans", icon: Brain },
      { time: "8:00 AM", task: "Quick homework generation for today", icon: FileText },
      { time: "9:00 AM", task: "Live lesson with behavior tracking", icon: Target },
      { time: "10:30 AM", task: "Record skill assessments", icon: BarChart3 },
      { time: "3:00 PM", task: "AI grades today's quiz", icon: Check },
      { time: "3:30 PM", task: "Head home—work stays at school", icon: Clock },
    ],
  },
  "zh-HK": {
    badge: "教師專區",
    title: "教得更多，",
    highlight: "備課更少",
    description:
      "AI 驅動的工具包讓你重獲晚間時光。生成教案、批改評估、管理課堂——一站式完成。",
    trustIndicators: ["每週節省 10+ 小時", "免費行為追蹤", "AI 輔助批改"],
    painPoints: [
      {
        title: "數小時的課程規劃",
        problem: "晚上和週末都在從頭準備教材",
        solution: "AI 在數秒內生成完整教案",
      },
      {
        title: "無盡的批改堆積",
        problem: "永遠批改不完的試卷堆",
        solution: "AI 輔助批改可節省 80% 批改時間",
      },
      {
        title: "報告撰寫壓力",
        problem: "學期末反覆寫相同的評語",
        solution: "AI 根據學生數據撰寫個性化報告草稿",
      },
      {
        title: "行為追蹤混亂",
        problem: "便利貼與心理記錄容易遺失",
        solution: "即時數碼追蹤並可與家長分享",
      },
    ],
    features: [
      {
        icon: Brain,
        title: "AI 課程規劃器",
        description: "生成與課程對齊、可因材施教的教案。只需描述你想教什麼。",
        badge: "AI",
        badgeColor: "bg-[#16a34a]/10 text-[#16a34a]",
      },
      {
        icon: FileText,
        title: "功課生成器",
        description: "建立工作紙、練習題與附答案作業，支援按能力分層。",
      },
      {
        icon: BarChart3,
        title: "技能成績冊",
        description: "以彩色熱圖追蹤技能掌握度，清晰了解每位學生學到了什麼。",
        badge: "熱門",
        badgeColor: "bg-green-100 text-green-700",
      },
      {
        icon: Target,
        title: "ClassSpark 行為",
        description: "課堂即時加減分，怪獸頭像提升投入度，並可與家長共享。",
        badge: "免費",
        badgeColor: "bg-[#16a34a]/10 text-[#16a34a]",
      },
      {
        icon: Calendar,
        title: "即時課堂模式",
        description: "課堂期間隨機抽選學生、參與追蹤、即時回饋。",
      },
      {
        icon: BookOpen,
        title: "資源庫",
        description: "存取並分享教案、工作紙與活動，建立團隊資源庫。",
      },
      {
        icon: Brain,
        title: "SparkSpace",
        description: "建立 AI 學習空間，為學生提供根據課程目標量身定制的個人化輔導。",
        badge: "新功能",
        badgeColor: "bg-purple-100 text-purple-700",
      },
      {
        icon: BookOpen,
        title: "TeacherLab",
        description:
          "一站式工作空間：簡報實驗室、專案實驗室、功課實驗室、報告實驗室、資源工廠和數據科學家——全部集中管理。",
        badge: "新功能",
        badgeColor: "bg-green-100 text-green-700",
      },
      {
        icon: Calendar,
        title: "Teaching Mode",
        description:
          "以簡潔的全螢幕演示模式將 TeacherLab 的任何成果投影到課堂，專為即時教學設計。",
        badge: "新功能",
        badgeColor: "bg-amber-100 text-amber-700",
      },
    ],
    workflow: [
      { time: "7:30 AM", task: "查看 AI 建議的教案", icon: Brain },
      { time: "8:00 AM", task: "快速生成今天的功課", icon: FileText },
      { time: "9:00 AM", task: "即時課堂與行為追蹤", icon: Target },
      { time: "10:30 AM", task: "記錄技能評估", icon: BarChart3 },
      { time: "3:00 PM", task: "AI 批改今天的測驗", icon: Check },
      { time: "3:30 PM", task: "回家——工作留在學校", icon: Clock },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : "en";
  const t = contentByLang[lang] ?? contentByLang.en;
  const title = `${t.badge}: ${t.title} ${t.highlight} | KiwiBee`;
  const description = t.description;
  return buildPageMetadata({ lang, path: "/for-teachers", title, description });
}

export default async function ForTeachersPage({ params }: { params: Promise<{ lang: string }> }) {
  const rawLang = (await params).lang;
  const lang: Locale = rawLang === "zh-HK" ? "zh-HK" : rawLang === "vi" ? "vi" : "en";
  const contentLang = lang === "zh-HK" ? "zh-HK" : "en";
  const t = contentByLang[contentLang] ?? contentByLang.en;

  return (
    <RolePageTemplate
      badge={t.badge}
      badgeIcon={GraduationCap}
      title={t.title}
      highlight={t.highlight}
      description={t.description}
      painPoints={t.painPoints}
      features={t.features}
      workflow={t.workflow}
      trustIndicators={t.trustIndicators}
      lang={lang}
      mockup={<TeacherDashboardMockup lang={lang} />}
    />
  );
}
