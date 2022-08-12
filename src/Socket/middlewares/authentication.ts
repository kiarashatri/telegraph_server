import { Socket } from "socket.io";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default function authentication(
  socket: Socket,
  redisCache: any
): boolean {
  try {
    socket.data.user = verify(
      socket.handshake.auth.accessToken,
      process.env.JWT_SECRET_TOKEN || "JWT_SECRET_TOKEN"
    );
    return true;
  } catch {
    console.log(
      `Faild to verify authentication: { socket_id: '${socket.id}' , access_token:'${socket.handshake.auth.accessToken}' }`
    );
    return false;
  }
}
