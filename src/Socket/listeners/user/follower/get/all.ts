import { Types } from "mongoose";
import { Socket } from "socket.io";
import user from "../../Database/Models/user";
import relationChecker from "../services/relationChecker";

export default function getFollowerListRequest(socket: Socket) {
  socket.on("getFollowerListRequest", async (requestUserId) => {
    if (
      (await relationChecker(socket.data.user.ObjectId, requestUserId))
        .isFollowed
    ) {
      const followerList = await user
        .findById(new Types.ObjectId(requestUserId))
        .select("following.id");
      socket.emit("SendFollowerListFromServer", {
        userId: requestUserId,
        following: followerList,
      });
    }
  });
}
