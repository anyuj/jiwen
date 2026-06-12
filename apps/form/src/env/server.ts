import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const serverEnv = createEnv({
  runtimeEnv: process.env,
  server: {
    NODE_ENV: z.enum(["development", "production", "test"]),
    REDIS_URL: z.string().min(1),
    DATABASE_PRIMARY_URL: z.string().min(1),
    DATABASE_REPLICA_1_URL: z.string().optional(),
    DATABASE_REPLICA_2_URL: z.string().optional(),
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
