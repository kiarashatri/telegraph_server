import { Types } from "mongoose";
import { Socket } from "socket.io";
import tweet from "../../Database/Models/tweet";

export default function deleteTweetComment(socket: Socket) {
  socket.on("deleteTweetComment", async (commentId) => {
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
  });
}
