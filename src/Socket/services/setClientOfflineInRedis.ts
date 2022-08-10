import { Socket } from "socket.io";

export default function setClientOfflineInRedis(
  socket: Socket,
  redisCache: any
) {
  redisCache.SREM(socket.data.user.user_id, socket.id);
}
