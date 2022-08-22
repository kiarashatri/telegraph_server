import { ObjectId, Types } from "mongoose";
import { Socket } from "socket.io";
import sendMessageToUser from "../emits/sendMessageToUser";
import relationChecker from "../services/relationChecker";
import saveMessageToDb from "../services/saveMessageToDb";

interface dbData {
  to: string;
  from?: string;
  reply_to: string;
  context: {
    image: string;
    text: string;
  };
  sent_at?: Date;
  seen_at?: Date | null;
  _id: string;
  __v: number;
}

export default function newMessageFromClient(
  socket: Socket,
  redisCache: any
): void {
  socket.on("newMessageFromClient", async (arg: dbData) => {
    try {
      const currentUser2TargetUserRelation = await relationChecker(
        socket.data.user.ObjectId,
        arg.to
      );
      const TargetUser2CurrentUserRelation = await relationChecker(
        arg.to,
        socket.data.user.ObjectId
      );
      if (
        !currentUser2TargetUserRelation.isBlocked &&
        !TargetUser2CurrentUserRelation.isBlocked
      ) {
        arg.from = socket.data.user.user_id;
        arg.sent_at = new Date();
        // Type should fix to dbData:
        const data: any = await saveMessageToDb(arg);
        delete data.seen_at;

        // send message to user if the user in online
        sendMessageToUser(socket, data, redisCache);
      }
    } catch (error) {}
  });
}
