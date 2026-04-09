import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Check, X, type LucideIcon } from "lucide-react";
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
  /** Optional product mockup rendered in the hero. When present, hero becomes a 2-col layout. */
  mockup?: ReactNode;
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
  mockup,
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
      beforeAfterSubtitle: "See the difference KiwiBee makes",
      without: "Without KiwiBee",
      with: "With KiwiBee",
      ctaTitle: "Ready to get started?",
      ctaSubtitle: "Join thousands of educators using KiwiBee to work smarter.",
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
      beforeAfterSubtitle: "看看 KiwiBee 帶來的改變",
      without: "沒有 KiwiBee",
      with: "使用 KiwiBee",
      ctaTitle: "準備好開始了嗎？",
      ctaSubtitle: "加入數千名教育工作者，使用 KiwiBee 更聰明地工作。",
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
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative pt-16 sm:pt-20 md:pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-950 to-gray-950" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#ffe0d4]/60 rounded-full blur-3xl hidden sm:block" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#ffd5c4]/40 rounded-full blur-3xl hidden sm:block" />

        <div className="container px-4 relative z-10">
          {mockup ? (
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                {/* Text */}
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

                {/* Mockup */}
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

      {/* Features Grid */}
      <section className="relative py-16 overflow-hidden bg-gradient-to-br from-[#fff7f2] via-[#fff3ec] to-[#ffe9dd]">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#1a0f08 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div
          aria-hidden
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-25"
          style={{ background: "radial-gradient(circle, #ffb38a 0%, transparent 70%)" }}
        />
        <div
          aria-hidden
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-25"
          style={{ background: "radial-gradient(circle, #16a34a 0%, transparent 70%)" }}
        />

        <div className="container relative px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{t.keyFeaturesTitle}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">{t.keyFeaturesSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {safeFeatures.map((feature) => (
              <Card
                key={feature.title}
                className="p-6 bg-gradient-to-br from-gray-900 via-gray-800/50 to-gray-800/30 border border-[#16a34a]/15 rounded-2xl shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_10px_30px_-20px_rgba(252,60,0,0.25)] hover:shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_20px_40px_-18px_rgba(252,60,0,0.45)] hover:-translate-y-0.5 hover:border-[#16a34a]/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-[#16a34a]/15 to-[#16a34a]/5 rounded-xl ring-1 ring-[#16a34a]/10">
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

      {/* How It Works — editorial infographic */}
      {safeHowItWorks.length > 0 && (
        <section className="relative py-24 overflow-hidden bg-[#fff7f2]">
          {/* Ambient background texture + top hairline */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#1a0f08 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          <div aria-hidden className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#16a34a]/40 to-transparent" />
          <div
            aria-hidden
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{ background: "radial-gradient(circle, #16a34a 0%, transparent 70%)" }}
          />

          <div className="container relative px-4">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 lg:mb-24 max-w-6xl mx-auto">
              <div>
                <div className="inline-flex items-center gap-3 mb-5">
                  <span className="h-px w-10 bg-[#16a34a]" />
                  <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#16a34a]">
                    {safeHowItWorks.length.toString().padStart(2, "0")} / {t.howItWorksTitle}
                  </span>
                </div>
                <h2 className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-[#1a0f08] leading-[0.95] tracking-tight">
                  {t.howItWorksTitle}
                </h2>
              </div>
              <p className="text-gray-400 max-w-sm text-base leading-relaxed md:text-right">
                {t.howItWorksSubtitle}
              </p>
            </div>

            {/* Steps with connecting path */}
            <div className="relative max-w-6xl mx-auto">
              {/* Desktop dashed connector weaving through cards */}
              <svg
                aria-hidden
                className="hidden lg:block absolute inset-x-0 top-0 w-full h-full pointer-events-none"
                viewBox="0 0 1200 360"
                preserveAspectRatio="none"
              >
                <path
                  d="M 60 90 C 260 40, 360 200, 560 140 S 880 60, 1140 180"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="1.5"
                  strokeDasharray="2 8"
                  strokeLinecap="round"
                  opacity="0.45"
                />
                <circle cx="60" cy="90" r="4" fill="#16a34a" />
                <circle cx="1140" cy="180" r="6" fill="#16a34a" />
                <circle cx="1140" cy="180" r="10" fill="none" stroke="#16a34a" strokeWidth="1" opacity="0.4" />
              </svg>

              <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
                {safeHowItWorks.map((step, idx) => {
                  const num = String(step.step).padStart(2, "0");
                  const isLast = idx === safeHowItWorks.length - 1;
                  return (
                    <div
                      key={`step-${step.step}`}
                      className={`relative group ${idx % 2 === 1 ? "lg:mt-20" : ""}`}
                    >
                      {/* Card */}
                      <div className="relative h-full bg-gray-900 border border-[#1a0f08]/10 p-7 pt-6 shadow-[0_1px_0_rgba(0,0,0,0.04),0_24px_50px_-30px_rgba(252,60,0,0.35)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_1px_0_rgba(0,0,0,0.04),0_36px_70px_-24px_rgba(252,60,0,0.5)] hover:border-[#16a34a]/30">
                        {/* Crop marks */}
                        <span aria-hidden className="absolute top-1.5 left-1.5 w-2.5 h-px bg-[#16a34a]" />
                        <span aria-hidden className="absolute top-1.5 left-1.5 w-px h-2.5 bg-[#16a34a]" />
                        <span aria-hidden className="absolute top-1.5 right-1.5 w-2.5 h-px bg-[#16a34a]" />
                        <span aria-hidden className="absolute top-1.5 right-1.5 w-px h-2.5 bg-[#16a34a]" />
                        <span aria-hidden className="absolute bottom-1.5 left-1.5 w-2.5 h-px bg-[#16a34a]" />
                        <span aria-hidden className="absolute bottom-1.5 left-1.5 w-px h-2.5 bg-[#16a34a]" />
                        <span aria-hidden className="absolute bottom-1.5 right-1.5 w-2.5 h-px bg-[#16a34a]" />
                        <span aria-hidden className="absolute bottom-1.5 right-1.5 w-px h-2.5 bg-[#16a34a]" />

                        {/* Header row: label + outlined numeral */}
                        <div className="flex items-start justify-between gap-3 mb-5">
                          <span className="mt-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-400">
                            — {num} —
                          </span>
                          <span
                            aria-hidden
                            className="font-heading text-[5rem] leading-[0.8] font-bold italic select-none"
                            style={{
                              color: "transparent",
                              WebkitTextStroke: "1.5px #16a34a",
                            }}
                          >
                            {num}
                          </span>
                        </div>

                        <h3 className="font-heading text-2xl font-bold text-[#1a0f08] leading-[1.1] tracking-tight mb-3">
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                          {step.description}
                        </p>

                        {/* Journey progress bar */}
                        <div className="mt-7 pt-5 border-t border-dashed border-[#1a0f08]/10 flex items-center gap-1.5">
                          {safeHowItWorks.map((_, i) => (
                            <span
                              key={i}
                              className={`h-[3px] flex-1 rounded-full transition-colors ${
                                i <= idx ? "bg-[#16a34a]" : "bg-[#16a34a]/15"
                              }`}
                            />
                          ))}
                          <ArrowRight className="w-3 h-3 ml-1 text-[#16a34a]" strokeWidth={2.5} />
                        </div>
                      </div>

                      {/* Inline arrow between cards on tablet (md) */}
                      {!isLast && (
                        <div className="hidden md:flex lg:hidden absolute top-1/2 -right-4 -translate-y-1/2 z-10 w-7 h-7 items-center justify-center bg-[#fff7f2] rounded-full">
                          <ArrowRight className="w-4 h-4 text-[#16a34a]" strokeWidth={2.5} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Before/After Comparison — split panel */}
      {safeComparison.length > 0 && (
        <section className="relative py-24 overflow-hidden bg-gray-900">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#1a0f08 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          <div
            aria-hidden
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-15"
            style={{ background: "radial-gradient(circle, #16a34a 0%, transparent 70%)" }}
          />
          <div
            aria-hidden
            className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-15"
            style={{ background: "radial-gradient(circle, #94a3b8 0%, transparent 70%)" }}
          />

          <div className="container relative px-4">
            {/* Header */}
            <div className="text-center mb-14 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-[#16a34a]" />
                <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#16a34a]">
                  {t.without} <span className="text-gray-300 mx-1">/</span> {t.with}
                </span>
                <span className="h-px w-10 bg-[#16a34a]" />
              </div>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[#1a0f08] leading-[0.95] tracking-tight mb-4">
                {t.beforeAfterTitle}
              </h2>
              <p className="text-gray-400 text-base leading-relaxed">
                {t.beforeAfterSubtitle}
              </p>
            </div>

            {/* Split comparison panel */}
            <div className="relative max-w-5xl mx-auto">
              <div className="relative grid grid-cols-1 md:grid-cols-2 bg-gray-900 border border-[#1a0f08]/10 rounded-3xl overflow-hidden shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_40px_80px_-40px_rgba(252,60,0,0.35)]">
                {/* LEFT — WITHOUT (muted) */}
                <div className="relative bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100/80 p-8 sm:p-10 md:pr-14">
                  <div className="flex items-center gap-3 mb-8 pb-6 border-b border-dashed border-gray-300/70">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-red-950/50 text-red-500 ring-1 ring-red-200">
                      <X className="w-4 h-4" strokeWidth={3} />
                    </span>
                    <div>
                      <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-400">
                        — before
                      </div>
                      <div className="font-heading text-lg font-bold text-gray-300">
                        {t.without}
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-4">
                    {safeComparison.map((item) => (
                      <li
                        key={`before-${item.before}`}
                        className="flex items-start gap-3 text-sm"
                      >
                        <span className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-red-950/500/10 text-red-500">
                          <X className="w-3 h-3" strokeWidth={3.5} />
                        </span>
                        <span className="text-gray-500 line-through decoration-gray-300/80 decoration-1">
                          {item.before}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* RIGHT — WITH (branded) */}
                <div className="relative bg-gradient-to-br from-[#fff7f2] via-[#fff0e6] to-[#ffe3d1] p-8 sm:p-10 md:pl-14">
                  {/* Crop marks */}
                  <span aria-hidden className="absolute top-3 right-3 w-2.5 h-px bg-[#16a34a]" />
                  <span aria-hidden className="absolute top-3 right-3 w-px h-2.5 bg-[#16a34a]" />
                  <span aria-hidden className="absolute bottom-3 right-3 w-2.5 h-px bg-[#16a34a]" />
                  <span aria-hidden className="absolute bottom-3 right-3 w-px h-2.5 bg-[#16a34a]" />

                  <div className="flex items-center gap-3 mb-8 pb-6 border-b border-dashed border-[#16a34a]/25">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#16a34a] text-white shadow-lg shadow-[#16a34a]/30">
                      <Check className="w-4 h-4" strokeWidth={3} />
                    </span>
                    <div>
                      <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#16a34a]">
                        — after
                      </div>
                      <div className="font-heading text-lg font-bold text-[#1a0f08]">
                        {t.with}
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-4">
                    {safeComparison.map((item) => (
                      <li
                        key={`after-${item.after}`}
                        className="flex items-start gap-3 text-sm"
                      >
                        <span className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-[#16a34a] text-white shadow-sm shadow-[#16a34a]/40">
                          <Check className="w-3 h-3" strokeWidth={3.5} />
                        </span>
                        <span className="text-[#1a0f08] font-medium">
                          {item.after}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Vertical divider (desktop) */}
                <div
                  aria-hidden
                  className="hidden md:block absolute left-1/2 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-[#1a0f08]/15 to-transparent pointer-events-none"
                />

                {/* VS badge (desktop) */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 items-center justify-center w-14 h-14 rounded-full bg-gray-900 ring-1 ring-[#1a0f08]/10 shadow-[0_20px_40px_-15px_rgba(252,60,0,0.4)]">
                  <span className="font-heading text-xs font-bold italic text-[#16a34a] tracking-[0.15em]">
                    VS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900/50 to-gray-950">
        {/* Decorative blurs */}
        <div
          aria-hidden
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-40"
          style={{ background: "radial-gradient(circle, #16a34a 0%, transparent 70%)" }}
        />
        <div
          aria-hidden
          className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-40"
          style={{ background: "radial-gradient(circle, #FDB714 0%, transparent 70%)" }}
        />
        {/* Dot pattern */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#1a0f08 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="container relative px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-[#16a34a] via-[#facc15] to-[#FDB714] bg-clip-text text-transparent">
              {t.ctaTitle}
            </h2>
            <p className="text-lg text-gray-300 mb-8">{t.ctaSubtitle}</p>
            <div className="flex justify-center">
              <Link href={getLocalizedPath("/contact")}>
                <Button
                  size="lg"
                  className="bg-[#16a34a] text-white hover:bg-[#15803d] px-8 py-6 text-lg rounded-xl shadow-lg shadow-[#16a34a]/25 hover:shadow-xl hover:shadow-[#16a34a]/30 transition-all"
                >
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
