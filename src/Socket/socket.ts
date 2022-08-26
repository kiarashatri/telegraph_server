import { Server, Socket } from "socket.io";

// Socket.io Middleware's
import middlewares from "./middlewares/middlewares";

// Emmit's
import allUnreadMsgFromServer from "./emits/allUnreadMsgFromServer";
import sendTweetsByPagination from "./emits/sendTweetsByPagination";
import sendAllFollowingStorysInfoFromServer from "./emits/sendAllFollowingStorysInfoFromServer";
import sendChatsList from "./emits/sendChatsList";

// Listener's

// Service's
import startRedis from "./services/startRedis";
import setClientOfflineInRedis from "./services/setClientOfflineInRedis";
import DBconnection from "../Database/connection";
import getAllMessagesOfSpecificUserByPagination from "./listeners/message/get/all/byPagination";

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
    sendTweetsByPagination(socket, 1);
    sendAllFollowingStorysInfoFromServer(socket);
    sendChatsList(socket);

    // Fire-up listener's

    // On: message/get/all/byPagination
    getAllMessagesOfSpecificUserByPagination(socket);

    // User leave socket Listener
    socket.on("disconnect", () => {
      setClientOfflineInRedis(socket, redisCache);
    });
  });
}
