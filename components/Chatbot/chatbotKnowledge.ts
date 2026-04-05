// Chatbot knowledge base for Bee Education AI
// Simplified version for Next.js

import type { ChatbotCategory } from "./types";

export interface KnowledgeEntry {
  keywords: string[];
  question: string;
  answer: string;
  category: ChatbotCategory;
  followUp?: string[];
  priority?: number;
  pageLink?: string;
  pageLinkText?: string;
}

type SupportedLang = "en" | "zh-HK";

const getSupportedLang = (lang?: string): SupportedLang => (lang === "zh-HK" ? "zh-HK" : "en");

export const knowledgeBase: KnowledgeEntry[] = [
  {
    keywords: ["what", "beeeducation", "platform", "about", "do", "is"],
    question: "What is Bee Education AI?",
    answer:
      "Bee Education AI is an all-in-one school management platform designed to replace disconnected tools across teaching, operations, and communication. With **16+ specialized user roles** and **20+ integrated modules**, we cover everything from classroom behavior and gradebooks to scheduling, exams, curriculum, document workflows, HR, finance, and reporting.\n\nOur AI offers simple modes—**Fast / Balanced / Deep**—plus **Safe Mode** for student-facing use.",
    category: "general",
    followUp: ["What features do you offer?", "How much does it cost?"],
    priority: 10,
    pageLink: "/about",
    pageLinkText: "Learn more about us",
  },
  {
    keywords: ["price", "cost", "pricing", "pay", "subscription", "free", "plan"],
    question: "How much does it cost?",
    answer:
      "We currently offer **School All-in-One (custom quote)** for schools:\n\n• Full school platform access\n• Admin dashboard + 16+ specialized roles\n• Annual invoicing and rollout support\n\n**Teacher monthly pricing is coming soon** (target around **US$9.83 per teacher/month**).\n\nFor package details and pricing, contact sales.",
    category: "pricing",
    followUp: ["Do you have plans for schools?", "How can I contact sales?"],
    priority: 10,
    pageLink: "/pricing",
    pageLinkText: "View school pricing",
  },
  {
    keywords: ["feature", "features", "can", "capabilities", "tools", "modules"],
    question: "What features do you offer?",
    answer:
      "Our platform includes **20+ integrated modules**. Key ones include:\n\n**1. Behavior Tracking** - ClassSpark points (included)\n**2. Skills Gradebook** - Mastery tracking with heatmaps\n**3. Scheduling** - AI-powered timetables\n**4. Exams & Marking** - Complete assessment lifecycle\n**5. Curriculum & Skills** - Standards alignment\n**6. TeacherLab & AI** - Planning, reports, and teaching workflows\n**7. Document Hub** - Centralized documents and policies\n**8. HR & Onboarding** - Recruitment, contracts, and workflows\n**9. Finance & Billing** - Payroll, fees, and approvals\n**10. Insights & Reports** - Analytics dashboards",
    category: "features",
    followUp: ["Tell me about AI features", "How does the gradebook work?"],
    priority: 10,
    pageLink: "/features/classspark",
    pageLinkText: "Explore features",
  },
  {
    keywords: ["ai", "artificial", "intelligence", "smart", "automated"],
    question: "What AI features do you have?",
    answer:
      "We offer **10 AI tools**:\n\n**1. AI Insights Dashboard** - Ask questions about your data\n**2. Researcher Platform** - Chat workspace with exports\n**3. AI Student Reports** - Generate report drafts\n**4. AI Homework Builder** - Differentiated assignments\n**5. AI Exam Marking** - Speed up grading\n**6. AI Teaching Assistant** - Lesson support\n**7. AI Presentation Builder** - Generate slides\n**8. AI Schedule Optimizer** - Build timetables\n**9. AI Rubric Generator** - Standards-aligned rubrics\n**10. AI Lesson Planning** - Draft lesson plans\n\nChoose **Fast / Balanced / Deep** modes.",
    category: "ai",
    priority: 10,
  },
  {
    keywords: ["behavior", "classdojo", "classspark", "tracking", "points", "classroom"],
    question: "Tell me about behavior tracking",
    answer:
      "Our **ClassSpark behavior system** is built-in:\n\n**Live Sessions:**\n• Award/deduct points in real-time\n• Custom behavior categories\n• Student monster avatars\n\n**Gamification:**\n• Leaderboards & badges\n• Weekly competitions\n\n**Parent Integration:**\n• Real-time notifications\n• Weekly summaries\n• Two-way messaging",
    category: "features",
    priority: 8,
    pageLink: "/features/classspark",
    pageLinkText: "Learn about behavior tracking",
  },
  {
    keywords: ["gradebook", "grading", "assessment", "marks", "skills", "heatmap"],
    question: "How does the gradebook work?",
    answer:
      "Our **Skills-Based Gradebook**:\n\n**Mastery Tracking:**\n• 4-level scale (Beginning → Mastered)\n• Visual progress indicators\n\n**Heatmap Dashboard:**\n• Color-coded class view\n• Spot struggling students instantly\n\n**AI Features:**\n• Skill gap analysis\n• Suggested interventions\n• Automatic grouping",
    category: "features",
    priority: 8,
    pageLink: "/features/gradebook",
    pageLinkText: "Explore the gradebook",
  },
  {
    keywords: ["schedule", "scheduling", "timetable", "calendar"],
    question: "How does scheduling work?",
    answer:
      "Our **Magnetic Scheduling** module:\n\n**Smart Generation:**\n• AI-generated optimal timetables\n• Drag-and-drop adjustment\n• Automatic conflict detection\n\n**Cover Management:**\n• Teacher leave → classes flagged\n• Cover teacher finder\n• Automatic notifications",
    category: "features",
    priority: 7,
    pageLink: "/features/scheduling",
    pageLinkText: "Learn about scheduling",
  },
  {
    keywords: ["exam", "test", "assessment", "marking", "quiz"],
    question: "Tell me about the exam platform",
    answer:
      "Our **Exam Platform** handles:\n\n**Creation:**\n• Multiple question types\n• AI question generation\n• Rubric builder\n\n**AI Marking:**\n• Automatic MCQ grading\n• AI essay analysis\n• Human-in-the-loop review\n\n**Workflow:**\nCreate → Distribute → AI Mark → Review → Approve → Release",
    category: "features",
    priority: 7,
    pageLink: "/features/exams",
    pageLinkText: "Explore exams platform",
  },
  {
    keywords: ["free", "trial", "try", "test", "demo"],
    question: "Is there a free trial?",
    answer:
      "We are not publicly offering a free trial right now.\n\n**Teacher monthly pricing is coming soon** (target around **US$9.83 per teacher/month**).\n\nFor current pricing and rollout options, contact sales for a school quote.",
    category: "pricing",
    priority: 9,
    pageLink: "/contact",
    pageLinkText: "Contact sales",
  },
  {
    keywords: ["contact", "support", "help", "talk", "human"],
    question: "How can I get support?",
    answer:
      "**We're here to help!**\n\n**Contact Options:**\n• Email: hello@beeeducation.com\n• WhatsApp: +852 94954912\n• Address: 721-725 Nathan Road, Belgian Bank Building, Mongkok, Hong Kong\n\n**Self-Service:**\n• Documentation & tutorials\n• FAQ section\n• In-app guides\n\n**For Schools:**\n• Dedicated success manager\n• On-site training",
    category: "support",
    priority: 7,
    pageLink: "/contact",
    pageLinkText: "Contact us",
  },
  {
    keywords: ["start", "begin", "signup", "register", "account", "get started"],
    question: "How do I get started?",
    answer:
      "**Getting started takes 2 minutes:**\n\n1. **Contact Sales** - Share your school size and goals\n2. **Scope & Quote** - Confirm package, rollout, and pricing\n3. **Launch** - Set up your school and start onboarding your team\n\nTeacher monthly pricing is coming soon (target around US$9.83 per teacher/month).",
    category: "general",
    priority: 8,
    pageLink: "/contact",
    pageLinkText: "Contact sales",
  },
  {
    keywords: ["teacher", "teachers", "educator"],
    question: "What can teachers do?",
    answer:
      "**Teachers** get a comprehensive dashboard:\n\n**Daily Tools:**\n• Live classroom behavior tracking\n• Skills-based gradebook\n• Lesson planning workspace\n• Homework assignment & grading\n\n**AI Features:**\n• AI Insights Dashboard\n• Content creation tools\n• Homework generation\n• Presentation builder",
    category: "roles",
    priority: 7,
    pageLink: "/for-teachers",
    pageLinkText: "Learn more for teachers",
  },
  {
    keywords: ["parent", "parents", "family", "guardian"],
    question: "What can parents see?",
    answer:
      "**Parents** get visibility into education:\n\n**Real-Time Updates:**\n• Behavior point notifications\n• Homework assignments\n• Grade updates\n• Attendance records\n\n**Reports:**\n• Term reports\n• Skills mastery heatmaps\n• Behavior trends",
    category: "roles",
    priority: 6,
    pageLink: "/for-parents",
    pageLinkText: "Parent features",
  },
  {
    keywords: ["student", "students", "learner"],
    question: "What can students do?",
    answer:
      "**Students** have their own dashboard:\n\n**Personal Space:**\n• Monster avatar selection\n• View behavior points\n• Track skill progress\n• Achievement badges\n\n**Homework:**\n• View assignments\n• Submit work\n• See feedback",
    category: "roles",
    priority: 6,
    pageLink: "/for-students",
    pageLinkText: "Student features",
  },
  {
    keywords: ["secure", "security", "safe", "privacy", "data"],
    question: "Is my data secure?",
    answer:
      "**Security is core to our design:**\n\n**Data Protection:**\n• Encryption in transit and at rest\n• Role-based access control\n• Audit logs\n\n**Privacy:**\n• Student data never sold\n• Clear data ownership\n\n**AI Safety:**\n• Safe Mode for students\n• School-controlled policies",
    category: "security",
    priority: 8,
  },
  {
    keywords: ["analytics", "student 360", "insights", "risk", "data", "dashboard"],
    question: "Tell me about AI Analytics",
    answer:
      "Our **AI Analytics Hub** provides:\n\n**Student 360 Profiles:**\n• Complete student history in one view\n• Academic, behavior, and attendance data\n• Cross-module insights\n\n**Risk Detection:**\n• AI-powered early warning system\n• Identify struggling students\n• Suggested interventions\n\n**Custom Dashboards:**\n• Role-specific analytics views\n• Export reports for stakeholders",
    category: "features",
    priority: 7,
    pageLink: "/features/ai-analytics",
    pageLinkText: "Learn about AI Analytics",
  },
  {
    keywords: ["document", "documents", "files", "google drive", "smart lists", "policies"],
    question: "How does Document Hub work?",
    answer:
      "Our **Document Hub** centralizes school documents:\n\n**Smart Lists:**\n• Auto-categorized documents\n• Quick search and filters\n• Version control\n\n**Google Integration:**\n• Sync with Google Drive\n• Shared Drives support\n• Real-time collaboration\n\n**Policy Management:**\n• Store and distribute policies\n• Track acknowledgments\n• Audit trails",
    category: "features",
    priority: 6,
    pageLink: "/features/document-hub",
    pageLinkText: "Explore Document Hub",
  },
  {
    keywords: ["portfolio", "portfolios", "showcase", "student work", "achievements"],
    question: "What are Digital Portfolios?",
    answer:
      "**Digital Portfolios** showcase student growth:\n\n**Public Sharing:**\n• Shareable portfolio links\n• Perfect for parent conferences\n• College application support\n\n**Content:**\n• Curated work samples\n• Project highlights\n• Achievement badges\n• Skills progression timeline",
    category: "features",
    priority: 6,
    pageLink: "/features/portfolios",
    pageLinkText: "Learn about Portfolios",
  },
  {
    keywords: ["emergency", "alert", "alerts", "communication", "urgent", "drill", "safety"],
    question: "How do Emergency Communications work?",
    answer:
      "Our **Emergency Communications** system ensures rapid alerts:\n\n**Multi-Channel:**\n• SMS, email, push notifications\n• In-app alerts\n• Simultaneous delivery\n\n**Features:**\n• Pre-built emergency templates\n• Delivery confirmation tracking\n• Read receipts\n• Drill mode for practice",
    category: "features",
    priority: 6,
    pageLink: "/features/emergency-communications",
    pageLinkText: "Learn about Emergency Comms",
  },
  {
    keywords: ["wordwall", "games", "interactive", "quiz", "quizzes", "activities"],
    question: "What is Wordwall?",
    answer:
      "**Wordwall** creates interactive learning games:\n\n**Game Types:**\n• Quizzes and flashcards\n• Matching games\n• Word searches\n• Multiplayer challenges\n\n**Integration:**\n• Auto-generate from lesson content\n• Results sync to gradebook\n• Real-time classroom games",
    category: "features",
    priority: 6,
    pageLink: "/features/wordwall",
    pageLinkText: "Explore Wordwall",
  },
  {
    keywords: ["sparkspace", "spark space", "learning space", "ai tutor", "tutoring"],
    question: "What is SparkSpace?",
    answer:
      "**SparkSpace** is our AI-powered learning space feature:\n\n**For Teachers:**\n• Create tailored AI tutoring environments\n• Set learning objectives and guardrails\n• Monitor student interactions\n\n**For Students:**\n• Personalized AI tutoring sessions\n• Safe, teacher-controlled environment\n• Interactive learning conversations\n\nSparkSpace lets teachers harness AI to provide individualized support at scale.",
    category: "features",
    priority: 7,
    pageLink: "/features/ai",
    pageLinkText: "Learn about SparkSpace",
  },
  {
    keywords: ["new", "latest", "recent", "updates", "coming soon", "roadmap"],
    question: "What's new in Bee Education AI?",
    answer:
      "**Recent & Upcoming Features:**\n\n**Now Available:**\n• AI Analytics Hub with Student 360\n• Document Hub with Google Drive sync\n• Digital Portfolios for students\n• Emergency Communications system\n• Wordwall interactive games\n• Gamification with XP & badges\n\n**Coming Soon:**\n• AI Tutor for students\n• Microcredentials & digital badges\n• Enhanced mobile experience",
    category: "general",
    priority: 7,
    followUp: ["Tell me about AI Analytics", "What is Wordwall?"],
  },
];


