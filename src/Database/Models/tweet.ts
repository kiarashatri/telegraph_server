import { model, Schema, Types } from "mongoose";

// Create Schema
const tweetSchema = new Schema<{}>({
  owner: { type: String, required: true },
  like: [{ type: String }],
  comments: [
    {
      id: { type: String, required: true },
      owner: { type: String, required: true },
      context: { type: String, required: true },
      reply_to: { type: String, required: false },
      sent_at: { type: Date, required: true },
    },
  ],
  context: { type: String, lowercase: true, trim: true, required: true },
  sent_at: { type: Date, default: Date.now, required: true },
});

const tweet = model("tweet", tweetSchema);

export default tweet;
