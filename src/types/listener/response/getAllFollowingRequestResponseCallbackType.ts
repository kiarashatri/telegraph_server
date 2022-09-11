import { Types } from "mongoose";

type getAllFollowingRequestResponseCallbackType = (
  args: Array<{
    _id: Types.ObjectId;
    applicant: Types.ObjectId;
    request_to: Types.ObjectId;
  }>
) => {};

export default getAllFollowingRequestResponseCallbackType;
