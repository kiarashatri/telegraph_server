import { createHash } from "crypto";
import { Types } from "mongoose";
import user from "../../database/models/user";
import SendConfirmAccountEmail from "./SendConfirmAccountEmail";

export default async function insertUserToDb(postData: any) {
  try {
    const email_confirmation_obj_token = new Types.ObjectId();
    const insert = new user({
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
      email_confirmation_token: email_confirmation_obj_token,
    });

    await insert.save();

    SendConfirmAccountEmail(email_confirmation_obj_token, postData.email);

    return true;
  } catch (error) {
    return false;
  }
}
