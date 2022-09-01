import { Types } from "mongoose";
import user from "../../database/models/user";
import { mailTransporter } from "../../email/mailTransporter";
import dotenv from "dotenv";
dotenv.config();

export default async function resetPasswordEmailSender(
  userObj: Types.ObjectId,
  token: Types.ObjectId
) {
  try {
    const userObjFromDb: any = await user.findById(userObj).select("email");
    await mailTransporter.sendMail({
      from: process.env.MAIL_NAME,
      to: userObjFromDb.email,
      subject: "Telegraph massenger Reset Password",
      html: `<a href="${
        process.env.BASE_URI
      }reset_password/?token=${token.toString()}">Click On this link to **RESET PASSWORD**</a>`,
    });
  } catch (error) {
    console.error(
      `Error in service: request/service/resetPasswordEmailSender`,
      `Error: ${error}`
    );
  }
}
