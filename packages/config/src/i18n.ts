export const allLocales = ["zh", "en"] as const;

export type Locale = (typeof allLocales)[number];

export const localeDisplayNames: Record<Locale, string> = {
  zh: "中文",
  en: "English",
};

export const defaultLocale: Locale = "zh";

export const LOCALE_COOKIE = "locale";
