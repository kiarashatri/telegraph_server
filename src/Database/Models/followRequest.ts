import { model, Schema, Types } from "mongoose";
import followRequestSchemaType from "../schema/followRequestSchemaType";

let followRequest: any;
try {
  // Create Schema
  const followRequestSchema: Schema = new Schema<followRequestSchemaType>({
    applicant: { type: Schema.Types.ObjectId, required: true, ref: "user" },
    request_to: { type: Schema.Types.ObjectId, required: true, ref: "user" },
    requested_at: { type: Date, default: Date.now, required: false },
  });

  followRequest = model<followRequestSchemaType>(
    "followRequest",
    followRequestSchema
  );
} catch (error) {
  console.error(
    "Mongodb model error: database/models/followRequest",
    `Error: ${error}`
  );
}

export default followRequest;
