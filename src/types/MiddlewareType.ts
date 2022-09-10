import { Socket } from "socket.io";
import RedisCacheType from "./RedisCacheType";

type MiddlewareType = (
  socket: Socket,
  redisCache?: RedisCacheType
) => Promise<boolean>;

export default MiddlewareType;
