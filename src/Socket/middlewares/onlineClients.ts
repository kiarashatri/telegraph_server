import { Socket } from "socket.io";

export default function onlineClients(socket: Socket, redisCache: any) {
  // return false;
  try {
    const userId = socket.data.user.user_id || "_failed_list";
    redisCache.SADD(userId, socket.id);
    return true;
  } catch {
    return false;
  }
}
