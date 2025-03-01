import express, { Express, Request, Response } from "express";
import http from "http";
import { DefaultEventsMap, Server } from "socket.io";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth";

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

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("yukiho");
});

app.use("/auth", authRouter);
export default server;
