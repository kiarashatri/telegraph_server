import { Types } from "mongoose";
import resetPassword from "../../database/models/resetPassword";

export default async function saveToDbResetPassword(userObj: Types.ObjectId) {
  try {
    const forgetPasswordObj: any = new resetPassword({
      user: userObj,
    });
    await forgetPasswordObj.save();
    return forgetPasswordObj._id;
  } catch (error) {
    console.error(
      `Error in service: request/service/saveToDbResetPassword`,
      `Error: ${error}`
    );
  }
}
