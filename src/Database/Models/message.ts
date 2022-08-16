import { model, Schema, Types } from "mongoose";

// Create Schema
const messageSchema = new Schema<{}>({
  from: { type: Types.ObjectId, required: true },
  to: { type: Types.ObjectId, required: true },
  reply_to: { type: Types.ObjectId, required: true },
  context: {
    image: { type: String, required: false },
    text: { type: String, required: false },
  },
  sent_at: { type: Date, default: Date.now, required: true },
  seen_at: { type: Date, default: null, required: false },
});

const message = model("message", messageSchema);

export default message;
