import { Express, Request, Response } from "express";

// import Controllers
import confirmEmail from "./Controllers/confirmEmail";
import forgetPassword from "./Controllers/forgetPassword";
import login from "./Controllers/login";
import register from "./Controllers/register";
import verifyToken from "./Controllers/verifyToken";

export default function Routes(app: Express) {
  app.post("/login", (req: Request, res: Response) => login(req, res));
  app.post("/register", (req: Request, res: Response) => register(req, res));
  app.post("/verify_token", (req: Request, res: Response) =>
    verifyToken(req, res)
  );
  app.post("/confirm_email", (req: Request, res: Response) =>
    confirmEmail(req, res)
  );
  app.post("/forget_password", (req: Request, res: Response) =>
    forgetPassword(req, res)
  );
}
