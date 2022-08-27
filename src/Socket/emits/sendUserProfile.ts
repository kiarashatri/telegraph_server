import { Socket } from "socket.io";
import User from "../../Database/Models/user";
import relationChecker from "../services/relationChecker";

export default async function sendUserProfile(socket: Socket, userId: string) {
  let data: any;
  try {
  } catch (error) {
    console.log(
      `Error while complete sendUserProfile to: ( ${socket.data.user.user_id} ) - `,
      error
    );
  }
}
