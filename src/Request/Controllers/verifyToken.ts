import { Request, Response } from "express";
export default function verifyToken(req: Request, res: Response) {
  res.send(
    JSON.stringify({
      verify: true,
    })
  );
}
