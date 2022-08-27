import { Socket } from "socket.io";
import { Types } from "mongoose";
import message from "../../database/models/message";

export default async function allUnreadMsgFromServer(
  socket: Socket,
  redisCache: any
) {
  let data: Object = {};
  try {
    data = await message
      .find({
        to: socket.data.user.ObjectId,
        seen_at: { $eq: null },
      })
      .select("from reply_to context sent_at");
  } catch (error) {
    console.log(
      `Error while sending AllUnreadMessage to: ( ${socket.data.user.user_id} ) - `,
      error
    );
  }

  socket.emit("allUnreadMsgFromServer", data);
}
