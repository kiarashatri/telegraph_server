import { Server } from "socket.io";

// Socket.io Middleware's
import middlewares from "./Socket/middlewares/middlewares";

// Emmit's
import allUnreadMsgFromServer from "./Socket/emits/allUnreadMsgFromServer";

// Listener's
import testListener from "./Socket/listeners/testListener";

// Service's
import startRedis from "./Socket/services/startRedis";
import setClientOfflineInRedis from "./Socket/services/setClientOfflineInRedis";
import DBconnection from "./Database/connection";
import newMessageFromClient from "./Socket/listeners/newMessageFromClient";

export default function Sockets(io: Server): void {
  // Instantiate redis on Server Fire-up
  const redisCache = startRedis();

  // Connect to MongoDB
  DBconnection();

  io.on("connection", async (socket): Promise<void> => {
    // Bind Middleware's to webSocket
    middlewares(socket, redisCache);
    socket.join("kiarash");

    // Fire-up Emit's
    allUnreadMsgFromServer(socket, redisCache);

    // Fire-up listener's
    newMessageFromClient(socket);

    // User leave socket Listener
    socket.on("disconnect", () => {
      setClientOfflineInRedis(socket, redisCache);
    });
  });
}
