import { Socket } from "socket.io";
import user from "../../../../database/models/user";

export default function togglePublicityStatus(socket: Socket) {
  try {
    socket.on(
      "user/publicity/toggle",
      async (publicityStatus: boolean, response) => {
        await user.findByIdAndUpdate(socket.data.user.ObjectId, {
          $set: { "setting.publicity": publicityStatus },
        });
        response({ status: "done" });
      }
    );
  } catch (error) {
    console.error(`Listener error: user/publicity/toggle`, error);
  }
}
