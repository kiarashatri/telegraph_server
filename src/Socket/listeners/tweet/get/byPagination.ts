import { Types } from "mongoose";
import { Socket } from "socket.io";
import tweet from "../../../../Database/Models/tweet";
import user from "../../../../Database/Models/user";

export default function getTweetsOfAnUserByPagination(socket: Socket) {
  try {
    socket.on("tweet/get/byPagination", async (userId, page, response) => {
      await user.exists(
        {
          _id: socket.data.user.ObjectId,
          "following.id": new Types.ObjectId(userId),
        },
        async (error, dbResponse) => {
          if (dbResponse !== null) {
            const returnTweetEveryTime = 20;
            let skipBaseOnPagination = 0;
            if (page > 1) {
              skipBaseOnPagination = (page - 1) * returnTweetEveryTime;
            }

            const tweetResults: any = await tweet
              .find({ owner: new Types.ObjectId(userId), removed: false })
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

            response(responseObject);
          }
        }
      );
    });
  } catch (error) {
    console.error(`Listener error: tweet/get/byPagination`, error);
  }
}
