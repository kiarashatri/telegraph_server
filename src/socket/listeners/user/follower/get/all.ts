import { Types } from "mongoose";
import { Socket } from "socket.io";
import user from "../../../../../database/models/user";
import FollowingIdDbResponseType from "../../../../../types/databaseResponse/FollowingIdDbResponseType";
import GetAllFollowerResponseCallbackType from "../../../../../types/listener/response/GetAllFollowerResponseCallbackType";
import relationChecker from "../../../../services/relationChecker";

export default function getAllFollower(socket: Socket) {
  try {
    socket.on(
      "user/follower/get/all",
      async (
        requestUserId: string | Types.ObjectId,
        response: GetAllFollowerResponseCallbackType
      ) => {
        if (
          (
            await relationChecker(
              socket.data.user.ObjectId,
              new Types.ObjectId(requestUserId)
            )
          ).isFollowed
        ) {
          const followerList: FollowingIdDbResponseType = await user
            .findById(new Types.ObjectId(requestUserId))
            .select("following.id");
          response({
            userId: new Types.ObjectId(requestUserId).toString(),
            follower: followerList.following,
          });
        }
      }
    );
  } catch (error) {
    console.error(`Listener error: user/follower/get/all`, error);
  }
}
