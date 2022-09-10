import { model, Schema, Types } from "mongoose";
import UserSchemaType from "../schema/userSchemaType";

let user: any;
try {
  // Create Schema
  const usersSchema = new Schema<UserSchemaType>({
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
      type: Schema.Types.ObjectId,
      default: new Types.ObjectId(),
      required: false,
    },
    following: [{ id: Schema.Types.ObjectId, added_at: Date }],
    block: [{ id: Schema.Types.ObjectId, blocked_at: Date }],
    setting: { type: Object, required: false },
  });
  user = model<UserSchemaType>("user", usersSchema);
} catch (error) {
  console.error("Mongodb model error: database/models/user", `Error: ${error}`);
}

export default user;
