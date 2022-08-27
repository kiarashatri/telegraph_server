import { Types } from "mongoose";
import { Socket } from "socket.io";
import tweet from "../../../../database/models/tweet";

export default function deleteTweetComment(socket: Socket) {
  try {
    socket.on("tweet/comment/delete", async (commentId, response) => {
      commentId = new Types.ObjectId(commentId);
      const tweetResponseDb: any = await tweet.findOne({
        "comments.id": commentId,
      });
      tweetResponseDb.comments = tweetResponseDb.comments.filter(
        (comment: any) => {
          return !comment._id.equals(commentId);
        }
      );

      await tweetResponseDb.save();

      response({ status: "done" });
    });
  } catch (error) {
    console.error(`Listener error: tweet/comment/delete`, error);
  }
}
