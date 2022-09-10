import { model, Schema } from "mongoose";
import FollowRequestSchemaType from "../schema/FollowRequestSchemaType";

let followRequest: any;
try {
  // Create Schema
  const followRequestSchema: Schema = new Schema<FollowRequestSchemaType>({
    applicant: { type: Schema.Types.ObjectId, required: true, ref: "user" },
    request_to: { type: Schema.Types.ObjectId, required: true, ref: "user" },
    requested_at: { type: Date, default: Date.now, required: false },
  });

  followRequest = model<FollowRequestSchemaType>(
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
