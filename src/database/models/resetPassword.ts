import { model, Schema } from "mongoose";
import ResetPasswordSchemaType from "../schema/ResetPasswordSchemaType";

let resetPassword: any;

try {
  // Create Schema
  const resetPasswordSchema = new Schema<ResetPasswordSchemaType>({
    user: { type: Schema.Types.ObjectId, required: true, ref: "user" },
    resetRequestAt: { type: Date, default: Date.now, required: false },
  });

  resetPassword = model<ResetPasswordSchemaType>(
    "reestPassword",
    resetPasswordSchema
  );
} catch (error) {
  console.error(
    "Mongodb model error: database/models/resetPassword",
    `Error: ${error}`
  );
}

export default resetPassword;
