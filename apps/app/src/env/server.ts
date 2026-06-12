import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const serverEnv = createEnv({
  runtimeEnv: process.env,
  server: {
    NODE_ENV: z.enum(["development", "production", "test"]),
    BASE_URL: z.url(),
    BETTER_AUTH_SECRET: z.string().min(1),
    DATABASE_PRIMARY_URL: z.string().min(1),
    DATABASE_REPLICA_1_URL: z.string().optional(),
    DATABASE_REPLICA_2_URL: z.string().optional(),
    SMTP_HOST: z.string().min(1),
    SMTP_PORT: z.coerce.number().int().positive(),
    SMTP_USER: z.string().min(1),
    SMTP_PASSWORD: z.string().min(1),
    EMAIL_FROM: z.string().min(1),
    JWT_SECRET: z.string().min(1),
    REDIS_URL: z.string().min(1),
    OSS_BUCKET: z.string().min(1),
    OSS_ACCESS_KEY_ID: z.string().min(1),
    OSS_ACCESS_KEY_SECRET: z.string().min(1),
    OSS_REGION: z.string().min(1),
    OSS_ENDPOINT: z.url(),
    STORAGE_BASE_URL: z.url().optional(),
  },
  createFinalSchema: (shape) =>
    z.object(shape).superRefine((env, ctx) => {
      if (env.NODE_ENV !== "production") return;

      const requiredInProduction = [
        "DATABASE_REPLICA_1_URL",
        "DATABASE_REPLICA_2_URL",
      ] as const;

      for (const key of requiredInProduction) {
        if (env[key]) continue;
        ctx.addIssue({
          code: "custom",
          path: [key],
          message: `${key} is required when NODE_ENV is production.`,
        });
      }
    }),
  emptyStringAsUndefined: true,
});
