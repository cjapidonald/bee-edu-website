"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Target,
  BarChart3,
  Calendar,
  FileText,
  BookOpen,
  Brain,
  GraduationCap,
  Users,
  Building2,
  Globe,
  Gamepad2,
  Plug,
  UserCog,
  Award,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  FileCheck,
  HeartHandshake,
  Briefcase,
  FolderOpen,
  LogIn,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavDict {
  nav: Record<string, unknown>;
}

interface HeaderProps {
  lang: string;
  dict: NavDict;
}

// Helper to get nested dict values safely
const getNavText = (dict: NavDict, key: string, fallback: string): string => {
  const parts = key.split('.');
  let value: unknown = dict.nav;
  for (const part of parts) {
    if (value && typeof value === 'object' && part in value) {
      value = (value as Record<string, unknown>)[part];
    } else {
      return fallback;
    }
  }
  return typeof value === 'string' ? value : fallback;
};

// Feature link definitions with translation keys
const getTeachingLearningLinks = (dict: NavDict) => [
  { name: getNavText(dict, 'skillsGradebook', 'Skills Gradebook'), path: "/features/gradebook", icon: BarChart3 },
  { name: getNavText(dict, 'curriculumPlanning', 'Curriculum Planning'), path: "/features/curriculum", icon: BookOpen },
  { name: getNavText(dict, 'examPlatform', 'Exam Platform'), path: "/features/exams", icon: FileText },
  { name: getNavText(dict, 'classsparkBehavior', 'ClassSpark Behavior'), path: "/features/classspark", icon: Target },
  { name: getNavText(dict, 'aiFeatures', 'TeacherLab & AI'), path: "/features/ai", icon: Brain },
  { name: getNavText(dict, 'featureLinks.gamification', 'Gamification'), path: "/features/gamification", icon: Gamepad2 },
];

const getSchoolOperationsLinks = (dict: NavDict) => [
  { name: getNavText(dict, 'magneticScheduling', 'Magnetic Scheduling'), path: "/features/scheduling", icon: Calendar },
  { name: getNavText(dict, 'featureLinks.integrations', 'Integrations'), path: "/features/integrations", icon: Plug },
  { name: getNavText(dict, 'featureLinks.classStories', 'Class Stories'), path: "/features/school-news", icon: FolderOpen },
];

const getPeopleHRLinks = (dict: NavDict) => [
  { name: getNavText(dict, 'featureLinks.hrManagement', 'HR Management'), path: "/features/hr", icon: UserCog },
  { name: getNavText(dict, 'featureLinks.professionalDev', 'Professional Dev'), path: "/features/professional-dev", icon: Award },
  { name: getNavText(dict, 'featureLinks.teacherKpi', 'Teacher KPI'), path: "/features/teacher-kpi", icon: TrendingUp },
];

const getFinanceAdmissionsLinks = (dict: NavDict) => [
  { name: getNavText(dict, 'featureLinks.finance', 'Finance'), path: "/features/finance", icon: DollarSign },
  { name: getNavText(dict, 'featureLinks.salesAdmin', 'Sales Admin'), path: "/features/sales-admin", icon: Briefcase },
];

const getQualityComplianceLinks = (dict: NavDict) => [
  { name: getNavText(dict, 'featureLinks.policyManagement', 'Policy Management'), path: "/features/policy-management", icon: FileCheck },
  { name: getNavText(dict, 'featureLinks.studentAffairs', 'Student Affairs'), path: "/features/student-affairs", icon: HeartHandshake },
];

