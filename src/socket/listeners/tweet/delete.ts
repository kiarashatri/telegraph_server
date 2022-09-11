import { HydratedDocument, Types } from "mongoose";
import { Socket } from "socket.io";
import tweet from "../../../database/models/tweet";
import TweetDbResponseType from "../../../types/databaseResponse/TweetDbResponseType";
import DeleteTweetCallbackResponseType from "../../../types/listener/response/DeleteTweetResponseCallbackType";

export default function deleteTweet(socket: Socket) {
  try {
    socket.on(
      "tweet/delete",
      async (
        tweetId: string | Types.ObjectId,
        response: DeleteTweetCallbackResponseType
      ) => {
        const tweetQueryResponse: HydratedDocument<TweetDbResponseType> =
          await tweet.findById(tweetId);
        if (tweetQueryResponse.owner.equals(socket.data.user.ObjectId)) {
          tweetQueryResponse.removed = true;
          await tweetQueryResponse.save();
          response({ status: true, removed: true });
        }
      }
    );
  } catch (error) {
    console.error(`Listener error: tweet/delete`, error);
  }
}
