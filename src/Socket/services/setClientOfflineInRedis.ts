import { Socket } from "socket.io";
import RedisCacheType from "../../types/RedisCacheType";

export default function setClientOfflineInRedis(
  socket: Socket,
  redisCache: RedisCacheType
): void {
  try {
    redisCache.del(socket.data.user.user_id);
  } catch (error) {
    console.error("Service error: setClientOfflineInRedis", `Error: ${error}`);
  }
}
