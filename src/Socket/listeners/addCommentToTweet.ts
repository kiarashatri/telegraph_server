import { Types } from "mongoose";
import { Socket } from "socket.io";
import tweet from "../../Database/Models/tweet";
import user from "../../Database/Models/user";

export default function addCommentToTweet(socket: Socket) {
  socket.on("addCommentToTweet", async (tweetId, Context, replyTo) => {
    try {
      await user.exists(
        {
          _id: socket.data.user.ObjectId,
          "following.id": new Types.ObjectId(tweetId),
        },
        async (error, response) => {
          if (response !== null) {
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
          }
        }
      );
    } catch (error: any) {
      console.error("Listener error: addCommentToTweet.ts || ", error.message);
    }
  });
}
