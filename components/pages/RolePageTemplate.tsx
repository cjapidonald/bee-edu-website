import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Check, type LucideIcon } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PainPoint {
  title: string;
  problem: string;
  solution: string;
}

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
  badgeColor?: string;
}

interface WorkflowItem {
  time: string;
  task: string;
  icon: LucideIcon;
}

interface RolePageProps {
  badge: string;
  badgeIcon: LucideIcon;
  title: string;
  highlight: string;
  description: string;
  painPoints?: PainPoint[];
  features: Feature[];
  workflow?: WorkflowItem[];
  trustIndicators?: string[];
  lang: Locale;
  /** Optional product mockup rendered in the hero. When present, hero becomes a 2-col layout. */
  mockup?: ReactNode;
}

const hasText = (value: string | null | undefined): value is string =>
  typeof value === "string" && value.trim().length > 0;

export function RolePageTemplate({
  badge,
  badgeIcon: BadgeIcon,
  title,
  highlight,
  description,
  painPoints,
  features,
  workflow,
  trustIndicators,
  lang,
  mockup,
}: RolePageProps) {
  const uiText: Record<
  string,
    {
      startFree: string;
      seePricing: string;
      challengesTitle: string;
      challengesSubtitle: string;
      toolsTitle: string;
      toolsSubtitle: string;
      dayTitle: string;
      daySubtitle: string;
      ctaTitle: string;
      ctaSubtitle: string;
      talkToSales: string;
      signUpFree: string;
    }
  > = {
    en: {
      startFree: "Contact Sales",
      seePricing: "See Pricing",
      challengesTitle: "We Solve Your Biggest Challenges",
      challengesSubtitle: "Common problems, smart solutions",
      toolsTitle: "Tools Built For You",
      toolsSubtitle: "Everything you need in one platform",
      dayTitle: "Your Day with KiwiBee",
      daySubtitle: "See how the platform fits into your daily routine",
      ctaTitle: "Ready to transform your workflow?",
      ctaSubtitle: "Join thousands of educators using KiwiBee to work smarter.",
      talkToSales: "Talk to Sales",
      signUpFree: "Contact Sales",
    },
    "zh-HK": {
      startFree: "聯絡銷售",
      seePricing: "查看價格",
      challengesTitle: "解決你最大的挑戰",
      challengesSubtitle: "常見問題，智能解決方案",
      toolsTitle: "為你而設的工具",
      toolsSubtitle: "一個平台滿足所需",
      dayTitle: "你在 KiwiBee 的一天",
      daySubtitle: "看看平台如何融入你的日常工作",
      ctaTitle: "準備好改變你的工作流程嗎？",
      ctaSubtitle: "加入數千名教育工作者，使用 KiwiBee 更聰明地工作。",
      talkToSales: "聯絡銷售",
      signUpFree: "聯絡銷售",
    },
  };

  const t = uiText[lang] ?? uiText.en;
  const safePainPoints = (painPoints ?? []).filter(
    (point) => hasText(point.title) && hasText(point.problem) && hasText(point.solution),
  );
  const safeFeatures = features.filter((feature) => hasText(feature.title) && hasText(feature.description));
  const safeWorkflow = (workflow ?? []).filter((item) => hasText(item.time) && hasText(item.task));
  const safeTrustIndicators = (trustIndicators ?? []).filter(hasText);

  const getLocalizedPath = (path: string) => {
    if (lang === "en") return path;
    return `/${lang}${path}`;
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative pt-16 sm:pt-20 md:pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-950 to-gray-950" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl hidden sm:block" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-yellow-500/8 rounded-full blur-3xl hidden sm:block" />

        <div className="container px-4 relative z-10">
          {mockup ? (
            // 2-col layout with product mockup on the right
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                {/* Text column */}
                <div className="text-center lg:text-left lg:col-span-5">
                  <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-[#16a34a]/10 text-[#16a34a] rounded-full text-sm font-medium">
                    <BadgeIcon className="h-4 w-4" />
                    <span>{badge}</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    {title}{" "}
                    <span className="bg-gradient-to-r from-[#16a34a] to-[#166534] bg-clip-text text-transparent">
                      {highlight}
                    </span>
                  </h1>

                  <p className="text-lg sm:text-xl text-gray-400 mb-8">{description}</p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                    <Link href={getLocalizedPath("/contact")}>
                      <Button size="lg" className="px-8 py-6 text-lg rounded-xl bg-[#16a34a] hover:bg-[#16a34a]/90">
                        {t.startFree}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Link href={getLocalizedPath("/pricing")}>
                      <Button variant="outline" size="lg" className="px-8 py-6 text-lg rounded-xl">
                        {t.seePricing}
                      </Button>
                    </Link>
                  </div>

                  {safeTrustIndicators.length > 0 && (
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-gray-400">
                      {safeTrustIndicators.map((indicator) => (
                        <span key={indicator} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          {indicator}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mockup column */}
                <div className="lg:col-span-7 w-full">
                  <div className="relative w-full">
                    <div className="absolute -inset-4 bg-gradient-to-br from-[#16a34a]/20 via-[#facc15]/10 to-transparent rounded-[32px] blur-2xl pointer-events-none" />
                    <div className="relative lg:rotate-[0.5deg] lg:hover:rotate-0 transition-transform duration-500 ease-out">
                      {mockup}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Original centered layout
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-[#16a34a]/10 text-[#16a34a] rounded-full text-sm font-medium">
                <BadgeIcon className="h-4 w-4" />
                <span>{badge}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {title}{" "}
                <span className="bg-gradient-to-r from-[#16a34a] to-[#166534] bg-clip-text text-transparent">
                  {highlight}
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">{description}</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href={getLocalizedPath("/contact")}>
                  <Button size="lg" className="px-8 py-6 text-lg rounded-xl bg-[#16a34a] hover:bg-[#16a34a]/90">
                    {t.startFree}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href={getLocalizedPath("/pricing")}>
                  <Button variant="outline" size="lg" className="px-8 py-6 text-lg rounded-xl">
                    {t.seePricing}
                  </Button>
                </Link>
              </div>

              {safeTrustIndicators.length > 0 && (
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                  {safeTrustIndicators.map((indicator) => (
                    <span key={indicator} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      {indicator}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Pain Points Section */}
      {safePainPoints.length > 0 && (
        <section className="py-16 bg-gray-800/50">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{t.challengesTitle}</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">{t.challengesSubtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {safePainPoints.map((point) => (
                <Card key={point.title} className="p-6 bg-gray-900 border border-gray-700 rounded-2xl">
                  <h3 className="font-semibold text-white mb-3">{point.title}</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-red-600 flex items-start gap-2">
                      <span className="mt-0.5">✗</span>
                      {point.problem}
                    </p>
                    <p className="text-sm text-green-600 flex items-start gap-2">
                      <span className="mt-0.5">✓</span>
                      {point.solution}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Grid */}
      <section className="py-16 bg-gray-900">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{t.toolsTitle}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">{t.toolsSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {safeFeatures.map((feature) => (
              <Card
                key={feature.title}
                className="p-6 bg-gray-900 border border-gray-700 rounded-2xl hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#16a34a]/10 rounded-xl">
                    <feature.icon className="h-6 w-6 text-[#16a34a]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-white">{feature.title}</h3>
                      {feature.badge && (
                        <span className={`inline-flex items-center rounded-full border-0 px-2.5 py-0.5 text-xs font-semibold ${feature.badgeColor || "bg-[#16a34a]/10 text-[#16a34a]"}`}>{feature.badge}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Workflow */}
      {safeWorkflow.length > 0 && (
        <section className="py-16 bg-gray-800/50">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{t.dayTitle}</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">{t.daySubtitle}</p>
            </div>

            <div className="max-w-3xl mx-auto">
              {safeWorkflow.map((item) => (
                <div
                  key={`workflow-${item.time}`}
                  className="flex items-center gap-4 py-4 border-b border-gray-700 last:border-0"
                >
                  <div className="w-20 text-sm font-medium text-gray-500">{item.time}</div>
                  <div className="p-2 bg-[#16a34a]/10 rounded-lg">
                    <item.icon className="h-5 w-5 text-[#16a34a]" />
                  </div>
                  <div className="text-gray-300">{item.task}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#16a34a] via-[#15803d] to-[#166534]">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">{t.ctaTitle}</h2>
            <p className="text-lg text-white/90 mb-8">{t.ctaSubtitle}</p>
            <div className="flex justify-center">
              <Link href={getLocalizedPath("/contact")}>
                <Button size="lg" className="bg-gray-900 text-[#16a34a] hover:bg-gray-800 px-8 py-6 text-lg rounded-xl">
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
