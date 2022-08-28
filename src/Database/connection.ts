import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default async function DBconnection(): Promise<void> {
  try {
    await mongoose.connect(String(process.env.DB_CONNECTION));
  } catch (error) {
    console.log(
      "Mongodb connection error in: database/connection",
      `Error: ${error}`
    );
  }
}
