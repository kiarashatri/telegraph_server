import { Socket } from "socket.io";

export default function sendSingleTweetToClient(socket: Socket, tweet: any) {
  const emitData = [
    {
      ...tweet._doc,
      likes: tweet.likes.length,
      comments: tweet.comments.length,
    },
  ];

  socket.emit("sendTweetToClientFromServer", emitData);
}
