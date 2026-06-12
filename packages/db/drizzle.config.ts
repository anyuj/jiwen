import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: "../../apps/app/.env" });

export default defineConfig({
  schema: "./src/schemas/index.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_PRIMARY_URL!,
  },
});
