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
    let responseObj: LoginResponseType = {
      name: "",
      family: "",
      username: "",
      email: "",
      phone: 0,
      photo: "",
      biography: "",
      authenticated: "",
    };
    const reqUsername: string = req.body.username || null;
    const reqPassword: string = createHash("sha256")
      .update(req.body.password || "null")
      .digest("base64");

    if (
      (await user.exists({
        username: reqUsername,
        hashPassword: reqPassword,
      })) !== null
    ) {
      const userData: HydratedDocument<UserLoginDataDbResponseType> = await user
        .findOne({ username: reqUsername, hashPassword: reqPassword })
        .select(
          "name family username email phone photo biography email_confirmation"
        );

      const JWT_ACCESS_TOKEN =
        process.env.JWT_SECRET_TOKEN || "JWT_SECRET_TOKEN";

      if (userData.email_confirmation === null) {
        responseObj = {
          ...userData.toObject(),
          authenticated: "email_confirmation_require",
        };
      } else {
        responseObj = {
          ...userData.toObject(),
          accecc_token: sign(
            { user_id: userData._id.toString() },
            JWT_ACCESS_TOKEN
          ),
          authenticated: "ok",
        };
        delete responseObj.email_confirmation;
      }
    } else {
      responseObj.authenticated = "rejected";
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
