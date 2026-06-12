import { IconLink, IconView360 } from "@tabler/icons-react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SectionLayout } from "@/components/layout/section-layout";
import type { SectionSidebarGroup } from "@/components/layout/section-sidebar";

export const Route = createFileRoute("/(protected)/$workspace/links")({
  component: RouteComponent,
});

function RouteComponent() {
  const { workspace } = Route.useParams();
  const linksNav: SectionSidebarGroup[] = [
    {
      title: "Links",
      icon: IconLink,
      href: `/${workspace}/links`,
      isActive: true,
    },
    {
      title: "Domains",
      icon: IconView360,
      href: `/${workspace}/links/settings`,
    },
  ];

  return (
    <SectionLayout title="Feature 1" navItems={linksNav}>
      <Outlet />
    </SectionLayout>
  );
}
