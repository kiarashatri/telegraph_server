import { Socket } from "socket.io";
import tweet from "../../Database/Models/tweet";
import sendSingleTweetToClient from "../emits/sendSingleTweetToClient";

export default function addNewTweet(socket: Socket) {
  socket.on("addNewTweet", async (tweetContext: any) => {
    try {
      const newTweet = new tweet({
        owner: socket.data.user.ObjectId,
        likes: [],
        comments: [],
        context: tweetContext,
        send_at: new Date(),
      });
      const savedTweet: any = await newTweet.save();
      sendSingleTweetToClient(socket, savedTweet);
    } catch (error) {
      console.log("Listener error: addNewTweet.ts");
    }
  });
}
