import { Types } from "mongoose";

type StorySchemaType = {
  _id?: Types.ObjectId;
  owner?: Types.ObjectId;
  image: string;
  added_at: Date;
  seen_by?: Array<{ by: Types.ObjectId; at: Date }>;
  removed?: boolean;
};

export default StorySchemaType;