export const knowledgeBaseZhHK: KnowledgeEntry[] = [
  {
    keywords: ["beeeducation", "平台", "介紹", "做什麼", "是什麼", "甚麼", "what", "about"],
    question: "Bee Education AI 是什麼？",
    answer: `Bee Education AI 是一個一站式的 AI 原生學校管理平台，旨在取代教學、營運與溝通中分散的工具。透過 **16+ 個專業用戶角色** 及 **20+ 個整合模組**，我們涵蓋：行為追蹤、成績冊、排課、考試、課程規劃、文件流程、人力資源、財務、溝通與報告等。

AI 亦提供 **Fast / Balanced / Deep** 模式，以及面向學生使用的 **Safe Mode**。`,
    category: "general",
    followUp: ["你們有哪些功能？", "價格是多少？"],
    priority: 10,
    pageLink: "/about",
    pageLinkText: "了解更多",
  },
  {
    keywords: ["價格", "收費", "價錢", "pricing", "price", "cost", "plan", "免費", "trial", "試用", "訂閱"],
    question: "價格是多少？",
    answer: `目前我們主要提供 **School All-in-One（學校定制報價）**：

• 全校功能
• 管理員儀表板 + 16+ 專業角色
• 年度發票與導入支援

**教師月費方案即將推出**（目標約為 **每位教師每月 US$9.83**）。

如需目前可用方案與具體價格，請聯絡銷售團隊。`,
    category: "pricing",
    followUp: ["學校方案怎樣收費？", "如何聯絡銷售？"],
    priority: 10,
    pageLink: "/pricing",
    pageLinkText: "查看學校方案",
  },
  {
    keywords: ["功能", "模組", "features", "modules", "可以做", "capabilities"],
    question: "你們有哪些功能？",
    answer: `我們的平台提供 **20+ 個整合模組**。重點包括：

**1. 行為追蹤**（ClassSpark 積分，內建）
**2. 技能成績冊**（掌握度追蹤與熱力圖）
**3. 排課**（AI 智能時間表）
**4. 考試與批改**（完整評估流程）
**5. 課程與技能**（標準/技能對齊）
**6. TeacherLab & AI**（備課、報告與教學工作流程）
**7. 文件中心**（集中管理文件與政策）
**8. 人力資源與入職**（招聘、合約與流程）
**9. 財務與收費**（薪資、收費與審批）
**10. 洞察與報告**（數據看板與報告草稿）`,
    category: "features",
    followUp: ["AI 有什麼功能？", "成績冊怎樣運作？"],
    priority: 10,
    pageLink: "/features",
    pageLinkText: "瀏覽所有功能",
  },
  {
    keywords: ["ai", "人工智能", "教案", "備課", "生成", "批改", "assistant", "mode", "safe"],
    question: "AI 有什麼功能？",
    answer: `我們提供多種 AI 教學與行政工具，例如：AI 教案與教材生成、作業建議、考試批改、學期評語草稿、數據洞察分析等。

你亦可選擇 **Fast / Balanced / Deep** 模式，並為學生端啟用 **Safe Mode**。`,
    category: "ai",
    followUp: ["價格是多少？", "你們有哪些功能？"],
    priority: 10,
    pageLink: "/features/ai",
    pageLinkText: "查看 AI 功能",
  },
  {
    keywords: ["聯絡", "contact", "whatsapp", "電話", "地址", "電郵", "email", "support", "幫助"],
    question: "怎樣聯絡你們？",
    answer: `**我們很樂意協助！**

**聯絡方式：**
• 電郵：hello@beeeducation.com
• WhatsApp：+852 94954912
• 地址：721-725 Nathan Road, Belgian Bank Building, Mongkok, Hong Kong

你也可以到聯絡頁面預約演示或留言。`,
    category: "support",
    followUp: ["我想預約演示", "價格是多少？"],
    priority: 9,
    pageLink: "/contact",
    pageLinkText: "前往聯絡頁面",
  },
  {
    keywords: ["安全", "私隱", "資料", "security", "privacy", "data", "gdpr", "ferpa", "coppa"],
    question: "資料安全嗎？",
    answer: `**安全是我們設計核心：**

**資料保護：**
• 傳輸與儲存加密
• 角色權限控制
• 審計記錄

**AI 安全：**
• 學生端 Safe Mode
• 校方可控政策`,
    category: "security",
    followUp: ["你們如何保護學生資料？", "AI Safe Mode 是什麼？"],
    priority: 8,
    pageLink: "/privacy",
    pageLinkText: "查看私隱政策",
  },
  {
    keywords: ["開始", "註冊", "試用", "signup", "register", "account", "登入", "login"],
    question: "如何開始使用？",
    answer: `**開始只需 2 分鐘：**

1. 聯絡銷售並提供學校規模與需求
2. 確認方案範圍、報價與導入時間
3. 建立帳戶並開始團隊導入

教師月費方案即將推出（目標約為每位教師每月 US$9.83）。`,
    category: "general",
    followUp: ["價格是多少？", "你們有哪些功能？"],
    priority: 8,
    pageLink: "/contact",
    pageLinkText: "聯絡銷售",
  },
  {
    keywords: ["分析", "analytics", "學生360", "洞察", "風險", "數據"],
    question: "AI 分析中心是什麼？",
    answer: `**AI 分析中心**提供：

**學生 360 度檔案：**
• 一個視圖查看完整學生歷史
• 學業、行為和出勤數據
• 跨模組洞察

**風險檢測：**
• AI 驅動的預警系統
• 識別需要幫助的學生
• 建議干預措施`,
    category: "features",
    priority: 7,
    pageLink: "/features/ai-analytics",
    pageLinkText: "了解 AI 分析中心",
  },
  {
    keywords: ["文件", "文檔", "document", "google", "雲端", "政策"],
    question: "文件中心如何運作？",
    answer: `**文件中心**集中管理學校文件：

**智能清單：**
• 自動分類文件
• 快速搜索和篩選
• 版本控制

**Google 整合：**
• 與 Google 雲端硬碟同步
• 支援共用雲端硬碟
• 即時協作`,
    category: "features",
    priority: 6,
    pageLink: "/features/document-hub",
    pageLinkText: "探索文件中心",
  },
  {
    keywords: ["作品集", "portfolio", "展示", "學生作品", "成就"],
    question: "數碼作品集是什麼？",
    answer: `**數碼作品集**展示學生成長：

**公開分享：**
• 可分享的作品集連結
• 適合家長會議
• 支援大學申請

**內容：**
• 精選作品樣本
• 項目亮點
• 成就徽章
• 技能進度時間軸`,
    category: "features",
    priority: 6,
    pageLink: "/features/portfolios",
    pageLinkText: "了解數碼作品集",
  },
  {
    keywords: ["緊急", "警報", "通訊", "緊急情況", "演習", "安全"],
    question: "緊急通訊系統如何運作？",
    answer: `**緊急通訊**系統確保快速警報：

**多渠道：**
• 短信、電郵、推送通知
• 應用內警報
• 同時發送

**功能：**
• 預建緊急模板
• 送達確認追蹤
• 已讀回執
• 演習模式`,
    category: "features",
    priority: 6,
    pageLink: "/features/emergency-communications",
    pageLinkText: "了解緊急通訊",
  },
  {
    keywords: ["wordwall", "遊戲", "互動", "測驗", "活動"],
    question: "Wordwall 是什麼？",
    answer: `**Wordwall** 創建互動學習遊戲：

**遊戲類型：**
• 測驗和閃卡
• 配對遊戲
• 文字搜索
• 多人挑戰

**整合：**
• 從課程內容自動生成
• 結果同步到成績冊
• 即時課堂遊戲`,
    category: "features",
    priority: 6,
    pageLink: "/features/wordwall",
    pageLinkText: "探索 Wordwall",
  },
  {
    keywords: ["sparkspace", "學習空間", "ai導師", "輔導"],
    question: "SparkSpace 是什麼？",
    answer: `**SparkSpace** 是我們的 AI 學習空間功能：

**教師端：**
• 建立量身定制的 AI 輔導環境
• 設定學習目標與安全規範
• 監控學生互動

**學生端：**
• 個人化 AI 輔導課程
• 安全的教師控制環境
• 互動式學習對話

SparkSpace 讓教師利用 AI 大規模提供個人化支援。`,
    category: "features",
    priority: 7,
    pageLink: "/features/ai",
    pageLinkText: "了解 SparkSpace",
  },
  {
    keywords: ["新功能", "最新", "更新", "即將推出", "路線圖"],
    question: "Bee Education AI 有什麼新功能？",
    answer: `**最新及即將推出的功能：**

**現已推出：**
• AI 分析中心與學生 360
• 文件中心與 Google 雲端硬碟同步
• 學生數碼作品集
• 緊急通訊系統
• Wordwall 互動遊戲
• 遊戲化功能（經驗值與徽章）

**即將推出：**
• 學生 AI 導師
• 微證書與數碼徽章
• 增強的移動體驗`,
    category: "general",
    priority: 7,
    followUp: ["AI 分析中心是什麼？", "Wordwall 是什麼？"],
  },
];

