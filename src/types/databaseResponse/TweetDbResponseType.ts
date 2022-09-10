import { Types } from "mongoose";
import TweetCommentResponseDataType from "./TweetCommentResponseDataType";

type TweetResponseDataType = {
  _id: Types.ObjectId;
  owner: Types.ObjectId;
  likes: Array<Types.ObjectId>;
  comments: Array<TweetCommentResponseDataType>;
  context: string;
  sent_at: Date;
  removed: boolean;
};

export default TweetResponseDataType;
