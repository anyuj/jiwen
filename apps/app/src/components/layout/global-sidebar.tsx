import {
  SIDEBAR_COOKIE_NAME,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@jiwen/ui/components/sidebar";
import {
  IconArrowLeftRight,
  IconCommand,
  IconFrame,
  IconPigMoney,
  IconRobot,
  IconSailboat,
  IconSettings,
} from "@tabler/icons-react";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import type { ReactNode } from "react";
import { NavMain } from "@/components/layout/nav-main";
import { NavUser } from "@/components/layout/nav-user";
import { TeamSwitcher } from "@/components/layout/team-switcher";

const getSidebarDefaultOpen = createIsomorphicFn()
  .server(() => getCookie(SIDEBAR_COOKIE_NAME) !== "false")
  .client(() => {
    const cookie = document.cookie
      .split("; ")
      .find((item) => item.startsWith(`${SIDEBAR_COOKIE_NAME}=`))
      ?.split("=")[1];

    return cookie !== "false";
  });

export function GlobalSidebar({ children }: { children: ReactNode }) {
  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Acme Inc",
        logo: IconSailboat,
        plan: "Enterprise",
      },
      {
        name: "Evil Corp.",
        logo: IconCommand,
        plan: "Free",
      },
    ],
    navMain: [
      {
        title: "Links",
        url: "#",
        icon: IconArrowLeftRight,
        isActive: true,
        items: [
          {
            title: "History",
            url: "#",
          },
          {
            title: "Starred",
            url: "#",
          },
          {
            title: "Settings",
            url: "#",
          },
        ],
      },
      {
        title: "Pages",
        url: "#",
        icon: IconRobot,
        items: [
          {
            title: "Genesis",
            url: "#",
          },
          {
            title: "Explorer",
            url: "#",
          },
          {
            title: "Quantum",
            url: "#",
          },
        ],
      },
      {
        title: "Monetization",
        url: "#",
        icon: IconPigMoney,
        items: [
          {
            title: "Introduction",
            url: "#",
          },
          {
            title: "Get Started",
            url: "#",
          },
          {
            title: "Tutorials",
            url: "#",
          },
          {
            title: "Changelog",
            url: "#",
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: IconSettings,
        items: [
          {
            title: "General",
            url: "#",
          },
          {
            title: "Team",
            url: "#",
          },
          {
            title: "Billing",
            url: "#",
          },
          {
            title: "Limits",
            url: "#",
          },
        ],
      },
    ],
    projects: [
      {
        name: "Design Engineering",
        url: "#",
        icon: IconFrame,
      },
    ],
  };

  return (
    <SidebarProvider
      defaultOpen={getSidebarDefaultOpen()}
      className="min-h-0 min-w-0 flex-1"
    >
      <Sidebar
        variant="inset"
        collapsible="icon"
        className="top-(--header-height,0) h-[calc(100svh-var(--header-height,0))] group-data-[collapsible=icon]:px-0! group-data-[collapsible=icon]:py-2! group-data-[collapsible=icon]:transition-none!"
      >
        <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />

          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarMenu>
              {data.projects.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    render={
                      <a href={item.url}>
                        {item.icon && <item.icon />}
                        {item.name}
                      </a>
                    }
                  ></SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset className="m-0 min-h-0 flex-1 overflow-hidden rounded-xl shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-0.5!">
        <SidebarTrigger />
        <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto p-1">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
