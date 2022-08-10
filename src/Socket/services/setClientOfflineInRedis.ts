import { Socket } from "socket.io";
import * as redis from "redis";
import startRedis from "./startRedis";

export default function setClientOfflineInRedis(socket: Socket) {
  startRedis().then((redis) => {
    redis.SREM(socket.data.user.user_id, socket.id);
  });
}
