import { Socket } from "socket.io";
import user from "../../../../database/models/user";
import tweet from "../../../../database/models/tweet";
import dotenv from "dotenv";
import FollowingIdDbResponseType from "../../../../types/databaseResponse/FollowingIdDbResponseType";
import TweetResultsByPagination from "../../../../types/databaseResponse/TweetByPaginationDbResponseType";
import { HydratedDocument, Types } from "mongoose";
import TweetEmitType from "../../../../types/emit/TweetEmitType";
dotenv.config();

export default async function sendAllTweetByPagination(
  socket: Socket,
  pageNumber: number = 1
) {
  try {
    const userFollowingDbResponse: FollowingIdDbResponseType = await user
      .findById(socket.data.user.ObjectId)
      .select("following.id");

    const returnTweetEveryTime =
      Number(process.env.RETURN_TWEET_EVERY_PAGE) | 20;
    let skipBaseOnPagination = 0;

    if (pageNumber > 1) {
      skipBaseOnPagination = (pageNumber - 1) * returnTweetEveryTime;
    }

    const userIdFollowingList: Array<Types.ObjectId> =
      userFollowingDbResponse.following.map(
        (element: { id: Types.ObjectId }) => {
          return element.id;
        }
      );

    const tweetResults: Array<HydratedDocument<TweetResultsByPagination>> =
      await tweet
        .find({ owner: { $in: userIdFollowingList }, removed: false })
        .select("_id owner context sent_at likes comments.id")
        .limit(returnTweetEveryTime)
        .skip(skipBaseOnPagination);

    let responseObject: Array<TweetEmitType> = [];

    const check = (arr: Array<string>): boolean => {
      if (arr.indexOf(socket.data.user.user_id) === -1) {
        return false;
      } else {
        return true;
      }
    };

    tweetResults.forEach(
      (singleTweet: HydratedDocument<TweetResultsByPagination>) => {
        responseObject.push({
          ...singleTweet.toObject(),
          comments: singleTweet.comments.length,
          likes: singleTweet.likes.length,
          userLiked: check(
            singleTweet.likes.map((element: Types.ObjectId) => {
              return element.toString();
            })
          ),
        });
      }
    );

    if (tweetResults.length !== 0) {
      socket.emit("tweet/send/byPagination", responseObject);
    }
  } catch (error) {
    console.error(
      "Emit error: tweet/send/byPagination",
      `User-id: ${socket.data.user.user_id}`,
      `Socket-id: ${socket.id}`,
      `Error: ${error}`
    );
    console.error("000000000000000000");
  }
}
