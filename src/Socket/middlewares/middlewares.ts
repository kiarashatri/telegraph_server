import { Socket } from "socket.io";

import authentication from "./authentication";
import onlineClients from "./onlineClients";

export default function middlewares(socket: Socket, redisCache: any) {
  const middlewares: any[] = [authentication, onlineClients];

  middlewares.every((callBackFunc) => {
    let next = callBackFunc(socket, redisCache);
    if (!next) {
      socket.disconnect();
    }
    return next;
  });
}
