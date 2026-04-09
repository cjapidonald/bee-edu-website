"use client";
import type { Locale } from "@/lib/i18n/config";
interface FAQItem { id: string; question: string; answer: string; category?: string | null; display_order: number; }
const titles: Record<string, string> = { vi: "Câu hỏi Thường gặp", en: "Frequently Asked Questions", "zh-HK": "常見問題" };
export default function FAQPageClient({ lang, faqs }: { lang: Locale; faqs: FAQItem[] }) {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-12 text-center">{titles[lang] || titles.en}</h1>
      <div className="space-y-6">
        {faqs.map((faq) => (
          <details key={faq.id} className="group rounded-2xl border border-gray-700 dark:border-white/10 bg-gray-900 dark:bg-gray-900/5 p-6">
            <summary className="cursor-pointer text-lg font-semibold list-none flex items-center justify-between">{faq.question}<span className="ml-4 text-gray-400 group-open:rotate-180 transition-transform">▾</span></summary>
            <p className="mt-4 text-gray-400 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
