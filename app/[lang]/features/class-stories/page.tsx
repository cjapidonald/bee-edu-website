import { Megaphone, Camera, Video, Heart, Bell, Users, Shield, MessageSquare, Smile } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { FeaturePageTemplate } from "@/components/pages/FeaturePageTemplate";
import { StoriesMockup } from "@/components/mockups";

const texts = {
  en: {
    badge: "Teaching & Learning",
    title: "Class Stories",
    highlight: "Never miss a moment",
    description:
      "Social media-style updates for classes. Share photos, videos, and achievements with parents and students in a safe, closed classroom feed. Celebrate field trips, art projects, science experiments, and daily wins with reactions, comments, and automatic parent notifications — so families never miss a moment of their child's learning journey.",
    trustIndicator1: "Safe closed classroom feed",
    trustIndicator2: "Automatic parent notifications",
    trustIndicator3: "Photos, videos, reactions",
    features: [
      {
        icon: Camera,
        title: "Photos & videos",
        description: "Capture the moment with your phone — one tap to post to your class feed. Parents see it in seconds.",
      },
      {
        icon: Shield,
        title: "Safe closed feed",
        description: "Only enrolled families can see your class stories. No public posts, no random followers, no child safety worries.",
      },
      {
        icon: Bell,
        title: "Automatic notifications",
        description: "Every parent linked to the class gets a push notification when you post. Families never miss a story.",
      },
      {
        icon: Heart,
        title: "Reactions & comments",
        description: "Parents can react with hearts, leave supportive comments, and cheer on their child — all moderated by teachers.",
      },
      {
        icon: Smile,
        title: "Celebrate wins",
        description: "Field trips, art projects, science experiments, sports days, classroom birthdays — every daily win worth sharing.",
      },
      {
        icon: Users,
        title: "Multi-child families",
        description: "Parents with more than one child see all relevant class feeds in one unified stream — no app switching.",
      },
    ],
    howItWorks: [
      { step: 1, title: "Capture the moment", description: "Snap a photo or record a quick video on your phone during the lesson." },
      { step: 2, title: "Post to your class feed", description: "Add a short caption and hit share. The post is visible only to enrolled families." },
      { step: 3, title: "Parents celebrate with you", description: "Families get a push notification, view the story, and react with hearts and comments." },
    ],
  },
  "zh-HK": {
    badge: "教學與學習",
    title: "班級動態",
    highlight: "不錯過每一個精彩時刻",
    description:
      "為班級而設的社交式動態更新。在安全、封閉的班級動態流中與家長和學生分享照片、影片與成就。以表情、留言與自動家長通知慶祝郊遊、美術作品、科學實驗與每日精彩時刻——讓家庭不再錯過孩子學習旅程的任何一刻。",
    trustIndicator1: "安全封閉的班級動態流",
    trustIndicator2: "自動家長通知",
    trustIndicator3: "照片、影片、互動表情",
    features: [
      {
        icon: Camera,
        title: "照片與影片",
        description: "用手機隨時記錄——一鍵發佈到班級動態流。家長秒速接收。",
      },
      {
        icon: Shield,
        title: "安全封閉動態流",
        description: "只有已登記的家庭可以看到班級動態。沒有公開貼文、沒有隨機追蹤者、沒有兒童安全疑慮。",
      },
      {
        icon: Bell,
        title: "自動通知",
        description: "每位連結至該班級的家長在你發佈時都會收到推播通知。家庭絕不會錯過任何動態。",
      },
      {
        icon: Heart,
        title: "互動表情與留言",
        description: "家長可以以愛心表情回應、留下支持的留言、為孩子加油——全部由教師審核管理。",
      },
      {
        icon: Smile,
        title: "慶祝每個精彩時刻",
        description: "郊遊、美術作品、科學實驗、運動日、課室生日會——每個值得分享的日常精彩。",
      },
      {
        icon: Users,
        title: "多子女家庭支援",
        description: "有超過一位孩子的家長可在同一動態流中查看所有相關班級動態——無須切換應用。",
      },
    ],
    howItWorks: [
      { step: 1, title: "捕捉精彩一刻", description: "課堂中以手機拍攝一張照片或錄製一段短片。" },
      { step: 2, title: "發佈到班級動態流", description: "加上簡短說明並點擊分享。貼文僅對已登記家庭可見。" },
      { step: 3, title: "家長與你一同慶祝", description: "家庭收到推播通知、查看動態，並以愛心與留言互動。" },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const rawLang = (await params).lang;
  const lang = rawLang === "vi" ? "vi" : "en";
  const t = texts[lang as keyof typeof texts] ?? texts.en;
  return buildPageMetadata({
    lang,
    path: "/features/class-stories",
    title: `${t.title} — ${t.highlight} | KiwiBee`,
    description: t.description,
  });
}

export default async function ClassStoriesPage({ params }: { params: Promise<{ lang: string }> }) {
  const rawLang = (await params).lang;
  const lang: Locale = rawLang === "vi" ? "vi" : "en";
  const contentLang = lang === "vi" ? "vi" : "en";
  const t = texts[contentLang as keyof typeof texts] ?? texts.en;

  return (
    <FeaturePageTemplate
      badge={t.badge}
      badgeIcon={Megaphone}
      title={t.title}
      highlight={t.highlight}
      description={t.description}
      features={t.features}
      howItWorks={t.howItWorks}
      trustIndicators={[t.trustIndicator1, t.trustIndicator2, t.trustIndicator3]}
      lang={lang}
      mockup={<StoriesMockup lang={lang} />}
    />
  );
}
