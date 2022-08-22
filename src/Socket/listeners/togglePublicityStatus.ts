import { Types } from "mongoose";
import { Socket } from "socket.io";
import user from "../../Database/Models/user";

export default function togglePublicityStatus(socket: Socket) {
  socket.on("toggleBlockUser", async (publicityStatus: boolean) => {
    await user.findByIdAndUpdate(socket.data.user.ObjectId, {
      $set: { "setting.publicity": publicityStatus },
    });
  });
}
