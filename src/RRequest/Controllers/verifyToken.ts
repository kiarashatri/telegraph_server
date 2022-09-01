import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default function verifyToken(req: Request, res: Response) {
  try {
    const JWT_ACCESS_TOKEN = process.env.JWT_SECRET_TOKEN || "JWT_SECRET_TOKEN";
    const bodyAccessToken = req.body.ACCESS_TOKEN || "null";
    const a = verify(bodyAccessToken, JWT_ACCESS_TOKEN);
    res.send({
      verify: true,
    });
  } catch (error) {
    console.error(
      `Error in controller: request/controller/login`,
      `Request: ${req}`,
      `Response: ${res}`,
      `Error: ${error}`
    );
    res.send({
      verify: false,
    });
  }
}
