import { Socket } from "socket.io";

export default function sendSingleTweetToFollowers(socket: Socket, tweet: any) {
  const emitData = [
    {
      ...tweet._doc,
      likes: tweet.likes.length,
      comments: tweet.comments.length,
    },
  ];

  socket
    .to(`friend-${socket.data.user.user_id}`)
    .emit("sendTweetToClientFromServer", emitData);
}
