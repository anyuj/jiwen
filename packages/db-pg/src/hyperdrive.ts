import { relations } from "@jiwen/db/relations";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

export async function hyperdrive(connectionString: string) {
  const client = new Client({ connectionString });
  await client.connect();

  return drizzle({ client, relations });
}
