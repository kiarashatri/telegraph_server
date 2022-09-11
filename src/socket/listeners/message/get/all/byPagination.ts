import { Types } from "mongoose";
import { Socket } from "socket.io";
import getAllMessagesOfSpecificUserByPaginationResponseType from "../../../../../types/listener/response/GetAllMessagesOfSpecificUserByPaginationResponseCallbackType";
import getAllMessagesOfUser from "../../../../services/getAllMessagesOfUser";

export default function getAllMessagesOfSpecificUserByPagination(
  socket: Socket
) {
  try {
    socket.on(
      "message/get/all/byPagination",
      async (
        userId: string | Types.ObjectId,
        page: number = 1,
        response: getAllMessagesOfSpecificUserByPaginationResponseType
      ) => {
        response(
          await getAllMessagesOfUser(
            new Types.ObjectId(userId),
            socket.data.user.ObjectId,
            page
          )
        );
      }
    );
  } catch (error) {
    console.error(`Listener error: message/get/all/byPagination`, error);
  }
}
