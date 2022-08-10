import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import * as redis from "redis";

export default function onlineClients(
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void
) {
  if (socket.data.verify) {
    const redisCache = redis.createClient();
    redisCache.connect();
    redisCache.on("connect", () => {
      const userId = socket.data.user.user_id || "_failed_list";
      redisCache.SADD(userId, socket.id);
    });
  }

  next();
}
