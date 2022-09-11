import { HydratedDocument, Types } from "mongoose";
import { Socket } from "socket.io";
import tweet from "../../../../database/models/tweet";
import TweetResponseDataType from "../../../../types/databaseResponse/TweetDbResponseType";
import DeleteTweetCommentCallbackResponse from "../../../../types/listener/response/DeleteTweetCommentResponseCallbackType";
import TweetCommentType from "../../../../types/TweetCommentType";

export default function deleteTweetComment(socket: Socket) {
  try {
    socket.on(
      "tweet/comment/delete",
      async (
        commentId: string | Types.ObjectId,
        response: DeleteTweetCommentCallbackResponse
      ) => {
        commentId = new Types.ObjectId(commentId);

        const tweetResponseDb: HydratedDocument<TweetResponseDataType> =
          await tweet.findOne({
            "comments.id": commentId,
          });
        tweetResponseDb.comments = tweetResponseDb.comments.filter(
          (comment: TweetCommentType) => {
            return !comment._id.equals(commentId);
          }
        );

        await tweetResponseDb.save();

        response({ status: true });
      }
    );
  } catch (error) {
    console.error(`Listener error: tweet/comment/delete`, error);
  }
}
