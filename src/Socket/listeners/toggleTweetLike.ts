import { Types } from "mongoose";
import { Socket } from "socket.io";
import tweet from "../../Database/Models/tweet";
import user from "../../Database/Models/user";

export default async function toggleTweetLike(socket: Socket) {
  socket.on("toggleTweetLike", async (tweetId) => {
    try {
      const tweetOwner: any = await tweet
        .findOne({ _id: new Types.ObjectId(tweetId) })
        .select("owner likes");

      await user.exists(
        { _id: socket.data.user.ObjectId, "following.id": tweetOwner.owner },
        async (error, response) => {
          if (response !== null) {
            if (tweetOwner.likes.indexOf(socket.data.user.ObjectId) === -1) {
              tweetOwner.likes.push(socket.data.user.ObjectId);
            } else {
              delete tweetOwner.likes[
                tweetOwner.likes.indexOf(socket.data.user.ObjectId)
              ];
            }
            return true;
          } else {
            return false;
          }
        }
      );
      return true;
    } catch (error) {
      return false;
    }
  });
}
