import { createFileRoute, Link } from "@tanstack/react-router";
import authBg from "@/assets/bg-login.webp";
import { SignupForm } from "@/components/auth/signup-form";

export const Route = createFileRoute("/(auth)/signup/")({
  component: RouteComponent,
});

function RouteComponent() {
  // TODO: add logo later, and change link to website
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-muted relative hidden lg:block">
        <img
          src={authBg}
          alt="placeholder"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              {/* <Logo className="size-4" /> */}
            </div>
            jiwen
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
}
