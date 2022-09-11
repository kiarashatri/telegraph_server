import { Types } from "mongoose";

type ResetPasswordSchemaType = {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  resetRequestAt?: Date;
};

export default ResetPasswordSchemaType;
