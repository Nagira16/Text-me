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
import messageRouter from "./routes/messageRouter";

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
app.use("/message", authMiddleware, messageRouter);

io.on("connection", (socket: Socket) => {
  console.log("🔵 Connected to server:", socket.id);

  socket.on("joinRoom", ({ userId }: { userId: string }) => {
    if (!userId) return;
    socket.join(userId);
    console.log(`👤 User joined room: ${userId}`);
  });

  socket.on("joinConversation", (conversationId: string) => {
    if (!conversationId) return;
    socket.join(conversationId);
    console.log(`💬 Joined conversation: ${conversationId}`);
  });

  socket.on("joinUserProfile", (userId: string) => {
    if (!userId) return;
    socket.join(userId);
    console.log(`📄 Joined user profile: ${userId}`);
  });

  socket.on("leaveRoom", (id: string) => {
    if (!id) return;
    socket.leave(id);
    console.log(`🚪 Left : ${id}`);
  });

  socket.on("sendMessage", (message) => {
    if (!message?.conversation_id) return;
    io.to(message.conversation_id).emit("newMessage", message);
    console.log(`📨 Message sent to conversation ${message.conversation_id}`);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Disconnected:", socket.id);
  });
});

export default server;
