import { Types } from "mongoose";
import { Socket } from "socket.io";
import tweet from "../../../../database/models/tweet";
import TweetOwnerDbResponseType from "../../../../types/databaseResponse/TweetOwnerDbResponseType";
import addCommentToTweetCallbackResponse from "../../../../types/listener/response/AddCommentToTweetResponseCallbackType";
import TweetCommentType from "../../../../types/TweetCommentType";
import relationChecker from "../../../services/relationChecker";

export default function addCommentToTweet(socket: Socket) {
  try {
    socket.on(
      "tweet/comment/add",
      async (
        tweetId: string | Types.ObjectId,
        Context: string,
        replyTo: string | Types.ObjectId,
        response: addCommentToTweetCallbackResponse
      ) => {
        const tweetOwer: TweetOwnerDbResponseType = await tweet
          .findById(new Types.ObjectId(tweetId))
          .select("owner");

        if (
          (await relationChecker(socket.data.user.ObjectId, tweetOwer.owner))
            .isFollowed
        ) {
          const newTweetCommentObject: TweetCommentType = {
            _id: new Types.ObjectId(),
            owner: socket.data.user.ObjectId,
            context: Context,
            sent_at: new Date(),
          };
          if (Types.ObjectId.isValid(replyTo)) {
            newTweetCommentObject.reply_to = new Types.ObjectId(replyTo);
          }

          await new tweet(newTweetCommentObject).save();
          response({ status: true });
        }
      }
    );
  } catch (error: any) {
    console.error(`Listener error: tweet/comment/add`, error);
  }
}