const getSolutionLinks = (dict: NavDict) => [
  { name: getNavText(dict, 'forTeachers', 'For Teachers'), path: "/for-teachers", icon: GraduationCap, description: getNavText(dict, 'solutionDescriptions.forTeachers', 'Your new workstyle') },
  { name: getNavText(dict, 'forTeamLeaders', 'Team Leaders'), path: "/for-team-leaders", icon: Users, description: getNavText(dict, 'solutionDescriptions.forTeamLeaders', 'Department heads & coordinators') },
  { name: getNavText(dict, 'forSchedulers', 'For Schedulers'), path: "/for-schedulers", icon: Calendar, description: getNavText(dict, 'solutionDescriptions.forSchedulers', 'Scheduling made simple') },
  { name: getNavText(dict, 'forStudents', 'For Students'), path: "/for-students", icon: Users, description: getNavText(dict, 'solutionDescriptions.forStudents', 'Personalized learning') },
  { name: getNavText(dict, 'forParents', 'For Parents'), path: "/for-parents", icon: Users, description: getNavText(dict, 'solutionDescriptions.forParents', 'Stay connected') },
  { name: getNavText(dict, 'forOrganizations', 'Organizations'), path: "/for-organizations", icon: Building2, description: getNavText(dict, 'solutionDescriptions.forOrganizations', 'Districts & school networks') },
];

