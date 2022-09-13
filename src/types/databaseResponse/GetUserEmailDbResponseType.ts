import { Types } from "mongoose";

type GetUserEmailDbResponseType = {
  _id?: Types.ObjectId;
  email: string;
};

export default GetUserEmailDbResponseType;
