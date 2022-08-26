import { Socket } from "socket.io";
import sendUserProfile from "../emits/sendUserProfile";

export default function receiveUserProfile(socket: Socket): void {
  socket.on("receiveUserProfile", (userId) => {
    sendUserProfile(socket, userId);
  });
}
