import { Socket } from "socket.io";
import user from "../../../../../database/models/user";
import DeleteStoryCallbackResponseType from "../../../../../types/listener/response/DeleteStoryResponseCallbackType";

export default function getAllBlockList(socket: Socket) {
  try {
    socket.on(
      "user/block/get/all",
      async (response: DeleteStoryCallbackResponseType) =>
        response(
          (await user.findById(socket.data.user.ObjectId).select("block.id"))
            .block
        )
    );
  } catch (error) {
    console.error(`Listener error: user/block/get/all`, error);
  }
}
