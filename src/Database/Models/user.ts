import { model, Schema, Types } from "mongoose";

// Create an interface of document
interface iUser {
  name: string;
  family: string;
  username: string;
  email: string;
  phone: number;
  last_seen: Date;
  register_time: Date;
  email_confirmation: Date;
  friends: [{ id: Types.ObjectId; time_add: Date }];
  block: [{ id: Types.ObjectId; time_block: Date }];
  setting: object;
}

// Create Schema
const usersSchema = new Schema<iUser>({
  name: { type: String, required: true },
  family: { type: String, required: false },
  username: { type: String, required: true },
  email: { type: String, lowercase: true, trim: true, required: true },
  phone: { type: Number, required: true },
  last_seen: { type: Date, default: Date.now, required: true },
  register_time: { type: Date, default: Date.now, required: true },
  email_confirmation: { type: Date, default: null, required: true },
  friends: [{ id: Types.ObjectId, time_add: Date }],
  block: [{ id: Types.ObjectId, time_block: Date }],
  setting: { type: Object, required: false },
});

const Users = model("user", usersSchema);

export default Users;
