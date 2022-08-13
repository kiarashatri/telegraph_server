import { Socket } from "socket.io";

export default function newMessageFromClient(socket: Socket): void {
  socket.on("newMessageFromClient", (arg) => {
    arg.from = socket.data.user.user_id;
    arg.sent_at = new Date();
  });
}
