import { model, Schema, Types } from "mongoose";

// Create Schema
const tweetSchema = new Schema<{}>({
  owner: { type: Types.ObjectId, required: true },
  likes: [{ type: Types.ObjectId }],
  comments: [
    {
      id: { type: Types.ObjectId, required: true },
      owner: { type: Types.ObjectId, required: true },
      context: { type: String, required: true },
      reply_to: { type: Types.ObjectId, required: false },
      sent_at: { type: Date, required: true },
    },
  ],
  context: { type: String, lowercase: true, trim: true, required: true },
  sent_at: { type: Date, default: Date.now, required: true },
});

const tweet = model("tweet", tweetSchema);

export default tweet;
