import { Button } from "@jiwen/ui/components/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@jiwen/ui/components/field";
import { Input } from "@jiwen/ui/components/input";
import { Spinner } from "@jiwen/ui/components/spinner";
import { cn } from "@jiwen/ui/lib/utils";
import { useForm } from "@tanstack/react-form";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState, useTransition } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import z from "zod";
import { authClient } from "@/lib/auth/client";
import { useRefreshSession } from "@/lib/queries/auth";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { t } = useTranslation();
  const [loading, startTransition] = useTransition();
  // TODO(oauth): Wire OAuth buttons via onLoadingChange={setOauthLoading}
  const [oauthLoading, setOauthLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const refreshSession = useRefreshSession();

  const loginFormSchema = z.object({
    email: z
      .email(t("invalidEmailAddress"))
      .min(6, t("emailMinLength"))
      .max(255)
      .transform((email) => email.toLowerCase()),
    password: z.string().min(8, t("passwordMinLengthError")),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginFormSchema,
    },
    onSubmit: async ({ value }) => {
      startTransition(async () => {
        const { error } = await authClient.signIn.email({
          email: value.email,
          password: value.password,
          fetchOptions: {
            onSuccess: async () => {
              await refreshSession();
              navigate({ to: "/", replace: true });
            },
          },
        });
        if (error) {
          toast.error(error.message ?? t("errorOccurred"));
          form.reset();
        }
      });
    },
  });

  return (
    <form
      id="login-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">{t("welcomeBack")}</h1>
        </div>
        <form.Field
          name="email"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>{t("email")}</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="m@example.com"
                  autoComplete="email"
                  required
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        <form.Field
          name="password"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <div className="flex items-center">
                  <FieldLabel htmlFor={field.name}>{t("password")}</FieldLabel>
                  <Link
                    to="/forgot-password"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    {t("forgotPassword")}
                  </Link>
                </div>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  type="password"
                  autoComplete="current-password"
                  required
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
      </FieldGroup>
      {/* TODO: add captcha widget */}
      <Field>
        <Button
          type="submit"
          disabled={loading || oauthLoading}
          form="login-form"
        >
          {loading || oauthLoading ? <Spinner /> : t("login")}
        </Button>
      </Field>
      <FieldSeparator>{t("orContinueWith")}</FieldSeparator>
      <Field>
        {/* TODO(oauth): Add OAuth sign-in buttons (e.g. WeChat, QQ) */}
        <FieldDescription className="text-center">
          {t("doNotHaveAccount")}{" "}
          <Link to="/signup" className="underline underline-offset-4">
            {t("signup")}
          </Link>
        </FieldDescription>
      </Field>
    </form>
  );
}
