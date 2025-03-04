import express, { Express } from "express";
import http from "http";
import { DefaultEventsMap, Server } from "socket.io";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import { authMiddleware } from "./middleware";
import { testCheckWork } from "./controllers/testController";

const app: Express = express();

const server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
> = http.createServer(app);

const io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> =
  new Server(server, {
    cors: {
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

app.use(express.json());
app.use(cookieParser());

app.get("/", testCheckWork);

app.use("/auth", authRouter);
app.use("/user", authMiddleware, userRouter);

export default server;
