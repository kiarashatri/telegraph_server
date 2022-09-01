import { Socket } from "socket.io";
import RedisCacheType from "../../types/RedisCacheType";

export default async function onlineClients(
  socket: Socket,
  redisCache: RedisCacheType
): Promise<boolean> {
  try {
    const userId = socket.data.user.user_id || "_failed_list";
    await redisCache.set(userId, "true");
    return true;
  } catch (error) {
    console.error(
      "Middleware error: authentication",
      `User-id: ${socket.data.user.user_id}`,
      `Socket-id: ${socket.id}`,
      `Error: ${error}`,
      `redis instance: ${redisCache}`
    );
    return false;
  }
}
