import { createFileRoute, redirect } from "@tanstack/react-router";
import { sessionQueryOptions } from "@/lib/queries/auth";

export const Route = createFileRoute("/(auth)")({
  beforeLoad: async ({ context }) => {
    const session = await context.queryClient.ensureQueryData({
      ...sessionQueryOptions(),
      revalidateIfStale: true,
    });

    if (session) {
      throw redirect({ to: "/" });
    }
  },
});
