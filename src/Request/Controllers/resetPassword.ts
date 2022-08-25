import { Request, Response } from "express";
import user from "../../Database/Models/user";
import resetPasswordEmailSender from "../Services/resetPasswordEmailSender";
import saveToDbResetPassword from "../Services/saveToDbResetPassword";

export default async function resetPassword(req: Request, res: Response) {
  const userEmail = req.body.email;
  const responseObject = { response: "null" };

  try {
    const userExists: any = await user.exists({ email: userEmail });
    if (userExists) {
      responseObject.response = "email_sent";
      const returnToken: any = saveToDbResetPassword(userExists._id);
      resetPasswordEmailSender(userExists._id, returnToken);
    } else {
      responseObject.response = "user_not_found";
    }
  } catch (error) {
    responseObject.response = "bad_request";
  }
}
