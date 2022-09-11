import { response } from "express";
import { Types } from "mongoose";
import { Socket } from "socket.io";
import user from "../../../../database/models/user";
import GetUserPublicityStatusResponseCallbackType from "../../../../types/listener/response/GetUserPublicityStatusResponseCallbackType";

export default function getUserPublicityStatus(socket: Socket): void {
  try {
    socket.on(
      "user/publicity/get",
      async (
        userId: Types.ObjectId | string = socket.data.user.ObjectId,
        response: GetUserPublicityStatusResponseCallbackType
      ) =>
        response(
          await user
            .findById(new Types.ObjectId(userId))
            .select("setting.publicity")
        )
    );
  } catch (error) {
    console.error(`Listener error: user/publicity/get`, error);
  }
}
