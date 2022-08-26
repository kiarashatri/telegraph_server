import { Types } from "mongoose";
import { Socket } from "socket.io";
import followRequest from "../../../../Database/Models/followRequest";
import relationChecker from "../../../services/relationChecker";

export default function listenerFollowAddRequest(socket: Socket) {
  socket.on(
    "follow/add/request",
    async (userId: string | Types.ObjectId, insert: boolean = true) => {
      userId = new Types.ObjectId(userId);
      if (
        !(await relationChecker(socket.data.user.ObjectId, userId)).isBlocked &&
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
          socket.to(userId.toString()).emit("newFollowRequest", data);
        }
      }
    }
  );
}