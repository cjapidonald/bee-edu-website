import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SitemapPageProps {
  params: { lang: string };
}

interface SiteLink {
  title: string;
  url: string;
  description: string;
}

interface SiteSection {
  title: string;
  description?: string;
  links: SiteLink[];
}

export default function SitemapPage({ params }: SitemapPageProps) {
  const lang = params.lang || "en";

  const getLocalizedPath = (path: string) => {
    if (lang === "en") return path;
    return `/${lang}${path}`;
  };

  const texts = {
    en: {
      title: "Sitemap",
      description: "Navigate all pages and sections of Elementals",
      sections: {
        publicPages: "Public Pages",
        features: "Features",
        solutions: "Solutions",
        xmlTitle: "XML Sitemap",
        xmlDescription: "For search engines, you can also access our XML sitemap:",
      },
      linkTitles: {
        home: "Home",
        about: "About",
        pricing: "Pricing",
        blog: "Blog",
        contact: "Contact",
        faq: "FAQ",
        services: "Services",
        sitemap: "Sitemap",
        forTeachers: "For Teachers",
        forAdmins: "For Admins",
        forSchedulers: "For Schedulers",
        forStudents: "For Students",
        forParents: "For Parents",
      },
      details: {
        home: "Main landing page with overview of all features",
        about: "Learn about our mission, team, and values",
        pricing: "View pricing plans and compare features",
        blog: "Educational articles and product updates",
        contact: "Get in touch with our team",
        faq: "Frequently asked questions",
        services: "Implementation and support services",
        sitemap: "This page - site navigation overview",
        classspark: "Real-time behavior tracking and point systems",
        gradebook: "Skills-based assessment and mastery tracking",
        scheduling: "Smart timetables and cover teacher management",
        exams: "Complete exam creation and AI-assisted grading",
        curriculum: "AI-assisted curriculum mapping and lesson planning",
        forTeachers: "Tools and features for classroom teachers",
        forAdmins: "School-wide oversight and management tools",
        forSchedulers: "Timetable and cover teacher management",
        forStudents: "Student dashboard and progress tracking",
        forParents: "Parent portal and family engagement",
      },
    },
    "zh-HK": {
      title: "網站地圖",
      description: "瀏覽 Elementals 的所有頁面和部分",
      sections: {
        publicPages: "公開頁面",
        features: "功能",
        solutions: "解決方案",
        xmlTitle: "XML 網站地圖",
        xmlDescription: "對於搜索引擎，您還可以訪問我們的 XML 網站地圖：",
      },
      linkTitles: {
        home: "首頁",
        about: "關於我們",
        pricing: "價格",
        blog: "博客",
        contact: "聯絡我們",
        faq: "常見問題",
        services: "服務",
        sitemap: "網站地圖",
        forTeachers: "教師",
        forAdmins: "管理員",
        forSchedulers: "排課人員",
        forStudents: "學生",
        forParents: "家長",
      },
      details: {
        home: "主著陸頁，概述所有功能",
        about: "了解我們的使命、團隊和價值觀",
        pricing: "查看定價方案並比較功能",
        blog: "教育文章和產品更新",
        contact: "與我們的團隊聯繫",
        faq: "常見問題",
        services: "實施和支援服務",
        sitemap: "此頁面 - 網站導航概覽",
        classspark: "實時行為追蹤和積分系統",
        gradebook: "基於技能的評估和掌握追蹤",
        scheduling: "智能時間表和代課教師管理",
        exams: "完整的考試創建和 AI 輔助評分",
        curriculum: "AI 輔助課程映射和課程規劃",
        forTeachers: "課堂教師的工具和功能",
        forAdmins: "全校監督和管理工具",
        forSchedulers: "時間表和代課教師管理",
        forStudents: "學生儀表板和進度追蹤",
        forParents: "家長入口和家庭互動",
      },
    },
  };

  const t = texts[lang as keyof typeof texts] || texts.en;

  const sections: SiteSection[] = [
    {
      title: t.sections.publicPages,
      links: [
        { title: t.linkTitles.home, url: "/", description: t.details.home },
        { title: t.linkTitles.about, url: "/about", description: t.details.about },
        { title: t.linkTitles.pricing, url: "/pricing", description: t.details.pricing },
        { title: t.linkTitles.blog, url: "/blog", description: t.details.blog },
        { title: t.linkTitles.contact, url: "/contact", description: t.details.contact },
        { title: t.linkTitles.faq, url: "/faq", description: t.details.faq },
        { title: t.linkTitles.services, url: "/services", description: t.details.services },
        { title: t.linkTitles.sitemap, url: "/sitemap-page", description: t.details.sitemap },
      ],
    },
    {
      title: t.sections.features,
      links: [
        { title: "ClassSpark", url: "/features/classspark", description: t.details.classspark },
        { title: "Gradebook", url: "/features/gradebook", description: t.details.gradebook },
        { title: "Scheduling", url: "/features/scheduling", description: t.details.scheduling },
        { title: "Exams", url: "/features/exams", description: t.details.exams },
        { title: "Curriculum", url: "/features/curriculum", description: t.details.curriculum },
      ],
    },
    {
      title: t.sections.solutions,
      links: [
        { title: t.linkTitles.forTeachers, url: "/for-teachers", description: t.details.forTeachers },
        { title: t.linkTitles.forAdmins, url: "/for-admins", description: t.details.forAdmins },
        { title: t.linkTitles.forSchedulers, url: "/for-schedulers", description: t.details.forSchedulers },
        { title: t.linkTitles.forStudents, url: "/for-students", description: t.details.forStudents },
        { title: t.linkTitles.forParents, url: "/for-parents", description: t.details.forParents },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <div className="container py-12">
          <h1 className="text-4xl font-bold mb-2">{t.title}</h1>
          <p className="text-muted-foreground mb-8">{t.description}</p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => (
              <Card key={section.title}>
                <CardHeader>
                  <CardTitle>{section.title}</CardTitle>
                  {section.description && (
                    <p className="text-sm text-muted-foreground mt-1">{section.description}</p>
                  )}
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {section.links.map((link) => (
                      <li key={link.url} className="space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={getLocalizedPath(link.url)}
                            className="text-[#fc3c00] hover:underline font-medium"
                          >
                            {link.title}
                          </Link>
                        </div>
                        <p className="text-sm text-muted-foreground">{link.description}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>{t.sections.xmlTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{t.sections.xmlDescription}</p>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#fc3c00] hover:underline"
              >
                https://elementals.com/sitemap.xml
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
