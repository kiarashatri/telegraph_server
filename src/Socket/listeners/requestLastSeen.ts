import { Socket } from "socket.io";
import user from "../../Database/Models/user";
import sendLastSeenFromServer from "../emits/sendLastSeenFromServer";

export default function requestLastSeen(socket: Socket, redisCache: any) {
  socket.on("requestLastSeen", (arrayArg) => {
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

    sendLastSeenFromServer(socket, finalArray);
  });
}
