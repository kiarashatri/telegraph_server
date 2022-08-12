import { model, Schema, Types } from "mongoose";

// Create an interface of document
interface iMessage {
  from: String;
  to: String;
  reply_to: String;
  context: { image: string; text: string };
  time_sent: Date;
  time_deliver: Date;
}

// Create Schema
const messageSchema = new Schema<iMessage>({
  from: { type: Types.ObjectId, required: true, ref: "users" },
  to: { type: Types.ObjectId, required: true, ref: "users" },
  reply_to: { type: Types.ObjectId, required: true, ref: "message" },
  context: {
    image: { type: String, required: false },
    text: { type: String, required: false },
  },
  time_sent: { type: Date, default: Date.now, required: true },
  time_deliver: { type: Date, default: null, required: true },
});

const message = model("message", messageSchema);

export default message;
