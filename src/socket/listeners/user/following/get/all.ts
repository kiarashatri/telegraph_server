import { Types } from "mongoose";
import { Socket } from "socket.io";
import user from "../../../../../database/models/user";
import FollowingIdDbResponseType from "../../../../../types/databaseResponse/FollowingIdDbResponseType";
import GetAllFollowingCallbackResponseType from "../../../../../types/listener/response/GetAllFollowingCallbackResponseType";
import relationChecker from "../../../../services/relationChecker";

export default function getAllFollowing(socket: Socket) {
  try {
    socket.on(
      "user/following/get/all",
      async (
        requestUserId: Types.ObjectId | string,
        response: GetAllFollowingCallbackResponseType
      ) => {
        requestUserId = new Types.ObjectId(requestUserId);
        if (
          (await relationChecker(socket.data.user.ObjectId, requestUserId))
            .isFollowed
        ) {
          const followingList: FollowingIdDbResponseType = await user
            .findById(new Types.ObjectId(requestUserId))
            .select("following.id");
          response({
            userId: requestUserId.toString(),
            following: followingList.following,
          });
        }
      }
    );
  } catch (error) {
    console.error(`Listener error: user/following/get/all`, error);
  }
}
