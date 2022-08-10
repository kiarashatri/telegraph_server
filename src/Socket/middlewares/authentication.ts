import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";

export default function authentication(
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void
): void {
  const token = socket.handshake.auth.token;
  // console.log(token);
  next();
}
