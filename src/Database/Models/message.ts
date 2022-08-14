import { model, Schema, Types } from "mongoose";

// Create Schema
const messageSchema = new Schema<{}>({
  from: { type: String, required: true },
  to: { type: String, required: true },
  reply_to: { type: String, required: true },
  context: {
    image: { type: String, required: false },
    text: { type: String, required: false },
  },
  sent_at: { type: Date, default: Date.now, required: true },
  seen_at: { type: Date, default: null, required: false },
});

const message = model("message", messageSchema);

export default message;
