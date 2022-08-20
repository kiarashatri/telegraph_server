import { Types } from "mongoose";
import { Socket } from "socket.io";
import tweet from "../../Database/Models/tweet";
import user from "../../Database/Models/user";

export default function getComments(socket: Socket) {
  socket.on("getComments", async (tweetId, skipPage) => {
    const tweetOwner: any = await tweet
      .findOne({ _id: new Types.ObjectId(tweetId) })
      .select("owner");

    await user.exists(
      { _id: socket.data.user.ObjectId, "following.id": tweetOwner.owner },
      async (error, response) => {
        if (response !== null) {
          let skipNumber = 0;
          if (skipPage > 1) {
            skipNumber = (skipPage - 1) * 20;
          }
          const tweetComments: any = await tweet
            .findOne({ _id: new Types.ObjectId(tweetId) })
            .select("comments")
            .limit(20)
            .skip(skipNumber);

          socket.emit("recieveTweetCommentsFromServer", tweetComments);
        }
      }
    );
  });
}
