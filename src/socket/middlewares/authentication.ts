import { Socket } from "socket.io";
import { JwtPayload, verify } from "jsonwebtoken";
import { Types } from "mongoose";
import dotenv from "dotenv";
import RedisCacheType from "../../types/RedisCacheType";

dotenv.config();

export default async function authentication(
  socket: Socket,
  redisCache: RedisCacheType
): Promise<boolean> {
  try {
    socket.data.user = verify(
      socket.handshake.auth.accessToken,
      process.env.JWT_SECRET_TOKEN || "JWT_SECRET_TOKEN"
    ) as JwtPayload;

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
