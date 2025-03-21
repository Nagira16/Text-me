"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const middleware_1 = require("./middleware");
const testController_1 = require("./controllers/testController");
const postRouter_1 = __importDefault(require("./routes/postRouter"));
const commentRouter_1 = __importDefault(require("./routes/commentRouter"));
const likeRouter_1 = __importDefault(require("./routes/likeRouter"));
const followRouter_1 = __importDefault(require("./routes/followRouter"));
const conversationRouter_1 = __importDefault(require("./routes/conversationRouter"));
const path_1 = __importDefault(require("path"));
const messageRouter_1 = __importDefault(require("./routes/messageRouter"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    },
});
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../src/uploads")));
app.get("/", testController_1.testCheckWork);
app.use("/auth", authRouter_1.default);
app.use("/user", middleware_1.authMiddleware, userRouter_1.default);
app.use("/post", postRouter_1.default);
app.use("/comment", commentRouter_1.default);
app.use("/like", middleware_1.authMiddleware, likeRouter_1.default);
app.use("/follow", middleware_1.authMiddleware, followRouter_1.default);
app.use("/conversation", middleware_1.authMiddleware, conversationRouter_1.default);
app.use("/message", middleware_1.authMiddleware, messageRouter_1.default);
exports.io.on("connection", (socket) => {
    console.log("🔵 Connected to server:", socket.id);
    socket.on("joinRoom", ({ userId }) => {
        if (!userId)
            return;
        socket.join(userId);
        console.log(`👤 User joined room: ${userId}`);
    });
    socket.on("joinConversation", (conversationId) => {
        if (!conversationId)
            return;
        socket.join(conversationId);
        console.log(`💬 Joined conversation: ${conversationId}`);
    });
    socket.on("joinUserProfile", (userId) => {
        if (!userId)
            return;
        socket.join(userId);
        console.log(`📄 Joined user profile: ${userId}`);
    });
    socket.on("leaveRoom", (id) => {
        if (!id)
            return;
        socket.leave(id);
        console.log(`🚪 Left : ${id}`);
    });
    socket.on("sendMessage", (message) => {
        if (!(message === null || message === void 0 ? void 0 : message.conversation_id))
            return;
        exports.io.to(message.conversation_id).emit("newMessage", message);
        console.log(`📨 Message sent to conversation ${message.conversation_id}`);
    });
    socket.on("disconnect", () => {
        console.log("🔴 Disconnected:", socket.id);
    });
});
exports.default = server;
