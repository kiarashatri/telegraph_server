import { Types } from "mongoose";

type AllUnreadMessageType = {
  _id: Types.ObjectId;
  from: Types.ObjectId;
  reply_to: Types.ObjectId;
  context: {
    image?: string;
    text?: string;
  };
  sent_at: Date;
} | null;

export default AllUnreadMessageType;
