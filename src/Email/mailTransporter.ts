import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export default function mailTransporter() {
  try {
    return nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(`${process.env.MAIL_PORT}`),
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  } catch (error) {
    console.error(`Error in initial nodemail: email/mailTransporter`);
  }
}
