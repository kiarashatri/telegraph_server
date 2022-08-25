import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const mailTransporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(`${process.env.MAIL_PORT}`),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});
