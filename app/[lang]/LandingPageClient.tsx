"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useMemo, memo, useRef, useCallback } from 'react';
import {
  ArrowRight,
  Check,
  Play,
  Shield,
  Users,
  BookOpen,
  BarChart3,
  Calendar,
  Brain,
  GraduationCap,
  Star,
  ChevronRight,
  Sparkles,
  Target,
  FileText,
  Award,
  Globe,
  Clock,
  Building2,
  NotebookPen,
  BrainCircuit,
  TabletSmartphone,
  CloudCog,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Video,
  Share2,
  FolderOpen,
  Gamepad2,
  Camera,
  Heart,
  ClipboardCheck,
  LineChart,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text';
import NeuralNetworkBackground from '@/components/NeuralNetworkBackground';
import {
  HomeroomTeacherDashboardMockup,
  AIAssistantMockup,
  ClassSparkMockup,
} from '@/components/beaver-mockups';
import { useInView } from '@/hooks/useInView';
import { useCountUp } from '@/hooks/useCountUp';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/get-dictionary';


// Styled wordmarks for carousel
type TrustedCarouselItem = {
  name: string;
  color: string;
  fontFamily: string;
  fontWeight: string | number;
  fontSize: string;
  letterSpacing?: string;
  fontStyle?: string;
};

const TRUSTED_CAROUSEL_STYLES: Omit<TrustedCarouselItem, 'name'>[] = [
  { color: "#1D4F91", fontFamily: "Georgia, serif", fontWeight: "600", fontSize: "1.35rem" },
  { color: "#003262", fontFamily: "Georgia, serif", fontWeight: "600", fontSize: "1.35rem" },
  { color: "#00693E", fontFamily: "Georgia, serif", fontWeight: "600", fontSize: "1.3rem" },
  { color: "#2774AE", fontFamily: "Arial Black, sans-serif", fontWeight: "800", fontSize: "1.25rem", letterSpacing: "0.03em" },
  { color: "#8C1515", fontFamily: "Georgia, serif", fontWeight: "600", fontSize: "1.3rem" },
  { color: "#00A3AD", fontFamily: "Georgia, serif", fontWeight: "600", fontSize: "1.25rem" },
  { color: "#E77500", fontFamily: "Georgia, serif", fontWeight: "600", fontSize: "1.25rem" },
  { color: "#011F5B", fontFamily: "Georgia, serif", fontWeight: "600", fontSize: "1.25rem" },
  { color: "#4E2A84", fontFamily: "Arial, sans-serif", fontWeight: "700", fontSize: "1.15rem" },
  { color: "#B31B1B", fontFamily: "Georgia, serif", fontWeight: "600", fontSize: "1.25rem" },
  { color: "#A31F34", fontFamily: "Arial, sans-serif", fontWeight: "700", fontSize: "1.25rem", letterSpacing: "0.05em" },
  { color: "#003087", fontFamily: "Georgia, serif", fontWeight: "700", fontSize: "1.3rem" },
  { color: "#002147", fontFamily: "'Times New Roman', serif", fontWeight: "600", fontSize: "1.25rem" },
  { color: "#4E3629", fontFamily: "Georgia, serif", fontWeight: "600", fontSize: "1.25rem" },
  { color: "#57068C", fontFamily: "Arial, sans-serif", fontWeight: "700", fontSize: "1.25rem" },
  { color: "#00356B", fontFamily: "'Times New Roman', serif", fontWeight: "600", fontSize: "1.25rem", fontStyle: "italic" },
];

// Stats rolling number component
const StatItem = memo(function StatItem({
  value,
  label,
  delay = 0,
  colorClass = "text-[#16a34a]"
}: {
  value: string;
  label: string;
  delay?: number;
  colorClass?: string;
}) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.5, once: true });
  const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');
  const count = useCountUp(numericValue, isInView, { duration: 2000 });

  return (
    <div
      ref={ref}
      className="text-center scroll-animate-card"
      style={{
        transitionDelay: `${delay}ms`,
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
      }}
    >
      <div className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${colorClass} mb-1 sm:mb-2 tabular-nums overflow-hidden`}>
        <span className={isInView ? 'number-roll-animate' : ''} style={{ animationDelay: `${delay}ms` }}>
          {Math.floor(count)}{suffix}
        </span>
      </div>
      <div className="text-xs sm:text-sm md:text-base text-gray-600">{label}</div>
    </div>
  );
});

// Trusted By Carousel
const TrustedByCarousel = memo(function TrustedByCarousel({ dict }: { dict: Dictionary }) {
  const { ref: sectionRef, isInView } = useInView<HTMLElement>({ threshold: 0.1, once: true });

  const carouselItems = useMemo(() => {
    const items = dict.landing?.trusted?.carouselItems ?? [];
    return items.map((name: string, index: number) => ({
      name,
      ...TRUSTED_CAROUSEL_STYLES[index % TRUSTED_CAROUSEL_STYLES.length],
    }));
  }, [dict]);

  return (
    <section ref={sectionRef} className="py-16 bg-white overflow-hidden">
      <div
        className={`container mb-10 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <p className="text-center text-base font-semibold text-gray-600">
          {dict.landing.trusted.title}{" "}
          <span className="text-[#16a34a]">16+</span> {dict.landing.trusted.roles}{" "}
          <span className="text-gray-400">•</span>{" "}
          <span className="text-[#16a34a]">20+</span> {dict.landing.trusted.modules}{" "}
          <span className="text-gray-400">•</span>{" "}
          <span className="text-[#16a34a]">2+</span> {dict.landing.trusted.languages}{" "}
          <span className="text-gray-400">•</span>{" "}
          <span className="text-gray-700">{dict.landing.trusted.comingSoon}</span>
        </p>
      </div>

      <div
        className={`trusted-carousel-wrapper transition-all duration-1000 delay-150 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
      >
        <div className="trusted-carousel w-full overflow-hidden">
          <div className="trusted-carousel-track">
            {[...carouselItems, ...carouselItems].map((school: TrustedCarouselItem, index: number) => (
              <div key={`${school.name}-${index}`} className="trusted-school-card group">
                <span
                  className="whitespace-nowrap select-none opacity-80 group-hover:opacity-100 transition-opacity"
                  style={{
                    color: school.color,
                    fontFamily: school.fontFamily,
                    fontWeight: school.fontWeight,
                    fontSize: school.fontSize,
                    letterSpacing: school.letterSpacing || "0",
                    fontStyle: school.fontStyle || "normal",
                  }}
                >
                  {school.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

// Features data — bento layout: hero card + 2 mediums on the right + 3 small cards on the bottom row
const getFeatures = (dict: Dictionary) => [
  {
    // Big hero card (dark) — top-left, spans 3 cols × 2 rows
    icon: Target,
    href: "/features/classspark",
    title: dict.landing?.features?.classspark?.title || "ClassSpark Behavior",
    description: dict.landing?.features?.classspark?.description || "Built-in behavior tracking with monster avatars.",
    badge: dict.landing?.features?.classspark?.badge || "FREE",
    size: "big",
    theme: "dark",
  },
  {
    // Medium horizontal card — top-right
    icon: BarChart3,
    href: "/features/gradebook",
    title: dict.landing?.features?.gradebook?.title || "Skills-Based Gradebook",
    description: dict.landing?.features?.gradebook?.description || "Move beyond letter grades.",
    badge: null,
    size: "med",
    theme: "amber",
  },
  {
    // Medium horizontal card — middle-right
    icon: Brain,
    href: "/features/ai",
    title: dict.landing?.features?.aiAssistant?.title || "AI Teaching Assistant",
    description: dict.landing?.features?.aiAssistant?.description || "Generate lessons in seconds.",
    badge: dict.landing?.features?.aiAssistant?.badge || "NEW",
    size: "med",
    theme: "violet",
  },
  {
    // Small card — bottom row
    icon: Calendar,
    href: "/features/scheduling",
    title: dict.landing?.features?.scheduling?.title || "Magnetic Scheduling",
    description: dict.landing?.features?.scheduling?.description || "AI-powered timetables.",
    badge: dict.landing?.features?.scheduling?.badge || "AI",
    size: "small",
    theme: "rose",
  },
  {
    // Small card — bottom row
    icon: FileText,
    href: "/features/exams",
    title: dict.landing?.features?.exams?.title || "Exam Platform",
    description: dict.landing?.features?.exams?.description || "Complete exam lifecycle.",
    badge: null,
    size: "small",
    theme: "sky",
  },
  {
    // Small card — bottom row
    icon: BookOpen,
    href: "/features/curriculum",
    title: dict.landing?.features?.curriculum?.title || "Curriculum Planning",
    description: dict.landing?.features?.curriculum?.description || "AI-assisted curriculum mapping.",
    badge: null,
    size: "small",
    theme: "emerald",
  },
] as const;

// Theme map for bento cards
const BENTO_THEMES = {
  dark: {
    bg: "bg-green-50",
    text: "text-green-900",
    sub: "text-green-800/70",
    iconBg: "bg-green-200/60",
    iconText: "text-green-700",
    link: "text-green-700",
    badge: "bg-green-600 text-white",
  },
  amber: {
    bg: "bg-amber-50",
    text: "text-amber-900",
    sub: "text-amber-800/70",
    iconBg: "bg-amber-200/60",
    iconText: "text-amber-700",
    link: "text-amber-700",
    badge: "bg-amber-600 text-white",
  },
  rose: {
    bg: "bg-rose-50",
    text: "text-rose-900",
    sub: "text-rose-800/70",
    iconBg: "bg-rose-200/60",
    iconText: "text-rose-700",
    link: "text-rose-700",
    badge: "bg-rose-600 text-white",
  },
  violet: {
    bg: "bg-violet-50",
    text: "text-violet-900",
    sub: "text-violet-800/70",
    iconBg: "bg-violet-200/60",
    iconText: "text-violet-700",
    link: "text-violet-700",
    badge: "bg-violet-600 text-white",
  },
  sky: {
    bg: "bg-sky-50",
    text: "text-sky-900",
    sub: "text-sky-800/70",
    iconBg: "bg-sky-200/60",
    iconText: "text-sky-700",
    link: "text-sky-700",
    badge: "bg-sky-600 text-white",
  },
  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-900",
    sub: "text-emerald-800/70",
    iconBg: "bg-emerald-200/60",
    iconText: "text-emerald-700",
    link: "text-emerald-700",
    badge: "bg-emerald-600 text-white",
  },
} as const;

// Features Section — Bento Grid Layout
const FeaturesSection = memo(function FeaturesSection({ dict, lang }: { dict: Dictionary; lang: string }) {
  const { ref: sectionRef, isInView } = useInView<HTMLDivElement>({ threshold: 0.05, rootMargin: "-100px 0px", once: true });
  const features = useMemo(() => getFeatures(dict), [dict]);

  return (
    <section className="pt-4 sm:pt-6 md:pt-8 pb-12 sm:pb-16 md:pb-20 bg-[#f4f4f5]">
      <div className="container px-4">
        <div
          className="text-center mb-6 sm:mb-8 md:mb-10"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out'
          }}
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 mb-3 sm:mb-4 bg-white shadow-sm text-[#16a34a] rounded-full text-xs sm:text-sm font-medium">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>{dict.landing.features.badge}</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 tracking-tight">
            {dict.landing.features.title}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            {dict.landing.features.subtitle}
          </p>
        </div>

        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 auto-rows-[180px] md:auto-rows-[200px] gap-3 sm:gap-4"
        >
          {features.map((feature, index) => {
            const theme = BENTO_THEMES[feature.theme];
            const sizeClasses =
              feature.size === "big"
                ? "md:col-span-4 md:row-span-2 lg:col-span-3 lg:row-span-2"
                : feature.size === "med"
                  ? "md:col-span-4 md:row-span-1 lg:col-span-3 lg:row-span-1"
                  : "md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1";

            return (
              <Link
                key={index}
                href={`/${lang === 'en' ? '' : lang + '/'}${feature.href.slice(1)}`}
                aria-label={`Learn more about ${feature.title}`}
                className={`group ${sizeClasses} ${theme.bg} rounded-3xl p-6 sm:p-7 ${feature.size === "big" ? "md:p-9 lg:p-11" : ""} flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative scroll-animate-card ${isInView ? 'in-view' : ''}`}
              >
                {feature.size === "med" ? (
                  // Medium: horizontal layout
                  <div className="flex items-center gap-5 h-full">
                    <div className={`p-3 sm:p-4 ${theme.iconBg} rounded-2xl shrink-0`}>
                      <feature.icon className={`h-6 w-6 sm:h-7 sm:w-7 ${theme.iconText}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`text-lg sm:text-xl font-bold ${theme.text} truncate`}>
                          {feature.title}
                        </h3>
                        {feature.badge && (
                          <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${theme.badge}`}>
                            {feature.badge}
                          </span>
                        )}
                      </div>
                      <p className={`text-sm ${theme.sub} line-clamp-2`}>{feature.description}</p>
                    </div>
                    <ChevronRight className={`h-5 w-5 ${theme.iconText} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0`} />
                  </div>
                ) : (
                  // Big & Small: vertical layout
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4 sm:mb-5">
                      <div className={`p-2.5 sm:p-3 ${theme.iconBg} rounded-2xl`}>
                        <feature.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${theme.iconText}`} />
                      </div>
                      <div className="flex items-center gap-2">
                        {feature.badge && (
                          <span className={`px-2 py-1 text-[10px] sm:text-xs font-bold rounded ${theme.badge}`}>
                            {feature.badge}
                          </span>
                        )}
                        <span className={`inline-flex items-center text-xs sm:text-sm font-semibold ${theme.link}`}>
                          {dict.landing?.features?.learnMore || "Learn more"}
                          <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                    <h3 className={`${feature.size === "big" ? "text-2xl sm:text-3xl md:text-4xl" : "text-base sm:text-lg"} font-bold ${theme.text} mb-2 tracking-tight leading-tight`}>
                      {feature.title}
                    </h3>
                    <p className={`${feature.size === "big" ? "text-base sm:text-lg" : "text-sm"} ${theme.sub} ${feature.size === "small" ? "line-clamp-2" : ""}`}>
                      {feature.description}
                    </p>
                  </div>
                )}

                {/* Decorative gradient blob for big card */}
                {feature.size === "big" && (
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-[#16a34a]/20 to-[#facc15]/0 blur-3xl pointer-events-none" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
});

// Social links
const socialLinks = [
  { href: "https://web.facebook.com/profile.php?id=61578235291840", icon: Facebook, label: "Facebook" },
  { href: "https://www.instagram.com/elementals/", icon: Instagram, label: "Instagram" },
  { href: "https://www.linkedin.com/company/elementals", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:hello@elementals.com", icon: Mail, label: "Email" },
];

// Main Landing Page Component
export default function LandingPageClient({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonialTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTestimonialTimer = useCallback(() => {
    const items = dict.landing?.testimonials?.items || [];
    if (!items.length) return;
    if (testimonialTimerRef.current) clearInterval(testimonialTimerRef.current);
    testimonialTimerRef.current = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % items.length);
    }, 5000);
  }, [dict]);

  // Auto-rotate testimonials
  useEffect(() => {
    resetTestimonialTimer();
    return () => {
      if (testimonialTimerRef.current) clearInterval(testimonialTimerRef.current);
    };
  }, [resetTestimonialTimer]);


  const testimonials = dict.landing?.testimonials?.items || [];
  const communicationFeatures = [
    {
      icon: MessageCircle,
      title: dict.landing?.communication?.messaging?.title,
      description: dict.landing?.communication?.messaging?.description,
      badge: dict.landing?.communication?.messaging?.badge,
      badgeColor: "bg-rose-600 text-white",
      iconColor: "text-coral",
      iconBg: "bg-coral-light",
    },
    {
      icon: Video,
      title: dict.landing?.communication?.video?.title,
      description: dict.landing?.communication?.video?.description,
      badge: dict.landing?.communication?.video?.badge,
      badgeColor: "bg-amber text-gray-900",
      iconColor: "text-amber",
      iconBg: "bg-amber-light",
    },
    {
      icon: Share2,
      title: dict.landing?.communication?.materials?.title,
      description: dict.landing?.communication?.materials?.description,
      badge: null,
      badgeColor: null,
      iconColor: "text-mint",
      iconBg: "bg-mint-light",
    },
    {
      icon: Camera,
      title: dict.landing?.communication?.stories?.title,
      description: dict.landing?.communication?.stories?.description,
      badge: dict.landing?.communication?.stories?.badge,
      badgeColor: "bg-vibrant-purple text-white",
      iconColor: "text-vibrant-purple",
      iconBg: "bg-vibrant-purple-light",
    },
  ];

  const studentParentFeatures = [
    {
      icon: FolderOpen,
      title: dict.landing?.studentParent?.portfolio?.title,
      description: dict.landing?.studentParent?.portfolio?.description,
      badge: dict.landing?.studentParent?.portfolio?.badge,
      badgeColor: "bg-amber-600 text-white",
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50",
    },
    {
      icon: Gamepad2,
      title: dict.landing?.studentParent?.activities?.title,
      description: dict.landing?.studentParent?.activities?.description,
      badge: dict.landing?.studentParent?.activities?.badge,
      badgeColor: "bg-rose-600 text-white",
      iconColor: "text-rose-600",
      iconBg: "bg-rose-50",
    },
    {
      icon: Heart,
      title: dict.landing?.studentParent?.parentPortal?.title,
      description: dict.landing?.studentParent?.parentPortal?.description,
      badge: null,
      badgeColor: null,
      iconColor: "text-teal-600",
      iconBg: "bg-teal-50",
    },
    {
      icon: ClipboardCheck,
      title: dict.landing?.studentParent?.development?.title,
      description: dict.landing?.studentParent?.development?.description,
      badge: null,
      badgeColor: null,
      iconColor: "text-violet-600",
      iconBg: "bg-violet-50",
    },
  ];

  const solutions = [
    { icon: GraduationCap, href: "/for-teachers", title: dict.landing?.solutions?.forTeachers?.title, description: dict.landing?.solutions?.forTeachers?.description, iconColor: "text-coral", iconBg: "bg-coral-light" },
    { icon: Shield, href: "/for-admins", title: dict.landing?.solutions?.forAdmins?.title, description: dict.landing?.solutions?.forAdmins?.description, iconColor: "text-purple-600", iconBg: "bg-purple-100" },
    { icon: Calendar, href: "/for-schedulers", title: dict.landing?.solutions?.forSchedulers?.title, description: dict.landing?.solutions?.forSchedulers?.description, iconColor: "text-amber-600", iconBg: "bg-amber-100" },
    { icon: Users, href: "/for-students", title: dict.landing?.solutions?.forStudents?.title, description: dict.landing?.solutions?.forStudents?.description, iconColor: "text-mint", iconBg: "bg-mint-light" },
  ];

  const workflowSteps = [
    {
      icon: NotebookPen,
      badge: dict.landing?.howItWorks?.step1Badge,
      title: dict.landing?.howItWorks?.step1Title,
      description: dict.landing?.howItWorks?.step1Description,
      color: "text-sky-600",
      bgColor: "bg-sky-50",
      badgeBg: "bg-sky-100",
      badgeText: "text-sky-900",
    },
    {
      icon: BookOpen,
      badge: dict.landing?.howItWorks?.step2Badge,
      title: dict.landing?.howItWorks?.step2Title,
      description: dict.landing?.howItWorks?.step2Description,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      badgeBg: "bg-pink-100",
      badgeText: "text-pink-900",
    },
    {
      icon: Users,
      badge: dict.landing?.howItWorks?.step3Badge,
      title: dict.landing?.howItWorks?.step3Title,
      description: dict.landing?.howItWorks?.step3Description,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      badgeBg: "bg-emerald-100",
      badgeText: "text-emerald-900",
    },
  ];

  const techTopics = [
    { icon: BrainCircuit, title: dict.landing?.blog?.topic1Title, description: dict.landing?.blog?.topic1Description, iconColor: "text-violet-600", iconBg: "bg-violet-50", hoverBorder: "hover:border-violet-300", hoverChevron: "group-hover:text-violet-600" },
    { icon: TabletSmartphone, title: dict.landing?.blog?.topic2Title, description: dict.landing?.blog?.topic2Description, iconColor: "text-sky-600", iconBg: "bg-sky-50", hoverBorder: "hover:border-sky-300", hoverChevron: "group-hover:text-sky-600" },
    { icon: CloudCog, title: dict.landing?.blog?.topic3Title, description: dict.landing?.blog?.topic3Description, iconColor: "text-emerald-600", iconBg: "bg-emerald-50", hoverBorder: "hover:border-emerald-300", hoverChevron: "group-hover:text-emerald-600" },
    { icon: Sparkles, title: dict.landing?.blog?.topic4Title, description: dict.landing?.blog?.topic4Description, iconColor: "text-amber-600", iconBg: "bg-amber-50", hoverBorder: "hover:border-amber-300", hoverChevron: "group-hover:text-amber-600" },
  ];

  const getLocalizedPath = (path: string) => `/${lang === 'en' ? '' : lang + '/'}${path.startsWith('/') ? path.slice(1) : path}`;

  return (
    <div className="redesign-wrapper min-h-screen bg-white text-gray-900">
      {/* HERO SECTION */}
      <section className="relative pt-12 sm:pt-16 md:pt-20 pb-10 sm:pb-12 md:pb-16 lg:pt-28 lg:pb-24 overflow-hidden">
        <NeuralNetworkBackground
          className="z-[1]"
          particleColor="rgba(252, 60, 0, 0.4)"
          lineColor="rgba(252, 60, 0, 0.15)"
          particleCount={60}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#f0fdf4]/30 via-white/40 to-white/70 z-[2]" />

        {/* Decorative blobs removed */}

        <div className="container px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column - Text Content */}
              <div className="text-center lg:text-left lg:col-span-5">
                {/* Animated Badge */}
                <div className="group relative inline-flex items-center justify-center rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8 shadow-[inset_0_-8px_10px_#16a34a1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#16a34a3f] bg-white/80 backdrop-blur-sm">
                  <span
                    className="animate-gradient absolute inset-0 block h-full w-full rounded-[inherit] bg-gradient-to-r from-[#16a34a]/50 via-[#facc15]/50 to-[#16a34a]/50 bg-[length:300%_100%] p-[1px]"
                    style={{
                      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "destination-out",
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      maskComposite: "subtract",
                    }}
                  />
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-[#16a34a]" />
                  <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-300" />
                  <AnimatedGradientText className="text-sm sm:text-base md:text-lg font-semibold">
                    {dict.landing.hero.badge}
                  </AnimatedGradientText>
                  <ChevronRight className="ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </div>

                {/* Main Headline */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  {dict.landing.hero.title}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16a34a] via-[#facc15] to-[#facc15]">
                    {dict.landing.hero.titleHighlight}
                  </span>
                  <br />
                  {dict.landing.hero.titleEnd}
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl lg:max-w-none">
                  {dict.landing.hero.subtitle}
                </p>
                <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8 max-w-2xl lg:max-w-none">
                  {lang === "zh-HK"
                    ? "KiwiBeeAI 學校管理系統（SIS + LMS）：課程規劃、智能排課、ClassSpark 行為追蹤、成績冊、出勤、評估與家校溝通一站式整合。"
                    : "KiwiBee is an AI-powered teaching, learning and school management platform built by teachers for schools, students, and families."}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-12">
                  <Link href={getLocalizedPath("/contact")} className="w-full sm:w-auto">
                    <Button
                      className="w-full sm:w-auto bg-[#16a34a] hover:bg-[#15803d] text-white px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl shadow-lg shadow-[#16a34a]/25 hover:shadow-xl hover:shadow-[#16a34a]/30 transition-all"
                    >
                      {dict.landing.hero.getStarted}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={getLocalizedPath("/features")} className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto border-[#16a34a] text-gray-700 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl hover:bg-[#f0fdf4]"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      {dict.landing.hero.watchDemo}
                    </Button>
                  </Link>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Check className="h-3 w-3 sm:h-4 sm:w-4 text-[#16a34a]" />
                    <span>{dict.landing.hero.noCreditCard}</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Check className="h-3 w-3 sm:h-4 sm:w-4 text-[#16a34a]" />
                    <span>{dict.landing.hero.freeForever}</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Check className="h-3 w-3 sm:h-4 sm:w-4 text-[#16a34a]" />
                    <span>{dict.landing.hero.setupTime}</span>
                  </div>
                </div>

                {/* Compact app store strip (desktop only) */}
                <div className="hidden lg:flex items-center gap-3 pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-500 font-medium">
                    {lang === "zh-HK" ? "亦可於行動裝置使用" : "Also on mobile"}
                  </span>
                  <a
                    href="https://apps.apple.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform hover:scale-105 active:scale-95"
                  >
                    <Image
                      src={lang === "zh-HK" ? "/badges/app-store-zh-HK.svg" : "/badges/app-store-en.svg"}
                      alt={lang === "zh-HK" ? "在 App Store 下載" : "Download on the App Store"}
                      width={120}
                      height={40}
                      className="h-9 w-auto"
                      unoptimized
                    />
                  </a>
                  <a
                    href="https://play.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform hover:scale-105 active:scale-95"
                  >
                    <Image
                      src={lang === "zh-HK" ? "/badges/google-play-zh-HK.svg" : "/badges/google-play-en.svg"}
                      alt={lang === "zh-HK" ? "在 Google Play 下載" : "Get it on Google Play"}
                      width={135}
                      height={40}
                      className="h-9 w-auto"
                      unoptimized
                    />
                  </a>
                </div>
              </div>

              {/* Right Column — Beaver Dashboard Mockup */}
              <div className="lg:col-span-7 w-full">
                <div className="relative w-full">
                  {/* Decorative glow */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-[#16a34a]/20 via-[#facc15]/10 to-transparent rounded-[32px] blur-2xl pointer-events-none" />

                  {/* Mobile store badges strip (above mockup on small, hidden on lg) */}
                  <div className="flex lg:hidden items-center justify-center gap-2 mb-4">
                    <a
                      href="https://apps.apple.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-transform hover:scale-105 active:scale-95"
                    >
                      <Image
                        src={lang === "zh-HK" ? "/badges/app-store-zh-HK.svg" : "/badges/app-store-en.svg"}
                        alt={lang === "zh-HK" ? "在 App Store 下載" : "Download on the App Store"}
                        width={130}
                        height={44}
                        className="h-10 w-auto"
                        unoptimized
                      />
                    </a>
                    <a
                      href="https://play.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-transform hover:scale-105 active:scale-95"
                    >
                      <Image
                        src={lang === "zh-HK" ? "/badges/google-play-zh-HK.svg" : "/badges/google-play-en.svg"}
                        alt={lang === "zh-HK" ? "在 Google Play 下載" : "Get it on Google Play"}
                        width={145}
                        height={44}
                        className="h-10 w-auto"
                        unoptimized
                      />
                    </a>
                  </div>

                  {/* The mockup — subtle tilt on desktop for depth */}
                  <div className="relative lg:rotate-[0.5deg] lg:hover:rotate-0 transition-transform duration-500 ease-out">
                    <div
                      className="relative max-h-[480px] lg:max-h-[560px] overflow-hidden rounded-2xl"
                      style={{
                        maskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
                        WebkitMaskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
                      }}
                    >
                      <HomeroomTeacherDashboardMockup className="w-full" lang={lang} />
                    </div>
                  </div>

                  {/* Floating rating badge */}
                  <div className="hidden sm:flex absolute -bottom-4 -left-4 lg:-bottom-6 lg:-left-6 items-center gap-2 px-4 py-2.5 bg-white rounded-2xl shadow-xl ring-1 ring-black/5">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <div className="text-sm font-semibold text-gray-900">4.6</div>
                    <div className="text-xs text-gray-500">· {lang === "zh-HK" ? "家長評價" : "from parents"}</div>
                  </div>

                  {/* Floating "live demo" badge */}
                  <div className="hidden sm:flex absolute -top-3 -right-3 lg:-top-4 lg:-right-4 items-center gap-2 px-3 py-2 bg-[#16a34a] text-white rounded-xl shadow-xl">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                    </span>
                    <span className="text-xs font-semibold">{lang === "zh-HK" ? "即時示範" : "Live demo data"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY CAROUSEL */}
      <TrustedByCarousel dict={dict} />

      {/* STATS SECTION */}
      <section className="py-10 sm:py-12 md:py-16 bg-white">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {[
              { value: "16+", label: dict.landing.stats.roles, color: "text-coral" },
              { value: "20+", label: dict.landing.stats.modules, color: "text-amber" },
              { value: "2+", label: dict.landing.stats.languages, color: "text-mint" },
              { value: "5", label: dict.landing.stats.teacherWorkflows, color: "text-vibrant-purple" },
            ].map((stat, index) => (
              <StatItem key={index} value={stat.value} label={stat.label} delay={index * 150} colorClass={stat.color} />
            ))}
          </div>
        </div>
      </section>

      {/* UNIFIED PLATFORM SECTION — Bento */}
      <section className="py-12 sm:py-16 bg-[#f4f4f5] border-y border-gray-100">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 auto-rows-[180px] md:auto-rows-[200px] gap-3 sm:gap-4">
            {/* Header card — spans 2 cols, 2 rows */}
            <div className="md:col-span-4 md:row-span-1 lg:col-span-2 lg:row-span-2 p-6 sm:p-8 bg-white rounded-3xl shadow-sm flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 bg-[#16a34a]/10 text-[#16a34a] rounded-full text-xs font-semibold">
                  <LineChart className="h-3.5 w-3.5" />
                  <span>{dict.landing?.unified?.badge}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 tracking-tight leading-tight">
                  {dict.landing?.unified?.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {dict.landing?.unified?.subtitle}
                </p>
              </div>
            </div>

            {/* Item cards in varying themes */}
            {(dict.landing?.unified?.items || []).map((item: { title: string; description: string }, index: number) => {
              const iconMap = [BarChart3, ClipboardCheck, Target, Heart] as const;
              const IconComponent = iconMap[index] ?? Sparkles;
              const themes = [
                { bg: "bg-sky-50", text: "text-sky-900", sub: "text-sky-800/70", iconBg: "bg-sky-200/60", iconText: "text-sky-700" },
                { bg: "bg-amber-50", text: "text-amber-900", sub: "text-amber-800/70", iconBg: "bg-amber-200/60", iconText: "text-amber-700" },
                { bg: "bg-rose-50", text: "text-rose-900", sub: "text-rose-800/70", iconBg: "bg-rose-200/60", iconText: "text-rose-700" },
                { bg: "bg-emerald-50", text: "text-emerald-900", sub: "text-emerald-800/70", iconBg: "bg-emerald-200/60", iconText: "text-emerald-700" },
              ];
              const t = themes[index % themes.length];
              // First item is bigger
              const sizeClass = index === 0
                ? "md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-2"
                : "md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1";

              if (index === 0) {
                return (
                  <div
                    key={`${item.title}-${index}`}
                    className={`${sizeClass} ${t.bg} p-6 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 ${t.iconBg} rounded-xl w-fit`}>
                        <IconComponent className={`h-5 w-5 ${t.iconText}`} />
                      </div>
                      <h3 className={`text-lg sm:text-xl font-bold ${t.text} tracking-tight leading-tight`}>{item.title}</h3>
                    </div>
                    <p className={`text-sm ${t.sub} leading-relaxed`}>{item.description}</p>
                  </div>
                );
              }
              return (
                <div
                  key={`${item.title}-${index}`}
                  className={`${sizeClass} ${t.bg} p-6 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}
                >
                  <div className={`p-3 ${t.iconBg} rounded-2xl w-fit`}>
                    <IconComponent className={`h-5 w-5 ${t.iconText}`} />
                  </div>
                  <div>
                    <h3 className={`text-lg sm:text-xl font-bold ${t.text} mb-1.5 tracking-tight leading-tight`}>{item.title}</h3>
                    <p className={`text-sm ${t.sub} line-clamp-2`}>{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <FeaturesSection dict={dict} lang={lang} />

      {/* COMMUNICATION SECTION — Bento */}
      <section className="pt-6 pb-12 sm:pt-8 sm:pb-16 bg-[#f4f4f5]">
        <div className="container px-4">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-white shadow-sm text-[#16a34a] rounded-full text-sm font-medium">
              <MessageCircle className="h-4 w-4" />
              <span>{dict.landing?.communication?.badge}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              {dict.landing?.communication?.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {dict.landing?.communication?.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 auto-rows-[180px] md:auto-rows-[200px] gap-3 sm:gap-4">
            {communicationFeatures.map((feature, index) => {
              const themes = [
                // Big featured (light yellow - messaging)
                { bg: "bg-yellow-50", text: "text-yellow-900", sub: "text-yellow-800/70", iconBg: "bg-yellow-200/60", iconText: "text-yellow-700", size: "md:col-span-4 md:row-span-2 lg:col-span-3 lg:row-span-2" },
                // Tall (amber - video)
                { bg: "bg-amber-50", text: "text-amber-900", sub: "text-amber-800/70", iconBg: "bg-amber-200/60", iconText: "text-amber-700", size: "md:col-span-2 md:row-span-2 lg:col-span-3 lg:row-span-1" },
                // Small (emerald - materials)
                { bg: "bg-emerald-50", text: "text-emerald-900", sub: "text-emerald-800/70", iconBg: "bg-emerald-200/60", iconText: "text-emerald-700", size: "md:col-span-2 md:row-span-1 lg:col-span-3 lg:row-span-1" },
                // Dark (violet - stories)
                { bg: "bg-gradient-to-br from-violet-900 to-violet-800", text: "text-white", sub: "text-violet-100/80", iconBg: "bg-white/10", iconText: "text-violet-200", size: "hidden md:hidden lg:hidden" },
              ];
              const t = themes[index];
              const isBig = index === 0;

              if (index === 3) return null; // skip 4th if we want 3-card bento; we'll place it differently

              if (isBig) {
                return (
                  <div
                    key={index}
                    className={`group ${t.size} ${t.bg} p-6 sm:p-8 md:p-10 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-5 relative overflow-hidden`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 ${t.iconBg} rounded-2xl`}>
                          <feature.icon className={`h-6 w-6 ${t.iconText}`} />
                        </div>
                        <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${t.text} tracking-tight leading-tight`}>
                          {feature.title}
                        </h3>
                      </div>
                      {feature.badge && (
                        <span className={`px-2 py-1 text-xs font-bold rounded ${feature.badgeColor} shrink-0`}>
                          {feature.badge}
                        </span>
                      )}
                    </div>
                    <p className={`text-base sm:text-lg max-w-xl ${t.sub} leading-relaxed relative z-10`}>
                      {feature.description}
                    </p>
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-yellow-200/50 blur-3xl pointer-events-none" />
                  </div>
                );
              }

              return (
                <div
                  key={index}
                  className={`group ${t.size} ${t.bg} p-6 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden`}
                >
                  <div className="flex items-start justify-between">
                    <div className={`p-3 ${t.iconBg} rounded-2xl`}>
                      <feature.icon className={`h-6 w-6 ${t.iconText}`} />
                    </div>
                    {feature.badge && (
                      <span className={`px-2 py-1 text-xs font-bold rounded ${feature.badgeColor}`}>
                        {feature.badge}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className={`text-lg sm:text-xl font-bold ${t.text} mb-2 tracking-tight leading-tight`}>
                      {feature.title}
                    </h3>
                    <p className={`text-sm line-clamp-2 ${t.sub}`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
            {/* 4th card — stories — explicitly placed for bento layout */}
            {communicationFeatures[3] && (
              <div className="md:col-span-4 md:row-span-1 lg:col-span-6 lg:row-span-1 bg-purple-50 p-6 sm:p-7 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-5 relative overflow-hidden">
                <div className="p-3 bg-purple-200/60 rounded-2xl shrink-0">
                  {(() => {
                    const Icon = communicationFeatures[3].icon;
                    return <Icon className="h-6 w-6 text-purple-700" />;
                  })()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg sm:text-xl font-bold text-purple-900 tracking-tight truncate">{communicationFeatures[3].title}</h3>
                    {communicationFeatures[3].badge && (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-purple-600 text-white">
                        {communicationFeatures[3].badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-purple-800/70 line-clamp-2">{communicationFeatures[3].description}</p>
                </div>
                <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-purple-300/40 blur-3xl pointer-events-none" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* STUDENT & PARENT SECTION — Bento */}
      <section className="py-20 bg-white">
        <div className="container px-4">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-[#f4f4f5] text-[#16a34a] rounded-full text-sm font-medium">
              <Heart className="h-4 w-4" />
              <span>{dict.landing?.studentParent?.badge}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              {dict.landing?.studentParent?.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {dict.landing?.studentParent?.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 auto-rows-[180px] md:auto-rows-[200px] gap-3 sm:gap-4">
            {studentParentFeatures.map((feature, index) => {
              // Bento layout: tall, big, small, small
              const layouts = [
                { size: "md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2", bg: "bg-amber-50", text: "text-amber-900", sub: "text-amber-800/70", iconBg: "bg-amber-200/60", iconText: "text-amber-700", isFeatured: true },
                { size: "md:col-span-2 md:row-span-1 lg:col-span-4 lg:row-span-1", bg: "bg-rose-50", text: "text-rose-900", sub: "text-rose-800/70", iconBg: "bg-rose-200/60", iconText: "text-rose-700", isFeatured: false },
                { size: "md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1", bg: "bg-teal-50", text: "text-teal-900", sub: "text-teal-800/70", iconBg: "bg-teal-200/60", iconText: "text-teal-700", isFeatured: false },
                { size: "md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1", bg: "bg-violet-50", text: "text-violet-900", sub: "text-violet-800/70", iconBg: "bg-violet-200/60", iconText: "text-violet-700", isFeatured: false },
              ];
              const l = layouts[index];

              return (
                <div
                  key={index}
                  className={`group ${l.size} ${l.bg} p-6 ${l.isFeatured ? "sm:p-7" : ""} rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden`}
                >
                  <div className="flex items-start justify-between">
                    <div className={`p-3 ${l.iconBg} rounded-2xl`}>
                      <feature.icon className={`h-6 w-6 ${l.iconText}`} />
                    </div>
                    {feature.badge && (
                      <span className={`px-2 py-1 text-xs font-bold rounded ${feature.badgeColor}`}>
                        {feature.badge}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className={`${l.isFeatured ? "text-xl sm:text-2xl md:text-3xl" : "text-lg sm:text-xl"} font-bold ${l.text} mb-2 tracking-tight leading-tight`}>
                      {feature.title}
                    </h3>
                    <p className={`${l.isFeatured ? "text-sm sm:text-base" : "text-sm line-clamp-2"} ${l.sub}`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CLASSSPARK SHOWCASE — Bento with mockup */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#FDB714]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#E83B5E]/10 blur-3xl pointer-events-none" />

        <div className="container px-4 relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Mockup first */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#FDB714]/20 via-[#E83B5E]/15 to-transparent rounded-[32px] blur-2xl pointer-events-none" />
              <div className="relative lg:rotate-[0.5deg] lg:hover:rotate-0 transition-transform duration-500 ease-out">
                <div
                  className="relative max-h-[460px] lg:max-h-[540px] overflow-hidden rounded-2xl"
                  style={{
                    maskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
                  }}
                >
                  <ClassSparkMockup className="w-full" lang={lang} />
                </div>
              </div>
              {/* Floating gem counter badge */}
              <div className="hidden sm:flex absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 items-center gap-2 px-4 py-2.5 bg-gradient-to-br from-[#FDB714] to-[#E83B5E] text-white rounded-2xl shadow-xl">
                <div className="text-2xl">🏆</div>
                <div>
                  <div className="text-lg font-black leading-none">+28</div>
                  <div className="text-[9px] opacity-90 uppercase tracking-wider font-semibold">gems today</div>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-[#FDB714]/10 text-[#a16207] rounded-full text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                <span>ClassSpark · Behavior Gamification</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                {lang === "zh-HK"
                  ? "讓課堂氣氛活起來的遊戲化系統"
                  : "The gamified classroom that teachers actually love"}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {lang === "zh-HK"
                  ? "每位學生都有自己的怪獸夥伴。獎勵正向行為、完成作業與積極參與——家長同步看到進度。"
                  : "Every student has a monster companion. Reward positive behavior, homework completion, and participation — parents see updates in real time."}
              </p>
              <div className="space-y-3 mb-6">
                {[
                  { icon: "🐾", text: lang === "zh-HK" ? "每位學生獨有的怪獸角色" : "Unique monster avatars for every student" },
                  { icon: "🪙", text: lang === "zh-HK" ? "即時獎勵寶石、經驗值與徽章" : "Instant gems, XP, and badges" },
                  { icon: "🏆", text: lang === "zh-HK" ? "班級排行榜與每週挑戰" : "Class leaderboards and weekly challenges" },
                  { icon: "🛍️", text: lang === "zh-HK" ? "學生自由選擇獎勵的商店系統" : "Reward shop students actually want" },
                  { icon: "📱", text: lang === "zh-HK" ? "家長同步接收更新" : "Real-time parent updates" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-xl shrink-0">{item.icon}</span>
                    <span className="text-gray-700 pt-0.5">{item.text}</span>
                  </div>
                ))}
              </div>
              <Link href={getLocalizedPath("/features/classspark")}>
                <Button className="bg-gradient-to-r from-[#FDB714] to-[#E83B5E] hover:opacity-90 text-white shadow-lg">
                  {lang === "zh-HK" ? "探索 ClassSpark" : "Explore ClassSpark"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AI SHOWCASE SECTION */}
      <section className="py-20 bg-gradient-to-b from-[#f0fdf4] to-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-[#16a34a]/10 text-[#16a34a] rounded-full text-sm font-medium">
                <Brain className="h-4 w-4" />
                <span>{dict.landing?.ai?.badge}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {dict.landing?.ai?.title}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {dict.landing?.ai?.subtitle}
              </p>

              <div className="space-y-4">
                {[
                  dict.landing?.ai?.feature1,
                  dict.landing?.ai?.feature2,
                  dict.landing?.ai?.feature3,
                  dict.landing?.ai?.feature4,
                  dict.landing?.ai?.feature5,
                  dict.landing?.ai?.feature6,
                  dict.landing?.ai?.feature7,
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="p-1 bg-[#16a34a]/10 rounded-full">
                      <Check className="h-4 w-4 text-[#16a34a]" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-4">
                <Link href={getLocalizedPath("/features/ai")}>
                  <Button className="bg-[#16a34a] hover:bg-[#15803d] text-white">
                    {dict.landing?.ai?.exploreButton}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* AI Assistant — live mockup */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#16a34a]/20 via-[#facc15]/10 to-transparent rounded-[32px] blur-2xl pointer-events-none" />
              <div className="relative lg:-rotate-[0.5deg] lg:hover:rotate-0 transition-transform duration-500 ease-out">
                <div
                  className="relative max-h-[460px] lg:max-h-[540px] overflow-hidden rounded-2xl"
                  style={{
                    maskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
                  }}
                >
                  <AIAssistantMockup className="w-full" lang={lang} />
                </div>
              </div>
              <div className="hidden sm:flex absolute -top-3 -right-3 lg:-top-4 lg:-right-4 items-center gap-2 px-3 py-2 bg-gradient-to-r from-[#8b5cf6] to-[#E83B5E] text-white rounded-xl shadow-xl">
                <Sparkles className="h-3 w-3" />
                <span className="text-xs font-semibold">{lang === "zh-HK" ? "10 款 AI 工具" : "10 AI tools"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTIONS BY ROLE — Bento */}
      <section className="py-20 bg-[#f4f4f5]">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 auto-rows-[160px] md:auto-rows-[180px] gap-3 sm:gap-4">
            {/* Header card */}
            <div className="md:col-span-4 md:row-span-1 lg:col-span-2 lg:row-span-2 p-6 sm:p-8 bg-white rounded-3xl shadow-sm flex flex-col justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#16a34a]/10 text-[#16a34a] rounded-full text-xs font-semibold w-fit">
                <Users className="h-3.5 w-3.5" />
                <span>Roles</span>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 tracking-tight leading-tight">
                  {dict.landing?.solutions?.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  {dict.landing?.solutions?.subtitle}
                </p>
              </div>
            </div>

            {/* Solution chips */}
            {solutions.map((solution, index) => {
              const themes = [
                { bg: "bg-rose-50", text: "text-rose-900", iconBg: "bg-rose-200/60", iconText: "text-rose-700" },
                { bg: "bg-violet-50", text: "text-violet-900", iconBg: "bg-violet-200/60", iconText: "text-violet-700" },
                { bg: "bg-amber-50", text: "text-amber-900", iconBg: "bg-amber-200/60", iconText: "text-amber-700" },
                { bg: "bg-emerald-50", text: "text-emerald-900", iconBg: "bg-emerald-200/60", iconText: "text-emerald-700" },
                { bg: "bg-[#18181b]", text: "text-white", iconBg: "bg-white/10", iconText: "text-[#facc15]" },
              ];
              const t = themes[index % themes.length];

              return (
                <Link
                  key={index}
                  href={getLocalizedPath(solution.href)}
                  className={`group md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1 p-5 sm:p-6 ${t.bg} rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}
                >
                  <div className={`p-2.5 ${t.iconBg} rounded-2xl w-fit group-hover:scale-110 transition-transform`}>
                    <solution.icon className={`h-5 w-5 ${t.iconText}`} />
                  </div>
                  <div>
                    <h3 className={`text-base sm:text-lg font-bold ${t.text} mb-0.5 tracking-tight`}>{solution.title}</h3>
                    <p className={`text-xs sm:text-sm ${index === 4 ? "text-white/70" : "opacity-70"} ${index !== 4 ? t.text : ""} line-clamp-1`}>
                      {solution.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — Bento */}
      <section className="py-20 bg-white">
        <div className="container px-4">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-[#f4f4f5] text-[#16a34a] rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>{dict.landing?.howItWorks?.badge}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              {dict.landing?.howItWorks?.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {dict.landing?.howItWorks?.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 auto-rows-[260px] md:auto-rows-[280px] gap-3 sm:gap-4">
            {workflowSteps.map((step, index) => {
              // Bento: 1st bigger, 2nd middle, 3rd bigger
              const themes = [
                { bg: "bg-sky-50", text: "text-sky-900", sub: "text-sky-800/70", iconBg: "bg-sky-200/60", iconText: "text-sky-700", numBg: "bg-sky-200", size: "md:col-span-3 lg:col-span-2" },
                { bg: "bg-pink-50", text: "text-pink-900", sub: "text-pink-800/70", iconBg: "bg-pink-200/60", iconText: "text-pink-700", numBg: "bg-pink-200", size: "md:col-span-3 lg:col-span-2" },
                { bg: "bg-emerald-50", text: "text-emerald-900", sub: "text-emerald-800/70", iconBg: "bg-emerald-200/60", iconText: "text-emerald-700", numBg: "bg-emerald-200", size: "md:col-span-6 lg:col-span-2" },
              ];
              const t = themes[index];

              return (
                <div
                  key={index}
                  className={`group relative ${t.size} ${t.bg} p-7 sm:p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 text-[10px] font-bold ${t.text} ${t.numBg} rounded-full uppercase tracking-wider opacity-90`}>
                      {step.badge}
                    </span>
                    <div className={`flex items-center justify-center w-10 h-10 ${t.iconBg} rounded-full ${t.text} font-bold`}>
                      {index + 1}
                    </div>
                  </div>
                  <div>
                    <div className={`p-3 ${t.iconBg} rounded-2xl w-fit mb-4`}>
                      <step.icon className={`h-6 w-6 ${t.iconText}`} />
                    </div>
                    <h3 className={`text-xl sm:text-2xl font-bold ${t.text} mb-2 tracking-tight leading-tight`}>{step.title}</h3>
                    <p className={`text-sm ${t.sub}`}>{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
              <Star className="h-4 w-4 fill-current" />
              <span>{dict.landing?.testimonials?.badge}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {dict.landing?.testimonials?.title}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="p-8 md:p-12 bg-white border-0 shadow-lg rounded-2xl">
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-secondary fill-current" />
                ))}
              </div>

              <div key={activeTestimonial} className="testimonial-fade">
                <blockquote className="text-xl md:text-2xl text-gray-700 text-center mb-8 italic">
                  &ldquo;{testimonials[activeTestimonial]?.quote}&rdquo;
                </blockquote>

                <div className="text-center">
                  <div className="font-semibold text-gray-900">
                    {testimonials[activeTestimonial]?.author}
                  </div>
                  <div className="text-gray-500">
                    {testimonials[activeTestimonial]?.role}
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_: unknown, index: number) => (
                  <button
                    key={index}
                    onClick={() => { setActiveTestimonial(index); resetTestimonialTimer(); }}
                    className="group flex h-10 w-10 items-center justify-center rounded-full"
                    aria-label={`View testimonial ${index + 1}`}
                    type="button"
                  >
                    <span
                      className={`block rounded-full transition-all ${
                        index === activeTestimonial
                          ? "h-2 w-8 bg-[#16a34a]"
                          : "h-2 w-2 bg-gray-300 group-hover:bg-gray-400"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* COMPLIANCE */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {[
              { icon: Shield, label: dict.landing?.compliance?.ferpa },
              { icon: Globe, label: dict.landing?.compliance?.gdpr },
              { icon: Award, label: dict.landing?.compliance?.soc2 },
              { icon: Clock, label: dict.landing?.compliance?.uptime },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-600">
                <item.icon className="h-5 w-5 text-[#16a34a]" />
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG/RESOURCES — Bento */}
      <section className="py-20 bg-[#f4f4f5]">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 auto-rows-[180px] md:auto-rows-[200px] gap-3 sm:gap-4">
            {/* Header card */}
            <div className="md:col-span-4 md:row-span-1 lg:col-span-2 lg:row-span-2 p-6 sm:p-8 bg-gradient-to-br from-[#16a34a] to-[#166534] rounded-3xl shadow-sm flex flex-col justify-between text-white relative overflow-hidden">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-xs font-semibold w-fit border border-white/20">
                <BrainCircuit className="h-3.5 w-3.5" />
                <span>{dict.landing?.blog?.badge}</span>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 tracking-tight leading-tight">
                  {dict.landing?.blog?.title}
                </h2>
                <p className="text-sm sm:text-base text-white/85 mb-5">
                  {dict.landing?.blog?.subtitle}
                </p>
                <Link href={getLocalizedPath("/blog")} className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#16a34a] rounded-xl text-sm font-semibold hover:scale-105 transition-transform">
                  {dict.landing?.blog?.viewAll}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
              <div className="absolute -top-20 -left-20 w-48 h-48 rounded-full bg-white/5 blur-3xl pointer-events-none" />
            </div>

            {/* Topic cards */}
            {techTopics.map((topic, index) => {
              const themes = [
                { bg: "bg-violet-50", text: "text-violet-900", sub: "text-violet-800/70", iconBg: "bg-violet-200/60", iconText: "text-violet-700" },
                { bg: "bg-sky-50", text: "text-sky-900", sub: "text-sky-800/70", iconBg: "bg-sky-200/60", iconText: "text-sky-700" },
                { bg: "bg-emerald-50", text: "text-emerald-900", sub: "text-emerald-800/70", iconBg: "bg-emerald-200/60", iconText: "text-emerald-700" },
                { bg: "bg-amber-50", text: "text-amber-900", sub: "text-amber-800/70", iconBg: "bg-amber-200/60", iconText: "text-amber-700" },
              ];
              const t = themes[index];

              return (
                <Link
                  key={index}
                  href={getLocalizedPath("/blog")}
                  className={`group md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1 p-6 ${t.bg} rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`p-3 ${t.iconBg} rounded-2xl`}>
                      <topic.icon className={`h-5 w-5 ${t.iconText}`} />
                    </div>
                    <ChevronRight className={`h-5 w-5 ${t.iconText} opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all`} />
                  </div>
                  <div>
                    <h3 className={`text-base sm:text-lg font-bold ${t.text} mb-1 tracking-tight leading-tight`}>{topic.title}</h3>
                    <p className={`text-xs sm:text-sm ${t.sub} line-clamp-2`}>{topic.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-orange-100 via-orange-50 to-amber-50">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 px-2 !text-orange-950">
              {dict.landing.cta.title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl !text-orange-900/80 mb-6 sm:mb-8 px-2">
              {dict.landing.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-10 px-4 sm:px-0">
              <Link href={getLocalizedPath("/contact")} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-[#16a34a] text-white hover:bg-[#15803d] px-6 sm:px-8 py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg rounded-xl shadow-lg shadow-[#16a34a]/20"
                >
                  {dict.landing.cta.getStarted}
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
              <Link href={getLocalizedPath("/pricing")} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-[#16a34a] bg-white !text-[#16a34a] hover:bg-[#f0fdf4] hover:!text-[#16a34a] px-6 sm:px-8 py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg rounded-xl"
                >
                  {dict.landing.cta.viewPricing}
                </Button>
              </Link>
            </div>

            {/* Social Links */}
            <div className="pt-6 sm:pt-8 border-t border-orange-200/60">
              <p className="!text-orange-900/70 text-xs sm:text-sm mb-3 sm:mb-4">{dict.landing.cta.connectWithUs}</p>
              <div className="flex justify-center gap-3 sm:gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target={link.href.startsWith("mailto:") ? "_self" : "_blank"}
                    rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    className="p-2 sm:p-3 bg-white rounded-full hover:bg-orange-50 transition-colors shadow-sm"
                    aria-label={link.label}
                  >
                    <link.icon className="h-4 w-4 sm:h-5 sm:w-5 !text-[#16a34a]" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
