import { Types } from "mongoose";
import TweetCommentType from "../TweetCommentType";

type TweetCommentsDbResponseData = {
  _id: Types.ObjectId;
  comments: Array<TweetCommentType>;
};

export default TweetCommentsDbResponseData;