// Greeting messages
export const greetingMessages = [
  "Hi! I'm Einstein. Ask me anything about Bee Education AI—features, pricing, or getting started.",
  "Hello! Want a quick tour? Ask about roles, modules, AI modes, or setup.",
  "Hey there—how can I help? Try: pricing, behavior tracking, gradebook, or AI features.",
];

// Fallback responses
export const fallbackResponses = [
  "I want to make sure I answer accurately—could you rephrase that? Try asking about features, pricing, or getting started.",
  "Tell me your goal (e.g., lesson planning, behavior tracking) and I'll guide you.",
  "I'm not fully sure. Try: 'What's included free?', 'How does the gradebook work?', or 'How do schools start?'",
];

// Suggested questions
export const suggestedQuestions = [
  "What features do you offer?",
  "How much does it cost?",
  "Tell me about AI features",
];

// Traditional Chinese (zh-HK) chatbot strings
export const greetingMessagesZhHK = [
  "你好！我是 Einstein。你可以問我 Bee Education AI 的功能、價格、或如何開始使用。",
  "哈囉！想快速了解？可以問：角色、模組、AI 模式、或導入流程。",
  "你好—我可以協助你了解定價、行為追蹤、成績冊、或 AI 功能。",
];

export const fallbackResponsesZhHK = [
  "我想確保回答準確—你可以換個說法嗎？例如：功能、價格、或如何開始。",
  "你想達成什麼目標？（例如備課、行為管理、評估）我可以建議你從哪個模組開始。",
  "我暫時不太確定。你可以試試問：『免費方案包含什麼？』『成績冊怎樣運作？』『學校如何開始？』",
];

