import { Express, Request, Response } from "express";

// import Controllers
import confirmEmail from "./controllers/confirmEmail";
import login from "./controllers/login";
import register from "./controllers/register";
import resetPassword from "./controllers/resetPassword";
import verifyToken from "./controllers/verifyToken";

export default function Routes(app: Express): void {
  try {
    app.post(
      "/login",
      (req: Request, res: Response): Promise<void> => login(req, res)
    );
    app.post(
      "/register",
      (req: Request, res: Response): Promise<void> => register(req, res)
    );
    app.post(
      "/verify_token",
      (req: Request, res: Response): Promise<void> => verifyToken(req, res)
    );
    app.post(
      "/confirm_email",
      (req: Request, res: Response): Promise<void> => confirmEmail(req, res)
    );
    app.post(
      "/reset_password",
      (req: Request, res: Response): Promise<void> => resetPassword(req, res)
    );
  } catch (error) {
    console.error(`Error in initial router: request/routes`, `Error: ${error}`);
  }
}
