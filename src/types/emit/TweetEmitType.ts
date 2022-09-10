import { Types } from "mongoose";

type TweetEmitType = {
  _id: Types.ObjectId;
  owner: Types.ObjectId;
  context: string;
  sent_at: Date;
  likes: number;
  userLiked: boolean;
  comments: number;
};

export default TweetEmitType;
