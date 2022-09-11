import TweetCommentsDbResponseData from "../../databaseResponse/TweetCommentsDbResponseType";

type GetCommentsByPaginationCallbackResponse = (
  arg: TweetCommentsDbResponseData
) => {};

export default GetCommentsByPaginationCallbackResponse;
