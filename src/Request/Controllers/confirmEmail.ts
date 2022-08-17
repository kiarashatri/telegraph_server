import { Request, Response } from "express";

export default function confirmEmail(req: Request, res: Response) {
  res.send({ ok: true });
}