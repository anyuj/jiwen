import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { GlobalSidebar } from "@/components/layout/global-sidebar";
import { NavHeader } from "@/components/layout/header";
import { sessionQueryOptions } from "@/lib/queries/auth";

export const Route = createFileRoute("/(protected)")({
  beforeLoad: async ({ context }) => {
    const session = await context.queryClient.ensureQueryData({
      ...sessionQueryOptions(),
        revalidateIfStale: true,
      });

    if (!session) {
      throw redirect({ to: "/login" });
    }
  },
  component: ProtectedLayout,
});

function ProtectedLayout() {
  return (
    <div className="flex h-svh flex-col overflow-hidden">
      <NavHeader />
      <GlobalSidebar>
        <Outlet />
      </GlobalSidebar>
    </div>
  );
}
