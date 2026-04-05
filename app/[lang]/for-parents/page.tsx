import { Users, Bell, BarChart3, MessageSquare, Calendar, Camera } from "lucide-react";
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
      icon: typeof Users;
      title: string;
      description: string;
      badge?: string;
      badgeColor?: string;
    }[];
  }
> = {
  en: {
    badge: "For Parents",
    title: "Stay",
    highlight: "Connected",
    description:
      "Never miss a moment of your child's education. Real-time updates, easy communication, and complete visibility into their progress.",
    trustIndicators: ["Real-time updates", "Easy messaging", "Full visibility"],
    painPoints: [
      {
        title: "Out of the Loop",
        problem: "Find out about issues at parent-teacher conferences—too late",
        solution: "Real-time updates on behavior, grades, and progress",
      },
      {
        title: "Communication Gaps",
        problem: "Hard to reach teachers or know what's happening in class",
        solution: "Direct messaging and class story updates",
      },
      {
        title: "Mystery Report Cards",
        problem: "Letter grades don't explain what your child actually knows",
        solution: "Detailed skill-by-skill progress reports",
      },
      {
        title: "Missed Announcements",
        problem: "Important school news gets lost in email",
        solution: "Push notifications for everything important",
      },
    ],
    features: [
      {
        icon: Bell,
        title: "Instant Notifications",
        description:
          "Get real-time alerts when your child earns points, has homework due, or when teachers post updates.",
        badge: "Popular",
        badgeColor: "bg-blue-100 text-blue-700",
      },
      {
        icon: BarChart3,
        title: "Progress Dashboard",
        description:
          "See exactly where your child stands in every subject and skill. No more grade surprises.",
      },
      {
        icon: Camera,
        title: "Class Stories",
        description:
          "Photos and updates from the classroom. See what your child is learning and celebrating.",
      },
      {
        icon: MessageSquare,
        title: "Teacher Communication",
        description:
          "Message teachers directly through the app. Quick questions, meeting requests, and updates.",
      },
      {
        icon: Calendar,
        title: "School Calendar",
        description:
          "All events, holidays, and deadlines in one place. Syncs with your personal calendar.",
      },
      {
        icon: Users,
        title: "Multi-Child Support",
        description:
          "Manage multiple children from one account. Switch between profiles easily.",
      },
    ],
  },
  "zh-HK": {
    badge: "家長專區",
    title: "保持",
    highlight: "連繫",
    description:
      "不錯過孩子教育旅程的每一刻。即時更新、輕鬆溝通，全面掌握學習進度與成長。",
    trustIndicators: ["即時更新", "輕鬆訊息", "全面可視"],
    painPoints: [
      {
        title: "跟不上學校狀況",
        problem: "往往到家長日才知道問題——已經太遲",
        solution: "即時掌握行為、成績與學習進度更新",
      },
      {
        title: "溝通斷層",
        problem: "難以聯絡老師或了解課堂正在發生什麼",
        solution: "直接訊息溝通與班級動態更新",
      },
      {
        title: "成績單太模糊",
        problem: "字母等級難以解釋孩子真正掌握了什麼",
        solution: "按技能逐項呈現的詳細進度報告",
      },
      {
        title: "錯過重要公告",
        problem: "重要學校消息常在電郵中被淹沒",
        solution: "重要事項即時推送通知",
      },
    ],
    features: [
      {
        icon: Bell,
        title: "即時通知",
        description: "孩子獲得積分、功課到期或老師發佈更新時，即時收到提示。",
        badge: "熱門",
        badgeColor: "bg-blue-100 text-blue-700",
      },
      {
        icon: BarChart3,
        title: "進度儀表板",
        description: "清楚看到孩子在各科與各技能的表現，不再學期末才驚訝。",
      },
      {
        icon: Camera,
        title: "班級動態",
        description: "來自課堂的相片與更新，了解孩子正在學習與慶祝的內容。",
      },
      {
        icon: MessageSquare,
        title: "與老師溝通",
        description: "透過應用程式直接訊息聯絡老師，快速提問、會面安排與更新。",
      },
      {
        icon: Calendar,
        title: "學校日曆",
        description: "把活動、假期與截止日期集中於一處，並可同步至個人日曆。",
      },
      {
        icon: Users,
        title: "多子女支援",
        description: "一個帳戶管理多位孩子，輕鬆切換不同檔案。",
      },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : "en";
  const t = contentByLang[lang] ?? contentByLang.en;
  const title = `${t.badge}: ${t.title} ${t.highlight} | Bee Education AI`;
  const description = t.description;
  return buildPageMetadata({ lang, path: "/for-parents", title, description });
}

export default async function ForParentsPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : "en";
  const t = contentByLang[lang] ?? contentByLang.en;

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
    />
  );
}
