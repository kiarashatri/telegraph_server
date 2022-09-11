import { HydratedDocument, Types } from "mongoose";
import { Socket } from "socket.io";
import tweet from "../../../../database/models/tweet";
import ToggleTweetLikeDbResponseType from "../../../../types/databaseResponse/ToggleTweetLikeDbResponseType";
import ToggleTweetLikeCallbackResponseType from "../../../../types/listener/response/ToggleTweetLikeResponseCallbackType";
import relationChecker from "../../../services/relationChecker";

export default async function toggleTweetLike(socket: Socket) {
  try {
    socket.on(
      "tweet/like/toggle",
      async (
        tweetId: string | Types.ObjectId,
        response: ToggleTweetLikeCallbackResponseType
      ) => {
        const tweetObj: HydratedDocument<ToggleTweetLikeDbResponseType> =
          await tweet
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
            response({ status: true, currentLikedStatus: false });
          } else {
            tweetObj.likes.push(socket.data.user.ObjectId);

            response({ status: true, currentLikedStatus: true });
          }

          await tweetObj.save();
        }
      }
    );
  } catch (error) {
    console.error(`Listener error: tweet/like/toggle`, error);
  }
}
