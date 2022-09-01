import { Types } from "mongoose";
import { Socket } from "socket.io";
import message from "../../../../../database/models/message";

export default async function getAllchatList(socket: Socket) {
  try {
    const sendByUser = (
      await message.find({ from: socket.data.user.ObjectId }).distinct("to")
    ).map((userObjectId: Types.ObjectId) => {
      return userObjectId.toString();
    });
    const recieveByUser = (
      await message.find({ to: socket.data.user.ObjectId }).distinct("from")
    ).map((userObjectId: Types.ObjectId) => {
      return userObjectId.toString();
    });

    socket.emit(
      "user/chatList/send/all",
      new Set<string>([...sendByUser, ...recieveByUser])
    );
  } catch (error) {
    console.error(
      "Emit error: user/chatList/send/all",
      `User-id: ${socket.data.user.user_id}`,
      `Socket-id: ${socket.id}`,
      `Error: ${error}`
    );
  }
}
