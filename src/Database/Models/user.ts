import { model, Schema, Types } from "mongoose";

let user: any;
try {
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
    email_confirmation_token: {
      type: Types.ObjectId,
      default: new Types.ObjectId(),
      required: false,
    },
    following: [{ id: Types.ObjectId, added_at: Date }],
    block: [{ id: Types.ObjectId, blocked_at: Date }],
    setting: { type: Object, required: false },
  });
  user = model("user", usersSchema);
} catch (error) {
  console.error("Mongodb model error: database/models/user", `Error: ${error}`);
}

export default user;
