import { Server, Socket } from "socket.io";
import { Types } from "mongoose";

// Socket.io Middleware's
import middlewares from "./middlewares/middlewares";

// Emmit's
import allUnreadMsgFromServer from "./emits/allUnreadMsgFromServer";
import sendTweetsByPagination from "./emits/sendTweetsByPagination";
import sendAllFollowingStorysInfoFromServer from "./emits/sendAllFollowingStorysInfoFromServer";

// Listener's
import newMessageFromClient from "./listeners/newMessageFromClient";
import addNewStory from "./listeners/addNewStory";
import getStoryPhoto from "./listeners/getStoryPhoto";
import addNewTweet from "./listeners/addNewTweet";
import toggleTweetLike from "./listeners/toggleTweetLike";
import getComments from "./listeners/getComments";
import getTweetsOfAnUser from "./listeners/getTweetsOfAnUser";
import getFollowersRequest from "./listeners/getFollowingListRequest";
import toggleBlockUser from "./listeners/toggleBlockUser";
import getPublicityStatus from "./listeners/getPublicityStatus";
import togglePublicityStatus from "./listeners/togglePublicityStatus";

// Service's
import startRedis from "./services/startRedis";
import setClientOfflineInRedis from "./services/setClientOfflineInRedis";
import DBconnection from "../Database/connection";

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

    // Fire-up listener's
    newMessageFromClient(socket, redisCache);
    addNewStory(socket);
    getStoryPhoto(socket);
    addNewTweet(socket);
    // toggleTweetLike(socket);
    toggleBlockUser(socket);
    getComments(socket);
    getTweetsOfAnUser(socket);
    getFollowersRequest(socket);
    getPublicityStatus(socket);
    togglePublicityStatus(socket);

    // User leave socket Listener
    socket.on("disconnect", () => {
      setClientOfflineInRedis(socket, redisCache);
    });
  });
}
