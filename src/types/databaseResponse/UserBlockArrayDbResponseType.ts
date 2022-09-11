import { Types } from "mongoose";

type UserBlockArrayDbResponseType = {
  block: Array<{ id: Types.ObjectId; blocked_at: Date }>;
};

export default UserBlockArrayDbResponseType;
