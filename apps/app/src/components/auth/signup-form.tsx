import type { Locale } from "@jiwen/config";
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
import { Link } from "@tanstack/react-router";
import { useState, useTransition } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import z from "zod";
import { authClient } from "@/lib/auth/client";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language as Locale;
  const [loading, startTransition] = useTransition();
  // TODO(oauth): Wire OAuth buttons via onLoadingChange={setOauthLoading}
  const [oauthLoading, setOauthLoading] = useState<boolean>(false);

  const signupFormSchema = z
    .object({
      name: z.string().min(2, t("nameMinLength")),
      email: z
        .email(t("invalidEmailAddress"))
        .min(6, t("emailMinLength"))
        .max(255)
        .transform((email) => email.toLowerCase()),
      password: z.string().min(8, t("passwordMinLengthError")),
      confirmPassword: z.string().min(8, t("passwordMinLengthError")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("passwordsDoNotMatch"),
      path: ["confirmPassword"],
    });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: signupFormSchema,
    },
    onSubmit: async ({ value }) => {
      startTransition(async () => {
        const { error } = await authClient.signUp.email({
          name: value.name,
          email: value.email,
          password: value.password,
          locale,
          callbackURL: "/",
          fetchOptions: {
            onSuccess: () => {
              toast.success(t("signupSuccess"));
              form.reset();
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
      id="signup-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">{t("createYourAccount")}</h1>
        </div>
        <form.Field
          name="name"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>{t("name")}</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="John Doe"
                  autoComplete="name"
                  required
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
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
                <FieldLabel htmlFor={field.name}>{t("password")}</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  type="password"
                  autoComplete="new-password"
                  required
                />
                <FieldDescription>{t("passwordMinLength")}</FieldDescription>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        <form.Field
          name="confirmPassword"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  {t("confirmPassword")}
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  type="password"
                  autoComplete="off"
                  required
                />
                <FieldDescription>
                  {t("confirmPasswordDescription")}
                </FieldDescription>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
      </FieldGroup>
      {/* TODO: captcha widget */}
      <Field>
        <Button
          type="submit"
          disabled={loading || oauthLoading}
          form="signup-form"
        >
          {loading || oauthLoading ? <Spinner /> : t("createAccount")}
        </Button>
      </Field>
      <FieldSeparator>{t("orContinueWith")}</FieldSeparator>
      <Field>
        {/* TODO(oauth): Add OAuth sign-in buttons (e.g. WeChat, QQ) */}
        <FieldDescription className="px-6 text-center">
          {t("alreadyHaveAccount")} <Link to="/login">{t("login")}</Link>
        </FieldDescription>
      </Field>
    </form>
  );
}
