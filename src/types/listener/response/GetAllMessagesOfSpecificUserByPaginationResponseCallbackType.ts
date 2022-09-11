import MessageDbResponseType from "../../databaseResponse/MessageDbResponseType";

type getAllMessagesOfSpecificUserByPaginationResponseType = (
  dbResponse: Array<MessageDbResponseType>
) => {};

export default getAllMessagesOfSpecificUserByPaginationResponseType;
