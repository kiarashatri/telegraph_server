import { Request, Response } from "express";
import user from "../../Database/Models/user";
import resetPassword from "../Services/resetPassword";

export default async function forgetPassword(req: Request, res: Response) {
  const userEmail = req.body.email;
  const responseObject = { response: "null" };

  try {
    if (await user.exists({ email: userEmail })) {
      responseObject.response = "user_exists";
    } else {
      responseObject.response = "email_sent";
      resetPassword();
    }
  } catch (error) {
    responseObject.response = "bad_request";
  }
}
