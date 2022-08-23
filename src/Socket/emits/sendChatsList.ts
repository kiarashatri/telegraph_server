import { Types } from "mongoose";
import { Socket } from "socket.io";
import message from "../../Database/Models/message";

export default async function sendChatsList(socket: Socket) {
  try {
    const sendByUser = (
      await message.find({ from: socket.data.user.ObjectId }).distinct("to")
    ).map((userObjectId) => {
      return userObjectId.toString();
    });
    const recieveByUser = (
      await message.find({ to: socket.data.user.ObjectId }).distinct("from")
    ).map((userObjectId) => {
      return userObjectId.toString();
    });

    socket.emit(
      "SendChatListFromServer",
      new Set<string>([...sendByUser, ...recieveByUser])
    );
  } catch (error) {
    console.error(
      `Unable to send chat list to User: ${socket.data.user.user_id} - with socket id: ${socket.id}`
    );
  }
}
