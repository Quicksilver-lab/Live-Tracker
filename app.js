const express = require("express");
const app = express();
const path = require("path");
const http = require("http");

const socketio = require("socket.io");

const server = http.createServer(app);

const io = require("socket.io");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, publiC)));

io.on("connection", function (socket) {
  console.log("Connected");
});
appp.get("/", function (req, res) {
  res.rener("index");
});

server.listen("3000");
