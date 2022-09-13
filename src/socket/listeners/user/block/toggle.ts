import { Types } from "mongoose";
import { Socket } from "socket.io";
import user from "../../../../database/models/user";
import UserBlockArrayDbResponseType from "../../../../types/databaseResponse/UserBlockArrayDbResponseType";
import UserFollowingArrayDbResponseType from "../../../../types/databaseResponse/UserFollowingArrayDbResponseType";
import ToggleUserBlockResponseCallbackType from "../../../../types/listener/response/ToggleUserBlockResponseCallbackType";
import relationChecker from "../../../services/relationChecker";

export default function toggleUserBlock(socket: Socket) {
  try {
    socket.on(
      "user/block/toggle",
      async (
        userId: string | Types.ObjectId,
        response: ToggleUserBlockResponseCallbackType
      ) => {
        userId = new Types.ObjectId(userId);
        if (
          await user.exists({
            _id: userId,
          })
        ) {
          const currentUserRelationChecking = await relationChecker(
            socket.data.user.ObjectId,
            userId
          );

          if (currentUserRelationChecking.isBlocked) {
            const blockedArray: UserBlockArrayDbResponseType = await user
              .findById(socket.data.user.ObjectId)
              .select("block");

            const newBlockArray = blockedArray.block.filter(
              (element: { id: Types.ObjectId; blocked_at: Date }) => {
                return element.id !== new Types.ObjectId(userId);
              }
            );

            await user.findByIdAndUpdate(socket.data.user.ObjectId, {
              $set: { block: newBlockArray },
            });
          } else {
            await user.findByIdAndUpdate(socket.data.user.ObjectId, {
              $push: { block: { id: userId, blocked_at: new Date() } },
            });

            if (currentUserRelationChecking.isFollowed) {
              const followingArray: UserFollowingArrayDbResponseType =
                await user
                  .findById(socket.data.user.ObjectId)
                  .select("following");

              const newFollowingArray = followingArray.following.filter(
                (element: { id: Types.ObjectId; added_at: Date }) => {
                  return element.id !== new Types.ObjectId(userId);
                }
              );

              await user.findByIdAndUpdate(socket.data.user.ObjectId, {
                $set: { following: newFollowingArray },
              });
            }
          }
        }
        response({ status: true });
      }
    );
  } catch (error) {
    console.error(`Listener error: user/block/toggle`, error);
  }
}
