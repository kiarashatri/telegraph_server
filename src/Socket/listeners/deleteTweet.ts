import { Socket } from "socket.io";
import tweet from "../../Database/Models/tweet";

export default function deleteTweet(socket: Socket) {
  socket.on("deleteTweet", async (tweetId) => {
    const tweetQueryResponse: any = await tweet.findById(tweetId);
    if (tweetQueryResponse.owner.equals(socket.data.user.ObjectId)) {
      tweetQueryResponse.removed = true;
      await tweetQueryResponse.save();
    }
  });
}
