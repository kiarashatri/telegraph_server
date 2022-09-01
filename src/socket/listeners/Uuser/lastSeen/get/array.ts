import { Socket } from "socket.io";
import user from "../../../../../database/models/user";

export default function getLastSeenFromArray(socket: Socket, redisCache: any) {
  try {
    socket.on("user/lastSeen/get/array", (arrayArg, response) => {
      const finalArray: any = [];

      arrayArg.forEach(async (id: any) => {
        if (await redisCache.exists(id)) {
          finalArray.push({
            userId: id,
            lastSeen: "online",
          });
        } else {
          const lastSeen = await user.findById(id).select("last_seen");
          finalArray.push({
            userId: id,
            lastSeen: lastSeen,
          });
        }
      });
      response(finalArray);
    });
  } catch (error) {
    console.error(`Listener error: user/lastSeen/get/array`, error);
  }
}
