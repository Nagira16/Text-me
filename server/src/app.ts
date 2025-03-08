import express, { Express } from "express";
import http from "http";
import { DefaultEventsMap, Server, Socket } from "socket.io";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import { authMiddleware } from "./middleware";
import { testCheckWork } from "./controllers/testController";
import postRouter from "./routes/postRouter";
import commentRouter from "./routes/commentRouter";
import likeRouter from "./routes/likeRouter";
import followRouter from "./routes/followRouter";
import conversationRouter from "./routes/conversationRouter";
import path from "path";

const app: Express = express();

const server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
> = http.createServer(app);

export const io: Server<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
> = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "../src/uploads")));

app.get("/", testCheckWork);

app.use("/auth", authRouter);
app.use("/user", authMiddleware, userRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);
app.use("/like", authMiddleware, likeRouter);
app.use("/follow", authMiddleware, followRouter);
app.use("/conversation", authMiddleware, conversationRouter);

io.on("connection", (socket: Socket) => {
  console.log("connected to server");

  const userId = socket.handshake.auth.userId;
  if (userId) {
    socket.join(userId);
    console.log(`${userId} joined the room`);
  }

  socket.on(
    "joinConversation",
    (userIds: { user1Id: string; user2Id: string }) => {
      const roomName = [userIds.user1Id, userIds.user2Id].sort().join("-");
      console.log(
        `Users ${userIds.user1Id} and ${userIds.user2Id} joined the room ${roomName}`
      );
    }
  );

  socket.on("disconnect", () => console.log("disconnected"));
});

export default server;
