import { Types } from "mongoose";

type TweetsOfSpecificUserResponseCallbackType = (
  args: Array<TweetsOfSpecificUserResponseCallbackArgsType>
) => {};

export type TweetsOfSpecificUserResponseCallbackArgsType = {
  _id: Types.ObjectId;
  owner: Types.ObjectId;
  likes: number;
  userLiked: boolean;
  comments: number;
  context: string;
  sent_at: Date;
};

export default TweetsOfSpecificUserResponseCallbackType;
