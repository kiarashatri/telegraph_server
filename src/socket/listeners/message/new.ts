import { Types } from "mongoose";
import { Socket } from "socket.io";
import MessageSchemaType from "../../../database/schema/MessageSchemaType";
import newMessageListenerResponse from "../../../types/listener/response/newMessageListenerResponse";
import RedisCacheType from "../../../types/RedisCacheType";
import RelationCheckingType from "../../../types/RelationCheckingType";
import sendMessageToSpecificUser from "../../emits/message/send/to";
import relationChecker from "../../services/relationChecker";
import saveMessageToDb from "../../services/saveMessageToDb";

export default function newMessage(
  socket: Socket,
  redisCache: RedisCacheType
): void {
  try {
    socket.on("message/new", async (arg: MessageSchemaType, response) => {
      const currentUser2TargetUserRelation: RelationCheckingType =
        await relationChecker(
          socket.data.user.ObjectId,
          new Types.ObjectId(arg.to)
        );
      const TargetUser2CurrentUserRelation: RelationCheckingType =
        await relationChecker(
          new Types.ObjectId(arg.to),
          socket.data.user.ObjectId
        );

      if (
        !currentUser2TargetUserRelation.isBlocked &&
        !TargetUser2CurrentUserRelation.isBlocked
      ) {
        arg.from = socket.data.user.ObjectId;
        arg.sent_at = new Date();
        delete arg.seen_at;
        // Type should fix to dbData:
        const data: MessageSchemaType = await saveMessageToDb(arg);
        delete data.seen_at;

        // send message to user if the user in online
        sendMessageToSpecificUser(socket, data, redisCache);
      }

      response({ status: true } as newMessageListenerResponse);
    });
  } catch (error) {
    console.error(`Listener error: message/new`, error);
  }
}
