import { model, Schema } from "mongoose";
import ResetPasswordSchemaType from "../schema/StorySchemaType";

let story: any;
try {
  // Create Schema
  const storySchema = new Schema<ResetPasswordSchemaType>({
    owner: { type: Schema.Types.ObjectId, required: true },
    image: { type: String, required: true },
    added_at: { type: Date, required: true },
    seen_by: [{ by: { type: Schema.Types.ObjectId }, at: { type: Date } }],
    removed: { type: Boolean, required: false, default: false },
  });

  story = model<ResetPasswordSchemaType>("story", storySchema);
} catch (error) {
  console.error(
    "Mongodb model error: database/models/story",
    `Error: ${error}`
  );
}

export default story;
