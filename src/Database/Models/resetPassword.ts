import { model, Schema, Types } from "mongoose";

let resetPassword: any;

try {
  // Create Schema
  const resetPasswordSchema = new Schema<{}>({
    user: { type: Types.ObjectId, required: true, ref: "user" },
    resetRequestAt: { type: Date, default: Date.now, required: false },
  });

  resetPassword = model("reestPassword", resetPasswordSchema);
} catch (error) {
  console.error(
    "Mongodb model error: database/models/resetPassword",
    `Error: ${error}`
  );
}

export default resetPassword;
