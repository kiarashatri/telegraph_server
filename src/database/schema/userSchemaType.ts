import { Types } from "mongoose";

type UserSchemaType = {
  name: string;
  family?: string;
  username: string;
  hashPassword: string;
  email: string;
  phone?: number;
  photo?: string;
  biography?: string;
  last_seen: Date;
  register_at: Date;
  email_confirmation?: Date;
  email_confirmation_token?: Types.ObjectId;
  following?: Array<{ id: Types.ObjectId; added_at: Date }>;
  block?: Array<{ id: Types.ObjectId; blocked_at: Date }>;
  setting?: {};
};

export default UserSchemaType;
