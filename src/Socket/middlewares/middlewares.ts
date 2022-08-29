import { Socket } from "socket.io";

import authentication from "./authentication";
import onlineClients from "./onlineClients";
import joinToRoom from "./joinToRoom";
import RedisCacheType from "../../types/RedisCacheType";
import MiddlewareType from "../../types/MiddlewareType";

export default function middlewares(
  socket: Socket,
  redisCache: RedisCacheType
) {
  try {
    const middlewares: Array<MiddlewareType> = [
      authentication,
      onlineClients,
      joinToRoom,
    ];

    middlewares.every((callBackFunc: MiddlewareType) => {
      let next = callBackFunc(socket, redisCache);
      if (!next) {
        socket.disconnect();
      }
      return next;
    });
  } catch (error) {
    console.error(
      "Middleware main file error: middlewares",
      `Socket-id: ${socket.id}`,
      `Error: ${error}`
    );
  }
}
