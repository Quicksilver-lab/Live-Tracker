const express = require("express");
const app = express();
const http = require("http");

const socketio = require("socketio");
io = io(server);
const server = http.createServer(app);
const io = require("socket.io");
appp.get("/", function (req, res) {
  res.send("HI!");
});

server.listen("3000");
