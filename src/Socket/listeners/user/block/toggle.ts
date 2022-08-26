import { response } from "express";
import { Types } from "mongoose";
import { Socket } from "socket.io";
import user from "../../../../Database/Models/user";

export default function listenerBlockToggle(socket: Socket) {
  try {
    socket.on("user/block/toggle", async (userId, response) => {
      const userIdObject = new Types.ObjectId(userId);
      if (
        await user.exists({
          _id: userIdObject,
        })
      ) {
        if (
          await user.exists({
            _id: socket.data.user.ObjectId,
            "block.id": userIdObject,
          })
        ) {
          const blockedArray: any = await user
            .findById(socket.data.user.ObjectId)
            .select("block");

          const newBlockArray = blockedArray.block.filter((element: any) => {
            return element.id !== new Types.ObjectId(userIdObject);
          });

          await user.findByIdAndUpdate(socket.data.user.ObjectId, {
            $set: { block: newBlockArray },
          });
        } else {
          await user.findByIdAndUpdate(socket.data.user.ObjectId, {
            $push: { block: { id: userIdObject, blocked_at: new Date() } },
          });

          if (
            await user.exists({
              _id: socket.data.user.ObjectId,
              "following.id": userIdObject,
            })
          ) {
            const followingArray: any = await user
              .findById(socket.data.user.ObjectId)
              .select("following");

            const newFollowingArray = followingArray.block.filter(
              (element: any) => {
                return element.id !== new Types.ObjectId(userIdObject);
              }
            );

            await user.findByIdAndUpdate(socket.data.user.ObjectId, {
              $set: { following: newFollowingArray },
            });
          }
        }
      }
      response({ status: "done" });
    });
  } catch (error) {
    console.error(`Listener error: user/block/toggle`, error);
  }
}
