import { FileText, Clock, Shield, BarChart3, Users, Smartphone } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { marketingCopy } from "@/lib/marketing/marketing-copy";
import { FeaturePageTemplate } from "@/components/pages/FeaturePageTemplate";
import { ExamEvaluationMockup } from "@/components/beaver-mockups";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";


export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const rawLang = (await params).lang;
  const lang = rawLang === "zh-HK" ? "zh-HK" : "en";
  const copy = marketingCopy[lang] ?? marketingCopy.en;
  const t = copy.featurePages.exams;
  const title = t.seoTitle || `${t.title} ${t.highlight} | Elementals`;
  const description = t.seoDescription || t.description || "";
  return buildPageMetadata({ lang, path: "/features/exams", title, description });
}

export default async function ExamsPage({ params }: { params: Promise<{ lang: string }> }) {
  const rawLang = (await params).lang;
  const lang: Locale = rawLang === "zh-HK" ? "zh-HK" : rawLang === "vi" ? "vi" : "en";
  const contentLang = lang === "zh-HK" ? "zh-HK" : "en";
  const copy = marketingCopy[lang] ?? marketingCopy.en;
  const t = copy.featurePages.exams;
  const common = copy.featurePages.common;

  const features = [
    {
      icon: FileText,
      title: t.feature1Title,
      description: t.feature1Desc,
    },
    {
      icon: Clock,
      title: t.feature2Title,
      description: t.feature2Desc,
      badge: common.popular,
      badgeColor: "bg-[#16a34a]/10 text-[#16a34a]",
    },
    {
      icon: Shield,
      title: t.feature3Title,
      description: t.feature3Desc,
    },
    {
      icon: BarChart3,
      title: t.feature4Title,
      description: t.feature4Desc,
    },
    {
      icon: Users,
      title: t.feature5Title,
      description: t.feature5Desc,
    },
    {
      icon: Smartphone,
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
      badgeIcon={FileText}
      title={t.title}
      highlight={t.highlight}
      description={t.description}
      features={features}
      howItWorks={howItWorks}
      comparison={comparison}
      trustIndicators={[t.trustIndicator1, t.trustIndicator2, t.trustIndicator3]}
      lang={lang}
      mockup={<ExamEvaluationMockup lang={lang} />}
    />
  );
}
