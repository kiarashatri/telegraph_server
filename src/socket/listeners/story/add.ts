import { HydratedDocument } from "mongoose";
import { Socket } from "socket.io";
import story from "../../../database/models/story";
import StoryResponseDbType from "../../../types/databaseResponse/StoryDbResponseType";
import AddNewStoryCallbackResponseType from "../../../types/listener/response/AddNewStoryResponseCallbackType";

export default function addNewStory(socket: Socket) {
  try {
    socket.on(
      "story/new",
      async (
        base64Image: string,
        response: AddNewStoryCallbackResponseType
      ) => {
        const newStory: HydratedDocument<StoryResponseDbType> = new story({
          owner: socket.data.user.user_id,
          image: base64Image,
          added_at: new Date(),
          seen_by: [],
        });
        await newStory.save();
        response({ status: true });
      }
    );
  } catch (error) {
    console.error(`Listener error: story/new`, error);
  }
}
