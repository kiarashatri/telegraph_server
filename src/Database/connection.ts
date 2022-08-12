import mongoose from "mongoose";

export default async function DBconnection() {
  try {
    console.log("Try Lope: ");

    mongoose.connect("mongodb://localhost:27017/telegraph");

    const kittySchema = new mongoose.Schema({
      name: String,
    });

    const Kitten = mongoose.model("Kitten", kittySchema);

    let data = await Kitten.findById("62f5110534dffd58f617efca");
  } catch (error) {
    console.log("error catched");
  }
}
