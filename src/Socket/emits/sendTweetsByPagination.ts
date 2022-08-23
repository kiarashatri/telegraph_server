import { Socket } from "socket.io";
import user from "../../Database/Models/user";
import tweet from "../../Database/Models/tweet";

export default async function sendTweetsByPagination(
  socket: Socket,
  pageNumber: number
) {
  try {
    const userFollowingList: any = await user
      .findById(socket.data.user.ObjectId)
      .select("following.id");

    const returnTweetEveryTime = 15;
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
      socket.emit("sendTweetToClientFromServer", responseObject);
    }
  } catch (error) {
    console.error(
      "Manual Logging: error in running -> sendTweetByPagination.ts"
    );
  }
}
