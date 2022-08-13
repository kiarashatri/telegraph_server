import { Socket } from "socket.io";

export default function setClientOfflineInRedis(
  socket: Socket,
  redisCache: any
) {
  redisCache.del(socket.data.user.user_id);
}
