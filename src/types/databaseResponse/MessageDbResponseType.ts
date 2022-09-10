import { Types } from "mongoose";

type MessageDbResponseType = {
  _id: Types.ObjectId;
  from: Types.ObjectId;
  to: Types.ObjectId;
  reply_to: Types.ObjectId;
  context: {
    image?: string;
    text?: string;
  };
  sent_at: Date;
  seen_at?: Date;
};

export default MessageDbResponseType;
