import { model, Schema } from "mongoose";
import MessageSchemaType from "../schema/MessageSchemaType";

let message: any;
try {
  // Create Schema
  const messageSchema = new Schema<MessageSchemaType>({
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

  message = model<MessageSchemaType>("message", messageSchema);
} catch (error) {
  console.error(
    "Mongodb model error: database/models/message",
    `Error: ${error}`
  );
}

export default message;
