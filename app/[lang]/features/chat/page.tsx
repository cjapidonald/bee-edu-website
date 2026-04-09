import { MessageSquare, Mic, Video, Phone, Hash, Shield, Paperclip } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { FeaturePageTemplate } from "@/components/pages/FeaturePageTemplate";
import { ChatMockup } from "@/components/beaver-mockups";

const texts = {
  en: {
    badge: "Communication",
    title: "Chat & Messaging",
    highlight: "Secure, in-app, audit-ready",
    description:
      "Real-time messaging between teachers, parents, and students. Direct messages, group channels, audio messages, and file attachments — all in one secure, audit-ready inbox.",
    trustIndicator1: "Audit-ready logs",
    trustIndicator2: "Audio + video calls",
    trustIndicator3: "Per-class channels",
    features: [
      { icon: MessageSquare, title: "Direct & group chat", description: "1-on-1 messages or per-class parent channels. Everything in one place." },
      { icon: Mic, title: "Voice messages", description: "Record and send audio messages — perfect for parents on the go." },
      { icon: Video, title: "Video calls", description: "Integrated video calls for parent conferences and teacher meetings." },
      { icon: Paperclip, title: "File attachments", description: "Share homework, reports, photos, and documents inline." },
      { icon: Hash, title: "Channels", description: "Create topic channels: English 5A parents, Science club, Staff room, and more." },
      { icon: Shield, title: "Audit-ready", description: "All messages logged for safeguarding compliance — exportable on demand." },
    ],
    howItWorks: [
      { step: 1, title: "Open a thread", description: "Direct message a parent or join a class channel." },
      { step: 2, title: "Send anything", description: "Text, voice, video, or files — all formats supported." },
      { step: 3, title: "Stay connected", description: "Real-time notifications keep everyone on the same page." },
    ],
  },
  "zh-HK": {
    badge: "溝通",
    title: "聊天與訊息",
    highlight: "安全、應用內、可審計",
    description:
      "教師、家長與學生之間的即時訊息。直接訊息、群組頻道、語音訊息與檔案附件——一站式安全可審計收件箱。",
    trustIndicator1: "可審計記錄",
    trustIndicator2: "語音與視訊通話",
    trustIndicator3: "每班頻道",
    features: [
      { icon: MessageSquare, title: "直接與群組聊天", description: "一對一訊息或每班家長頻道。一站式管理。" },
      { icon: Mic, title: "語音訊息", description: "錄製並發送語音訊息——適合忙碌的家長。" },
      { icon: Video, title: "視訊通話", description: "整合視訊通話——家長會議與教師會議。" },
      { icon: Paperclip, title: "檔案附件", description: "分享功課、報告、照片與文件。" },
      { icon: Hash, title: "頻道", description: "建立主題頻道：5A 英文家長、科學會、教師休息室等。" },
      { icon: Shield, title: "可審計", description: "所有訊息記錄以符合保護合規——按需匯出。" },
    ],
    howItWorks: [
      { step: 1, title: "開啟對話", description: "直接訊息家長或加入班級頻道。" },
      { step: 2, title: "發送任何內容", description: "文字、語音、影片或檔案——全部支援。" },
      { step: 3, title: "保持連結", description: "即時通知讓所有人同步。" },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const rawLang = (await params).lang;
  const lang = rawLang === "zh-HK" ? "zh-HK" : "en";
  const t = texts[lang] ?? texts.en;
  return buildPageMetadata({
    lang,
    path: "/features/chat",
    title: `${t.title} — ${t.highlight} | KiwiBee`,
    description: t.description,
  });
}

export default async function ChatPage({ params }: { params: Promise<{ lang: string }> }) {
  const rawLang = (await params).lang;
  const lang: Locale = rawLang === "zh-HK" ? "zh-HK" : rawLang === "vi" ? "vi" : "en";
  const contentLang = lang === "zh-HK" ? "zh-HK" : "en";
  const t = texts[contentLang] ?? texts.en;

  return (
    <FeaturePageTemplate
      badge={t.badge}
      badgeIcon={MessageSquare}
      title={t.title}
      highlight={t.highlight}
      description={t.description}
      features={t.features}
      howItWorks={t.howItWorks}
      trustIndicators={[t.trustIndicator1, t.trustIndicator2, t.trustIndicator3]}
      lang={lang}
      mockup={<ChatMockup lang={lang} />}
    />
  );
}
