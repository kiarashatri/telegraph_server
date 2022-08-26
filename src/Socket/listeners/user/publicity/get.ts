import { Types } from "mongoose";
import { Socket } from "socket.io";
import user from "../../../Database/Models/user";

export default function getPublicityStatus(socket: Socket) {
  socket.on(
    "getPublicityStatus",
    async (userId = socket.data.user.ObjectId) => {
      try {
        socket.emit(
          "sendPublicityStatusFromServer",
          await user
            .findById(new Types.ObjectId(userId))
            .select("setting.publicity")
        );
      } catch (error: any) {
        console.log(
          `error while sending back Publicity status to ${socket.data.user.userId} => ${error.message}`
        );
      }
    }
  );
}
