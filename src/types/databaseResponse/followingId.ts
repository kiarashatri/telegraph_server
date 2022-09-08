import { Types } from "mongoose";

type followingId = {
  _id: Types.ObjectId;
  following: Array<{ id: Types.ObjectId }>;
};

export default followingId;
