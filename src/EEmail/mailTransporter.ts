import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export let mailTransporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(`${process.env.MAIL_PORT}`),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});
