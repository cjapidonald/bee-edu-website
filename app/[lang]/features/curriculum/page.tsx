import { BookOpen, Target, Layers, GitBranch, FileText, Users } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { marketingCopy } from "@/lib/marketing/marketing-copy";
import { FeaturePageTemplate } from "@/components/pages/FeaturePageTemplate";
import { CurriculumMockup } from "@/components/beaver-mockups";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";


export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const rawLang = (await params).lang;
  const lang = rawLang === "vi" ? "vi" : "en";
  const copy = marketingCopy[lang] ?? marketingCopy.en;
  const t = copy.featurePages.curriculum;
  const title = t.seoTitle || `${t.title} ${t.highlight} | KiwiBee`;
  const description = t.seoDescription || t.description || "";
  return buildPageMetadata({ lang, path: "/features/curriculum", title, description });
}

export default async function CurriculumPage({ params }: { params: Promise<{ lang: string }> }) {
  const rawLang = (await params).lang;
  const lang: Locale = rawLang === "vi" ? "vi" : "en";
  const contentLang = lang === "vi" ? "vi" : "en";
  const copy = marketingCopy[lang] ?? marketingCopy.en;
  const t = copy.featurePages.curriculum;
  const common = copy.featurePages.common;

  const features = [
    {
      icon: Layers,
      title: t.feature1Title,
      description: t.feature1Desc,
    },
    {
      icon: Target,
      title: t.feature2Title,
      description: t.feature2Desc,
      badge: common.popular,
      badgeColor: "bg-green-100 text-green-700",
    },
    {
      icon: GitBranch,
      title: t.feature3Title,
      description: t.feature3Desc,
    },
    {
      icon: FileText,
      title: t.feature4Title,
      description: t.feature4Desc,
    },
    {
      icon: Users,
      title: t.feature5Title,
      description: t.feature5Desc,
    },
    {
      icon: BookOpen,
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
  ];

  return (
    <FeaturePageTemplate
      badge={t.badge}
      badgeIcon={BookOpen}
      title={t.title}
      highlight={t.highlight}
      description={t.description}
      features={features}
      howItWorks={howItWorks}
      comparison={comparison}
      trustIndicators={[t.trustIndicator1, t.trustIndicator2, t.trustIndicator3]}
      lang={lang}
      mockup={<CurriculumMockup lang={lang} />}
    />
  );
}
