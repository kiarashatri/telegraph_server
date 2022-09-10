import { Types } from "mongoose";

type StoryResponseDbType = {
  _id: Types.ObjectId;
  owner: Types.ObjectId;
  image?: string;
  added_at: Date;
  seen_by: Array<{ by: Types.ObjectId; at: Date }>;
  seen: boolean;
  removed: boolean;
};

export default StoryResponseDbType;
