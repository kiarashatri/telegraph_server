import { HydratedDocument, Types } from "mongoose";
import { Socket } from "socket.io";
import story from "../../../database/models/story";
import StoryResponseDbType from "../../../types/databaseResponse/StoryDbResponseType";
import DeleteStoryCallbackResponseType from "../../../types/listener/response/DeleteStoryResponseCallbackType";

export default function deleteStory(socket: Socket) {
  try {
    socket.on(
      "story/delete",
      async (
        storyId: string | Types.ObjectId,
        response: DeleteStoryCallbackResponseType
      ) => {
        const ownerQueryResponse: HydratedDocument<StoryResponseDbType> =
          await story.findById(storyId);
        if (ownerQueryResponse.owner.equals(socket.data.user.ObjectId)) {
          ownerQueryResponse.removed = true;
          await ownerQueryResponse.save();
          response({ status: true });
        } else {
          response({ status: false });
        }
      }
    );
  } catch (error) {
    console.error(`Listener error: story/delete`, error);
  }
}
