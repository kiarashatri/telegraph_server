import { Socket } from "socket.io";
import story from "../../Database/Models/story";

export default async function saveStoryToDb(
  socket: Socket,
  base64Image: String
) {
  try {
    const newStory = new story({
      owner: socket.data.user.user_id,
      image: base64Image,
      added_at: new Date(),
      seen_by: [],
    });
    await newStory.save();
    return newStory.toObject();
  } catch (error) {
    return false;
  }
}
