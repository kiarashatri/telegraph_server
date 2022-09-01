import { Socket } from "socket.io";
import tweet from "../../../database/models/tweet";

export default function deleteTweet(socket: Socket) {
  try {
    socket.on("tweet/delete", async (tweetId, response) => {
      const tweetQueryResponse: any = await tweet.findById(tweetId);
      if (tweetQueryResponse.owner.equals(socket.data.user.ObjectId)) {
        tweetQueryResponse.removed = true;
        await tweetQueryResponse.save();
      }
      response({ status: "done" });
    });
  } catch (error) {
    console.error(`Listener error: tweet/delete`, error);
  }
}
