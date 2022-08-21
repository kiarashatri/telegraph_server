import { Types } from "mongoose";
import user from "../../Database/Models/user";

function convertToObjectId(
  userId: Types.ObjectId | string
): Types.ObjectId | false {
  if (Types.ObjectId.isValid(userId)) {
    return new Types.ObjectId(userId);
  } else {
    return false;
  }
}

export default async function relationChecker(
  checkingUser: Types.ObjectId | string,
  checkByUser: Types.ObjectId | string
) {
  const checkingUserObjectId = convertToObjectId(checkingUser);
  const checkByUserObjectId = convertToObjectId(checkByUser);

  let isFollowedStatus: boolean;
  if (
    await user.exists({
      _id: checkingUserObjectId,
      "following.id": checkByUserObjectId,
    })
  ) {
    isFollowedStatus = true;
  } else {
    isFollowedStatus = false;
  }

  let isBlockedStatus: boolean;
  if (
    await user.exists({
      _id: checkingUserObjectId,
      "block.id": checkByUserObjectId,
    })
  ) {
    isBlockedStatus = true;
  } else {
    isBlockedStatus = false;
  }

  let mutualStatus: boolean;
  if (
    await user.exists({
      _id: checkByUserObjectId,
      "following.id": checkingUserObjectId,
    })
  ) {
    mutualStatus = true;
  } else {
    mutualStatus = false;
  }

  return {
    isFollowed: isFollowedStatus,
    isBlocked: isBlockedStatus,
    mutual: mutualStatus,
  };
}
