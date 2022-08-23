import { Socket } from "socket.io";
import story from "../../Database/Models/story";

export default function deleteStory(socket: Socket) {
  socket.on("deleteStory", async (storyId) => {
    const ownerQueryResponse: any = await story.findById(storyId);
    if (ownerQueryResponse.owner.equals(socket.data.user.ObjectId)) {
      ownerQueryResponse.removed = true;
      await ownerQueryResponse.save();
    }
  });
}
