import { Types } from "mongoose";

type UserLoginDataDbResponseType = {
  _id?: Types.ObjectId;
  name: string;
  family: string;
  username: string;
  email: string;
  phone: number;
  photo: string;
  biography: string;
  email_confirmation?: Date;
};

export default UserLoginDataDbResponseType;
