import { relations } from "@jiwen/db/relations";
import { neon as createNeonClient, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { withReplicas } from "drizzle-orm/pg-core";

type ReplicaUrl = string | null | undefined;

// Keep Neon queries on fetch for edge/runtime compatibility.
neonConfig.poolQueryViaFetch = true;

// !Required after migrating to PlanetScale for Postgres connections.
// neonConfig.fetchEndpoint = (host) => `https://${host}/sql`;

export function neon(connectionString: string) {
  const client = createNeonClient(connectionString);
  return drizzle({ client, relations });
}

type NeonDb = ReturnType<typeof neon>;

export function neonWithReplicas(
  primaryUrl: string,
  replicaUrls: readonly ReplicaUrl[],
): NeonDb {
  const primaryDb = neon(primaryUrl);
  const replicas = replicaUrls.filter((url): url is string => Boolean(url));

  if (replicas.length === 0 || replicas.length !== replicaUrls.length) {
    return primaryDb;
  }

  const replicaDbs = replicas.map(neon);
  const firstReplica = replicaDbs[0];

  if (!firstReplica) {
    return primaryDb;
  }

  // Keep replica routing internal so callers see one stable Drizzle DB type.
  return withReplicas(primaryDb, [
    firstReplica,
    ...replicaDbs.slice(1),
  ]) as unknown as NeonDb;
}
