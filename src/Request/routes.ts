import { Express, Request, Response } from "express";

export default function Routes(app: Express) {
  app.post("/login", (req: Request, res: Response) => {
    res.send(
      JSON.stringify({
        authenticated: "ok",
        access_token: "123234cdc",
      })
    );
  });

  app.post("/verify_token", (req: Request, res: Response) => {
    res.send(
      JSON.stringify({
        verify: true,
      })
    );
  });
}
