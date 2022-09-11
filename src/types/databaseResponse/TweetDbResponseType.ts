import { Types } from "mongoose";
import TweetCommentType from "../TweetCommentType";

type TweetDbResponseType = {
  _id: Types.ObjectId;
  owner: Types.ObjectId;
  likes: Array<Types.ObjectId>;
  comments: Array<TweetCommentType>;
  context: string;
  sent_at: Date;
  removed: boolean;
};

export default TweetDbResponseType;
