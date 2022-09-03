import { Socket } from "socket.io";
import MessageSchemaType from "../../../../database/schema/MessageSchemaType";
import RedisCacheType from "../../../../types/RedisCacheType";

export default async function sendMessageToSpecificUser(
  socket: Socket,
  data: MessageSchemaType,
  redisCache: RedisCacheType
): Promise<void> {
  if (await redisCache.exists(data.to)) {
    socket.to(data.to.toString()).emit("message/send/to", data);
  }
}
