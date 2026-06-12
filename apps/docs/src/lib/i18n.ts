import { allLocales, defaultLocale } from "@jiwen/config";
import { defineI18n } from "fumadocs-core/i18n";

export const i18n = defineI18n({
  defaultLanguage: defaultLocale,
  languages: [...allLocales],
  fallbackLanguage: defaultLocale,
  hideLocale: "default-locale",
  parser: "dir",
});
