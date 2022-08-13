import { Socket } from "socket.io";
import message from "../../Database/Models/message";

export default async function saveMessageToDb(arg: any) {
  try {
    const data = new message({
      from: "sender_id",
      to: "reciver_id",
      reply_to: "reply_to_id",
      context: { image: "img", text: "string33 txt33" },
      sent_at: null,
    });

    data.save();
  } catch (error) {
    return false;
  }
}
