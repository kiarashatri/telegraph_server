import { Types } from "mongoose";

type followRequestSchemaType = {
  applicant: Types.ObjectId;
  request_to: Types.ObjectId;
  requested_at?: Date;
};

export default followRequestSchemaType;
