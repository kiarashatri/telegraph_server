import { model, Schema } from "mongoose";
import TweetSchemaType from "../schema/TweetSchemaType";

let tweet: any;

try {
  // Create Schema
  const tweetSchema = new Schema<TweetSchemaType>({
    owner: { type: Schema.Types.ObjectId, required: true },
    likes: [{ type: Schema.Types.ObjectId }],
    comments: [
      {
        owner: { type: Schema.Types.ObjectId, required: true },
        context: { type: String, required: true },
        reply_to: {
          type: Schema.Types.ObjectId,
          required: false,
          default: null,
        },
        sent_at: { type: Date, required: true },
      },
    ],
    context: { type: String, lowercase: true, trim: true, required: true },
    sent_at: { type: Date, default: Date.now, required: true },
    removed: { type: Boolean, default: false, required: false },
  });

  tweet = model<TweetSchemaType>("tweet", tweetSchema);
} catch (error) {
  console.error(
    "Mongodb model error: database/models/tweet",
    `Error: ${error}`
  );
}

export default tweet;
