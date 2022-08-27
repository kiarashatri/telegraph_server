import { Socket } from "socket.io";
import user from "../../../../../Database/Models/user";

export default function getAllBlockList(socket: Socket) {
  try {
    socket.on("user/block/get/all", async (response) =>
      response(
        await user.findById(socket.data.user.ObjectId).select("block.id")
      )
    );
  } catch (error) {
    console.error(`Listener error: user/block/get/all`, error);
  }
}
