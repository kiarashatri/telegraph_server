import { Socket } from "socket.io";
import message from "../../Database/Models/message";

export default async function saveMessageToDb(arg: any) {
  try {
    const data = new message(arg);
    await data.save();

    return data.toObject();
  } catch (error) {
    return {};
  }
}
