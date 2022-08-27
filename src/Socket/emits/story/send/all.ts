import { Socket } from "socket.io";
import story from "../../../../database/models/story";
import user from "../../../../database/models/user";
import dotenv from "dotenv";
dotenv.config();

function subtractDays(numOfDays: any, date: Date = new Date()) {
  try {
    date.setDate(date.getDate() - numOfDays);
    return date;
  } catch (error) {
    console.error(
      "Date Helper Function error in emit: story/send/all",
      `Error: ${error}`
    );
  }
}

export default async function sendAllFollowingStorysInfo(socket: Socket) {
  try {
    let last: any = "";
    setInterval(async () => {
      const returnFollowingArray: any = [];
      const dataFollowing: any = await user
        .findById(socket.data.user.ObjectId)
        .select("following.id");
      dataFollowing.following.forEach((element: any) => {
        returnFollowingArray.push(element.id);
      });

      const returnStorys = await story.find({
        owner: { $in: returnFollowingArray },
        removeed: false,
        added_at: { $lte: subtractDays(1) },
      });

      const returnStorysArray: any = [];
      returnStorys.forEach((singleStory: any) => {
        //delete Base64Photo from return Object
        delete singleStory.image;

        // conver Seen_by.by to pure array for searching
        const seenByArrId: any = [];
        singleStory.seen_by.forEach((seenBy: any) => {
          seenByArrId.push(seenBy.by);
        });

        //delete seen_by array from return Object
        delete singleStory.seen_by;

        // add seen status to return Object
        if (seenByArrId.indexOf(socket.data.user.ObjectId) !== -1) {
          singleStory.seen = false;
        } else {
          singleStory.seen = true;
        }

        // last step : push to returnable array
        returnStorysArray.push(singleStory);
      });

      if (JSON.stringify(returnStorysArray) !== last) {
        socket.emit("story/send/all", returnStorysArray);
        last = returnStorysArray;
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