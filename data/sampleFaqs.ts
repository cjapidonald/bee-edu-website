export interface SampleFaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
  display_order: number;
}

export const SAMPLE_FAQS: Record<string, SampleFaqItem[]> = {
  vi: [
    { id: "faq-vi-1", category: "Bảng giá", display_order: 1, question: "Có gói giá hàng tháng cho giáo viên không?", answer: "Gói giá hàng tháng sẽ sớm ra mắt. Hiện tại, hãy liên hệ tư vấn để biết bảng giá cho trường." },
    { id: "faq-vi-2", category: "AI & An toàn", display_order: 2, question: "Học sinh có thể sử dụng AI an toàn không?", answer: "Có. Trường có thể bật Chế độ An toàn và kiểm soát truy cập bằng phân quyền theo vai trò." },
    { id: "faq-vi-3", category: "Nền tảng", display_order: 3, question: "Có bao nhiêu module?", answer: "Hơn 20 module: ClassSpark, sổ điểm, lập lịch, thi cử, TeacherLab AI, nhắn tin, cổng phụ huynh, và nhiều hơn nữa." },
    { id: "faq-vi-4", category: "Triển khai", display_order: 4, question: "Mất bao lâu để triển khai?", answer: "Hầu hết các trường hoạt động trong 1-2 tuần với hỗ trợ của đội ngũ." },
    { id: "faq-vi-5", category: "Hỗ trợ", display_order: 5, question: "Liên hệ hỗ trợ như thế nào?", answer: "Email, WhatsApp hoặc trang Liên hệ để đặt lịch demo." },
  ],
  en: [
    {
      id: "faq-en-1",
      category: "Pricing",
      display_order: 1,
      question: "Do you offer teacher monthly pricing?",
      answer:
        "Teacher monthly pricing is coming soon (planned target around US$9.83 per teacher/month). For now, contact sales for school pricing and package details.",
    },
    {
      id: "faq-en-2",
      category: "AI & Safety",
      display_order: 2,
      question: "Can students use Elementals safely?",
      answer:
        "Yes. Schools can enable Safe Mode for student-facing use, and access is controlled with role-based permissions.",
    },
    {
      id: "faq-en-3",
      category: "Platform",
      display_order: 3,
      question: "Why use one platform instead of many tools?",
      answer:
        "A unified platform reduces duplicate data entry, keeps workflows consistent across roles, and improves reporting because everything lives in one system.",
    },
    {
      id: "faq-en-4",
      category: "Implementation",
      display_order: 4,
      question: "Do you help schools with onboarding and setup?",
      answer:
        "Yes. We offer implementation services, data migration guidance, and training sessions for school teams.",
    },
    {
      id: "faq-en-5",
      category: "Security",
      display_order: 5,
      question: "Is our data secure?",
      answer:
        "We use role-based access control and apply standard security practices to protect data in transit and at rest. For details, see our Privacy Policy.",
    },
    {
      id: "faq-en-6",
      category: "Support",
      display_order: 6,
      question: "How can I contact support?",
      answer:
        "Email hello@elementals.com or message us on WhatsApp. You can also use the Contact page to book a demo.",
    },
  ],
  "zh-HK": [
    {
      id: "faq-zh-1",
      category: "價格",
      display_order: 1,
      question: "有教師月費方案嗎？",
      answer:
        "教師月費方案即將推出（目標約為每位教師每月 US$9.83）。目前請聯絡銷售了解學校方案與報價。",
    },
    {
      id: "faq-zh-2",
      category: "AI 與安全",
      display_order: 2,
      question: "學生可以安全使用 Elementals 嗎？",
      answer:
        "可以。學校可為學生端啟用 Safe Mode，並以角色權限控制存取與可見範圍。",
    },
    {
      id: "faq-zh-3",
      category: "平台",
      display_order: 3,
      question: "為什麼用一個平台，而不是多個工具？",
      answer:
        "統一平台可減少重複輸入、讓各角色流程更一致，並提升報告與數據洞察的準確性（因為所有資料都在同一系統內）。",
    },
    {
      id: "faq-zh-4",
      category: "導入",
      display_order: 4,
      question: "你們會協助學校導入與設定嗎？",
      answer:
        "會。我們提供導入服務、資料遷移建議，以及針對學校團隊的培訓。",
    },
    {
      id: "faq-zh-5",
      category: "資安與私隱",
      display_order: 5,
      question: "資料安全嗎？",
      answer:
        "我們採用角色權限控制並套用標準資安做法保護資料傳輸與儲存。詳情可參閱私隱政策。",
    },
    {
      id: "faq-zh-6",
      category: "支援",
      display_order: 6,
      question: "如何聯絡支援？",
      answer:
        "你可以電郵至 hello@elementals.com 或透過 WhatsApp 聯絡我們；亦可在聯絡頁面預約演示。",
    },
  ],
};
