import { response } from "express";
import { Socket } from "socket.io";
import followRequest from "../../../../../../database/models/followRequest";

export default function getAllFollowingRequest(socket: Socket) {
  try {
    socket.on("user/following/request/get/all", async (response) =>
      response(
        await followRequest.find({ request_to: socket.data.user.ObjectId })
      )
    );
  } catch (error) {
    console.error(`Listener error: user/following/request/get/all`, error);
  }
}
