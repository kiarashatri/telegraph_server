import { Request, Response } from "express";
import user from "../../database/models/user";
import { createHash } from "crypto";
import { sign } from "jsonwebtoken";
import dotenv from "dotenv";
import UserLoginDataDbResponseType from "../../types/databaseResponse/UserLoginDataDbResponseType";
import { HydratedDocument } from "mongoose";
import LoginResponseType from "../../types/controllerResponse/LoginResponseType";
dotenv.config();

export default async function login(
  req: Request,
  res: Response<LoginResponseType>
): Promise<void> {
  try {
    const responseObj: LoginResponseType = {
      authenticated: false,
    };
    const reqUsername: string = req.body.username || null;
    const reqPassword: string = createHash("sha256")
      .update(req.body.password || "null")
      .digest("base64");

    const userData: HydratedDocument<UserLoginDataDbResponseType> | null =
      await user
        .findOne({ username: reqUsername, hashPassword: reqPassword })
        .select("_id email_confirmation");

    if (userData !== null) {
      const JWT_ACCESS_TOKEN =
        process.env.JWT_SECRET_TOKEN || "JWT_SECRET_TOKEN";

      responseObj.authenticated = true;

      responseObj.emailConfirmation =
        userData.email_confirmation === null ? false : true;

      responseObj.userId = userData._id.toString();

      responseObj.acceccToken = sign(
        { user_id: userData._id.toString() },
        JWT_ACCESS_TOKEN
      );
    } else {
      responseObj.authenticated = false;
    }

    res.status(200).send(responseObj);
  } catch (error) {
    console.error(
      `Error in controller: request/controller/login`,
      `Request: ${req}`,
      `Response: ${res}`,
      `Error: ${error}`
    );
  }
}
