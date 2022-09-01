import { Socket } from "socket.io";
import user from "../../database/models/user";
import RedisCacheType from "../../types/RedisCacheType";

export default async function joinToRoom(
  socket: Socket,
  redisCache: RedisCacheType
): Promise<boolean> {
  try {
    socket.join(socket.data.user.user_id);

    const followingId: any = await user
      .findById(socket.data.user.ObjectId)
      .select("following.id");

    followingId.following.forEach((element: any) => {
      socket.join(`followed-${element.id.toString()}`);
    });

    return true;
  } catch (error) {
    console.error(
      "Middleware error: joinToRoom",
      `User-id: ${socket.data.user.user_id}`,
      `Socket-id: ${socket.id}`,
      `Error: ${error}`
    );
    return false;
  }
}
