import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const clientEnv = createEnv({
  clientPrefix: "VITE_",
  runtimeEnv: import.meta.env,
  client: {},
  emptyStringAsUndefined: true,
});
