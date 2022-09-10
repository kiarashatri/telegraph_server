import { Types } from "mongoose";
import { Socket } from "socket.io";
import message from "../../../../../database/models/message";
import MessageDbResponseType from "../../../../../types/databaseResponse/MessageDbResponseType";

export default async function getAllchatList(socket: Socket) {
  try {
    const sendByUser: Array<string> = (
      await message.find({ from: socket.data.user.ObjectId }).distinct("to")
    ).map((userObject: MessageDbResponseType): string => {
      return userObject._id.toString();
    });
    const recieveByUser: Array<string> = (
      await message.find({ to: socket.data.user.ObjectId }).distinct("from")
    ).map((userObject: MessageDbResponseType): string => {
      return userObject.toString();
    });

    const emitResponse = [
      ...new Set<string>([...sendByUser, ...recieveByUser]),
    ];

    socket.emit("user/chatList/send/all", emitResponse);
  } catch (error) {
    console.error(
      "Emit error: user/chatList/send/all",
      `User-id: ${socket.data.user.user_id}`,
      `Socket-id: ${socket.id}`,
      `Error: ${error}`
    );
  }
}
