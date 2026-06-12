import type { ReactNode } from "react";
import {
  SectionSidebar,
  type SectionSidebarGroup,
} from "@/components/layout/section-sidebar";

type SectionLayoutProps = {
  title: string;
  navItems: SectionSidebarGroup[];
  children: ReactNode;
};

export function SectionLayout({
  title,
  navItems,
  children,
}: SectionLayoutProps) {
  return (
    <div className="flex w-full min-w-0 flex-1 gap-2">
      <SectionSidebar title={title} navItems={navItems} />
      <main className="flex min-h-0 min-w-0 flex-1 overflow-y-auto rounded-xl border bg-background shadow-sm">
        {children}
      </main>
    </div>
  );
}
