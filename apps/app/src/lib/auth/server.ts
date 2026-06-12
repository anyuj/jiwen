import "@tanstack/react-start/server-only";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { i18n } from "@better-auth/i18n";
import { defaultLocale, LOCALE_COOKIE } from "@jiwen/config";
import * as schema from "@jiwen/db/schemas/auth";
import { betterAuth } from "better-auth/minimal";
import { admin, organization } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { serverEnv } from "@/env/server";
import { AUTH_BASE_PATH, AUTH_COOKIE_PREFIX } from "@/lib/auth/config";
import { hashPassword, verifyPassword } from "@/lib/auth/crypto";
import { authTranslations } from "@/lib/auth/translations";
import { db } from "@/lib/db";
import { sendEmail } from "@/lib/mail";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  baseURL: serverEnv.BASE_URL,
  basePath: AUTH_BASE_PATH,
  secret: serverEnv.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },
    requireEmailVerification: true,
    autoSignIn: false,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: "jiwen <accounts@mail.jiwen.net>",
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
    },
    customSyntheticUser: ({ coreFields, additionalFields, id }) => ({
      ...coreFields,
      // Admin plugin fields (in schema order)
      role: "user",
      banned: false,
      banReason: null,
      banExpires: null,
      ...additionalFields,
      id,
    }),
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: "jiwen <accounts@mail.jiwen.net>",
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url}`,
      });
    },
    expiresIn: 3600, // 1 hour
  },
  user: {
    additionalFields: {
      locale: {
        type: "string",
        required: true,
        defaultValue: "en",
      },
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
  account: {
    accountLinking: {
      enabled: true,
    },
  },
  advanced: {
    cookiePrefix: AUTH_COOKIE_PREFIX,
    defaultCookieAttributes: {
      secure: serverEnv.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
    },
  },
  trustedOrigins: [serverEnv.BASE_URL, "jiwen://"],
  // TODO: Temporarily comment this out until Better Auth supports Drizzle v1.
  // experimental: { joins: true },
  plugins: [
    admin(),
    organization({
      schema: {
        organization: {
          modelName: "workspace",
          additionalFields: {
            status: {
              type: "string",
              required: true,
              defaultValue: "active",
              input: false,
            },
          },
        },
        member: {
          fields: {
            organizationId: "workspaceId",
          },
        },
        invitation: {
          fields: {
            organizationId: "workspaceId",
          },
        },
      },
      requireEmailVerificationOnInvitation: true,
      allowUserToCreateOrganization: async (user) => {
        // TODO
        return false;
      },
      // TODO: sendInvitationEmail
    }),
    i18n({
      translations: authTranslations,
      defaultLocale,
      detection: ["cookie", "session"],
      localeCookie: LOCALE_COOKIE,
    }),
    // !make sure tanstackStartCookies() is the last plugin in the array
    tanstackStartCookies(),
  ],
});
