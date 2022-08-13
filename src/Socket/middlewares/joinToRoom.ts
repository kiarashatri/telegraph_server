import { Socket } from "socket.io";

export default function joinToRoom(socket: Socket, redisCache: any): boolean {
  try {
    socket.join(socket.data.user.user_id);
    return true;
  } catch {
    console.log(
      `Faild to join the room : { socket_id: '${socket.id}' , user_id:'${socket.data.user.user_id}' }`
    );
    return false;
  }
}
