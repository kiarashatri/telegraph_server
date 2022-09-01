import * as redis from "redis";
import { createClient } from "redis";
import RedisCacheType from "../../types/RedisCacheType";
type RedisClientType = ReturnType<typeof createClient>;
export default function startRedis(): RedisCacheType {
  try {
    const redisCache: RedisClientType = redis.createClient();
    redisCache.connect();
    return redisCache;
  } catch (error) {
    console.error("Service error: startRedis", `Error: ${error}`);
  }
}
