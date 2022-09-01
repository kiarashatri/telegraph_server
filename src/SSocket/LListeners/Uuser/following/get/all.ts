import { Types } from "mongoose";
import { Socket } from "socket.io";
import user from "../../../../../database/models/user";
import relationChecker from "../../../../services/relationChecker";

export default function getAllFollowing(socket: Socket) {
  try {
    socket.on("user/following/get/all", async (requestUserId, response) => {
      if (
        (await relationChecker(socket.data.user.ObjectId, requestUserId))
          .isFollowed
      ) {
        const followingList = await user
          .findById(new Types.ObjectId(requestUserId))
          .select("following.id");
        response({
          userId: requestUserId,
          following: followingList,
        });
      }
    });
  } catch (error) {
    console.error(`Listener error: user/following/get/all`, error);
  }
}
