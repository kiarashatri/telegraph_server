import { Types } from "mongoose";
import { Socket } from "socket.io";
import story from "../../../Database/Models/story";

export default function deleteStory(socket: Socket) {
  try {
    socket.on(
      "story/delete",
      async (storyId: string | Types.ObjectId, response) => {
        const ownerQueryResponse: any = await story.findById(storyId);
        if (ownerQueryResponse.owner.equals(socket.data.user.ObjectId)) {
          ownerQueryResponse.removed = true;
          await ownerQueryResponse.save();
          response({ status: "done" });
        } else {
          response({ status: "rejected" });
        }
      }
    );
  } catch (error) {
    console.error(`Listener error: story/delete`, error);
  }
}
