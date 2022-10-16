import { Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import dotenv from "dotenv";
import VerifyTokenResponseType from "../../types/controllerResponse/VerifyTokenResponseType";
dotenv.config();

export default async function verifyToken(
  req: Request,
  res: Response<VerifyTokenResponseType>
): Promise<void> {
  try {
    const JWT_ACCESS_TOKEN: string =
      process.env.JWT_SECRET_TOKEN || "JWT_SECRET_TOKEN";
    const bodyAccessToken: string = req.body.ACCESS_TOKEN || "null";
    try {
      verify(bodyAccessToken, JWT_ACCESS_TOKEN);
      res.status(200).send({ verify: true });
    } catch (error) {
      res.status(200).send({ verify: false });
    }
  } catch (error) {
    console.error(
      `Error in controller: request/controller/login`,
      `Request: ${req}`,
      `Response: ${res}`,
      `Error: ${error}`
    );
    res.status(500).send({ verify: false });
  }
}
