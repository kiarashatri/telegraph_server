import { Types } from "mongoose";
import { Socket } from "socket.io";
import user from "../../Database/Models/user";

export default function getFollowingListRequest(socket: Socket) {
  socket.on("getFollowingListRequest", async (requestUserId) => {
    const followingList = user
      .findById(new Types.ObjectId(requestUserId))
      .select("following.id");
    const returnObj = {
      userId: requestUserId,
      following: followingList,
    };
    socket.emit("SendFollowingListFromServer", returnObj);
  });
}
