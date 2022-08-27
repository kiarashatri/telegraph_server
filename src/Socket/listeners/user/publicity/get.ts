import { response } from "express";
import { Types } from "mongoose";
import { Socket } from "socket.io";
import user from "../../../../Database/Models/user";

export default function getUserPublicityStatus(socket: Socket) {
  try {
    socket.on(
      "user/publicity/get",
      async (userId = socket.data.user.ObjectId, response) =>
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
