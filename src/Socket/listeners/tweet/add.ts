import { Socket } from "socket.io";
import tweet from "../../../Database/Models/tweet";
import sendSingleTweetToFollowers from "../../emits/sendSingleTweetToFollowers";

export default function addNewTweet(socket: Socket) {
  try {
    socket.on("tweet/add", async (tweetContext: any, response) => {
      const newTweet = new tweet({
        owner: socket.data.user.ObjectId,
        likes: [],
        comments: [],
        context: tweetContext,
        send_at: new Date(),
      });
      const savedTweet: any = await newTweet.save();
      sendSingleTweetToFollowers(socket, savedTweet);
      response({ status: "done" });
    });
  } catch (error) {
    console.error(`Listener error: tweet/add`, error);
  }
}
