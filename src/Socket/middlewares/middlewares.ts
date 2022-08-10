import { Server } from "socket.io";

import authentication from "./authentication";
import onlineClients from "./onlineClients";

export default function middlewares(io: Server) {
  const middlewares: any[] = [authentication, onlineClients];

  middlewares.forEach((callBackFunc) => {
    io.use(callBackFunc);
  });
}
