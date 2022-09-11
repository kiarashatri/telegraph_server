import { Types } from "mongoose";

type GetTweetsOfAnUserByPaginationDbResponseType = {
  _id: Types.ObjectId;
  owner: Types.ObjectId;
  likes: Array<Types.ObjectId>;
  comments: Array<{ _id: Types.ObjectId }>;
  context: string;
  sent_at: Date;
};

export default GetTweetsOfAnUserByPaginationDbResponseType;
