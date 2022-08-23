import { model, Schema, Types } from "mongoose";

// Create Schema
const followRequestSchema = new Schema<{}>({
  applicant: { type: Types.ObjectId, required: true, ref: "user" },
  request_to: { type: Types.ObjectId, required: true, ref: "user" },
  requested_at: { type: Date, default: Date.now, required: false },
});

const followRequest = model("followRequest", followRequestSchema);

export default followRequest;
