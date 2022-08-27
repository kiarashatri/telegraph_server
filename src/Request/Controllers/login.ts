import { Request, Response } from "express";
import user from "../../database/models/user";
import { createHash } from "crypto";
import { sign } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//

export default async function login(req: Request, res: Response) {
  try {
    const returnData: any = {};
    const reqUsername = req.body.username || null;
    const reqPassword = createHash("sha256")
      .update(req.body.password || "null")
      .digest("base64");

    await user.exists(
      { username: reqUsername, hashPassword: reqPassword },
      async (err: any, userExists: any) => {
        if (err) {
          returnData.authenticated = "server_error";
          returnData.error = err;
        } else {
          let resObj: any;
          if (userExists) {
            const userData: any = await user
              .findOne({ username: reqUsername, hashPassword: reqPassword })
              .select(
                "name family username email phone photo biography setting email_confirmation"
              );
            const pureData = userData._doc;
            pureData.user_id = pureData._id;
            delete pureData._id;
            const JWT_ACCESS_TOKEN =
              process.env.JWT_SECRET_TOKEN || "JWT_SECRET_TOKEN";
            if (userData.email_confirmation === null) {
              resObj = {
                authenticated: "email_confirmation_require",
                ...pureData,
              };
            } else {
              resObj = {
                authenticated: "ok",
                ...pureData,
                accecc_token: sign(
                  { user_id: pureData.user_id },
                  JWT_ACCESS_TOKEN
                ),
              };
              delete resObj.email_confirmation;
            }
          } else {
            resObj = { authenticated: "rejected" };
          }

          res.send(resObj);
        }
      }
    );
  } catch (error) {
    console.error(
      `Error in controller: request/controller/login`,
      `Request: ${req}`,
      `Response: ${res}`,
      `Error: ${error}`
    );
  }
}
