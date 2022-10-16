import { HydratedDocument, Types } from "mongoose";
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
      ) => {
        const dbResponse: HydratedDocument<GetUserProfileResponseCallbackType> =
          await user
            .findById(userId)
            .select("_id name family username photo biography last_seen");
        const relationCheckingResponse = await relationChecker(
          socket.data.user.ObjectId,
          new Types.ObjectId(userId)
        );

        response({
          ...dbResponse.toObject(),
          ...relationCheckingResponse,
        });
      }
    );
  } catch (error) {
    console.error(`Listener error: user/profile/get`, error);
  }
}
