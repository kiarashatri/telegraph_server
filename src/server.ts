import express, { Express } from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import Routes from "./Request/routes";
import Sockets from "./Socket/socket";
import dotenv from "dotenv";
dotenv.config();

try {
  const app: Express = express();
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: process.env.CROSS_ORIGIN,
      methods: ["POST"],
    },
  });

  app.use(express.json());
  app.use(cors());

  Routes(app);
  Sockets(io);

  app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Express listening on *: ${process.env.EXPRESS_PORT}`);
  });
  server.listen(process.env.SOCKET_PORT, () => {
    console.log(`Socket.io listening on *: ${process.env.SOCKET_PORT}`);
  });
} catch (error) {
  console.error("Starting server failed.", error);
}
