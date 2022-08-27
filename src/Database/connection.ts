import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default async function DBconnection() {
  try {
    const mongodbConn: string = String(process.env.DB_CONNECTION);
    mongoose.connect(mongodbConn);
  } catch (error) {
    console.log(
      "Mongodb connection error in: database/connection",
      `Error: ${error}`
    );
  }
}
