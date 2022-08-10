import * as redis from "redis";

export default async function startRedis() {
  const redisCache = redis.createClient();
  await redisCache.connect();
  return redisCache;
}
