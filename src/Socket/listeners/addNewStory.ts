import { Socket } from "socket.io";
import saveStoryToDb from "../services/saveStoryToDb";

export default function addNewStory(socket: Socket) {
  socket.on("addNewStory", async (base64Image: String) => {
    saveStoryToDb(socket, base64Image);
  });
}
