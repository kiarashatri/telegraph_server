import { Types } from "mongoose";

type resetPasswordSchemaType = {
  owner?: Types.ObjectId;
  image: string;
  added_at: Date;
  seen_by?: Array<{ by: Types.ObjectId; at: Date }>;
  removed?: boolean;
};

export default resetPasswordSchemaType;
