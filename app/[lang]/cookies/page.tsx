import { redirect } from "next/navigation";

interface CookiesPageProps {
  params: Promise<{ lang: string }>;
}

export default async function CookiesPage({ params }: CookiesPageProps) {
  const lang = (await params).lang === "zh-HK" ? "zh-HK" : "en";
  const target = lang === "en" ? "/privacy#cookie-settings" : `/${lang}/privacy#cookie-settings`;
  redirect(target);
}
