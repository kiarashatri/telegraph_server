import { model, Schema, Types } from "mongoose";

// Create Schema
const messageSchema = new Schema<{}>({
  from: { type: Types.ObjectId, required: true, ref: "user" },
  to: { type: Types.ObjectId, required: true, ref: "user" },
  reply_to: { type: Types.ObjectId, required: false },
  context: {
    image: { type: String, required: false },
    text: { type: String, required: false },
  },
  sent_at: { type: Date, default: Date.now, required: true },
  seen_at: { type: Date, default: null, required: false },
});

const message = model("message", messageSchema);

export default message;
