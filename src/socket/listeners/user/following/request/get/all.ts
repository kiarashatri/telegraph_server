import { response } from "express";
import { Socket } from "socket.io";
import followRequest from "../../../../../../database/models/followRequest";
import getAllFollowingRequestResponseCallbackType from "../../../../../../types/listener/response/getAllFollowingRequestResponseCallbackType";

export default function getAllFollowingRequest(socket: Socket) {
  try {
    socket.on(
      "user/following/request/get/all",
      async (response: getAllFollowingRequestResponseCallbackType) =>
        response(
          await followRequest
            .find({ request_to: socket.data.user.ObjectId })
            .select("applicant request_to")
        )
    );
  } catch (error) {
    console.error(`Listener error: user/following/request/get/all`, error);
  }
}
