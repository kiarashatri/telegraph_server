import { Types } from "mongoose";
import { Socket } from "socket.io";
import getAllMessagesOfUser from "../../../../services/getAllMessagesOfUser";

export default function getAllMessagesOfSpecificUserByPagination(
  socket: Socket
) {
  try {
    socket.on(
      "message/get/all/byPagination",
      async (userId: string | Types.ObjectId, page: number = 1, response) => {
        response(
          await getAllMessagesOfUser(userId, socket.data.user.ObjectId, page)
        );
      }
    );
  } catch (error) {
    console.error(`Listener error: message/get/all/byPagination`, error);
  }
}
