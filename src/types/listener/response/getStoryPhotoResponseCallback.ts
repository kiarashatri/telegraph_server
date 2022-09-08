import getStoryPhotoListenerResponse from "../../databaseResponse/getStoryPhotoResponseData";

type getStoryPhotoResponseCallback = (args: {
  storyId: string;
  base64Photo: getStoryPhotoListenerResponse;
}) => {};

export default getStoryPhotoResponseCallback;
