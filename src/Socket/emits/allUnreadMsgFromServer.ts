import { Socket } from "socket.io";

export default function allUnreadMsgFromServer(socket: Socket): void {
  socket.emit("allUnreadMsgFromServer", "it is some unreadMsgFromServer");
}
