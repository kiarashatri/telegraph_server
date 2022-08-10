import { Socket } from "socket.io";

export default function disconnect(socket: Socket): boolean {
  if (!socket.data.verify) {
    socket.disconnect();
  }
  return socket.data.verify;
}
