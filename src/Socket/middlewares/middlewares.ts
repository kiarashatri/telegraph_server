import { Socket } from "socket.io";

import authentication from "./authentication";
import onlineClients from "./onlineClients";
import joinToRoom from "./joinToRoom";

export default function middlewares(socket: Socket, redisCache: any) {
  const middlewares: any[] = [authentication, onlineClients, joinToRoom];

  middlewares.every((callBackFunc) => {
    let next = callBackFunc(socket, redisCache);
    if (!next) {
      socket.disconnect();
    }
    return next;
  });
}
