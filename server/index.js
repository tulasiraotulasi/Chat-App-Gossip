const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();

try {
  // app.use(cors());
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  const usersOnline = new Map();

  io.on("connection", (socket) => {
    const socketId = socket.id;
    console.log("User Connected: ", socket.id);
    // console.log(socketId);

    socket.on("userJoining", (data) => {
      console.log(data);
      usersOnline.set(socketId, data.sender);
      socket.broadcast.emit("joined", data);
    });

    socket.on("sendMessage", (data) => {
      console.log(data.sender, ":", data.message);
      socket.broadcast.emit("receiveMessage", data);
    });

    socket.on("checkUsers", () => {
      // console.log(usersOnline.length());
      console.log(usersOnline);
      socket.emit("onlineUsers", {
        sender: "Server",
        message: usersOnline.size,
      });
    });

    socket.on("disconnect", () => {
      console.log("user disconnted : ", usersOnline.get(socketId));
      socket.broadcast.emit("userLeft", {
        sender: usersOnline.get(socketId),
        message: "leftTheChat",
      });
      usersOnline.delete(socketId);
    });
  });
  app.get("/health", (req, res) => {
    res.send("Server is running at 3001");
  });

  server.listen(3001, (res, req) => {
    console.log("Server is Running at 3001");
  });
} catch (error) {
  console.log("Error in server is", JSON.stringify(error));
}
