const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("send-location", (data) => {
    console.log("Location received:", data);
    io.emit("receive-location", { id: socket.id, ...data });
  });

  socket.on("update-text", (text) => {
    console.log("Text/Emoji received:", text);
    io.emit("update-text", { id: socket.id, text });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    io.emit("user-disconnected", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
