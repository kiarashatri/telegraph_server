import { Socket } from "socket.io";

export default async function onlineClients(socket: Socket, redisCache: any) {
  try {
    const userId = socket.data.user.user_id || "_failed_list";
    redisCache.set(userId, "true");
    return true;
  } catch {
    return false;
  }
}
