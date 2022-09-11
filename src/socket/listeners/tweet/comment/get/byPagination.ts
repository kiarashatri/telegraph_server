import { Types } from "mongoose";
import { Socket } from "socket.io";
import tweet from "../../../../../database/models/tweet";
import TweetCommentsDbResponseData from "../../../../../types/databaseResponse/TweetCommentsDbResponseType";
import TweetOwnerDbResponseType from "../../../../../types/databaseResponse/TweetOwnerDbResponseType";
import GetCommentsByPaginationCallbackResponse from "../../../../../types/listener/response/GetCommentsByPaginationResponseCallbackType";
import relationChecker from "../../../../services/relationChecker";

export default function getCommentsByPagination(socket: Socket) {
  try {
    socket.on(
      "tweet/comment/get/byPagination",
      async (
        tweetId: string | Types.ObjectId,
        skipPage: number,
        response: GetCommentsByPaginationCallbackResponse
      ) => {
        const tweetOwner: TweetOwnerDbResponseType = await tweet
          .findOne({ _id: new Types.ObjectId(tweetId) })
          .select("owner");

        if (
          (await relationChecker(socket.data.user.ObjectId, tweetOwner.owner))
            .isFollowed
        ) {
          let skipNumber = 0;
          if (skipPage > 1) {
            skipNumber = (skipPage - 1) * 20;
          }
          const tweetComments: TweetCommentsDbResponseData = await tweet
            .findOne({ _id: new Types.ObjectId(tweetId) })
            .select("comments")
            .limit(20)
            .skip(skipNumber);

          response(tweetComments);
        }
      }
    );
  } catch (error) {
    console.error(`Listener error: tweet/comment/get/byPagination`, error);
  }
}
