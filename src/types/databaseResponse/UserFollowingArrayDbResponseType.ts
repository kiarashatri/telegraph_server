import { Types } from "mongoose";

type UserFollowingArrayDbResponseType = {
  _id: Types.ObjectId;
  following: Array<{ id: Types.ObjectId; added_at: Date }>;
};

export default UserFollowingArrayDbResponseType;
