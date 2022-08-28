import { Types } from "mongoose";

type messageSchemaType = {
  from: Types.ObjectId;
  to: Types.ObjectId;
  reply_to?: Types.ObjectId;
  context?: {
    image?: string;
    text?: string;
  };
  sent_at: Date;
  seen_at?: Date;
};

export default messageSchemaType;
