import { Socket } from "socket.io";
import user from "../../database/models/user";

export default async function joinToRoom(socket: Socket, redisCache: any) {
  try {
    socket.join(socket.data.user.user_id);

    const followingId: any = await user
      .findById(socket.data.user.ObjectId)
      .select("following.id");

    followingId.following.forEach((element: any) => {
      socket.join(`followed-${element.id.toString()}`);
    });

    return true;
  } catch {
    console.log(
      `Faild to join the room : { socket_id: '${socket.id}' , user_id:'${socket.data.user.user_id}' }`
    );
    return false;
  }
}
