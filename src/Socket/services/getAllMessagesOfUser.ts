import { HydratedDocument, Types } from "mongoose";
import message from "../../database/models/message";
import dotenv from "dotenv";
import MessageSchemaType from "../../database/schema/MessageSchemaType";
dotenv.config();

export default async function getAllMessagesOfUser(
  fromUser: Types.ObjectId,
  toUser: Types.ObjectId,
  page: number
): Promise<Array<MessageSchemaType> | undefined> {
  try {
    const skipNumber: number =
      page === 1
        ? 0
        : (page - 1) * Number(process.env.RETURN_MESSAGE_EVERY_REQ);

    return (await message
      .find({
        from: { $in: [fromUser, toUser] },
        to: { $in: [fromUser, toUser] },
      })
      .sort("sent_at")
      .skip(skipNumber)
      .limit(25)) as Array<MessageSchemaType>;
  } catch (error) {
    console.error("Service error: getAllMessagesOfUser", `Error: ${error}`);
  }
}
