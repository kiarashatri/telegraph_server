import { Types } from "mongoose";
import { Socket } from "socket.io";
import story from "../../../../database/models/story";
import user from "../../../../database/models/user";
import GetStoryPhotoResponseCallback, {
  GetStoryPhotoResponseCallbackArgs,
} from "../../../../types/listener/response/GetStoryPhotoResponseCallbackType";

type userObjType = string | Types.ObjectId;

export default function getStoryPhoto(socket: Socket) {
  try {
    socket.on(
      "story/photo/get",
      async (
        ownerId: userObjType,
        storyId: userObjType,
        response: GetStoryPhotoResponseCallback
      ) => {
        const authentication = await user.find({
          _id: new Types.ObjectId(ownerId),
          "following.id": socket.data.user.ObjectId,
        });

        let data: GetStoryPhotoResponseCallbackArgs;
        if (authentication.length !== 0) {
          // insert into seen_by
          await story.findOneAndUpdate(
            { _id: new Types.ObjectId(storyId) },
            {
              $push: {
                seen_by: { by: socket.data.user.ObjectId, at: new Date() },
              },
            }
          );

          let storyModelRequest: any = await story.findOne({
            _id: new Types.ObjectId(storyId),
          });

          data = {
            status: true,
            storyId: storyModelRequest._id.toString(),
            base64Photo: storyModelRequest.image,
          };
        } else {
          data = {
            status: false,
            storyId: new Types.ObjectId(storyId).toString(),
          };
        }

        response(data);
      }
    );
  } catch (error) {
    console.error(`Listener error: story/photo/get`, error);
  }
}
