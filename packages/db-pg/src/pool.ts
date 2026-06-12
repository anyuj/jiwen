import { relations } from "@jiwen/db/relations";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool, type PoolConfig } from "pg";

export type PostgresPoolOptions = Pick<
  PoolConfig,
  | "max"
  | "min"
  | "idleTimeoutMillis"
  | "connectionTimeoutMillis"
  | "maxUses"
  | "allowExitOnIdle"
  | "ssl"
>;

export type PostgresOptions = PostgresPoolOptions & {
  onPoolCreate?: (pool: Pool) => void;
};

const isProduction = process.env.NODE_ENV === "production";

export const defaultPostgresPoolOptions: PostgresPoolOptions = {
  max: isProduction ? 12 : 8,
  min: 0,
  idleTimeoutMillis: isProduction ? 10_000 : 5_000,
  connectionTimeoutMillis: 5_000,
  maxUses: isProduction ? 0 : 100,
  allowExitOnIdle: true,
  // Default to TLS in production; specific callers can override this.
  ssl: isProduction,
};

export function postgres(connectionString: string, options?: PostgresOptions) {
  const { onPoolCreate, ...poolOptions } = options ?? {};
  const pool = new Pool({
    connectionString,
    ...defaultPostgresPoolOptions,
    ...poolOptions,
  });

  onPoolCreate?.(pool);

  return drizzle({ client: pool, relations });
}
