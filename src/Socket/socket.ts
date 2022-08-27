import { Server, Socket } from "socket.io";

// Socket.io Middleware's
import middlewares from "./middlewares/middlewares";

// Emmit's
import allUnreadMsgFromServer from "./emits/message/unread/send/all";
import sendTweetsByPagination from "./emits/tweet/send/byPagination";
import sendAllFollowingStorysInfoFromServer from "./emits/story/send/all";
import sendChatsList from "./emits/user/chatList/send/all";

// Listener's
import getAllMessagesOfSpecificUserByPagination from "./listeners/message/get/all/byPagination";
import newMessage from "./listeners/message/new";
import addNewStory from "./listeners/story/add";
import deleteStory from "./listeners/story/delete";
import getStoryPhoto from "./listeners/story/photo/get";
import addNewTweet from "./listeners/tweet/add";
import deleteTweet from "./listeners/tweet/delete";
import getTweetsOfAnUserByPagination from "./listeners/tweet/get/byPagination";
import addCommentToTweet from "./listeners/tweet/comment/add";
import deleteTweetComment from "./listeners/tweet/comment/delete";
import getCommentsByPagination from "./listeners/tweet/comment/get/byPagination";
import toggleTweetLike from "./listeners/tweet/like/toggle";
import toggleUserBlock from "./listeners/user/block/toggle";
import getAllBlockList from "./listeners/user/block/get/all";
import getLastSeenFromArray from "./listeners/user/lastSeen/get/array";
import getAllFollower from "./listeners/user/follower/get/all";
import getAllFollowing from "./listeners/user/following/get/all";
import getAllFollowingRequest from "./listeners/user/following/request/get/all";
import toggleFollowRequest from "./listeners/user/following/request/toggle";
import getUserProfile from "./listeners/user/profile/get";
import getUserPublicityStatus from "./listeners/user/publicity/get";
import togglePublicityStatus from "./listeners/user/publicity/toggle";

// Service's
import startRedis from "./services/startRedis";
import setClientOfflineInRedis from "./services/setClientOfflineInRedis";
import DBconnection from "../database/connection";
import sendAllFollowingStorysInfo from "./emits/story/send/all";
import getAllchatList from "./emits/user/chatList/send/all";
import sendAllTweetByPagination from "./emits/tweet/send/byPagination";

export default function Sockets(io: Server): void {
  // Instantiate redis on Server Fire-up
  const redisCache = startRedis();

  // Connect to MongoDB
  DBconnection();

  io.on("connection", async (socket: Socket): Promise<void> => {
    // Bind Middleware's to webSocket
    middlewares(socket, redisCache);

    // Fire-up Emit's
    // To: user/chatList/send/all
    getAllchatList(socket);
    // To: message/unread/send/all
    allUnreadMsgFromServer(socket);
    // To: story/send/all
    sendAllFollowingStorysInfo(socket);
    // To: tweet/send/byPagination
    sendAllTweetByPagination(socket);

    // Fire-up listener's =>
    // On: message/get/all/byPagination
    getAllMessagesOfSpecificUserByPagination(socket);
    // On: message/new
    newMessage(socket, redisCache);
    // On: story/new
    addNewStory(socket);
    // On: story/delete
    deleteStory(socket);
    // On: story/photo/get
    getStoryPhoto(socket);
    // On: tweet/add
    addNewTweet(socket);
    // On: tweet/delete
    deleteTweet(socket);
    // On: tweet/get/byPagination
    getTweetsOfAnUserByPagination(socket);
    // On: tweet/comment/add
    addCommentToTweet(socket);
    // On: tweet/comment/delete
    deleteTweetComment(socket);
    // On: tweet/comment/get/byPagination
    getCommentsByPagination(socket);
    // On: tweet/like/toggle
    toggleTweetLike(socket);
    // On: user/block/toggle
    toggleUserBlock(socket);
    // On: user/block/get/all
    getAllBlockList(socket);
    // On: user/follower/get/all
    getAllFollower(socket);
    // On: user/following/get/all
    getAllFollowing(socket);
    // On: user/following/request/get/all
    getAllFollowingRequest(socket);
    // On: user/follow/request/toggle
    toggleFollowRequest(socket);
    // On: user/lastSeen/get/array
    getLastSeenFromArray(socket, redisCache);
    // On: user/profile/get
    getUserProfile(socket);
    // On: user/publicity/get
    getUserPublicityStatus(socket);
    // On: user/publicity/toggle
    togglePublicityStatus(socket);

    // User leave socket Listener
    socket.on("disconnect", () => {
      setClientOfflineInRedis(socket, redisCache);
    });
  });
}
