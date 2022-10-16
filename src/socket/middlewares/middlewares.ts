import { Socket } from "socket.io";

import authentication from "./authentication";
import onlineClients from "./onlineClients";
import joinToRoom from "./joinToRoom";
import RedisCacheType from "../../types/RedisCacheType";
import MiddlewareType from "../../types/MiddlewareType";

export default function middlewares(
  socket: Socket,
  redisCache: RedisCacheType
) {
  try {
    const middlewares: Array<MiddlewareType> = [
      authentication,
      onlineClients,
      joinToRoom,
    ];

    authentication(socket).then((authenticationResponse: boolean) => {
      socket.data.middleware = authenticationResponse;
      if (authenticationResponse) {
        onlineClients(socket, redisCache).then(
          (onlineClientsResponse: boolean) => {
            socket.data.middleware = onlineClientsResponse;
            if (onlineClientsResponse) {
              joinToRoom(socket).then((joinToRoomResponse: boolean) => {
                socket.data.middleware = joinToRoomResponse;
              });
            }
          }
        );
      }
    });
  } catch (error) {
    console.error(
      "Middleware main file error: middlewares",
      `Socket-id: ${socket.id}`,
      `Error: ${error}`
    );
  }
}
