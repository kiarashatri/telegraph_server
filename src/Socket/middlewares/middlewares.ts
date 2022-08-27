import { Socket } from "socket.io";

import authentication from "./authentication";
import onlineClients from "./onlineClients";
import joinToRoom from "./joinToRoom";

export default function middlewares(socket: Socket, redisCache: any) {
  try {
    const middlewares: any[] = [authentication, onlineClients, joinToRoom];

    middlewares.every((callBackFunc) => {
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
