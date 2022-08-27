import { Types } from "mongoose";
import { Socket } from "socket.io";
import tweet from "../../../../database/models/tweet";
import user from "../../../../database/models/user";

export default function addCommentToTweet(socket: Socket) {
  try {
    socket.on(
      "tweet/comment/add",
      async (tweetId, Context, replyTo, response) => {
        await user.exists(
          {
            _id: socket.data.user.ObjectId,
            "following.id": new Types.ObjectId(tweetId),
          },
          async (error, dbResponse) => {
            if (dbResponse !== null) {
              const newTweetObject: any = {
                id: new Types.ObjectId(),
                owner: socket.data.user.ObjectId,
                context: Context,
                reply_to: null,
                sent_at: new Date(),
              };
              if (replyTo !== null) {
                newTweetObject.reply_to = replyTo;
              }

              await new tweet(newTweetObject).save();
              response({ status: "done" });
            }
            if (error) {
              response({ status: "error" });
            }
          }
        );
      }
    );
  } catch (error: any) {
    console.error(`Listener error: tweet/comment/add`, error);
  }
}
