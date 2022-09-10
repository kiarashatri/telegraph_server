import { Types } from "mongoose";

type FollowingIdDbResponseType = {
  _id: Types.ObjectId;
  following: Array<{ id: Types.ObjectId }>;
};

export default FollowingIdDbResponseType;
