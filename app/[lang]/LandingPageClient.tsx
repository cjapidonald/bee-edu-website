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
  colorClass = "text-primary"
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
          <span className="text-primary">16+</span> {dict.landing.trusted.roles}{" "}
          <span className="text-gray-400">•</span>{" "}
          <span className="text-primary">20+</span> {dict.landing.trusted.modules}{" "}
          <span className="text-gray-400">•</span>{" "}
          <span className="text-primary">2+</span> {dict.landing.trusted.languages}{" "}
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

// Features data
const getFeatures = (dict: Dictionary) => [
  {
    icon: Target,
    href: "/features/classspark",
    title: dict.landing?.features?.classspark?.title || "ClassSpark Behavior",
    description: dict.landing?.features?.classspark?.description || "Built-in behavior tracking with monster avatars.",
    badge: dict.landing?.features?.classspark?.badge || "FREE",
    badgeColor: "bg-mint text-white",
    color: "text-mint",
    bg: "bg-mint-light",
    border: "hover:border-mint/30",
    shadow: "hover:shadow-mint/20",
  },
  {
    icon: BarChart3,
    href: "/features/gradebook",
    title: dict.landing?.features?.gradebook?.title || "Skills-Based Gradebook",
    description: dict.landing?.features?.gradebook?.description || "Move beyond letter grades.",
    badge: null,
    badgeColor: null,
    color: "text-amber",
    bg: "bg-amber-light",
    border: "hover:border-amber/30",
    shadow: "hover:shadow-amber/20",
  },
  {
    icon: Calendar,
    href: "/features/scheduling",
    title: dict.landing?.features?.scheduling?.title || "Magnetic Scheduling",
    description: dict.landing?.features?.scheduling?.description || "AI-powered timetables.",
    badge: dict.landing?.features?.scheduling?.badge || "AI",
    badgeColor: "bg-rose-600 text-white",
    color: "text-coral",
    bg: "bg-coral-light",
    border: "hover:border-coral/30",
    shadow: "hover:shadow-coral/20",
  },
  {
    icon: Brain,
    href: "/features/ai",
    title: dict.landing?.features?.aiAssistant?.title || "AI Teaching Assistant",
    description: dict.landing?.features?.aiAssistant?.description || "Generate lessons in seconds.",
    badge: dict.landing?.features?.aiAssistant?.badge || "NEW",
    badgeColor: "bg-rose-600 text-white",
    color: "text-vibrant-purple",
    bg: "bg-vibrant-purple-light",
    border: "hover:border-vibrant-purple/30",
    shadow: "hover:shadow-vibrant-purple/20",
  },
  {
    icon: FileText,
    href: "/features/exams",
    title: dict.landing?.features?.exams?.title || "Exam Platform",
    description: dict.landing?.features?.exams?.description || "Complete exam lifecycle.",
    badge: null,
    badgeColor: null,
    color: "text-orange",
    bg: "bg-orange-light",
    border: "hover:border-orange/30",
    shadow: "hover:shadow-orange/20",
  },
  {
    icon: BookOpen,
    href: "/features/curriculum",
    title: dict.landing?.features?.curriculum?.title || "Curriculum Planning",
    description: dict.landing?.features?.curriculum?.description || "AI-assisted curriculum mapping.",
    badge: null,
    badgeColor: null,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "hover:border-primary/30",
    shadow: "hover:shadow-primary/20",
  },
];

// Features Section
const FeaturesSection = memo(function FeaturesSection({ dict, lang }: { dict: Dictionary; lang: string }) {
  const { ref: sectionRef, isInView } = useInView<HTMLDivElement>({ threshold: 0.05, rootMargin: "-100px 0px", once: true });
  const features = useMemo(() => getFeatures(dict), [dict]);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container px-4">
        <div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out'
          }}
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 mb-3 sm:mb-4 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-medium">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>{dict.landing.features.badge}</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">
            {dict.landing.features.title}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            {dict.landing.features.subtitle}
          </p>
        </div>

        <div ref={sectionRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`group p-4 sm:p-5 md:p-6 bg-white border border-gray-200 rounded-xl sm:rounded-2xl ${feature.border} hover:shadow-lg ${feature.shadow} scroll-animate-card ${isInView ? 'in-view' : ''}`}
            >
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className={`p-2 sm:p-3 ${feature.bg} rounded-lg sm:rounded-xl`}>
                  <feature.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${feature.color}`} />
                </div>
                {feature.badge && (
                  <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold text-white rounded ${feature.badgeColor}`}>
                    {feature.badge}
                  </span>
                )}
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1.5 sm:mb-2">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{feature.description}</p>
              <Link
                href={`/${lang === 'en' ? '' : lang + '/'}${feature.href.slice(1)}`}
                className={`inline-flex items-center text-sm sm:text-base ${feature.color} font-medium group-hover:${feature.color}`}
                aria-label={`Learn more about ${feature.title}`}
              >
                {dict.landing?.features?.learnMore || "Learn more"}
                <ChevronRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
});

