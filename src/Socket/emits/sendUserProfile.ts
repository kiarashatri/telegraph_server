import { Socket } from "socket.io";
import User from "../../Database/Models/user";

export default async function sendUserProfile(socket: Socket, userId: String) {
  let data: any;
  try {
    data = await User.findById(userId).select(
      "name family username _id photo biography"
    );
  } catch (error) {
    console.log(
      `Error while complete sendUserProfile to: ( ${socket.data.user.user_id} ) - `,
      error
    );
  }

  socket.emit("sendUserProfileFromServer", data);
}
