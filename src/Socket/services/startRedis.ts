import * as redis from "redis";

export default function startRedis() {
  try {
    const redisCache = redis.createClient();
    redisCache.connect();
    return redisCache;
  } catch (error) {
    console.error("Service error: startRedis", `Error: ${error}`);
  }
}
