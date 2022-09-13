import { Types } from "mongoose";
import { Socket } from "socket.io";
import user from "../../../../database/models/user";
import GetUserProfileResponseCallbackType from "../../../../types/listener/response/GetUserProfileResponseCallbackType";
import relationChecker from "../../../services/relationChecker";

export default function getUserProfile(socket: Socket): void {
  try {
    socket.on(
      "user/profile/get",
      async (
        userId: string | Types.ObjectId,
        response: GetUserProfileResponseCallbackType
      ) =>
        response({
          ...(await user
            .findById(userId)
            .select("_id name family username photo biography last_seen")),
          ...(await relationChecker(
            socket.data.user.ObjectId,
            new Types.ObjectId(userId)
          )),
        })
    );
  } catch (error) {
    console.error(`Listener error: user/profile/get`, error);
  }
}