export const suggestedQuestionsZhHK = [
  "你們有哪些功能？",
  "價格是多少？",
  "AI 有什麼功能？",
];

export const getGreetingMessages = (lang: string) =>
  getSupportedLang(lang) === "zh-HK" ? greetingMessagesZhHK : greetingMessages;

export const getFallbackResponses = (lang: string) =>
  getSupportedLang(lang) === "zh-HK" ? fallbackResponsesZhHK : fallbackResponses;

export const getSuggestedQuestions = (lang: string) =>
  getSupportedLang(lang) === "zh-HK" ? suggestedQuestionsZhHK : suggestedQuestions;

// Find answer function
export function findAnswer(
  userMessage: string,
  conversationHistory: string[] = [],
  lang: string = "en"
): {
  answer: string;
  confidence: number;
  category: ChatbotCategory | null;
  followUps: string[];
  pageLink?: { path: string; text: string };
} {
  const normalizedMessage = userMessage.toLowerCase().trim();
  const words = normalizedMessage.split(/\s+/);

  const supportedLang = getSupportedLang(lang);
  const greetingMessagesForLang = getGreetingMessages(lang);
  const fallbackResponsesForLang = getFallbackResponses(lang);
  const suggestedQuestionsForLang = getSuggestedQuestions(lang);
  const knowledgeEntries = supportedLang === "zh-HK" ? [...knowledgeBaseZhHK, ...knowledgeBase] : knowledgeBase;


  // Check for greetings
  const greetingKeywords =
    supportedLang === "zh-HK"
      ? ["你好", "您好", "哈囉", "嗨", "早安", "早晨", "晚上好", "hi", "hello", "hey"]
      : ["hi", "hello", "hey", "greetings"];
  const isGreeting = greetingKeywords.some(
    (g) =>
      normalizedMessage === g ||
      normalizedMessage.startsWith(g + " ") ||
      normalizedMessage.startsWith(g + "!") ||
      normalizedMessage.startsWith(g + "！") ||
      normalizedMessage.startsWith(g + "，") ||
      normalizedMessage.startsWith(g + ",")
  );

  if (isGreeting && normalizedMessage.length < 20) {
    return {
      answer: greetingMessagesForLang[Math.floor(Math.random() * greetingMessagesForLang.length)],
      confidence: 1,
      category: "general",
      followUps: suggestedQuestionsForLang,
    };
  }

  // Check for thank you
  const thanksKeywords =
    supportedLang === "zh-HK"
      ? ["謝謝", "多謝", "thank", "thanks", "thx"]
      : ["thank", "thanks", "thx"];

  if (thanksKeywords.some((k) => normalizedMessage.includes(k)) && normalizedMessage.length < 50) {
    return {
      answer:
        supportedLang === "zh-HK"
          ? "不客氣！你還想了解 Bee Education AI 的哪些內容？"
          : "You're welcome! Is there anything else you'd like to know about Bee Education AI?",
      confidence: 1,
      category: null,
      followUps: suggestedQuestionsForLang,
    };
  }

  // Check for goodbye
  const goodbyeKeywords =
    supportedLang === "zh-HK"
      ? ["bye", "goodbye", "拜拜", "再見"]
      : ["bye", "goodbye"];

  if (goodbyeKeywords.some((k) => normalizedMessage.includes(k)) && normalizedMessage.length < 30) {
    return {
      answer:
        supportedLang === "zh-HK"
          ? "再見！如需協助，隨時可以回來問我。祝教學順利！"
          : "Goodbye! If you need pricing details, contact sales anytime. Best of luck with your teaching!",
      confidence: 1,
      category: null,
      followUps: [],
    };
  }

  // Score each knowledge entry
  let bestMatch: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledgeEntries) {
    let score = 0;
    const entryPriority = entry.priority || 5;

    for (const keyword of entry.keywords) {
      const kw = keyword.toLowerCase();

      if (normalizedMessage.includes(kw)) {
        score += 3;
      }

      if (words.includes(kw)) {
        score += 2;
      }

      for (const word of words) {
        if (word.length > 3 && (kw.includes(word) || word.includes(kw))) {
          score += 1;
        }
      }
    }

    score += entryPriority * 0.2;

    const recentlyAnswered = conversationHistory.some((h) =>
      h.includes(entry.answer.substring(0, 50))
    );
    if (recentlyAnswered) {
      score *= 0.3;
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && bestScore >= 3) {
    const followUps = bestMatch.followUp || suggestedQuestionsForLang;
    const pageLink =
      bestMatch.pageLink && bestMatch.pageLinkText
        ? { path: bestMatch.pageLink, text: bestMatch.pageLinkText }
        : undefined;

    return {
      answer: bestMatch.answer,
      confidence: Math.min(bestScore / 10, 1),
      category: bestMatch.category,
      followUps: followUps.slice(0, 3),
      pageLink,
    };
  }

  return {
    answer: fallbackResponsesForLang[Math.floor(Math.random() * fallbackResponsesForLang.length)],
    confidence: 0,
    category: null,
    followUps: suggestedQuestionsForLang,
  };
}
