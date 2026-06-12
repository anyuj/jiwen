import { RedisClient } from "bun";
import { serverEnv } from "@/env/server";

const globalForRedis = globalThis as {
  redis?: RedisClient;
};

export const redis =
  globalForRedis.redis ??
  new RedisClient(serverEnv.REDIS_URL, {
    autoReconnect: true,
    enableAutoPipelining: true,
  });
globalForRedis.redis = redis;
