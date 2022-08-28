import { model, Schema, Types } from "mongoose";
import resetPasswordSchemaType from "../schema/resetPasswordSchemaType";

let resetPassword: any;

try {
  // Create Schema
  const resetPasswordSchema = new Schema<resetPasswordSchemaType>({
    user: { type: Schema.Types.ObjectId, required: true, ref: "user" },
    resetRequestAt: { type: Date, default: Date.now, required: false },
  });

  resetPassword = model<resetPasswordSchemaType>(
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
