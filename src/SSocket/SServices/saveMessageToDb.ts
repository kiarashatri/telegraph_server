import { HydratedDocument, LeanDocument, Types } from "mongoose";
import message from "../../database/models/message";
import MessageSchemaType from "../../database/schema/MessageSchemaType";

export default async function saveMessageToDb(
  arg: MessageSchemaType
): Promise<MessageSchemaType | undefined> {
  try {
    const data: HydratedDocument<MessageSchemaType> = new message(
      arg
    ) as HydratedDocument<MessageSchemaType>;
    await data.save();
    return data.toObject();
  } catch (error) {
    console.error("Service error: saveMessageToDb", `Error: ${error}`);
  }
}
