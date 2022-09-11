import { Socket } from "socket.io";
import user from "../../../../../database/models/user";
import LastSeenDbResponseType from "../../../../../types/databaseResponse/LastSeenDbResponseType";
import GetLastSeenFromArrayResponseCallbackType from "../../../../../types/listener/response/GetLastSeenFromArrayResponseCallbackType";

export default function getLastSeenFromArray(socket: Socket, redisCache: any) {
  try {
    socket.on(
      "user/lastSeen/get/array",
      (
        arrayArg: Array<string>,
        response: GetLastSeenFromArrayResponseCallbackType
      ) => {
        const finalArray: Array<{
          userId: string;
          lastSeen?: Date;
          online: boolean;
        }> = [];

        arrayArg.forEach(async (id: string) => {
          if (await redisCache.exists(id)) {
            finalArray.push({
              userId: id,
              online: true,
            });
          } else {
            const lastSeen: LastSeenDbResponseType = await user
              .findById(id)
              .select("last_seen");
            finalArray.push({
              userId: id,
              online: false,
              lastSeen: lastSeen.last_seen,
            });
          }
        });
        response(finalArray);
      }
    );
  } catch (error) {
    console.error(`Listener error: user/lastSeen/get/array`, error);
  }
}
