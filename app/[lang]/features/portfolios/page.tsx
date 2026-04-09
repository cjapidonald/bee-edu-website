import { FolderOpen, Share2, Award, TrendingUp, Camera, Mic, FileText } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { FeaturePageTemplate } from "@/components/pages/FeaturePageTemplate";
import { PortfolioMockup } from "@/components/beaver-mockups";

const texts = {
  en: {
    badge: "Teaching & Learning",
    title: "Student Portfolios",
    highlight: "Evidence of growth",
    description:
      "Shareable portfolios with evidence artifacts — photos, audio, video, and documents — tied to skills and learning objectives. Perfect for parent conferences, college apps, and celebrating growth.",
    trustIndicator1: "Multi-media evidence",
    trustIndicator2: "Skill-tagged artifacts",
    trustIndicator3: "Shareable public links",
    features: [
      { icon: FolderOpen, title: "Evidence artifacts", description: "Collect photos, audio, video, and documents in one portfolio per student." },
      { icon: Award, title: "Skill-tagged", description: "Every artifact is tagged to specific skills — see mastery grow over time." },
      { icon: Share2, title: "Shareable links", description: "Generate public portfolio links for parents, colleges, and interviews." },
      { icon: Camera, title: "Capture in-class", description: "Teachers capture student work directly from ClassSpark during live lessons." },
      { icon: Mic, title: "Audio & video", description: "Record speaking tasks, performances, and reflections alongside written work." },
      { icon: TrendingUp, title: "Growth timeline", description: "Visual timeline of mastery across terms — see progression at a glance." },
    ],
    howItWorks: [
      { step: 1, title: "Capture evidence", description: "Teachers add artifacts from lessons, homework, or classroom moments." },
      { step: 2, title: "Tag to skills", description: "Each artifact is linked to skills in your curriculum." },
      { step: 3, title: "Share with families", description: "Generate a public link parents can view anytime." },
    ],
  },
  "zh-HK": {
    badge: "教學與學習",
    title: "學生作品集",
    highlight: "成長的證據",
    description:
      "可分享的作品集，配合證據檔案——照片、音訊、影片與文件——連結到技能與學習目標。最適合家長會議、大學申請與慶祝成長。",
    trustIndicator1: "多媒體證據",
    trustIndicator2: "技能標籤檔案",
    trustIndicator3: "可分享公開連結",
    features: [
      { icon: FolderOpen, title: "證據檔案", description: "在每位學生的作品集中收集照片、音訊、影片與文件。" },
      { icon: Award, title: "技能標籤", description: "每個檔案都標記到具體技能——隨時間見證精通程度。" },
      { icon: Share2, title: "可分享連結", description: "生成公開作品集連結給家長、大學與面試使用。" },
      { icon: Camera, title: "課堂即時擷取", description: "教師在 ClassSpark 直接從課堂擷取學生作品。" },
      { icon: Mic, title: "音訊與影片", description: "記錄口語任務、表演與反思，與書面作品並列。" },
      { icon: TrendingUp, title: "成長時間軸", description: "跨學期的精通程度可視化——一眼看見進度。" },
    ],
    howItWorks: [
      { step: 1, title: "擷取證據", description: "教師從課堂、功課或課室時刻新增檔案。" },
      { step: 2, title: "標籤技能", description: "每個檔案連結到課程中的技能。" },
      { step: 3, title: "與家庭分享", description: "生成公開連結，家長可隨時查看。" },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const rawLang = (await params).lang;
  const lang = rawLang === "zh-HK" ? "zh-HK" : "en";
  const t = texts[lang] ?? texts.en;
  return buildPageMetadata({
    lang,
    path: "/features/portfolios",
    title: `${t.title} — ${t.highlight} | Elementals`,
    description: t.description,
  });
}

export default async function PortfoliosPage({ params }: { params: Promise<{ lang: string }> }) {
  const rawLang = (await params).lang;
  const lang: Locale = rawLang === "zh-HK" ? "zh-HK" : rawLang === "vi" ? "vi" : "en";
  const contentLang = lang === "zh-HK" ? "zh-HK" : "en";
  const t = texts[contentLang] ?? texts.en;

  return (
    <FeaturePageTemplate
      badge={t.badge}
      badgeIcon={FolderOpen}
      title={t.title}
      highlight={t.highlight}
      description={t.description}
      features={t.features}
      howItWorks={t.howItWorks}
      trustIndicators={[t.trustIndicator1, t.trustIndicator2, t.trustIndicator3]}
      lang={lang}
      mockup={<PortfolioMockup lang={lang} />}
    />
  );
}
