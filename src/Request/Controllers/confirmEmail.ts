import { Request, Response } from "express";
import { Types } from "mongoose";
import user from "../../database/models/user";

export default async function confirmEmail(req: Request, res: Response) {
  const responseObj = { status: false };
  try {
    const token: Types.ObjectId = new Types.ObjectId(req.body.token);
    await user.findOneAndUpdate(
      { email_confirmation_token: token },
      { $set: { email_confirmation: new Date() } }
    );
    responseObj.status = true;
  } catch (error) {
    console.error(
      `Error in controller: request/controller/confirmEmail`,
      `Request: ${req}`,
      `Response: ${res}`,
      `Error: ${error}`
    );
    responseObj.status = false;
  }
  res.send(responseObj);
}
