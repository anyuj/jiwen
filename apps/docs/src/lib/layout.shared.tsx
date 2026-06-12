import { type Locale, localeDisplayNames } from "@jiwen/config";
import { uiTranslations } from "fumadocs-ui/i18n";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { ThemeSwitch } from "@/components/theme-switch";
import { i18n } from "@/lib/i18n";
import { appName } from "@/lib/shared";

export const translations = i18n
  .translations()
  .extend(uiTranslations())
  .add("ui", {
    zh: {
      displayName: localeDisplayNames.zh,
      search: "搜索",
      chooseLanguage: "选择语言",
      searchNoResult: "未找到结果",
      toc: "本页内容",
      tocNoHeadings: "无标题",
      lastUpdate: "最后更新于",
      nextPage: "下一页",
      previousPage: "上一页",
      chooseTheme: "主题",
    },
    en: {
      displayName: localeDisplayNames.en,
    },
  });

export function baseOptions(locale: string): BaseLayoutProps {
  const docsLinkTextByLocale: Record<Locale, string> = {
    zh: "文档",
    en: "Documentation",
  };
  const docsLinkText =
    docsLinkTextByLocale[locale as Locale] ?? docsLinkTextByLocale.zh;

  return {
    slots: {
      themeSwitch: ThemeSwitch,
    },
    nav: {
      title: appName,
      url: `/${locale}`,
    },
    links: [
      {
        type: "main",
        text: docsLinkText,
        url: `/${locale}/docs`,
      },
    ],
  };
}
