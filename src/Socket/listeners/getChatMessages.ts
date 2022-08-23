import { Types } from "mongoose";
import { Socket } from "socket.io";
import getMessageOfUser from "../services/getMessagesOfUser";

export default function getChatMessages(socket: Socket) {
  socket.on(
    "getChatMessages",
    async (userId: string | Types.ObjectId, page: number = 1) => {
      socket.emit(
        "sendChatMessages",
        await getMessageOfUser(
          new Types.ObjectId(userId),
          socket.data.user.ObjectId,
          page
        )
      );
    }
  );
}
