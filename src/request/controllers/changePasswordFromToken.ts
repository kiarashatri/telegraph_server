import { createHash } from "crypto";
import { Request, Response } from "express";
import { Types } from "mongoose";
import resetPassword from "../../database/models/resetPassword";
import user from "../../database/models/user";
import ResetPasswordSchemaType from "../../database/schema/ResetPasswordSchemaType";
import ChangePasswordFromTokenResponseType from "../../types/controllerResponse/ChangePasswordFromTokenResponseType";

function subtractDays(numOfDays: number, date: Date = new Date()) {
  date.setDate(date.getDate() - numOfDays);

  return date;
}

export default async function changePasswordFromToken(
  req: Request,
  res: Response<ChangePasswordFromTokenResponseType>
): Promise<void> {
  try {
    const tokenQuery: Types.ObjectId = new Types.ObjectId(req.body.token);
    const newPasswordQuery: string = String(req.body.password);

    const tokenExistsInDb: ResetPasswordSchemaType =
      await resetPassword.findOne({
        _id: tokenQuery,
        resetRequestAt: { $lte: subtractDays(1) },
      });

    if (tokenExistsInDb !== null) {
      const hashPassword = createHash("sha256")
        .update(newPasswordQuery)
        .digest("base64");

      await user.findOneAndUpdate(
        { _id: tokenQuery },
        { $set: { hashPassword: hashPassword } }
      );
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (error) {
    res.send(false);
    console.error(
      `Error in controller: request/controller/changePasswordFromToken`,
      `Request: ${req}`,
      `Response: ${res}`,
      `Error: ${error}`
    );
  }
}
