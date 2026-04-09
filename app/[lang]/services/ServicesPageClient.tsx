"use client";
const c: Record<string, { title: string; subtitle: string; items: { title: string; desc: string }[] }> = {
  vi: { title: "Dịch vụ Triển khai & Hỗ trợ", subtitle: "Từ cài đặt đến tối ưu hóa, chúng tôi đồng hành cùng bạn.", items: [{ title: "Triển khai", desc: "Vận hành hệ thống nhanh chóng." },{ title: "Đào tạo", desc: "Đào tạo toàn diện cho giáo viên và nhân viên." },{ title: "Hỗ trợ", desc: "Hỗ trợ kỹ thuật ưu tiên." },{ title: "Tích hợp", desc: "Tích hợp liền mạch với hệ thống hiện có." }] },
  en: { title: "Implementation & Support Services", subtitle: "From setup to optimization, we're with you.", items: [{ title: "Implementation & Setup", desc: "Get your system up and running quickly." },{ title: "Training & Onboarding", desc: "Comprehensive training for all staff." },{ title: "Ongoing Support", desc: "Priority technical assistance." },{ title: "Custom Integrations", desc: "Seamless integration with existing systems." }] },
};
export default function ServicesPageClient({ params }: { params: { lang: string } }) {
  const d = c[params.lang] || c.en;
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="text-center mb-16"><h1 className="text-4xl font-bold mb-4">{d.title}</h1><p className="text-lg text-gray-400 dark:text-gray-300 max-w-2xl mx-auto">{d.subtitle}</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {d.items.map((s) => (<div key={s.title} className="rounded-2xl border border-gray-700 dark:border-white/10 bg-gray-900 dark:bg-gray-900/5 p-8"><h3 className="text-xl font-semibold mb-3">{s.title}</h3><p className="text-gray-400 dark:text-gray-300">{s.desc}</p></div>))}
      </div>
    </div>
  );
}
