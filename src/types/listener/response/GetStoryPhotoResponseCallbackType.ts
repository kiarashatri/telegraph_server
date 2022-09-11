type GetStoryPhotoResponseCallback = (
  args: GetStoryPhotoResponseCallbackArgs
) => {};

export type GetStoryPhotoResponseCallbackArgs = {
  storyId: string;
  base64Photo?: string;
  status: boolean;
};

export default GetStoryPhotoResponseCallback;
