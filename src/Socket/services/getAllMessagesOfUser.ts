import { Types } from "mongoose";
import message from "../../database/models/message";

export default async function getAllMessagesOfUser(
  fromUser: string | Types.ObjectId,
  toUser: string | Types.ObjectId,
  page: number
) {
  fromUser = new Types.ObjectId(fromUser);
  toUser = new Types.ObjectId(toUser);
  const skipNumber: number = page === 1 ? 0 : (page - 1) * 25;

  return await message
    .find({
      from: { $in: [fromUser, toUser] },
      to: { $in: [fromUser, toUser] },
    })
    .sort("sent_at")
    .skip(skipNumber)
    .limit(25);
}
