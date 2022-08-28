import { model, Schema, Types } from "mongoose";
import messageSchemaType from "../schema/messageSchemaType";

let message: any;
try {
  // Create Schema
  const messageSchema = new Schema<messageSchemaType>({
    from: { type: Schema.Types.ObjectId, required: true, ref: "user" },
    to: { type: Schema.Types.ObjectId, required: true, ref: "user" },
    reply_to: { type: Schema.Types.ObjectId, required: false },
    context: {
      image: { type: String, required: false },
      text: { type: String, required: false },
    },
    sent_at: { type: Date, default: Date.now, required: true },
    seen_at: { type: Date, default: null, required: false },
  });

  message = model<messageSchemaType>("message", messageSchema);
} catch (error) {
  console.error(
    "Mongodb model error: database/models/message",
    `Error: ${error}`
  );
}

export default message;
