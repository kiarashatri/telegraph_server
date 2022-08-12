import { model, Schema, Types } from "mongoose";

// Create an interface of document
interface iTweet {
  owner: String;
  like: [Types.ObjectId];
  comments: [
    {
      id: String;
      owner: String;
      context: string;
      reply_to: String;
      time_sent: Date;
    }
  ];
  context: string;
  time_sent: Date;
}

// Create Schema
const tweetSchema = new Schema<iTweet>({
  owner: { type: Types.ObjectId, required: true, ref: "users" },
  like: [{ type: Types.ObjectId, ref: "users" }],
  comments: [
    {
      id: { type: Types.ObjectId, required: true },
      owner: { type: Types.ObjectId, required: true, ref: "users" },
      context: { type: String, required: true },
      reply_to: { type: Types.ObjectId, required: false },
      time_sent: { type: Date, required: true },
    },
  ],
  context: { type: String, lowercase: true, trim: true, required: true },
  time_sent: { type: Date, default: Date.now, required: true },
});

const Tweet = model("tweet", tweetSchema);

export default Tweet;
