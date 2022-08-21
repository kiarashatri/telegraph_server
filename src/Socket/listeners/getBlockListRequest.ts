import { Socket } from "socket.io";
import user from "../../Database/Models/user";

export default function getBlockListRequest(socket: Socket) {
  socket.on("getBlockListRequest", async () => {
    const blockList = user
      .findById(socket.data.user.ObjectId)
      .select("block.id");
    socket.emit("getBlockListFromServer", blockList);
  });
}
