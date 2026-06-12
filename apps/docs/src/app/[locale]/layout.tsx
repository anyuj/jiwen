import "@/app/globals.css";
import { ThemeProvider } from "@wrksz/themes/next";
import { i18nProvider } from "fumadocs-ui/i18n";
import { RootProvider } from "fumadocs-ui/provider/next";
import { Inter } from "next/font/google";
import { translations } from "@/lib/layout.shared";

const inter = Inter({
  subsets: ["latin"],
});

export default async function RootLayout({
  params,
  children,
}: {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}) {
  const locale = (await params).locale;

  return (
    <html lang={locale} className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          storage="hybrid"
          disableTransitionOnChange
        >
          <RootProvider
            i18n={i18nProvider(translations, locale)}
            theme={{ enabled: false }}
          >
            {children}
          </RootProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
