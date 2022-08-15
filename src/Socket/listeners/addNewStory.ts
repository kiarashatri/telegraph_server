import { Socket } from "socket.io";
import story from "../../Database/Models/story";

export default function addNewStory(socket: Socket) {
  socket.on("addNewStory", async (base64Image: String) => {
    const newStory = new story({
      owner: socket.data.user.user_id,
      image: base64Image,
      added_at: new Date(),
    });
    await newStory.save();
    console.log(newStory);
  });
}
