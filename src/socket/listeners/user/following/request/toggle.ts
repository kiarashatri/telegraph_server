import { Types } from "mongoose";
import { Socket } from "socket.io";
import followRequest from "../../../../../database/models/followRequest";
import toggleFollowRequestResponseCallbackType from "../../../../../types/listener/response/toggleFollowRequestResponseCallbackType";
import relationChecker from "../../../../services/relationChecker";

export default function toggleFollowRequest(socket: Socket) {
  try {
    socket.on(
      "user/follow/request/toggle",
      async (
        userId: Types.ObjectId | string,
        insert: boolean = true,
        response: toggleFollowRequestResponseCallbackType
      ) => {
        userId = new Types.ObjectId(userId);
        if (
          !(await relationChecker(socket.data.user.ObjectId, userId))
            .isBlocked &&
          !(await relationChecker(userId, socket.data.user.ObjectId)).isBlocked
        ) {
          const existsInDb = await followRequest.exists({
            applicant: socket.data.user.ObjectId,
            request_to: userId,
          });
          if (existsInDb && !insert) {
            await followRequest.findOneAndDelete({
              applicant: socket.data.user.ObjectId,
              request_to: userId,
            });
          } else if (!existsInDb && insert) {
            const data = new followRequest({
              applicant: socket.data.user.ObjectId,
              request_to: userId,
            });
            await data.save();
            socket.to(userId.toString()).emit("user/follow/request/new", data);
            response({ status: true });
          }
        }
      }
    );
  } catch (error) {
    console.error(`Listener error: user/follow/request/toggle`, error);
  }
}
