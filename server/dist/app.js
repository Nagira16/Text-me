"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const middleware_1 = require("./middleware");
const testController_1 = require("./controllers/testController");
const postRouter_1 = __importDefault(require("./routes/postRouter"));
const commentRouter_1 = __importDefault(require("./routes/commentRouter"));
const likeRouter_1 = __importDefault(require("./routes/likeRouter"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    },
});
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get("/", testController_1.testCheckWork);
app.use("/auth", authRouter_1.default);
app.use("/user", middleware_1.authMiddleware, userRouter_1.default);
app.use("/post", postRouter_1.default);
app.use("/comment", commentRouter_1.default);
app.use("/like", middleware_1.authMiddleware, likeRouter_1.default);
exports.default = server;
