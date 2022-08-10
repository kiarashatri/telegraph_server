import { Server } from "socket.io";

// Socket.io Middleware's
import middlewares from "./Socket/middlewares/middlewares";

// Emmit's
import testEmit from "./Socket/emits/testEmit";

// Listener's
import testListener from "./Socket/listeners/testListener";

// Service's
import startRedis from "./Socket/services/startRedis";
import disconnect from "./Socket/services/disconnect";
import setClientOfflineInRedis from "./Socket/services/setClientOfflineInRedis";
import allUnreadMsgFromServer from "./Socket/emits/allUnreadMsgFromServer";

export default function Sockets(io: Server): void {
  // Bind Middleware's to webSocket
  middlewares(io);

  // Instantiate redis on Server Fire-up
  const redisCache = startRedis();

  io.on("connection", (socket) => {
    // Auto disconnect client if not authenticated
    if (!disconnect(socket)) {
      return false;
    }

    // Bind redis Connetion to socket
    socket.data.redis = redisCache;

    // Fire-up Emit's
    testEmit(socket);
    allUnreadMsgFromServer(socket);

    // Fire-up listener's
    testListener(socket);

    // User leave socket Listener
    socket.on("disconnect", () => {
      setClientOfflineInRedis(socket);
    });
  });
}
