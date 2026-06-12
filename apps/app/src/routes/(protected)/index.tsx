import { Button } from "@jiwen/ui/components/button";
import { Spinner } from "@jiwen/ui/components/spinner";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { authClient } from "@/lib/auth/client";
import { useAuthSession } from "@/lib/queries/auth";

export const Route = createFileRoute("/(protected)/")({
  component: DashboardHome,
});

function DashboardHome() {
  const { t } = useTranslation();
  const { data: session, isPending } = useAuthSession();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const userEmail = session?.user?.email;

  return (
    <div className="min-h-full">
      <div className="mx-auto flex w-full max-w-xl flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-xl font-semibold">{t("dashboard")}</h1>
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="secondary" size="sm">
                {t("login")}
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" size="sm">
                {t("signup")}
              </Button>
            </Link>
          </div>
        </div>

        <div className="rounded-lg border p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="text-sm text-muted-foreground">
                {t("session")}
              </div>
              {isPending ? (
                <div className="mt-2 inline-flex items-center gap-2 text-sm">
                  <Spinner />
                  {t("loading")}
                </div>
              ) : userEmail ? (
                <div className="mt-1 truncate text-sm">
                  {t("signedInAs")}{" "}
                  <span className="font-medium">{userEmail}</span>
                </div>
              ) : (
                <div className="mt-1 text-sm">{t("notSignedIn")}</div>
              )}
            </div>

            <Button
              size="sm"
              disabled={isSigningOut || isPending || !userEmail}
              onClick={async () => {
                setIsSigningOut(true);
                await authClient.signOut({
                  fetchOptions: {
                    onSuccess: async () => {
                      await queryClient.cancelQueries();
                      queryClient.clear();
                      navigate({ to: "/login", replace: true });
                    },
                    onError: () => {
                      setIsSigningOut(false);
                      toast.error(t("signOutFailed"));
                    },
                  },
                });
              }}
            >
              {isSigningOut ? <Spinner /> : t("logOut")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
