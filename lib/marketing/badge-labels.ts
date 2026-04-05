import "server-only";
import type { Locale } from "@/lib/i18n/config";

export const marketingBadgeLabels: Record<
  string,
  {
    core: string;
    secure: string;
    free: string;
    enterprise: string;
  }
> = {
  en: {
    core: "Core",
    secure: "Secure",
    free: "FREE",
    enterprise: "Enterprise",
  },
  "zh-HK": {
    core: "核心",
    secure: "安全",
    free: "免費",
    enterprise: "企業級",
  },
};
