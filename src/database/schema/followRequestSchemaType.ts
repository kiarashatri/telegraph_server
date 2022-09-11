import { Types } from "mongoose";

type FollowRequestSchemaType = {
  _id?: Types.ObjectId;
  applicant: Types.ObjectId;
  request_to: Types.ObjectId;
  requested_at?: Date;
};

export default FollowRequestSchemaType;
