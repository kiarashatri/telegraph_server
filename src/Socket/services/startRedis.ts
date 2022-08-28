import * as redis from "redis";
import { createClient } from "redis";
type RedisClientType = ReturnType<typeof createClient>;
export default function startRedis() {
  try {
    const redisCache: RedisClientType = redis.createClient();
    redisCache.connect();
    return redisCache;
  } catch (error) {
    console.error("Service error: startRedis", `Error: ${error}`);
  }
}
