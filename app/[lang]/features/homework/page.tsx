import { FileText, Sparkles, Brain, BookOpen, Mic, Send, CheckCircle2 } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { FeaturePageTemplate } from "@/components/pages/FeaturePageTemplate";
import { HomeworkBuilderMockup } from "@/components/beaver-mockups";

const texts = {
  en: {
    badge: "Teaching & Learning",
    title: "Homework System",
    highlight: "AI-assisted from prompt to submission",
    description:
      "A 3-panel Resources Factory — describe what you want to teach, AI drafts differentiated homework grounded in your curriculum. Students submit with audio, video, or text. Auto-graded with AI review.",
    trustIndicator1: "AI-generated in seconds",
    trustIndicator2: "Grounded in curriculum",
    trustIndicator3: "Audio & video submissions",
    features: [
      { icon: Sparkles, title: "Resources Factory", description: "3-panel workspace — chat history, AI conversation, live preview. Everything you need to build homework in one place." },
      { icon: Brain, title: "Curriculum-grounded AI", description: "Every question AI generates is tied to skills in your curriculum. No hallucinations." },
      { icon: BookOpen, title: "Differentiated levels", description: "Generate 3 difficulty levels automatically — Foundation, Developing, Advanced." },
      { icon: Mic, title: "Audio & video submissions", description: "Students can record speaking tasks, poetry readings, and reflections." },
      { icon: CheckCircle2, title: "AI-assisted grading", description: "AI pre-marks objective questions and drafts feedback for teacher review." },
      { icon: Send, title: "One-tap publishing", description: "Publish to ClassShop with a single click — auto-delivered to students." },
    ],
    howItWorks: [
      { step: 1, title: "Describe the task", description: "Tell AI what you want students to practice and which skills to assess." },
      { step: 2, title: "AI drafts the homework", description: "Differentiated questions, answer key, and rubric — in seconds." },
      { step: 3, title: "Publish & collect", description: "One-tap publish. Students submit. AI helps you grade faster." },
    ],
  },
  "zh-HK": {
    badge: "教學與學習",
    title: "功課系統",
    highlight: "從提示到提交的 AI 輔助",
    description:
      "三欄式資源工廠——描述想教甚麼，AI 即時以課程為基礎生成差異化功課。學生以音訊、影片或文字提交。AI 輔助評分。",
    trustIndicator1: "AI 秒速生成",
    trustIndicator2: "以課程為基礎",
    trustIndicator3: "音訊與影片提交",
    features: [
      { icon: Sparkles, title: "資源工廠", description: "三欄工作空間——對話記錄、AI 對話、即時預覽。一站式建構功課。" },
      { icon: Brain, title: "課程為本的 AI", description: "AI 生成的每條題目都連結到你的課程技能——絕無幻覺。" },
      { icon: BookOpen, title: "差異化難度", description: "自動生成 3 個難度——基礎、進階、高階。" },
      { icon: Mic, title: "音訊與影片提交", description: "學生可錄製口語任務、詩歌朗讀與反思。" },
      { icon: CheckCircle2, title: "AI 輔助評分", description: "AI 預先批改客觀題並草擬評語供教師審閱。" },
      { icon: Send, title: "一鍵發佈", description: "一鍵發佈至 ClassShop——自動派發給學生。" },
    ],
    howItWorks: [
      { step: 1, title: "描述任務", description: "告訴 AI 學生要練習甚麼以及評估哪些技能。" },
      { step: 2, title: "AI 草擬功課", description: "差異化題目、答案與評分準則——秒速完成。" },
      { step: 3, title: "發佈與收取", description: "一鍵發佈。學生提交。AI 協助更快評分。" },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const rawLang = (await params).lang;
  const lang = rawLang === "zh-HK" ? "zh-HK" : "en";
  const t = texts[lang] ?? texts.en;
  return buildPageMetadata({
    lang,
    path: "/features/homework",
    title: `${t.title} — ${t.highlight} | KiwiBee`,
    description: t.description,
  });
}

export default async function HomeworkPage({ params }: { params: Promise<{ lang: string }> }) {
  const rawLang = (await params).lang;
  const lang: Locale = rawLang === "zh-HK" ? "zh-HK" : rawLang === "vi" ? "vi" : "en";
  const contentLang = lang === "zh-HK" ? "zh-HK" : "en";
  const t = texts[contentLang] ?? texts.en;

  return (
    <FeaturePageTemplate
      badge={t.badge}
      badgeIcon={FileText}
      title={t.title}
      highlight={t.highlight}
      description={t.description}
      features={t.features}
      howItWorks={t.howItWorks}
      trustIndicators={[t.trustIndicator1, t.trustIndicator2, t.trustIndicator3]}
      lang={lang}
      mockup={<HomeworkBuilderMockup lang={lang} />}
    />
  );
}
