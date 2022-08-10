import { Socket } from "socket.io";

export default function testEmit(socket: Socket): void {
  socket.emit("server", " msg from server");
}
