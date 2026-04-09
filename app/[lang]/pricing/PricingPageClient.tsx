"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Check,
  Sparkles,
  Building2,
  ArrowRight,
  Brain,
  Shield,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import { TrustedSchoolsCarousel } from "@/components/TrustedSchoolsCarousel";

type PricingTier = {
  id: "schoolAllInOne";
  name: string;
  subtitle: string;
  description: string;
  features: string[];
  aiFeatures: string[];
  cta: string;
  ctaLink: string;
  badge?: string;
};

const texts = {
  en: {
    badge: "School Pricing",
    heroTitle1: "School All-in-One",
    heroTitle2: "Custom Annual Quote",
    heroSubtitle:
      "We currently offer one school-wide plan with custom pricing based on your size, rollout scope, and support needs.",
    aiFeatures: "AI Features",
    faqTitle: "Quick Answers",
    faqSubtitle: "Key details for school procurement and rollout.",
    ctaTitle: "Need pricing details for your school?",
    ctaSubtitle: "Contact sales for a custom quote, rollout plan, and implementation timeline.",
    contactSales: "Contact Sales",
    getQuote: "Get Custom Quote",
    customPricing: "Tailored to your school's needs",
    tiers: {
      school: {
        name: "School All-in-One",
        subtitle: "Enterprise",
        description:
          "Complete school management with dedicated support and customization. Discounts available for multi-year commitments and school networks.",
        features: [
          "Unlimited teachers & students",
          "Admin dashboard",
          "16+ specialized user roles",
          "Magnetic scheduling",
          "School-wide exam platform",
          "Team collaboration",
          "Dedicated success manager",
          "On-site training",
        ],
        aiFeatures: [
          "Unlimited AI for all teachers",
          "Student AI safe mode",
          "AI usage monitoring",
          "Custom AI model selection",
          "Bulk content generation",
        ],
        cta: "Contact Sales",
        badge: "Best Value",
      },
    },
    faqs: [
      {
        question: "Do you offer teacher monthly pricing?",
        answer:
          "Teacher monthly pricing is coming soon (planned target around US$9.83 per teacher/month). For now, contact sales for school pricing and package details.",
      },
      {
        question: "Do you offer discounts for schools?",
        answer:
          "Yes. We offer discounts for multi-year agreements, school networks/districts, and qualifying institutions. Contact sales to confirm eligibility and get a quote.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We support annual invoicing for school accounts, including bank transfer and standard invoice workflows.",
      },
      {
        question: "Is my data secure?",
        answer:
          "Yes. We're FERPA, COPPA, and GDPR aligned. Data is encrypted in transit and at rest, with role-based access controls.",
      },
    ],
  },
  "zh-HK": {
    badge: "學校方案定價",
    heroTitle1: "School All-in-One",
    heroTitle2: "學校定制年度報價",
    heroSubtitle: "目前我們提供一個全校方案，按學校規模、導入範圍及支援需求定制報價。",
    aiFeatures: "AI 功能",
    faqTitle: "快速解答",
    faqSubtitle: "學校採購與導入最常見問題。",
    ctaTitle: "想了解你學校的具體價格？",
    ctaSubtitle: "請聯絡銷售團隊，獲取定制報價、導入計劃與時間表。",
    contactSales: "聯絡銷售",
    getQuote: "索取定制報價",
    customPricing: "根據學校需求度身訂造",
    tiers: {
      school: {
        name: "School All-in-One",
        subtitle: "企業版",
        description: "完整的學校管理方案，配備專屬支援與客製化。提供多年度及學校網絡折扣。",
        features: [
          "無限教師和學生",
          "管理員儀表板",
          "16+ 個專業用戶角色",
          "智能排課",
          "全校考試平台",
          "團隊協作",
          "專屬客戶成功經理",
          "現場培訓",
        ],
        aiFeatures: [
          "所有教師無限 AI",
          "學生 AI 安全模式",
          "AI 使用監控",
          "自訂 AI 模型選擇",
          "批量內容生成",
        ],
        cta: "聯絡銷售",
        badge: "最佳價值",
      },
    },
    faqs: [
      {
        question: "有教師月費方案嗎？",
        answer: "教師月費方案即將推出（目標約為每位教師每月 US$9.83）。目前請聯絡銷售了解學校方案與報價。",
      },
      {
        question: "學校有折扣嗎？",
        answer: "有。我們提供多年度合約、學區/學校網絡，以及符合資格機構的折扣。請聯絡銷售確認資格並索取報價。",
      },
      {
        question: "你們接受哪些付款方式？",
        answer: "我們支援學校年度發票流程，包括銀行轉帳及標準採購付款方式。",
      },
      {
        question: "我的數據安全嗎？",
        answer: "是的。我們符合 FERPA、COPPA、GDPR 等要求，並採用傳輸與靜態加密，以及角色權限控制。",
      },
    ],
  },
};

