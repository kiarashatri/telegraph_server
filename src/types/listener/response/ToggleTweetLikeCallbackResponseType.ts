type ToggleTweetLikeCallbackResponseType = (args: {
  status: boolean;
  currentLikedStatus?: boolean;
}) => {};

export default ToggleTweetLikeCallbackResponseType;
