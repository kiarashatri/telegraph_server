import { Types } from "mongoose";
import RelationCheckingType from "../../RelationCheckingType";

type GetUserProfileResponseCallbackType = (
  args: {
    biography?: string;
    family?: string;
    name: string;
    username: string;
    photo?: string;
    last_seen: Date;
    _id: Types.ObjectId;
  } & RelationCheckingType
) => {};

export default GetUserProfileResponseCallbackType;
