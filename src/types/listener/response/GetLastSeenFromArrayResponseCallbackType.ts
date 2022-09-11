type GetLastSeenFromArrayResponseCallbackType = (
  args: Array<{
    userId: string;
    lastSeen?: Date;
    online: boolean;
  }>
) => {};

export default GetLastSeenFromArrayResponseCallbackType;
