import { HydratedDocument, Types } from "mongoose";
import { Socket } from "socket.io";
import tweet from "../../../../database/models/tweet";
import { TweetsOfSpecificUserResponseCallbackArgsType } from "../../../../types/listener/response/TweetsOfSpecificUserResponseCallbackType";
import relationChecker from "../../../services/relationChecker";
import dotenv from "dotenv";
import GetTweetsOfAnUserByPaginationDbResponseType from "../../../../types/databaseResponse/GetTweetsOfAnUserByPaginationDbResponseType";
import TweetsOfSpecificUserResponseCallbackType from "../../../../types/listener/response/TweetsOfSpecificUserResponseCallbackType";
dotenv.config();

export default function getTweetsOfAnUserByPagination(socket: Socket) {
  try {
    socket.on(
      "tweet/get/byPagination",
      async (
        userId: string | Types.ObjectId,
        page: number,
        response: TweetsOfSpecificUserResponseCallbackType
      ) => {
        if (
          (
            await relationChecker(
              socket.data.user.ObjectId,
              new Types.ObjectId(userId)
            )
          ).isFollowed
        ) {
          const returnTweetEveryTime: number =
            Number(process.env.RETURN_TWEET_EVERY_PAGE) | 20;
          let skipBaseOnPagination = 0;
          if (page > 1) {
            skipBaseOnPagination = (page - 1) * returnTweetEveryTime;
          }

          const tweetResults: Array<
            HydratedDocument<GetTweetsOfAnUserByPaginationDbResponseType>
          > = await tweet
            .find({ owner: new Types.ObjectId(userId), removed: false })
            .select("_id owner context sent_at likes comments._id")
            .limit(returnTweetEveryTime)
            .skip(skipBaseOnPagination);

          let responseObject: Array<TweetsOfSpecificUserResponseCallbackArgsType> =
            [];

          const check = (arr: Array<Types.ObjectId>): boolean => {
            let callbackResonse = false;
            arr.forEach((element: Types.ObjectId) => {
              if (element.equals(socket.data.user.ObjectId)) {
                callbackResonse = true;
              }
            });
            return callbackResonse;
          };

          tweetResults.forEach(
            (
              singleTweet: HydratedDocument<GetTweetsOfAnUserByPaginationDbResponseType>
            ) => {
              responseObject.push({
                ...singleTweet.toObject(),
                comments: singleTweet.comments.length,
                likes: singleTweet.likes.length,
                userLiked: check(singleTweet.likes),
              });
            }
          );

          response(responseObject);
        }
      }
    );
  } catch (error) {
    console.error(`Listener error: tweet/get/byPagination`, error);
  }
}