// Social links
const socialLinks = [
  { href: "https://web.facebook.com/profile.php?id=61578235291840", icon: Facebook, label: "Facebook" },
  { href: "https://www.instagram.com/beeeducation/", icon: Instagram, label: "Instagram" },
  { href: "https://www.linkedin.com/company/beeeducation", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:hello@beeeducation.com", icon: Mail, label: "Email" },
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
      badgeColor: "bg-amber text-gray-900",
      iconColor: "text-amber",
      iconBg: "bg-amber-light",
    },
    {
      icon: Gamepad2,
      title: dict.landing?.studentParent?.activities?.title,
      description: dict.landing?.studentParent?.activities?.description,
      badge: dict.landing?.studentParent?.activities?.badge,
      badgeColor: "bg-rose-600 text-white",
      iconColor: "text-coral",
      iconBg: "bg-coral-light",
    },
    {
      icon: Heart,
      title: dict.landing?.studentParent?.parentPortal?.title,
      description: dict.landing?.studentParent?.parentPortal?.description,
      badge: null,
      badgeColor: null,
      iconColor: "text-mint",
      iconBg: "bg-mint-light",
    },
    {
      icon: ClipboardCheck,
      title: dict.landing?.studentParent?.development?.title,
      description: dict.landing?.studentParent?.development?.description,
      badge: null,
      badgeColor: null,
      iconColor: "text-vibrant-purple",
      iconBg: "bg-vibrant-purple-light",
    },
  ];

  const solutions = [
    { icon: GraduationCap, href: "/for-teachers", title: dict.landing?.solutions?.forTeachers?.title, description: dict.landing?.solutions?.forTeachers?.description, iconColor: "text-coral", iconBg: "bg-coral-light" },
    { icon: Shield, href: "/for-admins", title: dict.landing?.solutions?.forAdmins?.title, description: dict.landing?.solutions?.forAdmins?.description, iconColor: "text-purple-600", iconBg: "bg-purple-100" },
    { icon: Calendar, href: "/for-schedulers", title: dict.landing?.solutions?.forSchedulers?.title, description: dict.landing?.solutions?.forSchedulers?.description, iconColor: "text-amber-600", iconBg: "bg-amber-100" },
    { icon: Users, href: "/for-students", title: dict.landing?.solutions?.forStudents?.title, description: dict.landing?.solutions?.forStudents?.description, iconColor: "text-mint", iconBg: "bg-mint-light" },
    { icon: Building2, href: "/for-organizations", title: dict.landing?.solutions?.forOrganizations?.title, description: dict.landing?.solutions?.forOrganizations?.description, iconColor: "text-orange-600", iconBg: "bg-orange-100" },
  ];

  const workflowSteps = [
    {
      icon: NotebookPen,
      badge: dict.landing?.howItWorks?.step1Badge,
      title: dict.landing?.howItWorks?.step1Title,
      description: dict.landing?.howItWorks?.step1Description,
      color: "text-mint",
      bgColor: "bg-mint-light",
      badgeBg: "bg-mint/15",
      badgeText: "text-emerald-900",
    },
    {
      icon: BookOpen,
      badge: dict.landing?.howItWorks?.step2Badge,
      title: dict.landing?.howItWorks?.step2Title,
      description: dict.landing?.howItWorks?.step2Description,
      color: "text-coral",
      bgColor: "bg-coral-light",
      badgeBg: "bg-coral/15",
      badgeText: "text-rose-900",
    },
    {
      icon: Users,
      badge: dict.landing?.howItWorks?.step3Badge,
      title: dict.landing?.howItWorks?.step3Title,
      description: dict.landing?.howItWorks?.step3Description,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      badgeBg: "bg-purple-600/15",
      badgeText: "text-purple-900",
    },
  ];

  const techTopics = [
    { icon: BrainCircuit, title: dict.landing?.blog?.topic1Title, description: dict.landing?.blog?.topic1Description },
    { icon: TabletSmartphone, title: dict.landing?.blog?.topic2Title, description: dict.landing?.blog?.topic2Description },
    { icon: CloudCog, title: dict.landing?.blog?.topic3Title, description: dict.landing?.blog?.topic3Description },
    { icon: Sparkles, title: dict.landing?.blog?.topic4Title, description: dict.landing?.blog?.topic4Description },
  ];

  const getLocalizedPath = (path: string) => `/${lang === 'en' ? '' : lang + '/'}${path.startsWith('/') ? path.slice(1) : path}`;

  return (
    <div className="redesign-wrapper min-h-screen bg-white text-gray-900">
      {/* HERO SECTION */}
      <section className="relative pt-12 sm:pt-16 md:pt-20 pb-10 sm:pb-12 md:pb-16 lg:pt-28 lg:pb-24 overflow-hidden">
        <NeuralNetworkBackground
          className="z-[1]"
          particleColor="rgba(40, 102, 240, 0.5)"
          lineColor="rgba(40, 102, 240, 0.22)"
          particleCount={60}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#EEF4FF]/30 via-white/40 to-white/70 z-[2]" />

        <div className="absolute top-20 left-10 w-48 sm:w-60 md:w-72 h-48 sm:h-60 md:h-72 bg-[#D9F4FF]/40 rounded-full blur-3xl hidden sm:block z-[2]" />
        <div className="absolute bottom-0 right-10 w-60 sm:w-72 md:w-96 h-60 sm:h-72 md:h-96 bg-[#D7E7FF]/40 rounded-full blur-3xl hidden sm:block z-[2]" />

        <div className="container px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Column - Text Content */}
              <div className="text-center lg:text-left">
                {/* Animated Badge */}
                <div className="group relative inline-flex items-center justify-center rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] bg-white/80 backdrop-blur-sm">
                  <span
                    className="animate-gradient absolute inset-0 block h-full w-full rounded-[inherit] bg-gradient-to-r from-[#2866F0]/50 via-[#60A5FA]/50 to-[#2866F0]/50 bg-[length:300%_100%] p-[1px]"
                    style={{
                      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "destination-out",
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      maskComposite: "subtract",
                    }}
                  />
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                  <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-300" />
                  <AnimatedGradientText className="text-sm sm:text-base md:text-lg font-semibold">
                    {dict.landing.hero.badge}
                  </AnimatedGradientText>
                  <ChevronRight className="ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </div>

                {/* Main Headline */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  {dict.landing.hero.title}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2866F0] via-[#3B82F6] to-[#60A5FA]">
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
                    ? "Bee Education（亦稱 Bee Education）AI 學校管理系統（SIS + LMS）：課程規劃、智能排課、ClassSpark 行為追蹤、成績冊、出勤、評估與家校溝通一站式整合。"
                    : "Bee Education is an AI-powered teaching, learning and school management platform built by teachers for schools, students, and families."}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-12">
                  <Link href={getLocalizedPath("/contact")} className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-primary hover:bg-[#1F5FE0] text-white px-6 sm:px-8 py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
                    >
                      {dict.landing.hero.getStarted}
                      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </Link>
                  <Link href={getLocalizedPath("/features")} className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto border-[#C9D7F0] text-gray-700 px-6 sm:px-8 py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg rounded-xl hover:bg-[#E7F0FF]"
                    >
                      <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      {dict.landing.hero.watchDemo}
                    </Button>
                  </Link>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-gray-500">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Check className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    <span>{dict.landing.hero.noCreditCard}</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Check className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    <span>{dict.landing.hero.freeForever}</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Check className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    <span>{dict.landing.hero.setupTime}</span>
                  </div>
                </div>
              </div>

              {/* Right Column - App Store Badges */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-full max-w-sm mx-auto">
                  {/* Phone mockup frame */}
                  <div className="relative bg-gradient-to-br from-[#EEF4FF] to-[#D7E7FF] rounded-[2.5rem] p-8 sm:p-10 shadow-2xl shadow-blue-200/40">
                    <div className="absolute inset-0 rounded-[2.5rem] bg-white/40 backdrop-blur-sm" />
                    <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8">
                      {/* App icon */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white shadow-lg flex items-center justify-center overflow-hidden">
                        <Image
                          src="/app-icon.svg"
                          alt="Bee Education AI"
                          width={80}
                          height={80}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                          unoptimized
                        />
                      </div>

                      {/* App name */}
                      <div className="text-center">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900">Bee Education AI</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {lang === "zh-HK" ? "隨時隨地管理學校" : "School management on the go"}
                        </p>
                      </div>

                      {/* Store badges */}
                      <div className="flex flex-col gap-3 w-full items-center">
                        <a
                          href="https://apps.apple.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-transform hover:scale-105 active:scale-95"
                        >
                          <Image
                            src={lang === "zh-HK" ? "/badges/app-store-zh-HK.svg" : "/badges/app-store-en.svg"}
                            alt={lang === "zh-HK" ? "在 App Store 下載" : "Download on the App Store"}
                            width={168}
                            height={56}
                            className="h-[52px] sm:h-[56px] w-auto"
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
                            width={188}
                            height={56}
                            className="h-[52px] sm:h-[56px] w-auto"
                            unoptimized
                          />
                        </a>
                      </div>

                      {/* Rating stars */}
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 font-medium">5.0</span>
                      </div>
                    </div>
                  </div>

                  {/* Decorative floating elements */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#D9F4FF]/60 rounded-full blur-xl" />
                  <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-[#D7E7FF]/60 rounded-full blur-xl" />
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

      {/* UNIFIED PLATFORM SECTION */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-white to-[#F5F8FF]/60 border-y border-gray-100">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-primary/10 text-primary rounded-full text-sm font-medium">
              <LineChart className="h-4 w-4" />
              <span>{dict.landing?.unified?.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {dict.landing?.unified?.title}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              {dict.landing?.unified?.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {(dict.landing?.unified?.items || []).map((item: { title: string; description: string }, index: number) => {
              const iconMap = [BarChart3, ClipboardCheck, Target, Heart] as const;
              const IconComponent = iconMap[index] ?? Sparkles;

              return (
                <Card
                  key={`${item.title}-${index}`}
                  className="p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl shrink-0">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <FeaturesSection dict={dict} lang={lang} />

      {/* COMMUNICATION SECTION */}
      <section className="py-20 bg-gradient-to-b from-[#F5F8FF] to-white">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-blue-50 text-blue-900 rounded-full text-sm font-medium">
              <MessageCircle className="h-4 w-4" />
              <span>{dict.landing?.communication?.badge}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {dict.landing?.communication?.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {dict.landing?.communication?.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {communicationFeatures.map((feature, index) => (
              <Card
                key={index}
                className="group p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 ${feature.iconBg} rounded-xl`}>
                    <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                  </div>
                  {feature.badge && (
                    <span className={`px-2 py-1 text-xs font-bold rounded ${feature.badgeColor}`}>
                      {feature.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* STUDENT & PARENT SECTION */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-blue-50 text-blue-900 rounded-full text-sm font-medium">
              <Heart className="h-4 w-4" />
              <span>{dict.landing?.studentParent?.badge}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {dict.landing?.studentParent?.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {dict.landing?.studentParent?.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentParentFeatures.map((feature, index) => (
              <Card
                key={index}
                className="group p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 ${feature.iconBg} rounded-xl`}>
                    <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                  </div>
                  {feature.badge && (
                    <span className={`px-2 py-1 text-xs font-bold rounded ${feature.badgeColor}`}>
                      {feature.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI SHOWCASE SECTION */}
      <section className="py-20 bg-gradient-to-b from-[#E3F8FF] to-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-primary/10 text-primary rounded-full text-sm font-medium">
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
                    <div className="p-1 bg-primary/10 rounded-full">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-4">
                <Link href={getLocalizedPath("/features/ai")}>
                  <Button className="bg-primary hover:bg-[#1F5FE0] text-white">
                    {dict.landing?.ai?.exploreButton}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* AI Models Card */}
            <div className="relative">
              <Card className="p-8 bg-white border border-gray-200 rounded-2xl shadow-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">{dict.landing?.ai?.chooseModel}</h3>
                <div className="space-y-4">
                  {[
                    { name: dict.landing?.ai?.modes?.fast?.name, tag: dict.landing?.ai?.modes?.fast?.tag, desc: dict.landing?.ai?.modes?.fast?.desc },
                    { name: dict.landing?.ai?.modes?.balanced?.name, tag: dict.landing?.ai?.modes?.balanced?.tag, desc: dict.landing?.ai?.modes?.balanced?.desc },
                    { name: dict.landing?.ai?.modes?.deep?.name, tag: dict.landing?.ai?.modes?.deep?.tag, desc: dict.landing?.ai?.modes?.deep?.desc },
                    { name: dict.landing?.ai?.modes?.safe?.name, tag: dict.landing?.ai?.modes?.safe?.tag, desc: dict.landing?.ai?.modes?.safe?.desc },
                  ].map((model, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-primary/10 transition-colors cursor-pointer"
                    >
                      <div>
                        <div className="font-medium text-gray-900">{model.name}</div>
                        <div className="text-sm text-gray-500">{model.desc}</div>
                      </div>
                      <span className="text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded">
                        {model.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
              <div className="absolute -z-10 top-10 right-10 w-72 h-72 bg-[#D9F4FF]/60 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTIONS BY ROLE */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {dict.landing?.solutions?.title}
            </h2>
            <p className="text-lg text-gray-600">
              {dict.landing?.solutions?.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {solutions.map((solution, index) => (
              <Link
                key={index}
                href={getLocalizedPath(solution.href)}
                className="group p-6 bg-white rounded-2xl hover:shadow-lg border border-gray-100 hover:border-gray-200 transition-all text-center"
              >
                <div className={`inline-flex p-3 ${solution.iconBg} rounded-xl mb-4 group-hover:scale-110 transition-transform`}>
                  <solution.icon className={`h-6 w-6 ${solution.iconColor}`} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{solution.title}</h3>
                <p className="text-sm text-gray-600">{solution.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>{dict.landing?.howItWorks?.badge}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {dict.landing?.howItWorks?.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {dict.landing?.howItWorks?.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {workflowSteps.map((step, index) => (
              <Card
                key={index}
                className="group relative p-8 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className={`px-3 py-1 text-xs font-bold ${step.badgeText} ${step.badgeBg} rounded-full uppercase tracking-wide`}>
                    {step.badge}
                  </span>
                  <div className={`flex items-center justify-center w-10 h-10 ${step.bgColor} rounded-full ${step.color} font-bold`}>
                    {index + 1}
                  </div>
                </div>
                <div className={`p-3 ${step.bgColor} rounded-xl w-fit mb-4`}>
                  <step.icon className={`h-6 w-6 ${step.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </Card>
            ))}
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
                          ? "h-2 w-8 bg-primary"
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
                <item.icon className="h-5 w-5 text-primary" />
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG/RESOURCES */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-primary text-primary-foreground rounded-full text-sm font-medium">
              <BrainCircuit className="h-4 w-4" />
              <span>{dict.landing?.blog?.badge}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {dict.landing?.blog?.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {dict.landing?.blog?.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techTopics.map((topic, index) => (
              <Link key={index} href={getLocalizedPath("/blog")} className="block">
                <Card className="group h-full p-6 bg-white border border-gray-200 rounded-2xl hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <topic.icon className="h-6 w-6 text-primary" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{topic.title}</h3>
                  <p className="text-sm text-gray-600">{topic.description}</p>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href={getLocalizedPath("/blog")}>
              <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                {dict.landing?.blog?.viewAll}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-[#2866F0] via-[#006B9D] to-[#007090]">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 px-2 !text-white">
              {dict.landing.cta.title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl !text-white/90 mb-6 sm:mb-8 px-2">
              {dict.landing.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-10 px-4 sm:px-0">
              <Link href={getLocalizedPath("/contact")} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-primary hover:bg-gray-100 px-6 sm:px-8 py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg rounded-xl"
                >
                  {dict.landing.cta.getStarted}
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
              <Link href={getLocalizedPath("/pricing")} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white bg-white/20 !text-white hover:bg-white/30 hover:!text-white px-6 sm:px-8 py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg rounded-xl"
                >
                  {dict.landing.cta.viewPricing}
                </Button>
              </Link>
            </div>

            {/* Social Links */}
            <div className="pt-6 sm:pt-8 border-t border-white/20">
              <p className="!text-white/90 text-xs sm:text-sm mb-3 sm:mb-4">{dict.landing.cta.connectWithUs}</p>
              <div className="flex justify-center gap-3 sm:gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target={link.href.startsWith("mailto:") ? "_self" : "_blank"}
                    rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    className="p-2 sm:p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                    aria-label={link.label}
                  >
                    <link.icon className="h-4 w-4 sm:h-5 sm:w-5 !text-white" />
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
