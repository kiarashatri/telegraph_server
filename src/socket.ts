import { Server } from "socket.io";

// Socket.io Middleware's
import middlewares from "./Socket/middlewares/middlewares";

// Emmit's
import testEmit from "./Socket/emits/testEmit";

// Listener's
import testListener from "./Socket/listeners/testListener";

export default function Sockets(io: Server): void {
  middlewares(io);

  io.on("connection", (socket) => {
    testListener(socket);
    testEmit(socket);
    console.log("connected: ", socket.id);

    socket.on("disconnect", () => {
      console.log("disconnect: ", socket.id);
    });
  });
}
