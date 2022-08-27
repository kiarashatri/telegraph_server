import { Request, Response } from "express";
import user from "../../database/models/user";
import resetPasswordEmailSender from "../services/resetPasswordEmailSender";
import saveToDbResetPassword from "../services/saveToDbResetPassword";

export default async function resetPassword(req: Request, res: Response) {
  let userEmail: any;
  let responseObject: any;
  try {
    userEmail = req.body.email;
    responseObject = { response: "null" };
    const userExists: any = await user.exists({ email: userEmail });
    if (userExists) {
      responseObject.response = "email_sent";
      const returnToken: any = saveToDbResetPassword(userExists._id);
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
