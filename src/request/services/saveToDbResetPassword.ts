import { HydratedDocument, Types } from "mongoose";
import resetPassword from "../../database/models/resetPassword";
import ResetPasswordSchemaType from "../../database/schema/ResetPasswordSchemaType";

export default async function saveToDbResetPassword(
  userObj: Types.ObjectId
): Promise<Types.ObjectId> {
  try {
    const forgetPasswordObj: HydratedDocument<ResetPasswordSchemaType> =
      new resetPassword({
        user: userObj,
      });
    await forgetPasswordObj.save();
    return forgetPasswordObj._id;
  } catch (error) {
    console.error(
      `Error in service: request/service/saveToDbResetPassword`,
      `Error: ${error}`
    );
    // return fake data in crash situations
    return new Types.ObjectId();
  }
}
