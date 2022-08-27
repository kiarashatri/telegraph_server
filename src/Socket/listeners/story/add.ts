import { Socket } from "socket.io";
import story from "../../../database/models/story";

export default function addNewStory(socket: Socket) {
  try {
    socket.on("story/new", async (base64Image: string, response) => {
      const newStory = new story({
        owner: socket.data.user.user_id,
        image: base64Image,
        added_at: new Date(),
        seen_by: [],
      });
      await newStory.save();
      response({ status: "ok" });
    });
  } catch (error) {
    console.error(`Listener error: story/new`, error);
  }
}
