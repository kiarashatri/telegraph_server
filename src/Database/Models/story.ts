import { model, Schema, Types } from "mongoose";

// Create an interface of document
interface iStory {
  owner: String;
  image: String;
  add_time: Date;
}

// Create Schema
const storySchema = new Schema<iStory>({
  owner: { type: Types.ObjectId, required: true, ref: "users" },
  image: { type: String, required: true },
  add_time: { type: Date, required: true },
});

const story = model("story", storySchema);

export default story;