export default function Header({ lang, dict }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const featuresCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const solutionsCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://app.elementals.com";

  useEffect(() => {
    return () => {
      if (featuresCloseTimer.current) {
        clearTimeout(featuresCloseTimer.current);
      }
      if (solutionsCloseTimer.current) {
        clearTimeout(solutionsCloseTimer.current);
      }
    };
  }, []);

  const openFeaturesMenu = () => {
    if (featuresCloseTimer.current) {
      clearTimeout(featuresCloseTimer.current);
      featuresCloseTimer.current = null;
    }
    setFeaturesOpen(true);
  };

  const scheduleCloseFeaturesMenu = () => {
    if (featuresCloseTimer.current) {
      clearTimeout(featuresCloseTimer.current);
    }
    featuresCloseTimer.current = setTimeout(() => {
      setFeaturesOpen(false);
      featuresCloseTimer.current = null;
    }, 150);
  };

  const openSolutionsMenu = () => {
    if (solutionsCloseTimer.current) {
      clearTimeout(solutionsCloseTimer.current);
      solutionsCloseTimer.current = null;
    }
    setSolutionsOpen(true);
  };

  const scheduleCloseSolutionsMenu = () => {
    if (solutionsCloseTimer.current) {
      clearTimeout(solutionsCloseTimer.current);
    }
    solutionsCloseTimer.current = setTimeout(() => {
      setSolutionsOpen(false);
      solutionsCloseTimer.current = null;
    }, 150);
  };

  const getLocalizedPath = (path: string) => {
    if (lang === "en") return path;
    return `/${lang}${path}`;
  };

  // Get translated links
  const teachingLearningLinks = getTeachingLearningLinks(dict);
  const schoolOperationsLinks = getSchoolOperationsLinks(dict);
  const peopleHRLinks = getPeopleHRLinks(dict);
  const financeAdmissionsLinks = getFinanceAdmissionsLinks(dict);
  const qualityComplianceLinks = getQualityComplianceLinks(dict);
  const solutionLinks = getSolutionLinks(dict);

  // Get section headers
  const sectionTeachingLearning = getNavText(dict, 'sections.teachingLearning', 'Teaching & Learning');
  const sectionSchoolOperations = getNavText(dict, 'sections.schoolOperations', 'School Operations');
  const sectionPeopleHR = getNavText(dict, 'sections.peopleHR', 'People & HR');
  const sectionFinanceAdmissions = getNavText(dict, 'sections.financeAdmissions', 'Finance & Admissions');
  const sectionQualityCompliance = getNavText(dict, 'sections.qualityCompliance', 'Quality & Compliance');
  const viewAllFeatures = getNavText(dict, 'viewAllFeatures', 'View All Features →');

  const FeatureLinkItem = ({ link }: { link: { name: string; path: string; icon: LucideIcon; badge?: string } }) => (
    <Link
      href={getLocalizedPath(link.path)}
      className="flex items-center gap-1.5 px-2 py-1 text-xs text-gray-700 hover:text-[#fc3c00] hover:bg-[#fff0eb] rounded transition-colors"
    >
      <link.icon className="h-3.5 w-3.5 text-[#fc3c00] flex-shrink-0" />
      <span className="truncate">{link.name}</span>
      {link.badge && (
        <span className="text-[8px] font-medium bg-gradient-to-r from-[#fc3c00] to-[#e03500] text-white px-1 py-0.5 rounded flex-shrink-0">
          {link.badge}
        </span>
      )}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <nav className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href={getLocalizedPath("/")} className="flex items-center">
          <Image
            src="/elementals-education-logo.svg"
            alt="Elementals"
            width={120}
            height={36}
            className="h-9 w-auto max-h-[36px]"
            priority
            unoptimized
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {/* Home */}
          <Link
            href={getLocalizedPath("/")}
            className="px-3.5 py-2 text-sm font-medium text-[#fc3c00] hover:text-[#e03500] hover:bg-[#fc3c00]/10 rounded-md transition-colors"
          >
            {(dict.nav.home as string) || "Home"}
          </Link>

          {/* Features Dropdown - Mega Menu */}
          <div
            className="relative group"
            onMouseEnter={openFeaturesMenu}
            onMouseLeave={scheduleCloseFeaturesMenu}
          >
            <button
              className="flex items-center gap-1 px-3.5 py-2 text-sm font-medium text-[#fc3c00] hover:text-[#e03500] hover:bg-[#fc3c00]/10 rounded-md transition-colors"
            >
              {(dict.nav.features as string) || "Platform"}
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {/* Invisible bridge to connect button to dropdown */}
            <div
              className={cn(
                "absolute top-full left-0 w-full h-8",
                featuresOpen ? "block" : "hidden"
              )}
            />
            <div
              onMouseEnter={openFeaturesMenu}
              onMouseLeave={scheduleCloseFeaturesMenu}
              className={cn(
                "fixed top-[72px] left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-xl shadow-xl p-3 transition-all duration-200 z-50",
                featuresOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
              )}
            >
              <div className="flex gap-4">
                {/* Teaching & Learning */}
                <div className="min-w-[150px]">
                  <h3 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-2 mb-1.5 flex items-center gap-1.5">
                    <BookOpen className="h-3 w-3" />
                    {sectionTeachingLearning}
                  </h3>
                  <div className="space-y-0">
                    {teachingLearningLinks.map((link, index) => (
                      <FeatureLinkItem key={`${link.path}-${index}`} link={link} />
                    ))}
                  </div>
                </div>

                {/* School Operations */}
                <div className="min-w-[150px]">
                  <h3 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-2 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" />
                    {sectionSchoolOperations}
                  </h3>
                  <div className="space-y-0">
                    {schoolOperationsLinks.map((link, index) => (
                      <FeatureLinkItem key={`${link.path}-${index}`} link={link} />
                    ))}
                  </div>
                </div>

                {/* People & HR */}
                <div className="min-w-[140px]">
                  <h3 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-2 mb-1.5 flex items-center gap-1.5">
                    <Users className="h-3 w-3" />
                    {sectionPeopleHR}
                  </h3>
                  <div className="space-y-0">
                    {peopleHRLinks.map((link, index) => (
                      <FeatureLinkItem key={`${link.path}-${index}`} link={link} />
                    ))}
                  </div>
                </div>

                {/* Finance & Admissions */}
                <div className="min-w-[130px]">
                  <h3 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-2 mb-1.5 flex items-center gap-1.5">
                    <DollarSign className="h-3 w-3" />
                    {sectionFinanceAdmissions}
                  </h3>
                  <div className="space-y-0">
                    {financeAdmissionsLinks.map((link, index) => (
                      <FeatureLinkItem key={`${link.path}-${index}`} link={link} />
                    ))}
                  </div>
                </div>

                {/* Quality & Compliance */}
                <div className="min-w-[140px]">
                  <h3 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-2 mb-1.5 flex items-center gap-1.5">
                    <ShieldCheck className="h-3 w-3" />
                    {sectionQualityCompliance}
                  </h3>
                  <div className="space-y-0">
                    {qualityComplianceLinks.map((link, index) => (
                      <FeatureLinkItem key={`${link.path}-${index}`} link={link} />
                    ))}
                  </div>
                </div>
              </div>

              {/* View All Features Link */}
              <div className="border-t border-gray-100 mt-2 pt-2">
                <Link
                  href={getLocalizedPath("/features")}
                  className="flex items-center justify-center gap-1.5 px-2 py-1.5 text-xs font-medium text-[#fc3c00] hover:bg-[#fff0eb] rounded transition-colors"
                >
                  {viewAllFeatures}
                </Link>
              </div>
            </div>
          </div>

          {/* Solutions Dropdown */}
          <div
            className="relative group"
            onMouseEnter={openSolutionsMenu}
            onMouseLeave={scheduleCloseSolutionsMenu}
          >
            <button
              className="flex items-center gap-1 px-3.5 py-2 text-sm font-medium text-[#fc3c00] hover:text-[#e03500] hover:bg-[#fc3c00]/10 rounded-md transition-colors"
            >
              {(dict.nav.solutions as string) || "Who It's For"}
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {/* Invisible bridge to connect button to dropdown */}
            <div
              className={cn(
                "absolute top-full left-0 w-full h-2",
                solutionsOpen ? "block" : "hidden"
              )}
            />
            <div
              onMouseEnter={openSolutionsMenu}
              onMouseLeave={scheduleCloseSolutionsMenu}
              className={cn(
                "absolute top-full left-0 mt-1 w-72 bg-white border border-gray-200 rounded-xl shadow-lg p-2 transition-all duration-200",
                solutionsOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
              )}
            >
              {solutionLinks.map((link, index) => (
                <Link
                  key={`${link.path}-${index}`}
                  href={getLocalizedPath(link.path)}
                  className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:text-[#fc3c00] hover:bg-[#fff0eb] rounded-lg transition-colors"
                >
                  <link.icon className="h-5 w-5 text-[#fc3c00]" />
                  <div>
                    <div className="text-sm font-medium">{link.name}</div>
                    <div className="text-xs text-gray-500">{link.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <Link
            href={getLocalizedPath("/pricing")}
            className="px-3.5 py-2 text-sm font-medium text-[#fc3c00] hover:text-[#e03500] hover:bg-[#fc3c00]/10 rounded-md transition-colors"
          >
            {(dict.nav.pricing as string) || "School Pricing"}
          </Link>

          {/* Community */}
          <Link
            href={getLocalizedPath("/blog")}
            className="px-3.5 py-2 text-sm font-medium text-[#fc3c00] hover:text-[#e03500] hover:bg-[#fc3c00]/10 rounded-md transition-colors"
          >
            {(dict.nav.blog as string) || "Community"}
          </Link>

          {/* Let's Connect */}
          <Link
            href={getLocalizedPath("/contact")}
            className="px-3.5 py-2 text-sm font-medium text-[#fc3c00] hover:text-[#e03500] hover:bg-[#fc3c00]/10 rounded-md transition-colors"
          >
            {(dict.nav.contactUs as string) || "Let's Connect"}
          </Link>
        </div>

        {/* Right Side - Language & Auth */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center gap-1 px-2 py-1 border border-[#fc3c00]/30 rounded-lg">
            <Globe className="h-4 w-4 text-[#fc3c00]" />
            <label htmlFor="language-select" className="sr-only">
              Language
            </label>
            <select
              id="language-select"
              suppressHydrationWarning
              value={lang}
              onChange={(e) => {
                const newLang = e.target.value;
                // Strip ANY existing locale prefix (vi is default/unprefixed, but
                // handle /vi defensively in case it ever appears).
                const pathWithoutLang =
                  pathname?.replace(/^\/(vi|en|zh-HK)(?=\/|$)/, "") || "";
                const basePath = pathWithoutLang === "" ? "/" : pathWithoutLang;
                // vi is the default locale — it has NO URL prefix.
                const newPath =
                  newLang === "vi" ? basePath : `/${newLang}${basePath === "/" ? "" : basePath}`;
                const query = searchParams?.toString();
                const nextHref = query ? `${newPath || "/"}?${query}` : newPath || "/";
                // Persist the choice so middleware honors it on subsequent requests.
                document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000; samesite=lax`;
                router.replace(nextHref);
                router.refresh();
              }}
              className="text-sm bg-transparent border-none outline-none cursor-pointer text-[#fc3c00]"
            >
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
              <option value="zh-HK">繁體中文</option>
            </select>
          </div>

          {/* Access Portal - Direct link to app login */}
          <a href={appUrl}>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1.5 text-[#fc3c00] hover:text-[#e03500] hover:bg-[#fc3c00]/10"
            >
              <LogIn className="h-4 w-4 text-[#fc3c00]" />
              {(dict.nav.signIn as string) || "Access Portal"}
            </Button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          type="button"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-[#fc3c00]" />
          ) : (
            <Menu className="h-6 w-6 text-[#fc3c00]" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="lg:hidden border-t border-gray-200 bg-white max-h-[80vh] overflow-y-auto">
          <div className="container px-4 py-4 space-y-2">
            <Link
              href={getLocalizedPath("/")}
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              {(dict.nav.home as string) || "Home"}
            </Link>

            {/* Mobile Features Section */}
            <div className="border-t border-gray-100 pt-2">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">{sectionTeachingLearning}</div>
              {teachingLearningLinks.map((link, index) => (
                <Link
                  key={`${link.path}-${index}`}
                  href={getLocalizedPath(link.path)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <link.icon className="h-4 w-4 text-[#fc3c00]" />
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-2">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">{sectionSchoolOperations}</div>
              {schoolOperationsLinks.map((link, index) => (
                <Link
                  key={`${link.path}-${index}`}
                  href={getLocalizedPath(link.path)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <link.icon className="h-4 w-4 text-[#fc3c00]" />
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-2">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">{sectionPeopleHR}</div>
              {peopleHRLinks.map((link, index) => (
                <Link
                  key={`${link.path}-${index}`}
                  href={getLocalizedPath(link.path)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <link.icon className="h-4 w-4 text-[#fc3c00]" />
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-2">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">{sectionFinanceAdmissions}</div>
              {financeAdmissionsLinks.map((link, index) => (
                <Link
                  key={`${link.path}-${index}`}
                  href={getLocalizedPath(link.path)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <link.icon className="h-4 w-4 text-[#fc3c00]" />
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-2">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">{sectionQualityCompliance}</div>
              {qualityComplianceLinks.map((link, index) => (
                <Link
                  key={`${link.path}-${index}`}
                  href={getLocalizedPath(link.path)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <link.icon className="h-4 w-4 text-[#fc3c00]" />
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Solutions Section */}
            <div className="border-t border-gray-100 pt-2">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">{(dict.nav.solutions as string) || "Who It's For"}</div>
              {solutionLinks.map((link, index) => (
                <Link
                  key={`${link.path}-${index}`}
                  href={getLocalizedPath(link.path)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <link.icon className="h-4 w-4 text-[#fc3c00]" />
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-2">
              <Link
                href={getLocalizedPath("/pricing")}
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                {(dict.nav.pricing as string) || "School Pricing"}
              </Link>
              <Link
                href={getLocalizedPath("/blog")}
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                {(dict.nav.blog as string) || "Community"}
              </Link>
              <Link
                href={getLocalizedPath("/contact")}
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                {(dict.nav.contactUs as string) || "Let's Connect"}
              </Link>
            </div>

            {/* Mobile Access Portal Link */}
            <div className="border-t border-gray-200 pt-3 mt-2 px-4 pb-2">
              <a
                href={appUrl}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-[#fc3c00] hover:bg-[#e03500] text-white rounded-lg text-sm font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LogIn className="h-4 w-4" />
                {(dict.nav.signIn as string) || "Access Portal"}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
