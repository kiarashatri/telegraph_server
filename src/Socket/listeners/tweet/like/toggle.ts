import { Types } from "mongoose";
import { Socket } from "socket.io";
import tweet from "../../../../Database/Models/tweet";
import relationChecker from "../../../services/relationChecker";

export default async function toggleTweetLike(socket: Socket) {
  try {
    socket.on("tweet/like/toggle", async (tweetId, response) => {
      const tweetObj: any = await tweet
        .findOne({ _id: new Types.ObjectId(tweetId) })
        .select("owner likes");

      const relationChecking = await relationChecker(
        socket.data.user.ObjectId,
        tweetObj.owner
      );
      if (relationChecking.isFollowed) {
        const isCurrentUserLiked = !tweetObj.likes.every(
          (ObjectIdElement: Types.ObjectId) => {
            return !ObjectIdElement.equals(socket.data.user.ObjectId);
          }
        );

        if (isCurrentUserLiked) {
          delete tweetObj.likes[
            tweetObj.likes.indexOf(socket.data.user.ObjectId)
          ];
        } else {
          tweetObj.likes.push(socket.data.user.ObjectId);
        }

        await tweetObj.save();
        response({ status: "done" });
      }
    });
  } catch (error) {
    console.error(`Listener error: tweet/like/toggle`, error);
  }
}
