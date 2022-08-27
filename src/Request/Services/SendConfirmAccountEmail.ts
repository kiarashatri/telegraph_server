import { Types } from "mongoose";
import { mailTransporter } from "../../email/mailTransporter";

export default async function SendConfirmAccountEmail(
  token: Types.ObjectId,
  email: string
) {
  try {
    await mailTransporter.sendMail({
      from: process.env.MAIL_NAME,
      to: email,
      subject: "Telegraph massenger Account verfiy",
      html: `<a href="${
        process.env.BASE_URI
      }confirmation/?token=${token.toString()}">Click here to verify account</a>`,
    });
  } catch (error) {}
}
