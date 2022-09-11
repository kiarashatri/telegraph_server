import { Types } from "mongoose";

type getUserProfileResponseCallbackType = (args: {
  _id: Types.ObjectId;
  name: string;
  family?: string;
  username: string;
  photo?: string;
  biography?: string;
  last_seen: Date;
}) => {};

export default getUserProfileResponseCallbackType;
