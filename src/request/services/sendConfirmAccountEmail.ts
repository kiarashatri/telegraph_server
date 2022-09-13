import { Types } from "mongoose";
import { mailTransporter } from "../../email/mailTransporter";

export default async function sendConfirmAccountEmail(
  token: Types.ObjectId,
  email: string
): Promise<void> {
  try {
    await mailTransporter.sendMail({
      from: process.env.MAIL_NAME,
      to: email,
      subject: "Telegraph massenger Account verfiy",
      html: `<a href="${
        process.env.BASE_URI
      }confirmation/?token=${token.toString()}">Click here to verify account</a>`,
    });
  } catch (error) {
    console.error(
      `Error in service: request/service/sendConfirmAccountEmail`,
      `Error: ${error}`
    );
  }
}
