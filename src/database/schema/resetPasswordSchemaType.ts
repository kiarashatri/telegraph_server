import { Types } from "mongoose";

type ResetPasswordSchemaType = {
  user: Types.ObjectId;
  resetRequestAt?: Date;
};

export default ResetPasswordSchemaType;
