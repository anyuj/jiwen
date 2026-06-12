import "@tanstack/react-start/server-only";
import { postgres } from "@jiwen/db-pg/pool";
import { withReplicas } from "drizzle-orm/pg-core";
import { serverEnv } from "@/env/server";

type Db = ReturnType<typeof createDb>;

const globalForDb = globalThis as {
  db?: Db;
};

const isProduction = serverEnv.NODE_ENV === "production";

const dbOptions = {
  max: isProduction ? 12 : 8,
  idleTimeoutMillis: isProduction ? 10_000 : 5_000,
  connectionTimeoutMillis: 5_000,
  maxUses: 0,
  allowExitOnIdle: false,
  ssl: isProduction,
} as const;

const createDb = () => {
  const primaryDb = postgres(serverEnv.DATABASE_PRIMARY_URL, dbOptions);

  if (!isProduction) {
    return primaryDb;
  }

  const replicaUrls = [
    serverEnv.DATABASE_REPLICA_1_URL,
    serverEnv.DATABASE_REPLICA_2_URL,
  ].filter(
    (url): url is string =>
      Boolean(url) && url !== serverEnv.DATABASE_PRIMARY_URL,
  );

  const firstReplicaUrl = replicaUrls[0];

  if (!firstReplicaUrl) {
    return primaryDb;
  }

  const replicaDbs = replicaUrls.map((url) => postgres(url, dbOptions));
  const firstReplicaDb = replicaDbs[0];

  if (!firstReplicaDb) {
    return primaryDb;
  }

  return withReplicas(primaryDb, [firstReplicaDb, ...replicaDbs.slice(1)]);
};

const db = globalForDb.db ?? createDb();
globalForDb.db = db;

export { db };
