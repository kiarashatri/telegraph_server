import { Socket } from "socket.io";
import user from "../../../../database/models/user";
import tweet from "../../../../database/models/tweet";
import dotenv from "dotenv";
dotenv.config();

export default async function sendAllTweetByPagination(
  socket: Socket,
  pageNumber: number = 1
) {
  try {
    const userFollowingList: any = await user
      .findById(socket.data.user.ObjectId)
      .select("following.id");

    const returnTweetEveryTime = Number(process.env.RETURN_TWEET_EVERY_PAGE);
    let skipBaseOnPagination = 0;
    if (pageNumber > 1) {
      skipBaseOnPagination = (pageNumber - 1) * returnTweetEveryTime;
    }

    const tweetResults: any = await tweet
      .find({ owner: { $in: userFollowingList }, removed: false })
      .select("_id owner context sent_at likes comments.id")
      .limit(returnTweetEveryTime)
      .skip(skipBaseOnPagination);

    let responseObject: any = [];

    function check(arr: any) {
      if (arr.indexOf(socket.data.user.ObjectId) === -1) {
        return false;
      } else {
        return true;
      }
    }

    tweetResults.forEach((singleTweet: any) => {
      responseObject.push({
        ...singleTweet,
        comments: singleTweet.comments.length,
        likes: singleTweet.likes.length,
        userLiked: check(singleTweet.likes),
      });
    });

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
  }
}
