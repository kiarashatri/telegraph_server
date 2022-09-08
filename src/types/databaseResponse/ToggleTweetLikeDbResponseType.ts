import { Types } from "mongoose";

type ToggleTweetLikeDbResponseType = {
  _id: Types.ObjectId;
  owner: Types.ObjectId;
  likes: Array<Types.ObjectId>;
};
export default ToggleTweetLikeDbResponseType;
