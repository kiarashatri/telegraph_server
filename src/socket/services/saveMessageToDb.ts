import { HydratedDocument, LeanDocument, Types } from "mongoose";
import message from "../../database/models/message";
import MessageSchemaType from "../../database/schema/MessageSchemaType";

export default async function saveMessageToDb(
  arg: MessageSchemaType
): Promise<MessageSchemaType> {
  try {
    const data: HydratedDocument<MessageSchemaType> = new message(
      arg
    ) as HydratedDocument<MessageSchemaType>;
    await data.save();
    return data;
  } catch (error) {
    console.error("Service error: saveMessageToDb", `Error: ${error}`);
    // fake response
    return {
      from: new Types.ObjectId(),
      to: new Types.ObjectId(),
      sent_at: new Date(),
    };
  }
}
