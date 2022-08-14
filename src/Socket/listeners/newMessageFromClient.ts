import { ObjectId } from "mongoose";
import { Socket } from "socket.io";
import sendMessageToUser from "../emits/sendMessageToUser";
import saveMessageToDb from "../services/saveMessageToDb";

interface dbData {
  to: String;
  from?: String;
  reply_to: String;
  context: {
    image: String;
    text: String;
  };
  sent_at?: Date;
  seen_at?: Date | null;
  _id: String;
  __v: number;
}

export default function newMessageFromClient(
  socket: Socket,
  redisCache: any
): void {
  socket.on("newMessageFromClient", async (arg: dbData) => {
    arg.from = socket.data.user.user_id;
    arg.sent_at = new Date();

    try {
      // Type should fix to dbData:
      const data: any = await saveMessageToDb(arg);
      delete data.seen_at;

      // send message to user if the user in online
      sendMessageToUser(socket, data, redisCache);
    } catch (error) {}
  });
}
