import Link from "next/link";
import { ArrowRight, Check, type LucideIcon } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
  badgeColor?: string;
}

interface Step {
  step: number;
  title: string;
  description: string;
}

interface ComparisonItem {
  before: string;
  after: string;
}

interface FeaturePageProps {
  badge: string;
  badgeIcon: LucideIcon;
  title: string;
  highlight: string;
  description: string;
  features: Feature[];
  howItWorks?: Step[];
  comparison?: ComparisonItem[];
  trustIndicators?: string[];
  lang: Locale;
}

const hasText = (value: string | null | undefined): value is string =>
  typeof value === "string" && value.trim().length > 0;

export function FeaturePageTemplate({
  badge,
  badgeIcon: BadgeIcon,
  title,
  highlight,
  description,
  features,
  howItWorks,
  comparison,
  trustIndicators,
  lang,
}: FeaturePageProps) {
  const uiText: Record<
  string,
    {
      getStarted: string;
      viewPricing: string;
      keyFeaturesTitle: string;
      keyFeaturesSubtitle: string;
      howItWorksTitle: string;
      howItWorksSubtitle: string;
      beforeAfterTitle: string;
      beforeAfterSubtitle: string;
      without: string;
      with: string;
      ctaTitle: string;
      ctaSubtitle: string;
      talkToSales: string;
      signUpFree: string;
    }
  > = {
    en: {
      getStarted: "Contact Sales",
      viewPricing: "View Pricing",
      keyFeaturesTitle: "Key Features",
      keyFeaturesSubtitle: "Everything you need to transform how you work",
      howItWorksTitle: "How It Works",
      howItWorksSubtitle: "Get started in just a few simple steps",
      beforeAfterTitle: "Before & After",
      beforeAfterSubtitle: "See the difference Elementals makes",
      without: "Without Elementals",
      with: "With Elementals",
      ctaTitle: "Ready to get started?",
      ctaSubtitle: "Join thousands of educators using Elementals to work smarter.",
      talkToSales: "Talk to Sales",
      signUpFree: "Contact Sales",
    },
    "zh-HK": {
      getStarted: "聯絡銷售",
      viewPricing: "查看價格",
      keyFeaturesTitle: "核心功能",
      keyFeaturesSubtitle: "你需要的一切，提升工作效率",
      howItWorksTitle: "運作方式",
      howItWorksSubtitle: "只需幾個簡單步驟即可開始",
      beforeAfterTitle: "使用前後對比",
      beforeAfterSubtitle: "看看 Elementals 帶來的改變",
      without: "沒有 Elementals",
      with: "使用 Elementals",
      ctaTitle: "準備好開始了嗎？",
      ctaSubtitle: "加入數千名教育工作者，使用 Elementals 更聰明地工作。",
      talkToSales: "聯絡銷售",
      signUpFree: "聯絡銷售",
    },
  };

  const t = uiText[lang] ?? uiText.en;
  const safeFeatures = features.filter((feature) => hasText(feature.title) && hasText(feature.description));
  const safeHowItWorks = (howItWorks ?? []).filter((step) => hasText(step.title) && hasText(step.description));
  const safeComparison = (comparison ?? []).filter((item) => hasText(item.before) && hasText(item.after));
  const safeTrustIndicators = (trustIndicators ?? []).filter(hasText);

  const getLocalizedPath = (path: string) => {
    if (lang === "en") return path;
    return `/${lang}${path}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-16 sm:pt-20 md:pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fff0eb]/70 via-white to-white" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#ffe0d4]/60 rounded-full blur-3xl hidden sm:block" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#ffd5c4]/40 rounded-full blur-3xl hidden sm:block" />

        <div className="container px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-[#fc3c00]/10 text-[#fc3c00] rounded-full text-sm font-medium">
              <BadgeIcon className="h-4 w-4" />
              <span>{badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {title}{" "}
              <span className="bg-gradient-to-r from-[#fc3c00] to-[#c52d00] bg-clip-text text-transparent">
                {highlight}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">{description}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href={getLocalizedPath("/contact")}>
                <Button size="lg" className="px-8 py-6 text-lg rounded-xl bg-[#fc3c00] hover:bg-[#fc3c00]/90">
                  {t.getStarted}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href={getLocalizedPath("/pricing")}>
                <Button variant="outline" size="lg" className="px-8 py-6 text-lg rounded-xl">
                  {t.viewPricing}
                </Button>
              </Link>
            </div>

            {safeTrustIndicators.length > 0 && (
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                {safeTrustIndicators.map((indicator) => (
                  <span key={indicator} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    {indicator}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{t.keyFeaturesTitle}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t.keyFeaturesSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {safeFeatures.map((feature) => (
              <Card
                key={feature.title}
                className="p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#fc3c00]/10 rounded-xl">
                    <feature.icon className="h-6 w-6 text-[#fc3c00]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                      {feature.badge && (
                        <span className={`inline-flex items-center rounded-full border-0 px-2.5 py-0.5 text-xs font-semibold ${feature.badgeColor || "bg-[#fc3c00]/10 text-[#fc3c00]"}`}>{feature.badge}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      {safeHowItWorks.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{t.howItWorksTitle}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{t.howItWorksSubtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {safeHowItWorks.map((step) => (
                <div key={`step-${step.step}`} className="text-center">
                  <div className="w-12 h-12 bg-[#fc3c00] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Before/After Comparison */}
      {safeComparison.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{t.beforeAfterTitle}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{t.beforeAfterSubtitle}</p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center font-semibold text-red-600">{t.without}</div>
                <div className="text-center font-semibold text-green-600">{t.with}</div>
              </div>
              {safeComparison.map((item) => (
                <div key={`${item.before}-${item.after}`} className="grid grid-cols-2 gap-4 py-3 border-b border-gray-200">
                  <div className="text-gray-600 text-sm flex items-center gap-2">
                    <span className="text-red-500">✗</span>
                    {item.before}
                  </div>
                  <div className="text-gray-900 text-sm flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    {item.after}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#fc3c00] via-[#e03500] to-[#c52d00]">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">{t.ctaTitle}</h2>
            <p className="text-lg text-white/90 mb-8">{t.ctaSubtitle}</p>
            <div className="flex justify-center">
              <Link href={getLocalizedPath("/contact")}>
                <Button size="lg" className="bg-white text-[#fc3c00] hover:bg-gray-100 px-8 py-6 text-lg rounded-xl">
                  {t.talkToSales}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
