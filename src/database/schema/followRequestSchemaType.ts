import { Types } from "mongoose";

type FollowRequestSchemaType = {
  applicant: Types.ObjectId;
  request_to: Types.ObjectId;
  requested_at?: Date;
};

export default FollowRequestSchemaType;
