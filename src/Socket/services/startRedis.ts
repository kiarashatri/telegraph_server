import * as redis from "redis";

export default function startRedis() {
  const redisCache = redis.createClient();
  redisCache.connect();
  return redisCache;
}
