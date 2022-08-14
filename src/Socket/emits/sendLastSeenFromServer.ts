import { Socket } from "socket.io";

export default function sendLastSeenFromServer(socket: Socket, usersArr: any) {
  socket.emit("sendLastSeenFromServer", usersArr);
}
