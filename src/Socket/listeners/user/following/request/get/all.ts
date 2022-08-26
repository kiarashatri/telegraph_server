import { Socket } from "socket.io";
import followRequest from "../../Database/Models/followRequest";

export default function getFollowRequestList(socket: Socket) {
  socket.on("getFollowRequestList", async () => {
    try {
      socket.emit(
        "getFollowRequestList",
        await followRequest.find({ request_to: socket.data.user.ObjectId })
      );
    } catch (error) {
      console.error(
        `error in Listener: getFollowingRequestList.ts => socketId: ${socket.id} - userId: ${socket.data.user.userId}`
      );
    }
  });
}
