import StoryPhotoResponse from "./StoryPhotoResponse";

type getStoryPhotoListenerResponse = StoryPhotoResponse & {
  status: boolean;
};

export default getStoryPhotoListenerResponse;
