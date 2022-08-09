// const express = require("express");
// const app = express();
// const http = require("http");
// const { Server } = require("socket.io");
// const cors = require("cors");

// app.use(cors());

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log("a user connected", socket.id);

//   socket.on("from-client", (socket) => {
//     console.log("sended arg");
//   });

//   socket.emit("server", " msg from server");
// });

// server.listen(5000, () => {
//   console.log("listening on *:5000");
// });
