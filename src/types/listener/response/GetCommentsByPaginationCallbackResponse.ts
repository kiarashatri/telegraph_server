import TweetCommentsResponseData from "../../databaseResponse/TweetCommentsResponseData";

type GetCommentsByPaginationCallbackResponse = (
  arg: TweetCommentsResponseData
) => {};

export default GetCommentsByPaginationCallbackResponse;
