import { model, Schema, Types } from "mongoose";

// Create an interface of document
interface iTweet {
  owner: string;
  like: [Types.ObjectId];
  comments: [
    {
      id: Types.ObjectId;
      owner: Types.ObjectId;
      context: string;
      reply_to: Types.ObjectId;
      time_sent: Date;
    }
  ];
  context: string;
  time_sent: Date;
}

// Create Schema
const tweetSchema = new Schema<iTweet>({
  owner: { type: String, required: true },
  like: [{ type: Types.ObjectId }],
  comments: [
    {
      id: { type: Types.ObjectId, required: true },
      owner: { type: Types.ObjectId, required: true },
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
