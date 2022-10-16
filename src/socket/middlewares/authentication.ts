import { Socket } from "socket.io";
import { JwtPayload, verify } from "jsonwebtoken";
import { Types } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function authentication(socket: Socket): Promise<boolean> {
  try {
    try {
      socket.data.user = verify(
        socket.handshake.auth.accessToken,
        process.env.JWT_SECRET_TOKEN || "JWT_SECRET_TOKEN"
      );
    } catch (error) {
      return false;
    }
    socket.data.user.ObjectId = new Types.ObjectId(socket.data.user.user_id);
    return true;
  } catch (error) {
    console.error(
      "Middleware error: authentication",
      `Socket-id: ${socket.id}`,
      `Error: ${error}`
    );
    return false;
  }
}
