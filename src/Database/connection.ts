import mongoose from "mongoose";

export default async function DBconnection() {
  try {
    mongoose.connect("mongodb://localhost:27017/telegraph");
  } catch (error) {
    console.log("error catched");
  }
}
