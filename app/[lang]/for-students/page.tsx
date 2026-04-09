import { Users, BookOpen, Target, Trophy, Calendar, BarChart3 } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { RolePageTemplate } from "@/components/pages/RolePageTemplate";
import { StudentDashboardMockup } from "@/components/beaver-mockups";
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
      icon: typeof Users;
      title: string;
      description: string;
      badge?: string;
      badgeColor?: string;
    }[];
  }
> = {
  en: {
    badge: "For Students",
    title: "Learn Your Way,",
    highlight: "Level Up",
    description:
      "Take control of your learning journey. Track your progress, earn rewards, and see exactly what you need to master.",
    trustIndicators: ["Fun and engaging", "Clear progress tracking", "Earn rewards"],
    painPoints: [
      {
        title: "Confusion About Progress",
        problem: "Students don't know what they're good at or need to improve",
        solution: "Clear skill-based progress tracking with visual feedback",
      },
      {
        title: "Homework Chaos",
        problem: "Assignments scattered across different platforms",
        solution: "One place for all homework with clear deadlines",
      },
      {
        title: "No Recognition",
        problem: "Good behavior and effort goes unnoticed",
        solution: "Instant points and achievements for positive actions",
      },
      {
        title: "Boring Learning",
        problem: "Traditional methods don't engage digital natives",
        solution: "Gamified experience with avatars and rewards",
      },
    ],
    features: [
      {
        icon: Target,
        title: "Monster Avatar",
        description:
          "Your own unique monster character that grows and evolves as you earn points and achieve goals.",
        badge: "Popular",
        badgeColor: "bg-[#16a34a]/10 text-[#16a34a]",
      },
      {
        icon: Trophy,
        title: "Achievements & Badges",
        description:
          "Unlock achievements for academic and behavioral milestones. Show off your accomplishments.",
      },
      {
        icon: BarChart3,
        title: "Progress Dashboard",
        description:
          "See exactly which skills you've mastered and what to work on next. No more mystery grades.",
      },
      {
        icon: BookOpen,
        title: "Homework Hub",
        description:
          "All your assignments in one place with due dates, instructions, and submission tracking.",
      },
      {
        icon: Calendar,
        title: "Schedule View",
        description:
          "Always know what's happening—classes, exams, events, and deadlines at a glance.",
      },
      {
        icon: Users,
        title: "Class Leaderboard",
        description:
          "Friendly competition with classmates. See where you stand and celebrate together.",
      },
    ],
  },
  "zh-HK": {
    badge: "學生專區",
    title: "按自己的方式學習，",
    highlight: "升級成長",
    description:
      "掌握你的學習旅程。追蹤進度、獲得獎勵，並清楚知道自己下一步要精熟什麼。",
    trustIndicators: ["有趣投入", "清晰進度追蹤", "獲得獎勵"],
    painPoints: [
      {
        title: "不清楚自己的進度",
        problem: "學生不清楚自己擅長什麼、需要改善什麼",
        solution: "以技能為本的清晰進度追蹤與視覺化回饋",
      },
      {
        title: "功課混亂",
        problem: "作業分散在不同平台，容易漏交",
        solution: "所有功課集中於一處，截止日期清晰可見",
      },
      {
        title: "缺乏肯定",
        problem: "良好行為與努力往往未被看見",
        solution: "正向行為可即時獲得積分與成就",
      },
      {
        title: "學習乏味",
        problem: "傳統方式難以吸引數碼世代",
        solution: "以頭像與獎勵打造遊戲化學習體驗",
      },
    ],
    features: [
      {
        icon: Target,
        title: "怪獸頭像",
        description: "屬於你的獨特怪獸角色，隨著獲得積分與達成目標而成長進化。",
        badge: "熱門",
        badgeColor: "bg-[#16a34a]/10 text-[#16a34a]",
      },
      {
        icon: Trophy,
        title: "成就與徽章",
        description: "解鎖學業與行為里程碑的成就，展示你的努力成果。",
      },
      {
        icon: BarChart3,
        title: "進度儀表板",
        description: "清楚看到已精熟的技能與下一步需要努力的方向，不再只有神秘分數。",
      },
      {
        icon: BookOpen,
        title: "功課中心",
        description: "所有作業集中於一處，包含截止日期、指引與提交追蹤。",
      },
      {
        icon: Calendar,
        title: "時間表",
        description: "一眼掌握課堂、考試、活動與截止日期。",
      },
      {
        icon: Users,
        title: "班級排行榜",
        description: "與同學友善競賽，看看自己的位置並一起慶祝進步。",
      },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const rawLang = (await params).lang;
  const lang = rawLang === "vi" ? "vi" : "en";
  const t = contentByLang[lang as keyof typeof contentByLang] ?? contentByLang.en;
  const title = `${t.badge}: ${t.title} ${t.highlight} | KiwiBee`;
  const description = t.description;
  return buildPageMetadata({ lang, path: "/for-students", title, description });
}

export default async function ForStudentsPage({ params }: { params: Promise<{ lang: string }> }) {
  const rawLang = (await params).lang;
  const lang: Locale = rawLang === "vi" ? "vi" : "en";
  const contentLang = lang === "vi" ? "vi" : "en";
  const t = contentByLang[contentLang as keyof typeof contentByLang] ?? contentByLang.en;

  return (
    <RolePageTemplate
      badge={t.badge}
      badgeIcon={Users}
      title={t.title}
      highlight={t.highlight}
      description={t.description}
      painPoints={t.painPoints}
      features={t.features}
      trustIndicators={t.trustIndicators}
      lang={lang}
      mockup={<StudentDashboardMockup lang={lang} />}
    />
  );
}
