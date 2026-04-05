import { Gamepad2, Trophy, Zap, Target, Users, Flame, Gift } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { marketingCopy } from "@/lib/marketing/marketing-copy";
import { marketingBadgeLabels } from "@/lib/marketing/badge-labels";
import { FeaturePageTemplate } from "@/components/pages/FeaturePageTemplate";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";


export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : "en";
  const copy = marketingCopy[lang] ?? marketingCopy.en;
  const t = copy.featurePages.gamification;
  const title = t.seoTitle || `${t.title} ${t.highlight} | Bee Education AI`;
  const description = t.seoDescription || t.description || "";
  return buildPageMetadata({ lang, path: "/features/gamification", title, description });
}

export default async function GamificationPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : "en";
  const copy = marketingCopy[lang] ?? marketingCopy.en;
  const t = copy.featurePages.gamification;
  const common = copy.featurePages.common;

  const extraBadges = marketingBadgeLabels[lang] ?? marketingBadgeLabels.en;

  const features = [
    {
      icon: Trophy,
      title: t.feature1Title,
      description: t.feature1Desc,
      badge: common.popular,
      badgeColor: "bg-[#fc3c00]/10 text-[#fc3c00]",
    },
    {
      icon: Zap,
      title: t.feature2Title,
      description: t.feature2Desc,
      badge: extraBadges.core,
      badgeColor: "bg-[#fc3c00]/10 text-[#fc3c00]",
    },
    {
      icon: Flame,
      title: t.feature3Title,
      description: t.feature3Desc,
    },
    {
      icon: Users,
      title: t.feature4Title,
      description: t.feature4Desc,
    },
    {
      icon: Gift,
      title: t.feature5Title,
      description: t.feature5Desc,
    },
    {
      icon: Target,
      title: t.feature6Title,
      description: t.feature6Desc,
    },
  ];

  const howItWorks = [
    {
      step: 1,
      title: t.step1Title,
      description: t.step1Desc,
    },
    {
      step: 2,
      title: t.step2Title,
      description: t.step2Desc,
    },
    {
      step: 3,
      title: t.step3Title,
      description: t.step3Desc,
    },
    {
      step: 4,
      title: t.step4Title,
      description: t.step4Desc,
    },
  ];

  const comparison = [
    {
      before: t.before1,
      after: t.after1,
    },
    {
      before: t.before2,
      after: t.after2,
    },
    {
      before: t.before3,
      after: t.after3,
    },
    {
      before: t.before4,
      after: t.after4,
    },
    {
      before: t.before5,
      after: t.after5,
    },
  ];

  return (
    <FeaturePageTemplate
      badge={t.badge}
      badgeIcon={Gamepad2}
      title={t.title}
      highlight={t.highlight}
      description={t.description}
      features={features}
      howItWorks={howItWorks}
      comparison={comparison}
      trustIndicators={[t.trustIndicator1, t.trustIndicator2, t.trustIndicator3]}
      lang={lang}
    />
  );
}
