import { model, Schema, Types } from "mongoose";

let followRequest: any;
try {
  // Create Schema
  const followRequestSchema = new Schema<{}>({
    applicant: { type: Types.ObjectId, required: true, ref: "user" },
    request_to: { type: Types.ObjectId, required: true, ref: "user" },
    requested_at: { type: Date, default: Date.now, required: false },
  });

  followRequest = model("followRequest", followRequestSchema);
} catch (error) {
  console.error(
    "Mongodb model error: database/models/followRequest",
    `Error: ${error}`
  );
}

export default followRequest;
