import { Types } from "mongoose";

type TweetSchemaType = {
  _id?: Types.ObjectId;
  owner: Types.ObjectId;
  likes: Array<Types.ObjectId>;
  comments?: Array<{
    owner: Types.ObjectId;
    context: String;
    reply_to?: Types.ObjectId;
    sent_at: Date;
  }>;

  context: string;
  sent_at: Date;
  removed?: boolean;
};

export default TweetSchemaType;
