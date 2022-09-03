import { Types } from "mongoose";

type followingId = {
  following: Array<{ id: Types.ObjectId }>;
};

export default followingId;
