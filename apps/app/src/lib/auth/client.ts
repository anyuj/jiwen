import {
  adminClient,
  inferAdditionalFields,
  inferOrgAdditionalFields,
  organizationClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { toast } from "sonner";
import { AUTH_BASE_PATH } from "@/lib/auth/config";
import type { auth } from "@/lib/auth/server";

export const authClient = createAuthClient({
  basePath: AUTH_BASE_PATH,
  fetchOptions: {
    onError: (ctx) => {
      if (ctx.error.status === 429) {
        toast.error(
          ctx.error.message ?? "Too many requests. Please try again later.",
        );
      }
    },
  },
  plugins: [
    inferAdditionalFields<typeof auth>(),
    adminClient(),
    organizationClient({
      schema: inferOrgAdditionalFields<typeof auth>(),
    }),
  ],
});
