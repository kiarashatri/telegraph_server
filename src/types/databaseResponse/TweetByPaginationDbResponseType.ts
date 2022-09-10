import { Types } from "mongoose";

type TweetResultsByPagination = {
  _id: Types.ObjectId;
  owner: Types.ObjectId;
  context: string;
  sent_at: Date;
  likes: Array<Types.ObjectId>;
  comments: Array<{ _id: Types.ObjectId }>;
};

export default TweetResultsByPagination;
