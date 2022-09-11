import { Socket } from "socket.io";
import tweet from "../../../database/models/tweet";
import AddNewTweetCallbackResponseType from "../../../types/listener/response/AddNewTweetCallbackResponseType";

export default function addNewTweet(socket: Socket) {
  try {
    socket.on(
      "tweet/add",
      async (tweetContext: any, response: AddNewTweetCallbackResponseType) => {
        const newTweet = new tweet({
          owner: socket.data.user.ObjectId,
          likes: [],
          comments: [],
          context: tweetContext,
          send_at: new Date(),
        });
        const savedTweet: any = await newTweet.save();
        socket
          .to(`followed-${socket.data.user.userId}`)
          .emit("tweet/new", savedTweet);
        response({ status: true });
      }
    );
  } catch (error) {
    console.error(`Listener error: tweet/add`, error);
  }
}
