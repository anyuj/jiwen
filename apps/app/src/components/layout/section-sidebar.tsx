import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@jiwen/ui/components/collapsible";
import { cn } from "@jiwen/ui/lib/utils";
import { IconChevronRight } from "@tabler/icons-react";
import type { ComponentType } from "react";

export type SectionSidebarItem = {
  title: string;
  icon: ComponentType<{ className?: string }>;
  description?: string;
  hasWarning?: boolean;
  href?: string;
};

export type SectionSidebarGroup = {
  title: string;
  icon: ComponentType<{ className?: string }>;
  href?: string;
  isActive?: boolean;
  isOpen?: boolean;
  hasSubmenu?: boolean;
  items?: SectionSidebarItem[];
};

export function SectionSidebar({
  title,
  navItems,
}: {
  title: string;
  navItems: SectionSidebarGroup[];
}) {
  return (
    <div className="flex h-full w-58 flex-col rounded-xl border bg-background shadow-sm">
      <div className="flex h-14 items-center px-4">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>

      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-0.5">
          {navItems.map((item) => (
            <li key={item.title}>
              {item.items ? (
                <Collapsible defaultOpen={item.isOpen}>
                  <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent">
                    <span className="flex items-center gap-2">
                      <item.icon className="size-4 shrink-0" />
                      <span>{item.title}</span>
                    </span>
                    <IconChevronRight className="size-4 text-muted-foreground transition-transform duration-200 [[data-state=open]>&]:rotate-90" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <ul className="ml-3 space-y-0.5 border-l pl-3 pt-1">
                      {item.items.map((subItem) => (
                        <li key={subItem.title}>
                          <a
                            href={subItem.href ?? "/settings"}
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                          >
                            <subItem.icon className="size-4" />
                            <span>{subItem.title}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <a
                  href={item.href ?? "/settings"}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    item.isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-foreground hover:bg-accent",
                  )}
                >
                  <span className="flex items-center gap-2">
                    <item.icon className="size-4 shrink-0" />
                    <span>{item.title}</span>
                  </span>
                  {item.hasSubmenu && (
                    <IconChevronRight className="size-4 text-muted-foreground" />
                  )}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
