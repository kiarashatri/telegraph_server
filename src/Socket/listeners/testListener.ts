import { Socket } from "socket.io";

export default function testListener(socket: Socket): void {
  socket.on("from-client", (socket) => {
    console.log("sended arg");
  });
}
