import { model, Schema, Types } from "mongoose";

let story: any;
try {
  // Create Schema
  const storySchema = new Schema<{}>({
    owner: { type: Types.ObjectId, required: true },
    image: { type: String, required: true },
    added_at: { type: Date, required: true },
    seen_by: [{ by: { type: Types.ObjectId }, at: { type: Date } }],
    removed: { type: Boolean, required: false, default: false },
  });

  story = model("story", storySchema);
} catch (error) {
  console.error(
    "Mongodb model error: database/models/story",
    `Error: ${error}`
  );
}

export default story;
