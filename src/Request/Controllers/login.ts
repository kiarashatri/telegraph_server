import { Request, Response } from "express";

export default function login(req: Request, res: Response) {
  res.send(
    JSON.stringify({
      authenticated: "ok",
      access_token: "123234cdc",
    })
  );
}
