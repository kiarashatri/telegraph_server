import { Server } from "socket.io";

// Socket.io Middleware's
import middlewares from "./middlewares/middlewares";

// Emmit's
import allUnreadMsgFromServer from "./emits/allUnreadMsgFromServer";

// Listener's
import newMessageFromClient from "./listeners/newMessageFromClient";
import addNewStory from "./listeners/addNewStory";

// Service's
import startRedis from "./services/startRedis";
import setClientOfflineInRedis from "./services/setClientOfflineInRedis";
import DBconnection from "../Database/connection";
import sendAllFollowingStorysInfoFromServer from "./emits/sendAllFollowingStorysInfoFromServer";

export default function Sockets(io: Server): void {
  // Instantiate redis on Server Fire-up
  const redisCache = startRedis();

  // Connect to MongoDB
  DBconnection();

  io.on("connection", async (socket): Promise<void> => {
    // Bind Middleware's to webSocket
    middlewares(socket, redisCache);

    // Fire-up Emit's
    allUnreadMsgFromServer(socket, redisCache);
    sendAllFollowingStorysInfoFromServer(socket);

    // Fire-up listener's
    newMessageFromClient(socket, redisCache);
    addNewStory(socket);

    // User leave socket Listener
    socket.on("disconnect", () => {
      setClientOfflineInRedis(socket, redisCache);
    });
  });
}
