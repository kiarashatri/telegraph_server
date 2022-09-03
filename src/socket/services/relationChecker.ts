import { Types } from "mongoose";
import user from "../../database/models/user";
import RelationCheckingType from "../../types/RelationCheckingType";

export default async function relationChecker(
  checkingUser: Types.ObjectId,
  checkByUser: Types.ObjectId
): Promise<RelationCheckingType> {
  const response: RelationCheckingType = {
    isFollowed: false,
    isBlocked: false,
    mutual: false,
  };
  try {
    if (
      await user.exists({
        _id: checkingUser,
        "following.id": checkByUser,
      })
    ) {
      response.isFollowed = true;
    } else {
      response.isFollowed = false;
    }

    if (
      await user.exists({
        _id: checkingUser,
        "block.id": checkByUser,
      })
    ) {
      response.isBlocked = true;
    } else {
      response.isBlocked = false;
    }

    if (
      await user.exists({
        _id: checkByUser,
        "following.id": checkingUser,
      })
    ) {
      response.mutual = true;
    } else {
      response.mutual = false;
    }
  } catch (error) {
    console.error("Service error: relationChecker", `Error: ${error}`);
  }
  return response;
}
