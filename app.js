const express = require("express");
const app = express();
const http = require("http");

const socketio = require("socket.io");

const server = http.createServer(app);

const io = require("socket.io");

app.set("view engine", "ejs");
app.set(express.static(path.join(__dirname, publiC)));
appp.get("/", function (req, res) {
  res.send("HI!");
});

server.listen("3000");
