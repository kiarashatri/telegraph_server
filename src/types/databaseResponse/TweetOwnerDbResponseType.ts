import { Types } from "mongoose";

type TweetOwnerDbResponseType = {
  _id: Types.ObjectId;
  owner: Types.ObjectId;
};

export default TweetOwnerDbResponseType;
