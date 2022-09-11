import { Types } from "mongoose";

type LastSeenDbResponseType = {
  _id: Types.ObjectId;
  last_seen: Date;
};

export default LastSeenDbResponseType;
