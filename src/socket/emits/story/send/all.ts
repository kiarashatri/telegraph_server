import { Socket } from "socket.io";
import story from "../../../../database/models/story";
import user from "../../../../database/models/user";
import dotenv from "dotenv";
import { Types } from "mongoose";
import FollowingIdDbResponseType from "../../../../types/databaseResponse/FollowingIdDbResponseType";
import StoryResponseDbType from "../../../../types/databaseResponse/StoryDbResponseType";
dotenv.config();

// subtract func for calculate days to use in db
function subtractDays(numOfDays: number, date: Date = new Date()): Date {
  try {
    date.setDate(date.getDate() - numOfDays);
  } catch (error) {
    console.error(
      "Date Helper Function error in emit: story/send/all",
      `Error: ${error}`
    );
  }
  return date;
}

export default async function sendAllFollowingStorysInfo(
  socket: Socket
): Promise<void> {
  try {
    let last: string;
    setInterval(async (): Promise<void> => {
      const returnFollowingArray: Array<Types.ObjectId> = [];
      const dataFollowing: FollowingIdDbResponseType = await user
        .findById(socket.data.user.ObjectId)
        .select("following.id");

      dataFollowing.following.forEach(
        (element: { id: Types.ObjectId }): void => {
          returnFollowingArray.push(element.id);
        }
      );

      const returnStorys: Array<StoryResponseDbType> = await story.find({
        owner: { $in: returnFollowingArray },
        removed: false,
        added_at: { $lte: subtractDays(1) },
      });

      const returnStorysArray: Array<StoryResponseDbType> = [];
      returnStorys.forEach((singleStory: StoryResponseDbType) => {
        //delete Base64Photo from return Object
        delete singleStory.image;

        // conver Seen_by.by to pure array for searching
        const seenByArrId: Array<string> = [];
        singleStory.seen_by.forEach(
          (seenBy: { by: Types.ObjectId; at: Date }) => {
            seenByArrId.push(seenBy.by.toString());
          }
        );

        //delete seen_by array from return Object
        singleStory.seen_by = [];

        // add seen status to return Object
        if (seenByArrId.indexOf(socket.data.user.user_id) !== -1) {
          singleStory.seen = false;
        } else {
          singleStory.seen = true;
        }

        // last step : push to returnable array
        returnStorysArray.push(singleStory);
      });

      if (JSON.stringify(returnStorysArray) !== last) {
        socket.emit("story/send/all", returnStorysArray);
        last = JSON.stringify(returnStorysArray);
      }
    }, Number(process.env.FRESH_STORY_INFO_DELAY) | 60000);
  } catch (error) {
    console.error(
      "Emit error: story/send/all",
      `User-id: ${socket.data.user.user_id}`,
      `Socket-id: ${socket.id}`,
      `Error: ${error}`
    );
  }
}
