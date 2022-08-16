import { model, Schema, Types } from "mongoose";

// Create Schema
const storySchema = new Schema<{}>({
  owner: { type: Types.ObjectId, required: true },
  image: { type: String, required: true },
  added_at: { type: Date, required: true },
  seen_by: [{ by: { type: Types.ObjectId }, at: { type: Date } }],
});

const story = model("story", storySchema);

export default story;
