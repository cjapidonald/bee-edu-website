import { type ColorTheme } from "@/lib/marketing/colors";

export type BlogLang = "en" | "vi" | "zh-HK";

export const getSupportedLang = (lang: string): BlogLang => (lang === "zh-HK" ? "zh-HK" : lang === "vi" ? "vi" : "en");

// Category color mapping for consistent styling
const CATEGORY_COLORS: Record<string, ColorTheme> = {
  eduTech: "purple",
  tutorials: "coral",
  teachingTechniques: "amber",
  classActivity: "mint",
  teacherReflection: "orange",
  tips: "coral",
  shop: "amber",
  caseStudy: "mint",
  research: "purple",
  researchQuestion: "primary",
  teacherStories: "coral",
  studentWellbeing: "mint",
  schoolDesign: "orange",
  teacher_blog: "amber",
};

export const CATEGORY_LABELS_BY_LANG: Record<BlogLang, Record<string, string>> = {
  en: {
    eduTech: "Edu Tech",
    tutorials: "Tutorials",
    teachingTechniques: "Teaching Techniques",
    classActivity: "Class Activity",
    teacherReflection: "Teacher Reflection",
    tips: "Tips",
    shop: "Shop",
    caseStudy: "Case Study",
    research: "Research",
    researchQuestion: "Research Questions",
    teacherStories: "Teacher Stories",
    studentWellbeing: "Student Wellbeing",
    schoolDesign: "School Design",
    teacher_blog: "Teacher Blog",
  },
  vi: {
    eduTech: "Công nghệ Giáo dục",
    tutorials: "Hướng dẫn",
    teachingTechniques: "Kỹ thuật Giảng dạy",
    classActivity: "Hoạt động Lớp học",
    teacherReflection: "Suy ngẫm Giáo viên",
    tips: "Mẹo hay",
    shop: "Cửa hàng",
    caseStudy: "Nghiên cứu Tình huống",
    research: "Nghiên cứu",
    researchQuestion: "Câu hỏi Nghiên cứu",
    teacherStories: "Câu chuyện Giáo viên",
    studentWellbeing: "Sức khỏe Học sinh",
    schoolDesign: "Thiết kế Trường học",
    teacher_blog: "Blog Giáo viên",
  },
  "zh-HK": {
    eduTech: "教育科技",
    tutorials: "教程",
    teachingTechniques: "教學技巧",
    classActivity: "課堂活動",
    teacherReflection: "教師反思",
    tips: "小貼士",
    shop: "商店",
    caseStudy: "案例研究",
    research: "研究",
    researchQuestion: "研究問題",
    teacherStories: "教師故事",
    studentWellbeing: "學生健康",
    schoolDesign: "學校設計",
    teacher_blog: "教師博客",
  },
};

export const getCategoryColor = (category: string | null | undefined): ColorTheme => {
  if (!category) return "primary";
  return CATEGORY_COLORS[category] || "primary";
};

export const normalizeCategory = (category: string | null | undefined): string | null => {
  if (!category) return null;
  const normalized = category.trim().toLowerCase();

  const mapping: Record<string, string> = {
    edutech: "eduTech",
    "edu tech": "eduTech",
    "edu-tech": "eduTech",
    "teaching techniques": "teachingTechniques",
    teachingtechniques: "teachingTechniques",
    "class activity": "classActivity",
    classactivity: "classActivity",
    "teacher reflection": "teacherReflection",
    teacherreflection: "teacherReflection",
    "case study": "caseStudy",
    casestudy: "caseStudy",
    "research question": "researchQuestion",
    researchquestion: "researchQuestion",
    "research questions": "researchQuestion",
    "teacher stories": "teacherStories",
    teacherstories: "teacherStories",
    "student wellbeing": "studentWellbeing",
    studentwellbeing: "studentWellbeing",
    "school design": "schoolDesign",
    schooldesign: "schoolDesign",
    "teacher blog": "teacher_blog",
    teacherblog: "teacher_blog",
    teacher_blog: "teacher_blog",
  };

  return mapping[normalized] || category;
};

export const formatCategoryLabel = (lang: BlogLang, raw: string) => {
  const categoryLabels = CATEGORY_LABELS_BY_LANG[lang];
  const normalized = normalizeCategory(raw);
  const key = normalized || raw;

  if (key && categoryLabels[key]) {
    return categoryLabels[key];
  }

  return raw
    .replace(/[-_]/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

