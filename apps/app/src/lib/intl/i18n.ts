import { allLocales, defaultLocale, LOCALE_COOKIE } from "@jiwen/config";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { createInstance } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";
import { resources } from "@/lib/intl/resources";

const isServer = typeof window === "undefined";

const cookieSettings = !isServer
  ? {
      lookupCookie: LOCALE_COOKIE,
      cookieDomain: window.location.hostname,
      cookieSecure: window.location.protocol === "https:",
      cookieOptions: { path: "/", sameSite: "lax" as const },
      caches: ["cookie"],
      cookieMinutes: 525600,
    }
  : {};

const i18n = createInstance();
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string) => import(`./translations/${language}.ts`),
    ),
  )
  .init({
    resources,
    fallbackLng: defaultLocale,
    supportedLngs: allLocales,
    detection: {
      order: ["cookie", "navigator"],
      ...cookieSettings,
    },
    interpolation: { escapeValue: false },
    partialBundledLanguages: true,
  });

export const setSSRLanguage = createIsomorphicFn().server(async () => {
  const language = getCookie(LOCALE_COOKIE);
  await i18n.changeLanguage(language ?? defaultLocale);
});

export default i18n;
