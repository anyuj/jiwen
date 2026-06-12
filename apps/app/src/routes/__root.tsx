import { Toaster } from "@jiwen/ui/components/sonner";
import { TooltipProvider } from "@jiwen/ui/components/tooltip";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { hotkeysDevtoolsPlugin } from "@tanstack/react-hotkeys-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { I18nextProvider } from "react-i18next";
import type { AuthQueryResult } from "@/functions/auth";
import i18n, { setSSRLanguage } from "@/lib/intl/i18n";
import { ThemeProvider } from "@/providers/theme-provider";
import appCss from "@/styles/globals.css?url";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  user: AuthQueryResult;
}>()({
  beforeLoad: async () => {
    await setSSRLanguage();
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "jiwen",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang={i18n.language} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <I18nextProvider i18n={i18n} defaultNS={"translation"}>
          <ThemeProvider>
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster position="top-right" richColors />
          </ThemeProvider>
        </I18nextProvider>
        <TanStackDevtools
          config={{ defaultOpen: false }}
          plugins={[
            { name: "Tanstack Query", render: <ReactQueryDevtoolsPanel /> },
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
            hotkeysDevtoolsPlugin(),
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
