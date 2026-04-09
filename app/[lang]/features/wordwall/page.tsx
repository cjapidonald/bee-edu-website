import { Gamepad2, Trophy, Zap, Target, Sparkles, Play, Users } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { FeaturePageTemplate } from "@/components/pages/FeaturePageTemplate";
import { GamificationMockup } from "@/components/beaver-mockups";

const texts = {
  en: {
    badge: "Teaching & Learning",
    title: "Games Library",
    highlight: "Curriculum-linked learning games",
    description:
      "Quiz Battle, Writing Race, Matching Pairs, Word Builder — interactive games scoped to subjects and curriculum. Students play, learn, and earn gems that unlock rewards in the ClassShop.",
    trustIndicator1: "Subject-scoped",
    trustIndicator2: "Live or async play",
    trustIndicator3: "Integrated with gamification",
    features: [
      { icon: Gamepad2, title: "Games Library", description: "Quiz Battle, Writing Race, Matching Pairs, and more — all subject-scoped." },
      { icon: Target, title: "Curriculum-linked", description: "Every game ties to skills in your curriculum — learning stays on track." },
      { icon: Play, title: "Live & async", description: "Play live in class (whole-class start line) or set as homework." },
      { icon: Trophy, title: "Leaderboards", description: "Class rankings and weekly challenges keep students motivated." },
      { icon: Sparkles, title: "AI-generated content", description: "Teachers describe the topic; AI generates questions instantly." },
      { icon: Zap, title: "Gem rewards", description: "Winners earn gems they spend in the ClassShop on avatars and perks." },
    ],
    howItWorks: [
      { step: 1, title: "Pick a template", description: "Choose from Quiz, Writing Race, Matching Pairs, and more." },
      { step: 2, title: "Link to curriculum", description: "AI generates content from your curriculum skills." },
      { step: 3, title: "Students play & earn", description: "Play live or async, earn gems, climb the leaderboard." },
    ],
  },
  "zh-HK": {
    badge: "教學與學習",
    title: "遊戲庫",
    highlight: "連結課程的學習遊戲",
    description:
      "知識對戰、寫作競速、配對遊戲、單字建構——以科目與課程為範圍的互動遊戲。學生遊玩、學習並獲得寶石，可於 ClassShop 兌換獎勵。",
    trustIndicator1: "科目範圍",
    trustIndicator2: "即時或非同步遊玩",
    trustIndicator3: "整合遊戲化系統",
    features: [
      { icon: Gamepad2, title: "遊戲庫", description: "知識對戰、寫作競速、配對遊戲等——全部以科目為範圍。" },
      { icon: Target, title: "連結課程", description: "每個遊戲都連結到課程技能——保持學習重點。" },
      { icon: Play, title: "即時與非同步", description: "課堂上即時遊玩（全班開始線）或設為功課。" },
      { icon: Trophy, title: "排行榜", description: "班級排名與每週挑戰激勵學生。" },
      { icon: Sparkles, title: "AI 生成內容", description: "教師描述主題，AI 即時生成題目。" },
      { icon: Zap, title: "寶石獎勵", description: "勝利者獲得寶石，可於 ClassShop 兌換角色與特權。" },
    ],
    howItWorks: [
      { step: 1, title: "選擇範本", description: "從知識對戰、寫作競速、配對遊戲等選擇。" },
      { step: 2, title: "連結到課程", description: "AI 根據你的課程技能生成內容。" },
      { step: 3, title: "學生遊玩與獲獎", description: "即時或非同步遊玩、獲得寶石、攀登排行榜。" },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const rawLang = (await params).lang;
  const lang = rawLang === "zh-HK" ? "zh-HK" : "en";
  const t = texts[lang] ?? texts.en;
  return buildPageMetadata({
    lang,
    path: "/features/wordwall",
    title: `${t.title} — ${t.highlight} | Elementals`,
    description: t.description,
  });
}

export default async function WordwallPage({ params }: { params: Promise<{ lang: string }> }) {
  const rawLang = (await params).lang;
  const lang: Locale = rawLang === "zh-HK" ? "zh-HK" : rawLang === "vi" ? "vi" : "en";
  const contentLang = lang === "zh-HK" ? "zh-HK" : "en";
  const t = texts[contentLang] ?? texts.en;

  return (
    <FeaturePageTemplate
      badge={t.badge}
      badgeIcon={Gamepad2}
      title={t.title}
      highlight={t.highlight}
      description={t.description}
      features={t.features}
      howItWorks={t.howItWorks}
      trustIndicators={[t.trustIndicator1, t.trustIndicator2, t.trustIndicator3]}
      lang={lang}
      mockup={<GamificationMockup lang={lang} />}
    />
  );
}
