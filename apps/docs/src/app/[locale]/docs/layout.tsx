import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ locale: string }>;
  children: ReactNode;
}) {
  const { locale } = await params;

  return (
    <DocsLayout
      tree={source.getPageTree(locale)}
      {...baseOptions(locale)}
      sidebar={{ prefetch: false }}
    >
      {children}
    </DocsLayout>
  );
}
