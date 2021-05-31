import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { createServer } from "http";
import { Server as ioServer } from "socket.io";
import routes from "./routes";
const PORT = process.env.PORT || 8000;
const app = express();
const httpServer = createServer(app);

const CONNECTED_USERS = {};

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//socket.io Server
const io = new ioServer(httpServer, {
  cors: { origin: process.env.SPORT_FRONTEND_URL, methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  const { user_id } = socket.handshake.query;
  CONNECTED_USERS[user_id] = socket.id;

  // console.log("user is connected", socket.id);
});

try {
  mongoose
    .connect(process.env.MONGO_DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((status) => {
      console.log("mongoDB conection successful!");
    });
} catch (error) {
  console.error(error);
}

app.use((req, res, next) => {
  req.io = io;
  req.connectedusers = CONNECTED_USERS;
  next();
});

app.use(cors({ origin: process.env.SPORT_FRONTEND_URL }));
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "..", "files")));

// UI
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.route("/", (req, res) => {
  console.log(path.join(__dirname, "..", "build", "index.html"));
  res.send(express.static(path.join(__dirname, "..", "build", "index.html")));
});

app.use(routes);

httpServer.listen(PORT, () => {
  console.log(`started listing on ${PORT}`);
});
