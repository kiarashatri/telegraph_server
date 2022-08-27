import { Types } from "mongoose";
import { Socket } from "socket.io";
import user from "../../../../../Database/Models/user";
import relationChecker from "../../../../services/relationChecker";

export default function getAllFollower(socket: Socket) {
  try {
    socket.on("user/follower/get/all", async (requestUserId, response) => {
      if (
        (await relationChecker(socket.data.user.ObjectId, requestUserId))
          .isFollowed
      ) {
        const followerList = await user
          .findById(new Types.ObjectId(requestUserId))
          .select("following.id");
        response({
          userId: requestUserId,
          following: followerList,
        });
      }
    });
  } catch (error) {
    console.error(`Listener error: user/follower/get/all`, error);
  }
}
