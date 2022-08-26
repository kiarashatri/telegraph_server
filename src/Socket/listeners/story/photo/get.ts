import { Types } from "mongoose";
import { Socket } from "socket.io";
import story from "../../../../Database/Models/story";
import user from "../../../../Database/Models/user";

type userObjType = string | Types.ObjectId;

export default function getStoryPhoto(socket: Socket) {
  try {
    socket.on(
      "story/photo/get",
      async (ownerId: userObjType, storyId: userObjType, response) => {
        const authentication = await user.find({
          _id: new Types.ObjectId(ownerId),
          "following.id": socket.data.user.ObjectId,
        });

        let data = {};
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
            id: storyModelRequest._id,
            image: storyModelRequest.image,
          };
        } else {
          data = { status: false };
        }

        response({
          storyId: new Types.ObjectId(storyId),
          base64Photo: data,
        });
      }
    );
  } catch (error) {
    console.error(`Listener error: story/photo/get`, error);
  }
}
