import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@jiwen/ui/components/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@jiwen/ui/components/sidebar";
import { type Icon, IconChevronRight } from "@tabler/icons-react";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="group-data-[collapsible=icon]:mt-0! group-data-[collapsible=icon]:opacity-0">
        Platform
      </SidebarGroupLabel>
      <SidebarMenu className="gap-2">
        {items.map((item) => (
          <Collapsible
            key={`${item.title}-stable`}
            defaultOpen={false}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger
                render={
                  <SidebarMenuButton
                    tooltip={item.title}
                    className="group-data-[collapsible=icon]:translate-x-px group-data-[collapsible=icon]:transition-none!"
                  >
                    {item.icon && <item.icon stroke={1.5} className="size-4" />}
                    <span className="group-data-[collapsible=icon]:hidden">
                      {item.title}
                    </span>
                    <IconChevronRight className="ml-auto transition-transform duration-100 group-data-open/collapsible:rotate-90 group-data-[collapsible=icon]:hidden" />
                  </SidebarMenuButton>
                }
              />
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        render={<a href={subItem.url}>{subItem.title}</a>}
                      />
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
