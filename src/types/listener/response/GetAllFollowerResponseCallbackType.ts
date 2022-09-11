import { Types } from "mongoose";

type GetAllFollowerResponseCallbackType = (args: {
  userId: string;
  follower: Array<{ id: Types.ObjectId }>;
}) => {};

export default GetAllFollowerResponseCallbackType;
