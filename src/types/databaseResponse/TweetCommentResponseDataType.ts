import { Types } from "mongoose";

type TweetCommentResponseDataType = {
  _id: Types.ObjectId;
  owner: Types.ObjectId;
  context: string;
  reply_to: Types.ObjectId;
  sent_at: Date;
};

export default TweetCommentResponseDataType;
