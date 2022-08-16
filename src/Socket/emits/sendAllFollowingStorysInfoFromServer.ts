import { Types } from "mongoose";
import { Socket } from "socket.io";
import story from "../../Database/Models/story";
import user from "../../Database/Models/user";

function subtractDays(numOfDays: any, date: Date = new Date()) {
  date.setDate(date.getDate() - numOfDays);

  return date;
}

export default async function sendAllFollowingStorysInfoFromServer(
  socket: Socket
) {
  const returnFollowingArray: any = [];
  const dataFollowing: any = await user
    .findById(socket.data.user.ObjectId)
    .select("following.id");
  dataFollowing.following.forEach((element: any) => {
    returnFollowingArray.push(element.id);
  });

  const returnStorys = await story.find({
    owner: { $in: returnFollowingArray },
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

  socket.emit("sendAllFollowingStorysInfoFromServer", returnStorysArray);
}
