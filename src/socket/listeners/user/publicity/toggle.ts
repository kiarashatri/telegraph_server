import { Socket } from "socket.io";
import user from "../../../../database/models/user";
import GetUserPublicityStatusResponseCallbackType from "../../../../types/listener/response/GetUserPublicityStatusResponseCallbackType";

export default function togglePublicityStatus(socket: Socket) {
  try {
    socket.on(
      "user/publicity/toggle",
      async (
        publicityStatus: boolean,
        response: GetUserPublicityStatusResponseCallbackType
      ): Promise<void> => {
        await user.findByIdAndUpdate(socket.data.user.ObjectId, {
          $set: { "setting.publicity": publicityStatus },
        });
        response({ status: true, currentStatusIsPublic: publicityStatus });
      }
    );
  } catch (error) {
    console.error(`Listener error: user/publicity/toggle`, error);
  }
}
