import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { verify, sign } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default function authentication(
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void
): void {
  // let va = {
  //   user_id: "id_user_kiarash_123",
  //   name: "kiarash",
  //   age: 20,
  // };
  // console.log(sign(va, process.env.JWT_SECRET_TOKEN || "JWT_SECRET_TOKEN"));
  try {
    socket.data.user = verify(
      socket.handshake.auth.accessToken,
      process.env.JWT_SECRET_TOKEN || "JWT_SECRET_TOKEN"
    );
    socket.data.verify = true;
  } catch {
    socket.data.verify = false;
    console.log(
      `Faild to verify authentication: { socket_id: '${socket.id}' , access_token:'${socket.handshake.auth.accessToken}' }`
    );
  }
  next();
}
