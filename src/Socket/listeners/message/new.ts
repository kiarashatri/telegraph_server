import { Socket } from "socket.io";
import sendMessageToSpecificUser from "../../emits/message/send/to";
import relationChecker from "../../services/relationChecker";
import saveMessageToDb from "../../services/saveMessageToDb";

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

export default function newMessage(socket: Socket, redisCache: any): void {
  try {
    socket.on("message/new", async (arg: dbData, response) => {
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
        sendMessageToSpecificUser(socket, data, redisCache);
      }

      response({ status: "ok" });
    });
  } catch (error) {
    console.error(`Listener error: message/new`, error);
  }
}
