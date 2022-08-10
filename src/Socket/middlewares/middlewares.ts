import { Server } from "socket.io";

import authentication from "./authentication";

export default function middlewares(io: Server) {
  const middlewares: any[] = [authentication];

  middlewares.forEach((callBackFunc) => {
    io.use(callBackFunc);
  });
}
