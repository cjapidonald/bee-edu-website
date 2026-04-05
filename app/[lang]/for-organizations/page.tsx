import { Building2, Globe, BarChart3, Shield, Users, Settings } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { RolePageTemplate } from "@/components/pages/RolePageTemplate";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";


const contentByLang: Record<
  string,
  {
    badge: string;
    title: string;
    highlight: string;
    description: string;
    trustIndicators: string[];
    painPoints: { title: string; problem: string; solution: string }[];
    features: {
      icon: typeof Building2;
      title: string;
      description: string;
      badge?: string;
      badgeColor?: string;
    }[];
  }
> = {
  en: {
    badge: "For Organizations",
    title: "Scale with",
    highlight: "Confidence",
    description:
      "One platform for your entire district or school network. Unified data, consistent practices, and complete oversight—without the IT headache.",
    trustIndicators: ["Multi-school support", "Enterprise security", "Rapid deployment"],
    painPoints: [
      {
        title: "Fragmented Systems",
        problem: "Each school uses different tools, making oversight impossible",
        solution: "Unified platform with cross-school visibility",
      },
      {
        title: "No Standardization",
        problem: "Inconsistent practices and data across campuses",
        solution: "Centralized curriculum, policies, and reporting",
      },
      {
        title: "Scaling Challenges",
        problem: "Adding new schools requires massive IT effort",
        solution: "One-click school deployment and configuration",
      },
      {
        title: "Data Security Concerns",
        problem: "Multiple systems mean multiple security risks",
        solution: "Enterprise-grade security with single sign-on",
      },
    ],
    features: [
      {
        icon: Globe,
        title: "Multi-School Dashboard",
        description:
          "See performance, attendance, and metrics across all schools in one view. Compare and identify best practices.",
        badge: "Enterprise",
        badgeColor: "bg-[#fc3c00]/10 text-[#fc3c00]",
      },
      {
        icon: BarChart3,
        title: "Roll-Up Reporting",
        description:
          "District and network-wide reports that aggregate data from all schools automatically.",
      },
      {
        icon: Users,
        title: "Centralized User Management",
        description:
          "Manage staff and students across all schools. Transfer students seamlessly between campuses.",
      },
      {
        icon: Settings,
        title: "Policy Enforcement",
        description:
          "Set organization-wide policies, curriculum standards, and grading scales that apply to all schools.",
      },
      {
        icon: Shield,
        title: "Enterprise Security",
        description:
          "SSO integration, audit logging, data residency options, and compliance certifications.",
      },
      {
        icon: Building2,
        title: "Rapid Deployment",
        description:
          "Add new schools in minutes with pre-configured templates and bulk import tools.",
      },
    ],
  },
  "zh-HK": {
    badge: "機構專區",
    title: "以",
    highlight: "信心擴展",
    description:
      "一個平台支援整個學區或學校網絡。統一數據、標準化流程、完整監督——無需龐大的 IT 負擔。",
    trustIndicators: ["多校支援", "企業級安全", "快速部署"],
    painPoints: [
      {
        title: "系統分散",
        problem: "每間學校使用不同工具，令整體監督幾乎不可能",
        solution: "統一平台提供跨校可視性",
      },
      {
        title: "缺乏標準化",
        problem: "各校做法與數據口徑不一致",
        solution: "集中管理課程、政策與報表",
      },
      {
        title: "擴展困難",
        problem: "新增學校往往需要大量 IT 投入",
        solution: "一鍵部署學校並完成配置",
      },
      {
        title: "數據安全風險",
        problem: "系統越多，安全風險越多",
        solution: "企業級安全與單一登入（SSO）",
      },
    ],
    features: [
      {
        icon: Globe,
        title: "多校儀表板",
        description: "在同一視圖查看所有學校的表現、出席與指標，並可比較與找出最佳做法。",
        badge: "企業級",
        badgeColor: "bg-[#fc3c00]/10 text-[#fc3c00]",
      },
      {
        icon: BarChart3,
        title: "彙總報表",
        description: "自動聚合各校數據，生成學區／網絡層級報表。",
      },
      {
        icon: Users,
        title: "集中用戶管理",
        description: "跨校管理教職員與學生，並可在校區之間無縫轉移學生資料。",
      },
      {
        icon: Settings,
        title: "政策與標準統一",
        description: "設定機構級政策、課程標準與評分尺度，並套用到所有學校。",
      },
      {
        icon: Shield,
        title: "企業級安全",
        description: "支援 SSO、審計記錄、資料駐留選項與合規認證。",
      },
      {
        icon: Building2,
        title: "快速部署",
        description: "使用預設模板與批量匯入工具，在數分鐘內新增學校。",
      },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : "en";
  const t = contentByLang[lang] ?? contentByLang.en;
  const title = `${t.badge}: ${t.title} ${t.highlight} | Bee Education AI`;
  const description = t.description;
  return buildPageMetadata({ lang, path: "/for-organizations", title, description });
}

export default async function ForOrganizationsPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : "en";
  const t = contentByLang[lang] ?? contentByLang.en;

  return (
    <RolePageTemplate
      badge={t.badge}
      badgeIcon={Building2}
      title={t.title}
      highlight={t.highlight}
      description={t.description}
      painPoints={t.painPoints}
      features={t.features}
      trustIndicators={t.trustIndicators}
      lang={lang}
    />
  );
}
