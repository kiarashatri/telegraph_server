import { Socket } from "socket.io";
import User from "../../Database/Models/user";

export default async function sendUserProfile(socket: Socket, userId: String) {
  let data: any;
  try {
    data = await User.findById(userId).select(
      "_id name family username photo biography last_seen"
    );
  } catch (error) {
    console.log(
      `Error while complete sendUserProfile to: ( ${socket.data.user.user_id} ) - `,
      error
    );
  }

  socket.emit("sendUserProfileFromServer", data);
}
