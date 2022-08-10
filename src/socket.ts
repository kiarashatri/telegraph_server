import { Server } from "socket.io";

// Socket.io Middleware's
import middlewares from "./Socket/middlewares/middlewares";

// Emmit's
import testEmit from "./Socket/emits/testEmit";

// Listener's
import testListener from "./Socket/listeners/testListener";

// Service's
import startRedis from "./Socket/services/startRedis";
import setClientOfflineInRedis from "./Socket/services/setClientOfflineInRedis";
import allUnreadMsgFromServer from "./Socket/emits/allUnreadMsgFromServer";

export default function Sockets(io: Server): void {
  // Instantiate redis on Server Fire-up
  const redisCache = startRedis();

  io.on("connection", (socket) => {
    // Bind Middleware's to webSocket
    middlewares(socket, redisCache);

    console.log(socket.connected);

    // Fire-up Emit's
    allUnreadMsgFromServer(socket);

    // Fire-up listener's
    testListener(socket);

    // User leave socket Listener
    socket.on("disconnect", () => {
      setClientOfflineInRedis(socket, redisCache);
    });
  });
}
