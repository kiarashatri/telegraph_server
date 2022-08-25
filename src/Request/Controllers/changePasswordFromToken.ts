import { createHash } from "crypto";
import { Request, Response } from "express";
import { Types } from "mongoose";
import resetPassword from "../../Database/Models/resetPassword";
import user from "../../Database/Models/user";

function subtractDays(numOfDays: any, date: Date = new Date()) {
  date.setDate(date.getDate() - numOfDays);

  return date;
}

export default async function changePasswordFromToken(
  req: Request,
  res: Response
) {
  const tokenQuery: any = `${req.body.token}`;
  const newPasswordQuery: any = `${req.body.password}`;

  try {
    const tokenExistsInDb: any = await resetPassword.findOne({
      _id: new Types.ObjectId(tokenQuery),
      resetRequestAt: { $lte: subtractDays(1) },
    });

    if (tokenExistsInDb != null) {
      const hashPassword = createHash("sha256")
        .update(newPasswordQuery)
        .digest("base64");
      tokenExistsInDb.hashPassword = hashPassword;
      await tokenExistsInDb.save();
    }
  } catch (error) {}
}
