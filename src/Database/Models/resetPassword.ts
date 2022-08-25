import { model, Schema, Types } from "mongoose";

// Create Schema
const resetPasswordSchema = new Schema<{}>({
  user: { type: Types.ObjectId, required: true, ref: "user" },
  resetRequestAt: { type: Date, default: Date.now, required: false },
});

const resetPassword = model("reestPassword", resetPasswordSchema);

export default resetPassword;
