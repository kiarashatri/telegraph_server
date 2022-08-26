import { Types } from "mongoose";
import { Socket } from "socket.io";
import user from "../../../Database/Models/user";
import relationChecker from "../../services/relationChecker";

export default function getFollowingListRequest(socket: Socket) {
  socket.on("getFollowingListRequest", async (requestUserId) => {
    if (
      (await relationChecker(socket.data.user.ObjectId, requestUserId))
        .isFollowed
    ) {
      const followingList = await user
        .findById(new Types.ObjectId(requestUserId))
        .select("following.id");
      socket.emit("SendFollowingListFromServer", {
        userId: requestUserId,
        following: followingList,
      });
    }
  });
}
