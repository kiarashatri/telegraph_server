import { Socket } from "socket.io";
import message from "../../../../../database/models/message";
import AllUnreadMessageType from "../../../../../types/AllUnreadMessageType";

export default async function allUnreadMessage(socket: Socket): Promise<void> {
  try {
    // get all unread message of current user from database
    const responseData: Array<AllUnreadMessageType> = await message
      .find({
        to: socket.data.user.ObjectId,
        seen_at: { $eq: null },
      })
      .select("from reply_to context sent_at");

    // emit all data to current user
    socket.emit("message/unread/send/all", responseData);
  } catch (error) {
    console.error(
      "Emit error: message/unread/send/all",
      `User-id: ${socket.data.user.user_id}`,
      `Socket-id: ${socket.id}`,
      `Error: ${error}`
    );
  }
}
