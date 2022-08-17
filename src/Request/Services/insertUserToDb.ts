import { createHash } from "crypto";
import user from "../../Database/Models/user";

export default async function insertUserToDb(postData: any) {
  try {
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
    });

    await insert.save();

    return true;
  } catch (error) {
    return false;
  }
}
