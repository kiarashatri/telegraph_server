import { Socket } from "socket.io";

export default async function sendMessageToUser(
  socket: Socket,
  data: any,
  redisCache: any
) {
  if (await redisCache.exists(data.to)) {
    socket.to(data.to).emit("singleUnreadMsgFromServer", data);
  }
}
