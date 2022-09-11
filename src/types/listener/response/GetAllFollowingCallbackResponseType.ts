import { Types } from "mongoose";

type GetAllFollowingCallbackResponseType = (args: {
  userId: string;
  following: Array<{ id: Types.ObjectId }>;
}) => {};

export default GetAllFollowingCallbackResponseType;
