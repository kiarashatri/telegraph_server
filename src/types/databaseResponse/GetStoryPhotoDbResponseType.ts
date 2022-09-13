import StoryPhotoResponseType from "./StoryPhotoDbResponseType";

type getStoryPhotoListenerResponse = StoryPhotoResponseType & {
  status: boolean;
};

export default getStoryPhotoListenerResponse;
