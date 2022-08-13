import { Socket } from "socket.io";
import message from "../../Database/Models/message";
import saveMessageToDb from "../services/saveMessageToDb";

export default function newMessageFromClient(socket: Socket): void {
  socket.on("newMessageFromClient", async (arg) => {
    console.log("saveMessageToDb:  ");
    arg.from = socket.data.user.user_id;
    arg.sent_at = new Date();

    const data = new message({
      from: "sender_id",
      to: "reciver_id",
      reply_to: "reply_to_id",
      context: { image: "img", text: "string33 txt33" },
      sent_at: null,
    });

    await data.save();
    console.log(data);

    // saveMessageToDb(arg);
    // console.log(saveMessageToDb(arg));
  });
}
