import { Types } from "mongoose";

type UserLoginDataDbResponseType = {
  _id: Types.ObjectId;
  email_confirmation: Date;
};

export default UserLoginDataDbResponseType;
