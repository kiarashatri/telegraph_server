import express, { Express } from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import Routes from "./routes";

const app: Express = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cors());

Routes(app);

app.listen(4000);
server.listen(5000, () => {
  console.log("listening on *:5000");
});
