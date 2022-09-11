import { Types } from "mongoose";

type TweetCommentType = {
  _id: Types.ObjectId;
  owner: Types.ObjectId;
  context: String;
  reply_to?: Types.ObjectId;
  sent_at: Date;
};

export default TweetCommentType;
