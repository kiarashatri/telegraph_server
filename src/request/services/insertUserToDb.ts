import { createHash } from "crypto";
import { HydratedDocument, Types } from "mongoose";
import user from "../../database/models/user";
import UserSchemaType from "../../database/schema/userSchemaType";
import NewUserInputType from "../../types/NewUserInputType";
import sendConfirmAccountEmail from "./sendConfirmAccountEmail";

export default async function insertUserToDb(
  postData: NewUserInputType
): Promise<boolean> {
  try {
    const insert: HydratedDocument<UserSchemaType> = new user({
      name: postData.name,
      family: postData.family,
      username: postData.username,
      hashPassword: createHash("sha256")
        .update(postData.password)
        .digest("base64"),
      email: postData.email,
      phone: postData.phone,
      last_seen: new Date(),
      register_at: new Date(),
      email_confirmation: null,
      email_confirmation_token: new Types.ObjectId(),
    });

    await insert.save();

    sendConfirmAccountEmail(
      new Types.ObjectId(insert.email_confirmation_token),
      postData.email
    );

    return true;
  } catch (error) {
    console.error(
      `Error in service: request/service/insertUserToDb`,
      `Error: ${error}`
    );
    return false;
  }
}