export default function PricingPage({
  params,
}: {
  params: { lang: string };
}) {
  const lang = params.lang || "en";
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { ref: heroRef, isInView: heroInView } = useInView<HTMLDivElement>({ threshold: 0.1, once: true });
  const { ref: cardsRef, isInView: cardsInView } = useInView<HTMLDivElement>({ threshold: 0.05, once: true });

  const t = texts[lang as keyof typeof texts] || texts.en;

  const getLocalizedPath = (path: string) => {
    if (lang === "en") return path;
    return `/${lang}${path}`;
  };

  const pricingTier: PricingTier = {
    id: "schoolAllInOne",
    name: t.tiers.school.name,
    subtitle: t.tiers.school.subtitle,
    description: t.tiers.school.description,
    features: t.tiers.school.features,
    aiFeatures: t.tiers.school.aiFeatures,
    cta: t.tiers.school.cta,
    ctaLink: "/contact?type=school",
    badge: t.tiers.school.badge,
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f0fdf4]/50 via-white to-white" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#ffe0d4]/60 rounded-full blur-3xl hidden sm:block" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#f0fdf4]/60 rounded-full blur-3xl hidden sm:block" />

        <div
          ref={heroRef}
          className="container px-4 relative z-10"
          style={{
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
          }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gradient-to-r from-[#f0fdf4] to-[#ffe0d4] text-[#15803d] rounded-full text-sm font-semibold">
              <Sparkles className="h-4 w-4 text-[#f0fdf4]0" />
              <span>{t.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t.heroTitle1}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16a34a] via-[#f0fdf4]0 to-[#16a34a]">
                {t.heroTitle2}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">{t.heroSubtitle}</p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {["FERPA", "COPPA", "GDPR", "SOC 2"].map((badge) => (
                <div key={badge} className="flex items-center gap-2 px-3 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200/50 shadow-sm">
                  <Shield className="w-4 h-4 text-[#f0fdf4]0" />
                  <span className="text-sm font-medium text-gray-600">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 bg-gray-50/50">
        <TrustedSchoolsCarousel lang={lang} />
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="container px-4">
          <div
            ref={cardsRef}
            className="max-w-2xl mx-auto"
            style={{
              opacity: cardsInView ? 1 : 0,
              transform: cardsInView ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
            }}
          >
            <Card className="relative h-full flex flex-col p-6 lg:p-8 rounded-2xl border-2 border-[#16a34a] shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                <Badge className="bg-gradient-to-r from-[#16a34a] to-[#15803d] text-white px-4 py-1.5 text-sm font-semibold shadow-lg">
                  {pricingTier.badge}
                </Badge>
              </div>

              <div className="mb-6 mt-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl shadow-lg bg-gradient-to-br from-[#16a34a] to-[#166534]">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{pricingTier.name}</h3>
                    <p className="text-sm text-gray-500">{pricingTier.subtitle}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <span className="text-3xl lg:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#16a34a] to-[#166534]">
                    {t.getQuote}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">{t.customPricing}</p>
                </div>

                <p className="text-sm text-gray-500">{pricingTier.description}</p>
              </div>

              <div className="mb-6 p-4 rounded-xl border border-[#ffe0d4] bg-[#f0fdf4]/50">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-4 w-4 text-[#15803d]" />
                  <span className="text-sm font-semibold text-gray-900">{t.aiFeatures}</span>
                </div>
                <ul className="space-y-2">
                  {pricingTier.aiFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="h-4 w-4 mt-0.5 shrink-0 text-[#16a34a]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex-1 mb-6">
                <ul className="space-y-2">
                  {pricingTier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="h-4 w-4 mt-0.5 shrink-0 text-gray-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Link href={getLocalizedPath(pricingTier.ctaLink)}>
                <Button className="w-full py-6 text-base font-semibold rounded-xl bg-gradient-to-r from-[#16a34a] to-[#166534] hover:from-[#15803d] hover:to-[#a82400] text-white shadow-lg transition-all">
                  {pricingTier.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.faqTitle}</h2>
              <p className="text-gray-600">{t.faqSubtitle}</p>
            </div>

            <div className="space-y-4">
              {t.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                    <ChevronDown className={cn(
                      "h-5 w-5 text-gray-500 transition-transform",
                      openFaq === index && "rotate-180"
                    )} />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-[#16a34a] via-[#15803d] to-[#166534]">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">{t.ctaTitle}</h2>
            <p className="text-lg text-white/90 mb-8">{t.ctaSubtitle}</p>
            <Link href={getLocalizedPath("/contact?type=school")}> 
              <Button size="lg" className="bg-white text-[#16a34a] hover:bg-gray-100 px-8 py-6 text-lg rounded-xl">
                {t.contactSales}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
