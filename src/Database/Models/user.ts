import { model, Schema, Types } from "mongoose";

// Create Schema
const usersSchema = new Schema<{}>({
  name: { type: String, required: true },
  family: { type: String, required: false },
  username: { type: String, required: true },
  hashPassword: { type: String, required: true },
  email: { type: String, lowercase: true, trim: true, required: true },
  phone: { type: Number, required: false, default: null },
  photo: { type: String, required: false, default: null },
  biography: { type: String, required: false, default: null },
  last_seen: { type: Date, default: null, required: true },
  register_at: { type: Date, default: null, required: true },
  email_confirmation: { type: Date, default: null, required: false },
  following: [{ id: Types.ObjectId, added_at: Date }],
  block: [{ id: Types.ObjectId, blocked_at: Date }],
  setting: { type: Object, required: false },
});

const user = model("user", usersSchema);

export default user;
