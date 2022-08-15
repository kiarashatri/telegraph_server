import { model, Schema } from "mongoose";

// Create Schema
const storySchema = new Schema<{}>({
  owner: { type: String, required: true },
  image: { type: String, required: true },
  added_at: { type: Date, required: true },
});

const story = model("story", storySchema);

export default story;
