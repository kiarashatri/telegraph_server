import { model, Schema, Types } from "mongoose";

// Create Schema
const usersSchema = new Schema<{}>({
  name: { type: String, required: true },
  family: { type: String, required: false },
  username: { type: String, required: true },
  email: { type: String, lowercase: true, trim: true, required: true },
  phone: { type: Number, required: true },
  last_seen: { type: Date, default: Date.now, required: true },
  register_at: { type: Date, default: Date.now, required: true },
  email_confirmation: { type: Date, default: null, required: true },
  friends: [{ id: String, added_at: Date, ref: "users" }],
  block: [{ id: String, blocked_at: Date, ref: "users" }],
  setting: { type: Object, required: false },
});

const Users = model("user", usersSchema);

export default Users;
