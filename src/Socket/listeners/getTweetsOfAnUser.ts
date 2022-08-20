import { Types } from "mongoose";
import { Socket } from "socket.io";
import tweet from "../../Database/Models/tweet";
import user from "../../Database/Models/user";

export default function getTweetsOfAnUser(socket: Socket) {
  socket.on("getTweetsOfAnUser", async (userId, page) => {
    try {
      await user.exists(
        {
          _id: socket.data.user.ObjectId,
          "following.id": new Types.ObjectId(userId),
        },
        async (error, response) => {
          if (response !== null) {
            const returnTweetEveryTime = 20;
            let skipBaseOnPagination = 0;
            if (page > 1) {
              skipBaseOnPagination = (page - 1) * returnTweetEveryTime;
            }

            const tweetResults: any = await tweet
              .find({ owner: new Types.ObjectId(userId) })
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
              socket.emit("recieveTweetCommentsFromServer", responseObject);
            }
          }
        }
      );
    } catch (error) {
      console.error(
        "Manual Logging: error in running -> sendTweetByPagination.ts"
      );
    }
  });
}
