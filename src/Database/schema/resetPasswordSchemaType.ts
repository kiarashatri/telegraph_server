import { Types } from "mongoose";

type resetPasswordSchemaType = {
  user: Types.ObjectId;
  resetRequestAt?: Date;
};

export default resetPasswordSchemaType;
