import { Request, Response } from "express";
import { Types } from "mongoose";
import user from "../../database/models/user";
import ResetPasswordResponseType from "../../types/controllerResponse/ResetPasswordResponseType";
import ExistsDbResponseType from "../../types/databaseResponse/ExistsDbResponseType";
import resetPasswordEmailSender from "../services/resetPasswordEmailSender";
import saveToDbResetPassword from "../services/saveToDbResetPassword";

export default async function resetPassword(
  req: Request,
  res: Response<ResetPasswordResponseType>
): Promise<void> {
  let userEmail: string;
  let responseObject: ResetPasswordResponseType = { response: "" };
  try {
    userEmail = req.body.email;
    responseObject.response = "null";
    const userExists: ExistsDbResponseType | null = await user.exists({
      email: userEmail,
    });
    if (userExists) {
      responseObject.response = "email_sent";
      const returnToken: Types.ObjectId = await saveToDbResetPassword(
        userExists._id
      );
      resetPasswordEmailSender(userExists._id, returnToken);
    } else {
      responseObject.response = "user_not_found";
    }
  } catch (error) {
    console.error(
      `Error in controller: request/controller/resetPassword`,
      `Request: ${req}`,
      `Response: ${res}`,
      `Error: ${error}`
    );
    responseObject.response = "bad_request";
  }

  res.send(responseObject);
}
