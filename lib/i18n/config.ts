export const i18n = {
  defaultLocale: 'vi',
  locales: ['vi', 'en', 'zh-HK'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

export const localeNames: Record<Locale, string> = {
  'vi': 'Tiếng Việt',
  'en': 'English',
  'zh-HK': '繁體中文',
};

export const localeLabels: Record<Locale, string> = {
  'vi': 'Vietnamese',
  'en': 'English',
  'zh-HK': 'Chinese (Traditional)',
};

export const htmlLangMap: Record<Locale, string> = {
  'vi': 'vi',
  'en': 'en',
  'zh-HK': 'zh-Hant-HK',
};

export const ogLocaleMap: Record<Locale, string> = {
  'vi': 'vi_VN',
  'en': 'en_US',
  'zh-HK': 'zh_HK',
};
