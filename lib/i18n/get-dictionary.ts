import 'server-only';
import type { Locale } from './config';

const dictionaries: Record<Locale, () => Promise<any>> = {
  vi: () => import('./dictionaries/vi.json').then((module) => module.default),
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  'zh-HK': () => import('./dictionaries/en.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
